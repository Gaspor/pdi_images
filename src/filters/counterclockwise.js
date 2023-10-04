function counterclockwise(data, width, height) {
    let rotatedData = new Uint8ClampedArray(data.length);
  
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const origIndex = (y * width + x) * 4;
            const newIndex = ((width - x - 1) * height + y) * 4;
    
            rotatedData[newIndex] = data[origIndex];
            rotatedData[newIndex + 1] = data[origIndex + 1];
            rotatedData[newIndex + 2] = data[origIndex + 2];
            rotatedData[newIndex + 3] = data[origIndex + 3];
        }
    }
  
    return rotatedData;
}