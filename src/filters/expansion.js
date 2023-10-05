function expansion(data, a, b) {
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
    
        // Aplicar a fórmula de expansão a cada canal de cor
        data[i] = clamp(a * red + b, 0, 255); // Certificar-se de que os valores fiquem entre 0 e 255
        data[i + 1] = clamp(a * green + b, 0, 255);
        data[i + 2] = clamp(a * blue + b, 0, 255);
    }

    return data;
    
}