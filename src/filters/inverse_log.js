function inverse_log(data) {
    const factor = 20; // Fator de escala
    const constant = 1; // Valor constante a ser adicionado

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Aplicar o filtro de inversão logarítmica com ajuste
        data[i] = Math.exp((red + constant) / factor) - 1;
        data[i + 1] = Math.exp((green + constant) / factor) - 1;
        data[i + 2] = Math.exp((blue + constant) / factor) - 1;
    }

    return data;
}
