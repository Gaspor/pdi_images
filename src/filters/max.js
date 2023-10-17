function maxFilter(imageData) {
    const data = new Uint8ClampedArray(imageData.data);
    const width = imageData.width;
    const height = imageData.height;
  
    const maxData = new Uint8ClampedArray(data.length);
  
    function applyMax(i, j, offset) {
      let maxR = 0;
      let maxG = 0;
      let maxB = 0;
  
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          const pixelIndex = ((i + k) * width + (j + l)) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
  
          maxR = Math.max(maxR, r);
          maxG = Math.max(maxG, g);
          maxB = Math.max(maxB, b);
        }
      }
  
      maxData[(i * width + j) * 4 + offset] = maxR;
      maxData[(i * width + j) * 4 + offset + 1] = maxG;
      maxData[(i * width + j) * 4 + offset + 2] = maxB;
      maxData[(i * width + j) * 4 + offset + 3] = 255;
    }
  
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        applyMax(i, j, 0); // Red component
        applyMax(i, j, 3); // Alpha component (transparency)
      }
    }
  
    return maxData;
  }
  