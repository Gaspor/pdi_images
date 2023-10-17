function sobelFilter(imageData) {
  // Cria uma cópia dos dados da imagem original
  const data = new Uint8ClampedArray(imageData.data);
  const width = imageData.width;
  const height = imageData.height;

  // Kernel de Sobel para detecção de borda horizontal
  const kernelX = [
      -1, 0, 1,
      -2, 0, 2,
      -1, 0, 1,
  ];

  // Kernel de Sobel para detecção de borda vertical
  const kernelY = [
      -1, -2, -1,
      0,  0,  0,
      1,  2,  1,
  ];

  // Cria um novo array para armazenar os dados da imagem após o filtro de Sobel
  const sobelData = new Uint8ClampedArray(data.length);

  // Loop pelos pixels da imagem, excluindo as bordas (uma linha e uma coluna em cada extremidade)
  for (let i = 1; i < height - 1; i++) {
      for (let j = 1; j < width - 1; j++) {
          let sumX = 0;
          let sumY = 0;

          // Aplica o filtro de Sobel a cada pixel
          for (let k = -1; k <= 1; k++) {
              for (let l = -1; l <= 1; l++) {
                  // Calcula o índice do pixel na vizinhança
                  const pixelIndex = ((i + k) * width + (j + l)) * 4;
                  // Calcula o índice correspondente no kernel de Sobel
                  const kernelIndex = (k + 1) * 3 + (l + 1);

                  // Realiza a convolução com os kernels X e Y
                  sumX += data[pixelIndex] * kernelX[kernelIndex];
                  sumY += data[pixelIndex] * kernelY[kernelIndex];
              }
          }

          // Calcula o módulo do gradiente usando as respostas dos kernels X e Y
          const gradient = Math.sqrt(sumX * sumX + sumY * sumY);

          // Define o valor do gradiente para cada canal de cor (R, G, B)
          for (let c = 0; c < 3; c++) {
              const index = (i * width + j) * 4 + c;
              sobelData[index] = gradient;
          }

          // Define o valor do canal alfa (A) como 255 para o pixel
          sobelData[(i * width + j) * 4 + 3] = 255;
      }
  }

  // Retorna o novo array de dados após o filtro de Sobel
  return sobelData;
}
