function nearestNeighborResample(data, scaleFactor, width, height) {
  const originalWidth = width;
  const originalHeight = height;
  const newWidth = originalWidth * scaleFactor;
  const newHeight = originalHeight * scaleFactor;

  const newData = new Uint8ClampedArray(newWidth * newHeight * 4);

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const originalX = Math.floor(x / scaleFactor);
      const originalY = Math.floor(y / scaleFactor);

      const newIndex = (y * newWidth + x) * 4;
      const originalIndex = (originalY * originalWidth + originalX) * 4;

      newData[newIndex] = data[originalIndex];
      newData[newIndex + 1] = data[originalIndex + 1];
      newData[newIndex + 2] = data[originalIndex + 2];
      newData[newIndex + 3] = data[originalIndex + 3];
    }
  }
  return newData;
}
