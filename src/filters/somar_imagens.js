function somarImagens() {
  const imagem1Input = document.getElementById("imagem1");
  const imagem2Input = document.getElementById("imagem2");
  const porcentagemInput = document.getElementById("porcentagem");
  const resultadoCanvas = document.getElementById("resultado");

  const porcentagem = parseFloat(porcentagemInput.value) / 100;

  if (imagem1Input.files.length > 0 && imagem2Input.files.length > 0) {
    const imagem1 = new Image();
    const imagem2 = new Image();

    imagem1.onload = function () {
      imagem2.onload = function () {
        const largura = imagem1.width;
        const altura = imagem1.height;

        resultadoCanvas.width = largura;
        resultadoCanvas.height = altura;
        const contexto = resultadoCanvas.getContext("2d");

        contexto.drawImage(imagem1, 0, 0, largura, altura);

        const imagemData1 = contexto.getImageData(0, 0, largura, altura);
        const imagemData2 =
          imagem2.width === largura && imagem2.height === altura
            ? contexto.getImageData(0, 0, largura, altura)
            : contexto.createImageData(largura, altura);

        const pixels1 = imagemData1.data;
        const pixels2 = imagemData2.data;

        for (let i = 0; i < pixels1.length; i += 4) {
          for (let j = 0; j < 3; j++) {
            pixels1[i + j] =
              pixels1[i + j] * (1 - porcentagem) + pixels2[i + j] * porcentagem;
          }
        }

        contexto.putImageData(imagemData1, 0, 0);
        contexto.globalAlpha = 1;
        contexto.drawImage(imagem2, 0, 0, largura, altura);

        resultadoCanvas.style.display = "block";
      };

      imagem2.src = URL.createObjectURL(imagem2Input.files[0]);
    };

    imagem1.src = URL.createObjectURL(imagem1Input.files[0]);
  }
}


/* 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Somar Duas Imagens</title>
</head>
<body>
    <h2>Imagem 1:</h2>
    <input type="file" id="imagem1" accept="image/*"><br>

    <h2>Imagem 2:</h2>
    <input type="file" id="imagem2" accept="image/*"><br>

    <h2>Porcentagem de Mistura:</h2>
    <input type="range" id="porcentagem" min="0" max="100" step="1" value="50"><br>

    <button onclick="somarImagens()">Somar Imagens</button>

    <h2>Resultado:</h2>
    <canvas id="resultado"></canvas>

    <script src="script.js"></script>
</body>
</html>

*/