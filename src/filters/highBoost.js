function highBoostFilter(imageData, kernelSize, boostFactor) {
    const data = new Uint8ClampedArray(imageData.data);
  
    const width = imageData.width;
    const height = imageData.height;
    const halfKernelSize = Math.floor(kernelSize / 2);
  
    const originalData = new Uint8ClampedArray(imageData.data);
    const blurredData = applyGaussianBlur(imageData, kernelSize);
  
    for (let i = 0; i < data.length; i++) {
      const pixelValue = originalData[i] - blurredData[i];
      data[i] = clamp(originalData[i] + boostFactor * pixelValue, 0, 255);
    }
  
    return data;
  }
  
  function applyGaussianBlur(imageData, kernelSize) {
    //implementar função
  }
  
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  