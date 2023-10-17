function averageFilter(imageData, windowSize) {
    const data = new Uint8ClampedArray(imageData.data);
  
    const width = imageData.width;
    const height = imageData.height;
  
    const halfWindowSize = Math.floor(windowSize / 2);
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelIndex = (y * width + x) * 4;
        let sumRed = 0;
        let sumGreen = 0;
        let sumBlue = 0;
  
        for (let j = -halfWindowSize; j <= halfWindowSize; j++) {
          for (let i = -halfWindowSize; i <= halfWindowSize; i++) {
            const neighborX = x + i;
            const neighborY = y + j;
  
            if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
              const neighborIndex = (neighborY * width + neighborX) * 4;
  
              sumRed += data[neighborIndex];
              sumGreen += data[neighborIndex + 1];
              sumBlue += data[neighborIndex + 2];
            }
          }
        }
  
        const numNeighbors = (2 * halfWindowSize + 1) * (2 * halfWindowSize + 1);
        data[pixelIndex] = sumRed / numNeighbors;
        data[pixelIndex + 1] = sumGreen / numNeighbors;
        data[pixelIndex + 2] = sumBlue / numNeighbors;
      }
    }
  
    return data;
  }
  