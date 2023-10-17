function sobelFilter(imageData) {
    const data = new Uint8ClampedArray(imageData.data);
    const width = imageData.width;
    const height = imageData.height;
  
    // Kernel de Sobel para detecção de borda horizontal
    const kernelX = [
      -1, 0, 1,
      -2, 0, 2,
      -1, 0, 1,
    ];
  
    // Kernel de Sobel para detecção de borda vertical
    const kernelY = [
      -1, -2, -1,
       0,  0,  0,
       1,  2,  1,
    ];
  
    const sobelData = new Uint8ClampedArray(data.length);
  
    for (let i = 1; i < height - 1; i++) {
      for (let j = 1; j < width - 1; j++) {
        let sumX = 0;
        let sumY = 0;
  
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            const pixelIndex = ((i + k) * width + (j + l)) * 4;
            const kernelIndex = (k + 1) * 3 + (l + 1);
  
            sumX += data[pixelIndex] * kernelX[kernelIndex];
            sumY += data[pixelIndex] * kernelY[kernelIndex];
          }
        }
  
        const gradient = Math.sqrt(sumX * sumX + sumY * sumY);
  
        for (let c = 0; c < 3; c++) {
          const index = (i * width + j) * 4 + c;
          sobelData[index] = gradient;
        }
  
        sobelData[(i * width + j) * 4 + 3] = 255;
      }
    }
  
    return sobelData;
  }
  