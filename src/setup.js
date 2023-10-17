$("#filters").attr("disabled", "disabled");

$("#range_gamma").on("change", () => {
  $("#gamma_value").html($("#range_gamma").val() + "%");
  applyFilter();
});

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
  if ($("#filters").val() === "") return;

  $("#gamma").hide();
  $("#scale").hide();

  const file = document.querySelector("#input_image").files[0];

  // Verifica se tem uma imagem selecionada
  if (!file) {
    $("#filters").val("");
    $("#preview_message").html(`
        <h1>É necessário escolher uma imagem antes da aplicar um filtro!</h1>
    `);

    return;
  }

  const preview = document.querySelector("#output_image");
  const image = document.querySelector("#selected_image");
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  const originalWidth = image.width;
  const originalHeight = image.height;

  canvas.width = originalWidth;
  canvas.height = originalHeight;
  ctx.drawImage(image, 0, 0, originalWidth, originalHeight);

  scaleFactor = 1;

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
      $("#gamma").show();
      data = power(imageData.data, $("#range_gamma").val());
      break;

    case "square_root":
      $("#gamma").show();
      data = square_root(imageData.data, $("#range_gamma").val());
      break;

    case "clockwise":
      data = clockwise(imageData.data, image.width, image.height);
      break;

    case "counterclockwise":
      data = counterclockwise(imageData.data, image.width, image.height);
      break;

    case "180degrees":
      data = apply180degrees(imageData.data);
      break;

    case "horizontal_flip":
      data = espelharImagemHorizontal(
        imageData.data,
        image.width,
        image.height
      );
      break;

    case "vertical_flip":
      data = espelharImagemVertical(
        imageData.data,
        image.width,
        image.height
      );
      break;

    case "interpolation_pixel":
      $("#scale").show();
      scaleFactor = $("input[name='scale_factor']:checked").val();
      console.log(scaleFactor);
      data = nearestNeighborResample(imageData.data, scaleFactor, imageData.width, imageData.height);
      break;

    case "interpolation_bilinear":
      $("#scale").show();
      scaleFactor = $("input[name='scale_factor']:checked").val();
      console.log(scaleFactor);
      data = interpolation_bilinear(imageData.data, scaleFactor, imageData.width, imageData.height);
      break;

    case "expansion":
      $("#AandB").show();
      a = $("input[name='a_value']").val();
      b = $("input[name='b_value']").val();;
      data = expansion(imageData.data, a, b);
      break;

    case "compression":
      $("#AandB").show();
      a = $("input[name='a_value']").val();
      b = $("input[name='b_value']").val();;
      data = compression(imageData.data, a, b);
      break;

    case "average":
      data = averageFilter(imageData, 3);
      break;

    case "median":
      data = medianFilter(imageData, 3);
      break;

    case "mode":
      data = modeFilter(imageData, 3);
      break;

    case "high_boost":
      data = highBoostFilter(imageData, 3, 2.0);
      break;

    case "sobel":
      data = sobelFilter(imageData);
      break;

    case "laplacian":
      data = laplacianFilter(imageData);
      break;

    case "prewitt":
      data = prewittFilter(imageData);
      break;

    case "min":
      data = minFilter(imageData);
      break;

    case "max":
      data = maxFilter(imageData);
      break;

    default:
      break;
  }

  canvas.width = image.width * scaleFactor;
  canvas.height = image.height * scaleFactor;

  const imgData = new ImageData(data, originalWidth * scaleFactor, originalHeight * scaleFactor);
  ctx.putImageData(imgData, 0, 0);

  preview.width = originalWidth * scaleFactor;
  preview.height = originalHeight * scaleFactor;
  preview.src = canvas.toDataURL("image/bmp");
  $("#output_tools").show();
}

$("#filters").on("change", () => {
  applyFilter();
});

$("input[name='scale_factor']").on('change', () => {
  applyFilter();
});

$("input[name='a_value'], input[name='b_value']").on('change', () => {
  applyFilter();
});