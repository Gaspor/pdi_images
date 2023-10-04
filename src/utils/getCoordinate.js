// Ponta de prova
$('#output_image').on("click", function (event) {
    const x = (event.pageX - this.offsetLeft)
    const y = (event.pageY - this.offsetTop);
    const preview = document.querySelector("#output_image");
    var canvas = document.createElement('canvas');

    canvas.width = preview.width;
    canvas.height = preview.height;
    canvas.getContext('2d').drawImage(preview, 0, 0, preview.width, preview.height);
    
    let pixelNc = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    pixelNc = (pixelNc[0] + pixelNc[1] + pixelNc[2])/3;
    $('#img_coordinate').html("X Coordinate: " + x + "<br> Y Coordinate: " + y + "<br> Pixel: " + pixelNc);
});