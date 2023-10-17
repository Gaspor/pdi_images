function modeFilter(imageData, windowSize) {
    const data = new Uint8ClampedArray(imageData.data);
  
    const width = imageData.width;
    const height = imageData.height;
  
    const halfWindowSize = Math.floor(windowSize / 2);
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const pixelIndex = (y * width + x) * 4;
        const redValues = {};
        const greenValues = {};
        const blueValues = {};
  
        for (let j = -halfWindowSize; j <= halfWindowSize; j++) {
          for (let i = -halfWindowSize; i <= halfWindowSize; i++) {
            const neighborX = x + i;
            const neighborY = y + j;
  
            if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
              const neighborIndex = (neighborY * width + neighborX) * 4;
  
              const red = data[neighborIndex];
              const green = data[neighborIndex + 1];
              const blue = data[neighborIndex + 2];
  
              redValues[red] = (redValues[red] || 0) + 1;
              greenValues[green] = (greenValues[green] || 0) + 1;
              blueValues[blue] = (blueValues[blue] || 0) + 1;
            }
          }
        }
  
        const modeRed = Object.keys(redValues).reduce((a, b) => (redValues[a] > redValues[b] ? a : b));
        const modeGreen = Object.keys(greenValues).reduce((a, b) => (greenValues[a] > greenValues[b] ? a : b));
        const modeBlue = Object.keys(blueValues).reduce((a, b) => (blueValues[a] > blueValues[b] ? a : b));
  
        data[pixelIndex] = Number(modeRed);
        data[pixelIndex + 1] = Number(modeGreen);
        data[pixelIndex + 2] = Number(modeBlue);
      }
    }
  
    return data;
  }
  