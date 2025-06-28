#!/usr/bin/env node

/**
 * 既存の画像を一括で最適化するスクリプト
 * 初回セットアップ時や、手動で実行したい時に使用
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

const CONFIG = {
  webpQuality: 85,
  jpegQuality: 85,
  pngCompressionLevel: 9,
  patterns: [
    'public/**/*.{jpg,jpeg,png}',
    'src/assets/**/*.{jpg,jpeg,png}',
    'src/contents/**/*.{jpg,jpeg,png}',
    '!**/optimized/**',
    '!**/node_modules/**'
  ]
};

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function getImageStats(imagePath) {
  const stats = await fs.stat(imagePath);
  const metadata = await sharp(imagePath).metadata();
  return {
    size: stats.size,
    width: metadata.width,
    height: metadata.height,
    format: metadata.format
  };
}

async function optimizeImage(inputPath, options = {}) {
  const dir = path.dirname(inputPath);
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();
  
  const outputDir = path.join(dir, 'optimized');
  await ensureDir(outputDir);
  
  const results = {
    original: inputPath,
    optimized: []
  };
  
  try {
    // オリジナルの情報を取得
    const originalStats = await getImageStats(inputPath);
    results.originalSize = originalStats.size;
    results.dimensions = `${originalStats.width}x${originalStats.height}`;
    
    // WebP版を作成
    const webpPath = path.join(outputDir, `${filename}.webp`);
    await sharp(inputPath)
      .webp({ quality: CONFIG.webpQuality })
      .toFile(webpPath);
    
    const webpStats = await getImageStats(webpPath);
    results.optimized.push({
      path: webpPath,
      format: 'webp',
      size: webpStats.size,
      reduction: ((1 - webpStats.size / originalStats.size) * 100).toFixed(1) + '%'
    });
    
    // オリジナル形式も最適化
    let optimizedPath;
    if (ext === '.jpg' || ext === '.jpeg') {
      optimizedPath = path.join(outputDir, `${filename}.jpg`);
      await sharp(inputPath)
        .jpeg({ 
          quality: CONFIG.jpegQuality, 
          progressive: true,
          mozjpeg: true 
        })
        .toFile(optimizedPath);
    } else if (ext === '.png') {
      optimizedPath = path.join(outputDir, `${filename}.png`);
      await sharp(inputPath)
        .png({ 
          compressionLevel: CONFIG.pngCompressionLevel,
          palette: true
        })
        .toFile(optimizedPath);
    }
    
    if (optimizedPath) {
      const optimizedStats = await getImageStats(optimizedPath);
      results.optimized.push({
        path: optimizedPath,
        format: ext.slice(1),
        size: optimizedStats.size,
        reduction: ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1) + '%'
      });
    }
    
    // レスポンシブ画像も生成（オプション）
    if (options.responsive) {
      const sizes = [400, 800, 1200, 1600];
      for (const size of sizes) {
        if (originalStats.width >= size) {
          const responsivePath = path.join(outputDir, `${filename}-${size}w.webp`);
          await sharp(inputPath)
            .resize(size, null, { withoutEnlargement: true })
            .webp({ quality: CONFIG.webpQuality })
            .toFile(responsivePath);
          
          const responsiveStats = await fs.stat(responsivePath);
          results.optimized.push({
            path: responsivePath,
            format: `webp-${size}w`,
            size: responsiveStats.size,
            reduction: ((1 - responsiveStats.size / originalStats.size) * 100).toFixed(1) + '%'
          });
        }
      }
    }
    
  } catch (error) {
    results.error = error.message;
  }
  
  return results;
}

async function main() {
  console.log('🖼️  画像最適化を開始します...\n');
  
  // コマンドライン引数をチェック
  const args = process.argv.slice(2);
  const responsive = args.includes('--responsive');
  
  // 画像ファイルを検索
  const files = await glob(CONFIG.patterns);
  
  if (files.length === 0) {
    console.log('最適化する画像が見つかりませんでした。');
    return;
  }
  
  console.log(`${files.length} 個の画像ファイルが見つかりました。\n`);
  
  const results = [];
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  // 各画像を処理
  for (const file of files) {
    const result = await optimizeImage(file, { responsive });
    results.push(result);
    
    if (!result.error) {
      totalOriginalSize += result.originalSize;
      
      // WebP版のサイズを合計に追加
      const webpResult = result.optimized.find(opt => opt.format === 'webp');
      if (webpResult) {
        totalOptimizedSize += webpResult.size;
      }
      
      console.log(`✅ ${file}`);
      console.log(`   元のサイズ: ${(result.originalSize / 1024 / 1024).toFixed(2)} MB`);
      result.optimized.forEach(opt => {
        console.log(`   ${opt.format}: ${(opt.size / 1024 / 1024).toFixed(2)} MB (${opt.reduction} 削減)`);
      });
      console.log('');
    } else {
      console.log(`❌ ${file}: ${result.error}\n`);
    }
  }
  
  // サマリーを表示
  console.log('='.repeat(60));
  console.log('📊 最適化結果サマリー');
  console.log('='.repeat(60));
  console.log(`処理した画像数: ${results.filter(r => !r.error).length}/${files.length}`);
  console.log(`元の合計サイズ: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`最適化後の合計サイズ: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`合計削減率: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
  
  if (responsive) {
    console.log('\n※ レスポンシブ画像も生成しました');
  }
}

// エラーハンドリング
process.on('unhandledRejection', (error) => {
  console.error('エラーが発生しました:', error);
  process.exit(1);
});

// 実行
main().catch(console.error);