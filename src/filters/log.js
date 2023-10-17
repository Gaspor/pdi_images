function log(data) {
    const factor = 20; // Fator de escala
    const constant = 1; // Valor constante a ser adicionado

    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Aplicar o filtro de logaritmo com ajuste
        data[i] = Math.log(red + constant) * factor;
        data[i + 1] = Math.log(green + constant) * factor;
        data[i + 2] = Math.log(blue + constant) * factor;
    }

    return data;
}
