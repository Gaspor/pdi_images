function medianFilter(imageData, windowSize) {
    const data = new Uint8ClampedArray(imageData.data);
  
    const width = imageData.width;
    const height = imageData.height;
  
    const halfWindowSize = Math.floor(windowSize / 2);
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelIndex = (y * width + x) * 4;
        const redValues = [];
        const greenValues = [];
        const blueValues = [];
  
        for (let j = -halfWindowSize; j <= halfWindowSize; j++) {
          for (let i = -halfWindowSize; i <= halfWindowSize; i++) {
            const neighborX = x + i;
            const neighborY = y + j;
  
            if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
              const neighborIndex = (neighborY * width + neighborX) * 4;
  
              redValues.push(data[neighborIndex]);
              greenValues.push(data[neighborIndex + 1]);
              blueValues.push(data[neighborIndex + 2]);
            }
          }
        }
  
        redValues.sort((a, b) => a - b);
        greenValues.sort((a, b) => a - b);
        blueValues.sort((a, b) => a - b);
  
        const medianIndex = Math.floor(redValues.length / 2);
  
        data[pixelIndex] = redValues[medianIndex];
        data[pixelIndex + 1] = greenValues[medianIndex];
        data[pixelIndex + 2] = blueValues[medianIndex];
      }
    }
  
    return data;
  }
  