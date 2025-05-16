#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');
const chalk = require('chalk');

// 投稿ディレクトリのパス
const POSTS_DIR = path.join(__dirname, '../src/contents/posts');

// 必須フィールド
const REQUIRED_FIELDS = ['title', 'published', 'description', 'tags', 'category'];

// 既存のカテゴリーを収集する関数
function collectExistingCategories() {
  const files = glob.sync(`${POSTS_DIR}/*.md`);
  const categories = new Set();
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const { data } = matter(content);
      if (data.category) {
        categories.add(data.category.trim());
      }
    } catch (error) {
      // エラーを無視して続行
    }
  });
  
  return categories;
}

// フロントマターをチェックして修正する関数
function checkAndFixFrontmatter(filePath, existingCategories, dryRun = true) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdown, isEmpty } = matter(content);
    
    if (isEmpty) {
      console.log(chalk.red(`[エラー] ${path.basename(filePath)}: フロントマターが空です`));
      return false;
    }
    
    let hasChanges = false;
    let hasErrors = false;
    
    // 必須フィールドの確認
    REQUIRED_FIELDS.forEach(field => {
      if (!data[field]) {
        console.log(chalk.red(`[エラー] ${path.basename(filePath)}: ${field} が欠けています`));
        hasErrors = true;
      }
    });
    
    // タグのチェック
    if (data.tags) {
      if (!Array.isArray(data.tags)) {
        console.log(chalk.red(`[エラー] ${path.basename(filePath)}: tags は配列であるべきです`));
        hasErrors = true;
      } else if (data.tags.length === 0) {
        console.log(chalk.yellow(`[警告] ${path.basename(filePath)}: タグが設定されていません`));
      }
    }
    
    // カテゴリーのチェックと修正
    if (data.category) {
      const trimmedCategory = data.category.trim();
      if (data.category !== trimmedCategory) {
        console.log(chalk.yellow(`[修正] ${path.basename(filePath)}: カテゴリー「${data.category}」を「${trimmedCategory}」に修正します`));
        data.category = trimmedCategory;
        hasChanges = true;
      }
      
      // 既存のカテゴリーとの一致を確認
      const closestCategory = findClosestCategory(trimmedCategory, existingCategories);
      if (closestCategory && closestCategory !== trimmedCategory) {
        console.log(chalk.yellow(`[提案] ${path.basename(filePath)}: カテゴリー「${trimmedCategory}」は「${closestCategory}」に近いです`));
      }
    }
    
    // 修正があり、dryRunでない場合は保存
    if (hasChanges && !dryRun) {
      const newContent = matter.stringify(markdown, data);
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(chalk.green(`[保存] ${path.basename(filePath)}: 修正を保存しました`));
    }
    
    return !hasErrors;
  } catch (error) {
    console.log(chalk.red(`[エラー] ${path.basename(filePath)}: ${error.message}`));
    return false;
  }
}

// 類似するカテゴリーを見つける関数
function findClosestCategory(category, existingCategories) {
  // カテゴリーが完全一致する場合はそのまま
  if (existingCategories.has(category)) {
    return category;
  }
  
  // 小文字で比較
  const lowerCategory = category.toLowerCase();
  for (const existing of existingCategories) {
    if (existing.toLowerCase() === lowerCategory) {
      return existing;
    }
  }
  
  return null;
}

// メイン実行部分
async function main() {
  try {
    const args = process.argv.slice(2);
    const dryRun = !args.includes('--fix');
    
    if (dryRun) {
      console.log(chalk.blue('ドライラン実行中です。実際に変更するには --fix オプションを付けてください。'));
    } else {
      console.log(chalk.blue('修正モードで実行中です。変更が保存されます。'));
    }
    
    // 既存のカテゴリーを収集
    const existingCategories = collectExistingCategories();
    console.log(chalk.blue(`既存のカテゴリー: ${Array.from(existingCategories).join(', ')}`));
    
    // 全ファイルをチェック
    const files = glob.sync(`${POSTS_DIR}/*.md`);
    let errorCount = 0;
    
    for (const file of files) {
      const isValid = checkAndFixFrontmatter(file, existingCategories, dryRun);
      if (!isValid) {
        errorCount++;
      }
    }
    
    if (errorCount > 0) {
      console.log(chalk.red(`${errorCount} ファイルにエラーがあります。`));
      process.exit(1);
    } else {
      console.log(chalk.green('全てのブログ記事が正常です！'));
    }
  } catch (error) {
    console.error(chalk.red(`実行エラー: ${error.message}`));
    process.exit(1);
  }
}

main(); 