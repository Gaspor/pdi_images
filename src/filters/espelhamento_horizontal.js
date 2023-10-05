function espelharImagemHorizontal(imagemOriginal, width, height) {
  // Crie um novo array para os dados da imagem espelhada
  const dadosEspelhados = new Uint8ClampedArray(imagemOriginal.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Calcule o índice do pixel atual
      const indiceOriginal = (y * width + x) * 4;
      const indiceEspelhado = ((y + 1) * width - x - 1) * 4;

      // Copie os valores dos canais de cor e canal alfa
      for (let i = 0; i < 4; i++) {
        dadosEspelhados[indiceEspelhado + i] =
          imagemOriginal[indiceOriginal + i];
      }
    }
  }
  return dadosEspelhados;
}
