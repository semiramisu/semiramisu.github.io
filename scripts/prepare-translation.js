#!/usr/bin/env node

/**
 * 未翻訳の記事を検出し、Claude Code用の翻訳プロンプトを生成するスクリプト
 */

import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR_JA = path.join(__dirname, '../src/contents/posts');
const POSTS_DIR_EN = path.join(__dirname, '../src/contents/posts/en');

// 翻訳プロンプトのテンプレート
const TRANSLATION_PROMPT = `以下の日本語のブログ記事を英語に翻訳してください。

翻訳の際の注意点：
1. 技術用語は適切な英語表現を使用してください
2. 日本語特有の表現は、英語圏の読者にも理解しやすいように意訳してください
3. frontmatterのtitle, description, tagsも翻訳してください
4. コードブロックはそのまま残してください
5. 画像パスやリンクはそのまま残してください
6. 自然で読みやすい英語を心がけてください

元の日本語記事:
\`\`\`markdown
{content}
\`\`\`

翻訳後の英語記事を以下の形式で出力してください:
\`\`\`markdown
[翻訳された記事の内容]
\`\`\``;

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    // ディレクトリが既に存在する場合は無視
  }
}

async function getUntranslatedPosts() {
  // 日本語記事を取得
  const jaFiles = await glob(`${POSTS_DIR_JA}/*.md`, {
    ignore: [`${POSTS_DIR_JA}/en/**/*`]
  });
  
  const untranslated = [];
  
  for (const jaFile of jaFiles) {
    const filename = path.basename(jaFile);
    const enFile = path.join(POSTS_DIR_EN, filename);
    
    // 英語版が存在しない場合
    try {
      await fs.access(enFile);
    } catch {
      const content = await fs.readFile(jaFile, 'utf-8');
      const { data: frontmatter } = matter(content);
      
      untranslated.push({
        filename,
        jaPath: jaFile,
        enPath: enFile,
        content,
        frontmatter
      });
    }
  }
  
  return untranslated;
}

async function generateTranslationPrompts() {
  const untranslated = await getUntranslatedPosts();
  
  if (untranslated.length === 0) {
    console.log('✅ すべての記事が翻訳済みです！');
    return;
  }
  
  console.log(`📝 ${untranslated.length}件の未翻訳記事が見つかりました:\n`);
  
  // 未翻訳記事のリストを表示
  untranslated.forEach((post, index) => {
    console.log(`${index + 1}. ${post.filename}`);
    console.log(`   タイトル: ${post.frontmatter.title}`);
    console.log(`   公開日: ${post.frontmatter.published}`);
    console.log('');
  });
  
  // プロンプトファイルを生成
  const promptsDir = path.join(__dirname, '../translation-prompts');
  await ensureDir(promptsDir);
  
  for (const post of untranslated) {
    const prompt = TRANSLATION_PROMPT.replace('{content}', post.content);
    const promptFile = path.join(promptsDir, `${post.filename}.prompt.txt`);
    
    await fs.writeFile(promptFile, prompt, 'utf-8');
    console.log(`💾 プロンプトを保存しました: ${promptFile}`);
  }
  
  console.log('\n📋 翻訳手順:');
  console.log('1. translation-prompts/ ディレクトリ内のプロンプトファイルを開く');
  console.log('2. 内容をClaude Codeにコピー&ペースト');
  console.log('3. 翻訳結果を src/contents/posts/en/ に保存');
  console.log('4. npm run translate:apply で翻訳を適用');
}

// メイン処理
async function main() {
  console.log('🌐 翻訳準備スクリプトを開始します...\n');
  
  // 英語版ディレクトリを作成
  await ensureDir(POSTS_DIR_EN);
  
  // 未翻訳記事を検出してプロンプトを生成
  await generateTranslationPrompts();
}

main().catch(console.error);