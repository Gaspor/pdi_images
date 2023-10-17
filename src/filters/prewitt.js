function prewittFilter(imageData) {
    const data = new Uint8ClampedArray(imageData.data);
    const width = imageData.width;
    const height = imageData.height;
  
    // Kernels do filtro Prewitt para detecção de bordas na horizontal e vertical
    const horizontalKernel = [
      -1, 0, 1,
      -1, 0, 1,
      -1, 0, 1,
    ];
  
    const verticalKernel = [
      -1, -1, -1,
       0,  0,  0,
       1,  1,  1,
    ];
  
    const prewittData = new Uint8ClampedArray(data.length);
  
    function applyKernel(kernel, offset) {
      for (let i = 1; i < height - 1; i++) {
        for (let j = 1; j < width - 1; j++) {
          let sumX = 0;
          let sumY = 0;
  
          for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
              const pixelIndex = ((i + k) * width + (j + l)) * 4;
              const kernelIndex = (k + 1) * 3 + (l + 1);
  
              sumX += data[pixelIndex] * kernel[kernelIndex];
              sumY += data[pixelIndex] * kernel[kernelIndex];
            }
          }
  
          for (let c = 0; c < 3; c++) {
            const index = (i * width + j) * 4 + c;
            const gradientMagnitude = Math.sqrt(sumX ** 2 + sumY ** 2);
  
            prewittData[index + offset] = gradientMagnitude;
          }
  
          prewittData[(i * width + j) * 4 + 3] = 255;
        }
      }
    }
  
    applyKernel(horizontalKernel, 0); 
    applyKernel(verticalKernel, 1);   
  
    return prewittData;
  }
  