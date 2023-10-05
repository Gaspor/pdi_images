function nearestNeighborResample(image, newWidth, newHeight, width, height) {
  // Cria uma matriz de pixels para a imagem ampliada
  const newImage = new Uint8ClampedArray(newWidth * newHeight * 4);

  // Percorre cada pixel da imagem original
  for (let x = 0; x < width; x += 4) {
    // Obtém o pixel original
    const originalPixel = image[x];

    // Copia o pixel original para a imagem ampliada
    newImage[newWidth + x]     = originalPixel[x];
    newImage[newWidth + x + 1] = originalPixel[x];
    newImage[newWidth + x + 2] = originalPixel[x];
    newImage[newWidth + x + 3] = originalPixel[x];
  }

  // Retorna a imagem ampliada
  return newImage;
}
