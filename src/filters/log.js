function log(data) {
    const factor = 255 / Math.log(256); // Fator de escala

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Aplicar o filtro de logaritmo a cada canal de cor
        data[i] = Math.log(red + 1) * factor;
        data[i + 1] = Math.log(green + 1) * factor;
        data[i + 2] = Math.log(blue + 1) * factor;
    }

    return data;
}