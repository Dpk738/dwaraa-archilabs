import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.join(process.cwd(), 'public', 'assets');

const tasks = [
  { name: 'logo.webp', resize: { width: 230, height: 196 }, quality: 80 },
  { name: 'apartment_interiors.webp', quality: 78 },
  { name: 'about_design.webp', resize: { width: 1586, height: 1586 }, quality: 78 },
  { name: 'hero_background.webp', quality: 78 },
  { name: 'block_renders.webp', quality: 80 },
  { name: 'vertex_kingston.webp', quality: 80 },
  { name: 'bedroom_renders.webp', quality: 80 },
  { name: 'bespoke_bedroom.webp', quality: 80 },
];

async function run() {
  console.log('Starting image optimization...');
  console.log('----------------------------------------------------');
  
  for (const task of tasks) {
    const filePath = path.join(assetsDir, task.name);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }
    
    const beforeStats = fs.statSync(filePath);
    const beforeSize = beforeStats.size;
    
    // Create a temporary file path for the optimized output
    const tempPath = path.join(assetsDir, `_temp_${task.name}`);
    
    // Read to buffer to avoid file locking on Windows
    const buffer = fs.readFileSync(filePath);
    let pipeline = sharp(buffer);
    if (task.resize) {
      pipeline = pipeline.resize(task.resize.width, task.resize.height);
    }
    
    pipeline = pipeline.webp({ quality: task.quality });
    
    await pipeline.toFile(tempPath);
    
    const afterStats = fs.statSync(tempPath);
    const afterSize = afterStats.size;
    
    // Replace original file with temporary file
    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);
    
    const savings = beforeSize - afterSize;
    const savingsPercent = ((savings / beforeSize) * 100).toFixed(2);
    
    console.log(`${task.name}:`);
    console.log(`  Before: ${(beforeSize / 1024).toFixed(2)} KB`);
    console.log(`  After:  ${(afterSize / 1024).toFixed(2)} KB`);
    console.log(`  Saved:  ${(savings / 1024).toFixed(2)} KB (${savingsPercent}%)`);
    console.log('----------------------------------------------------');
  }
  console.log('Image optimization complete!');
}

run().catch(console.error);
