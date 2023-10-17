function minFilter(imageData) {
    const data = new Uint8ClampedArray(imageData.data);
    const width = imageData.width;
    const height = imageData.height;
  
    const minData = new Uint8ClampedArray(data.length);
  
    function applyMin(i, j, offset) {
      let minR = 255;
      let minG = 255;
      let minB = 255;
  
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          const pixelIndex = ((i + k) * width + (j + l)) * 4;
          const r = data[pixelIndex];
          const g = data[pixelIndex + 1];
          const b = data[pixelIndex + 2];
  
          minR = Math.min(minR, r);
          minG = Math.min(minG, g);
          minB = Math.min(minB, b);
        }
      }
  
      minData[(i * width + j) * 4 + offset] = minR;
      minData[(i * width + j) * 4 + offset + 1] = minG;
      minData[(i * width + j) * 4 + offset + 2] = minB;
      minData[(i * width + j) * 4 + offset + 3] = 255;
    }
  
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        applyMin(i, j, 0); // Red component
        applyMin(i, j, 3); // Alpha component (transparency)
      }
    }
  
    return minData;
  }
  