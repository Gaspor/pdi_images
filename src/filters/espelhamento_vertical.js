function espelharImagemVertical(imagemOriginal, width, height) {

  // Crie um novo array para os dados da imagem espelhada verticalmente
  const dadosEspelhados = new Uint8ClampedArray(imagemOriginal.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Calcule o índice do pixel original
      const indiceOriginal = (y * width + x) * 4;
      // Calcule o índice do pixel espelhado verticalmente
      const indiceEspelhado = ((height - y - 1) * width + x) * 4;

      // Copie os valores dos canais de cor e canal alfa
      for (let i = 0; i < 4; i++) {
        dadosEspelhados[indiceEspelhado + i] = imagemOriginal[indiceOriginal + i];
      }
    }
  }
  return dadosEspelhados;
}
