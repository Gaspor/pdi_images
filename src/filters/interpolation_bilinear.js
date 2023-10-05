function interpolation_bilinear(data, scaleFactor, width, height) {
    const originalWidth = width;
    const originalHeight = height;
    const newWidth = Math.floor(originalWidth * scaleFactor);
    const newHeight = Math.floor(originalHeight * scaleFactor);

    const newData = new Uint8ClampedArray(newWidth * newHeight * 4);

    for (let y = 0; y < newHeight; y++) {
        for (let x = 0; x < newWidth; x++) {
        const originalX = x / scaleFactor;
        const originalY = y / scaleFactor;

        const x0 = Math.floor(originalX);
        const x1 = Math.min(x0 + 1, originalWidth - 1);
        const y0 = Math.floor(originalY);
        const y1 = Math.min(y0 + 1, originalHeight - 1);

        const tX = originalX - x0;
        const tY = originalY - y0;

        const topLeftIndex = (y0 * originalWidth + x0) * 4;
        const topRightIndex = (y0 * originalWidth + x1) * 4;
        const bottomLeftIndex = (y1 * originalWidth + x0) * 4;
        const bottomRightIndex = (y1 * originalWidth + x1) * 4;

        for (let c = 0; c < 4; c++) {
            // Interpolação bilinear para cada canal de cor (R, G, B, A)
            const top = data[topLeftIndex + c] * (1 - tX) + data[topRightIndex + c] * tX;
            const bottom = data[bottomLeftIndex + c] * (1 - tX) + data[bottomRightIndex + c] * tX;
            newData[(y * newWidth + x) * 4 + c] = top * (1 - tY) + bottom * tY;
        }
        }
    }
    
    return newData;
}