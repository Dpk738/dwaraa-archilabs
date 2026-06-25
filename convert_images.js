import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'public', 'assets');

async function convertPngToWebp() {
  try {
    const files = fs.readdirSync(assetsDir);
    console.log(`Found files: ${files.join(', ')}`);
    for (const file of files) {
      if (path.extname(file).toLowerCase() === '.png') {
        const filePath = path.join(assetsDir, file);
        const webpPath = path.join(assetsDir, path.basename(file, '.png') + '.webp');
        
        console.log(`Converting ${file} to webp...`);
        await sharp(filePath)
          .webp({ quality: 85 })
          .toFile(webpPath);
        console.log(`Saved ${webpPath}`);
      }
    }
    console.log('Conversion complete!');
  } catch (error) {
    console.error('Error during conversion:', error);
    process.exit(1);
  }
}

convertPngToWebp();
