import sharp from 'sharp';

async function mapIcon() {
  const srcPath = 'src/assets/logo.png';
  const { data: trimmedData, info: trimmedInfo } = await sharp(srcPath)
    .trim()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  let w = trimmedInfo.width;
  let h = trimmedInfo.height;
  let gapX = 0;
  
  // Channels: RGBA = 4 bytes per pixel
  for (let x = 0; x < w; x++) {
    let hasPixel = false;
    for (let y = 0; y < h; y++) {
      let alphaIdx = (y * w + x) * trimmedInfo.channels + 3; // alpha channel
      if (trimmedData[alphaIdx] > 0) {
        hasPixel = true;
        break;
      }
    }
    if (!hasPixel) {
      if (x > 10) { // we found a gap after some pixels
        gapX = x;
        console.log(`Gap found at x=${x}`);
        break;
      }
    }
  }
  
  if (!gapX) {
      gapX = h; // fallback to square
  }
  
  // let's crop that part
  await sharp(srcPath)
    .trim()
    .extract({ left: 0, top: 0, width: gapX, height: h })
    // wait, extract creates a non-square if gapX != h. Let's make it square with padding
    .extend({
      top: gapX > h ? Math.floor((gapX-h)/2) : 0,
      bottom: gapX > h ? Math.ceil((gapX-h)/2) : 0,
      left: h > gapX ? Math.floor((h-gapX)/2) : 0,
      right: h > gapX ? Math.ceil((h-gapX)/2) : 0,
      background: { r:0, g:0, b:0, alpha:0 }
    })
    .toFile('public/favicon.png');
    
  console.log(`Extracted icon with width ${gapX} and height ${h}`);
}

mapIcon();
