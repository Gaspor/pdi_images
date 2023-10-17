// Ponta de prova
$('#output_image, #selected_image').on("click", function (event) {
    const x = (event.pageX - this.offsetLeft)
    const y = (event.pageY - this.offsetTop);
    const preview = document.querySelector("#output_image");
    var canvas = document.createElement('canvas');

    canvas.width = preview.width;
    canvas.height = preview.height;
    canvas.getContext('2d').drawImage(preview, 0, 0, preview.width, preview.height);
    
    let pixelNcResult = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    pixelNcResult = (pixelNcResult[0] + pixelNcResult[1] + pixelNcResult[2])/3;
    $('#img_coordinate_result').html("X Coordinate: " + x + "<br> Y Coordinate: " + y + "<br> Pixel: " + pixelNcResult);

    const image = document.querySelector("#selected_image");
    var newCanvas = document.createElement('canvas');

    newCanvas.width = image.width;
    newCanvas.height = image.height;
    newCanvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
    
    let pixelNc = newCanvas.getContext('2d').getImageData(x, y, 1, 1).data;
    pixelNc = (pixelNc[0] + pixelNc[1] + pixelNc[2])/3;


    $('#img_coordinate').html("X Coordinate: " + x + "<br> Y Coordinate: " + y + "<br> Pixel: " + pixelNc);
});