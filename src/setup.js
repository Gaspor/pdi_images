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
  if ($("#filters").val() == "") return;

  $("#gamma").hide();

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

    case "interpolation":
      canvas.width = image.width * 2;
      canvas.height = image.height * 2;

      ctx.drawImage(image, 0, 0);
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      image.width = image.width * 2;
      image.height = image.height;

      data = nearestNeighborResample(
        imageData.data,
        image.width,
        image.height,
        imageData.width,
        imageData.height
      );
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

    default:
      break;
  }

  console.log(image.width, image.height);
  console.log(data);

  const imgData = new ImageData(data, image.width, image.height);
  ctx.putImageData(imgData, 0, 0);

  preview.src = canvas.toDataURL("image/bmp");
  $("#output_tools").show();
}

$("#filters").on("change", () => {
  applyFilter();
});
