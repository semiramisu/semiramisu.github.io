import sharp from 'sharp';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePWAIcons() {
  const sourceIcon = path.join(__dirname, 'public', 'icon.jpg');
  const outputDir = path.join(__dirname, 'public');
  
  try {
    // Check if source favicon exists
    await fs.access(sourceIcon);
    console.log('Source favicon found:', sourceIcon);
    
    // Generate 192x192 icon
    console.log('Generating 192x192 icon...');
    await sharp(sourceIcon)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-192x192.png'));
    console.log('✓ Generated favicon-192x192.png');
    
    // Generate 512x512 icon
    console.log('Generating 512x512 icon...');
    await sharp(sourceIcon)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-512x512.png'));
    console.log('✓ Generated favicon-512x512.png');
    
    console.log('\nPWA icons generated successfully!');
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('Error: Source favicon not found at', sourceIcon);
      console.error('Please ensure icon.jpg exists in the public directory.');
    } else {
      console.error('Error generating PWA icons:', error.message);
    }
    process.exit(1);
  }
}

// Run the script
generatePWAIcons();