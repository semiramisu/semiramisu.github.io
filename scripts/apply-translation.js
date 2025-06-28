#!/usr/bin/env node

/**
 * Claude Codeで翻訳した記事を適用するスクリプト
 */

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TRANSLATIONS_DIR = path.join(__dirname, '../translations');
const POSTS_DIR_EN = path.join(__dirname, '../src/contents/posts/en');

async function applyTranslations() {
  try {
    // 翻訳ディレクトリの存在確認
    await fs.access(TRANSLATIONS_DIR);
  } catch {
    console.log('❌ translations/ ディレクトリが見つかりません');
    console.log('Claude Codeで翻訳した記事を translations/ ディレクトリに保存してください');
    return;
  }
  
  // 翻訳ファイルを取得
  const files = await fs.readdir(TRANSLATIONS_DIR);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  
  if (mdFiles.length === 0) {
    console.log('❌ 翻訳ファイルが見つかりません');
    return;
  }
  
  console.log(`📚 ${mdFiles.length}件の翻訳を適用します...\n`);
  
  for (const file of mdFiles) {
    const sourcePath = path.join(TRANSLATIONS_DIR, file);
    const destPath = path.join(POSTS_DIR_EN, file);
    
    // ファイルを読み込み
    const content = await fs.readFile(sourcePath, 'utf-8');
    const { data: frontmatter } = matter(content);
    
    // 英語版に言語タグを追加
    frontmatter.lang = 'en';
    frontmatter.translatedFrom = 'ja';
    frontmatter.translatedAt = new Date().toISOString();
    
    // frontmatterを更新
    const updatedContent = matter.stringify(content, frontmatter);
    
    // ファイルを保存
    await fs.writeFile(destPath, updatedContent, 'utf-8');
    console.log(`✅ ${file} を適用しました`);
    
    // 元のファイルを削除（オプション）
    await fs.unlink(sourcePath);
  }
  
  console.log('\n🎉 すべての翻訳を適用しました！');
}

async function main() {
  console.log('🌐 翻訳適用スクリプトを開始します...\n');
  
  // 英語版ディレクトリを作成
  await fs.mkdir(POSTS_DIR_EN, { recursive: true });
  
  // 翻訳を適用
  await applyTranslations();
}

main().catch(console.error);