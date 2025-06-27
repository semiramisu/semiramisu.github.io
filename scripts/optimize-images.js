import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const outputDir = path.join(__dirname, '..', 'public', 'optimized');

// 出力ディレクトリを作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 画像ファイルのリスト
const images = [
  'IMG_3258.jpg',
  'IMG_4018.jpg',
  'IMG_4033.JPG',
  'IMG_4035.JPG',
  'IMG_4345.jpg'
];

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const baseName = path.parse(filename).name;
  
  console.log(`Processing ${filename}...`);
  
  try {
    // オリジナル画像の情報を取得
    const metadata = await sharp(inputPath).metadata();
    console.log(`Original: ${metadata.width}x${metadata.height}, ${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(2)}MB`);
    
    // デスクトップ用（最大1920px幅、品質85%）
    await sharp(inputPath)
      .resize(1920, null, { withoutEnlargement: true })
      .jpeg({ quality: 85, progressive: true })
      .toFile(path.join(outputDir, `${baseName}-desktop.jpg`));
    
    // タブレット用（最大1024px幅、品質80%）
    await sharp(inputPath)
      .resize(1024, null, { withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true })
      .toFile(path.join(outputDir, `${baseName}-tablet.jpg`));
    
    // モバイル用（最大640px幅、品質75%）
    await sharp(inputPath)
      .resize(640, null, { withoutEnlargement: true })
      .jpeg({ quality: 75, progressive: true })
      .toFile(path.join(outputDir, `${baseName}-mobile.jpg`));
    
    // WebP形式も生成（モダンブラウザ用）
    await sharp(inputPath)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(outputDir, `${baseName}.webp`));
    
    // モバイル用WebP
    await sharp(inputPath)
      .resize(640, null, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(path.join(outputDir, `${baseName}-mobile.webp`));
    
    console.log(`✓ ${filename} optimized successfully`);
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

// すべての画像を処理
async function processAllImages() {
  for (const image of images) {
    await optimizeImage(image);
  }
  
  // 最適化後のファイルサイズを表示
  console.log('\n=== Optimization Results ===');
  const files = fs.readdirSync(outputDir);
  files.forEach(file => {
    const size = fs.statSync(path.join(outputDir, file)).size;
    console.log(`${file}: ${(size / 1024).toFixed(2)}KB`);
  });
}

processAllImages();