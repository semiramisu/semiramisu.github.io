/**
 * デフォルトのOGP画像を生成するスクリプト
 * 
 * 使用方法:
 * node scripts/create-ogp-images.js
 */

import { createCanvas, registerFont } from 'canvas';
import fs from 'fs/promises';
import path from 'path';

// カスタムフォントを登録する場合（オプション）
// registerFont('path/to/font.ttf', { family: 'CustomFont' });

/**
 * OGP画像を生成
 * @param {Object} options - 画像生成オプション
 * @returns {Buffer} - PNG画像のバッファ
 */
function createOGPImage(options) {
  const {
    title = 'セミラミスの庭',
    subtitle = '日々の発見と思いを綴る、知識と経験の交差点',
    bgColor = '#667eea',
    bgColor2 = '#764ba2',
    textColor = '#ffffff',
    width = 1200,
    height = 630
  } = options;

  // キャンバスを作成
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // グラデーション背景
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, bgColor);
  gradient.addColorStop(1, bgColor2);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 装飾的な円を追加
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = textColor;
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.2, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width * 0.2, height * 0.8, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // タイトル
  ctx.fillStyle = textColor;
  ctx.font = 'bold 72px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // タイトルを複数行で表示（長い場合）
  const maxWidth = width * 0.8;
  const titleLines = wrapText(ctx, title, maxWidth);
  const lineHeight = 90;
  const startY = height / 2 - (titleLines.length * lineHeight) / 2;
  
  titleLines.forEach((line, index) => {
    ctx.fillText(line, width / 2, startY + index * lineHeight);
  });

  // サブタイトル
  if (subtitle) {
    ctx.font = '32px sans-serif';
    ctx.fillStyle = textColor;
    ctx.globalAlpha = 0.8;
    ctx.fillText(subtitle, width / 2, height - 100);
    ctx.globalAlpha = 1;
  }

  // ブログ名を右下に
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillStyle = textColor;
  ctx.globalAlpha = 0.6;
  ctx.fillText('semiramisu.github.io', width - 40, height - 40);

  return canvas.toBuffer('image/png');
}

/**
 * テキストを折り返し
 */
function wrapText(ctx, text, maxWidth) {
  const words = text.split('');
  const lines = [];
  let currentLine = '';

  for (const char of words) {
    const testLine = currentLine + char;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

// メイン処理
async function main() {
  const publicDir = path.join(process.cwd(), 'public');
  
  // デフォルトのOGP画像
  const defaultImage = createOGPImage({
    title: 'セミラミスの庭',
    subtitle: '日々の発見と思いを綴る、知識と経験の交差点'
  });
  
  await fs.writeFile(
    path.join(publicDir, 'ogp-default.png'),
    defaultImage
  );
  
  console.log('✅ Created: ogp-default.png');

  // 記事用のデフォルトOGP画像
  const postImage = createOGPImage({
    title: 'Blog Post',
    subtitle: 'セミラミスの庭',
    bgColor: '#764ba2',
    bgColor2 = '#667eea'
  });
  
  await fs.writeFile(
    path.join(publicDir, 'ogp-default-post.png'),
    postImage
  );
  
  console.log('✅ Created: ogp-default-post.png');
}

// エラーハンドリング
main().catch(error => {
  console.error('❌ Error creating OGP images:', error);
  process.exit(1);
});