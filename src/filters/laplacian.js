function laplacianFilter(imageData) {
    const data = new Uint8ClampedArray(imageData.data);
    const width = imageData.width;
    const height = imageData.height;
  
    // Kernel do filtro Laplaciano
    const kernel = [
      -1, -1, -1,
      -1,  8, -1,
      -1, -1, -1,
    ];
  
    const laplacianData = new Uint8ClampedArray(data.length);
  
    for (let i = 1; i < height - 1; i++) {
      for (let j = 1; j < width - 1; j++) {
        let sum = 0;
  
        for (let k = -1; k <= 1; k++) {
          for (let l = -1; l <= 1; l++) {
            const pixelIndex = ((i + k) * width + (j + l)) * 4;
            const kernelIndex = (k + 1) * 3 + (l + 1);
  
            sum += data[pixelIndex] * kernel[kernelIndex];
          }
        }
  
        for (let c = 0; c < 3; c++) {
          const index = (i * width + j) * 4 + c;
          laplacianData[index] = data[index] + sum;
        }
  
        laplacianData[(i * width + j) * 4 + 3] = 255;
      }
    }
  
    return laplacianData;
  }
  