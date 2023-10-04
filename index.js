$("#filters").attr("disabled", "disabled");
$("#input_image").on("change", () => {
  $("#filters").attr("disabled", "disabled");
  $("#output_image").attr("src", "");
  $("#output_tools").hide();
  $("#input_tools").hide();

  const preview = document.querySelector("#selected_image");
  const file = document.querySelector("#input_image").files[0];

  if (!file) $("#filters").val("");
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  };

  if (file) {
    $("#preview_message").html(``);
    $("#input_tools").show();
    $("#filters").removeAttr("disabled");
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
});

// Função para aplicar os filtros na imagem e exibir para o usuário
function applyFilter() {
  const file = document.querySelector("#input_image").files[0];

  // Verifica se tem uma imagem selecionada
  if (!file) {
    $("#filters").val("");
    $("#preview_message").html(`
            <h1>É necessário escolher uma imagem antes da aplica um filtro!</h1>
        `);

    return;
  }

  const preview = document.querySelector("#output_image");
  const image = document.querySelector("#selected_image");
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);

  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data;

  switch ($("#filters").val()) {
    case "negative":
      data = negative(imageData.data);
      break;

    case "log":
      data = log(imageData.data);
      break;

    case "inverse_log":
      data = inverse_log(imageData.data);
      break;

    case "power":
      data = power(imageData.data, 0.1);
      break;

    case "clockwise":
      data = clockwise(imageData.data, image.width, image.height);
      break;

    default:
      break;
  }

  const imgData = new ImageData(data, image.width, image.height);
  ctx.putImageData(imgData, 0, 0);

  preview.src = canvas.toDataURL("image/bmp");
  $("#output_tools").show();
}

$("#filters").on("change", () => {
  applyFilter();
});

function negative(data) {
  for (var i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }

  return data;
}

function log(data) {
  // Revisar
  const intensity = 0.1;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    data[i] = Math.log(1 + r) * intensity;
    data[i + 1] = Math.log(1 + g) * intensity;
    data[i + 2] = Math.log(1 + b) * intensity;
  }

  return data;
}

function inverse_log(data) {
  // Revisar
  const intensity = 1;
  for (let i = 0; i < data.length; i += 4) {
    // Separa os componentes R, G, B e A do pixel
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Aplica o logaritmo inverso ao valor de cada canal de cor (R, G, B)
    data[i] = Math.exp((r / 255) * intensity) * 255;
    data[i + 1] = Math.exp((g / 255) * intensity) * 255;
    data[i + 2] = Math.exp((b / 255) * intensity) * 255;
  }

  return data;
}

function power(data, gamma) {
  for (let i = 0; i < data.length; i += 4) {
    // Separa os componentes R, G, B e A do pixel
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Aplica o filtro de potência a cada canal de cor (R, G, B)
    data[i] = Math.pow(r / 255, gamma) * 255;
    data[i + 1] = Math.pow(g / 255, gamma) * 255;
    data[i + 2] = Math.pow(b / 255, gamma) * 255;
  }

  return data;
}

const reshape = (arr, rows, cols) => {
  const result = new Array(rows);
  for (let row = 0; row < rows; row++) {
    result[row] = new Array(cols);
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      result[row][col] = arr[row * cols + col];
    }
  }
  return result;
};

function clockwise(data, width, height) {
  const newData = reshape(data, width, height);

  return rotatedData;
}

//Negativo e Potência feitos