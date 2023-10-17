function inverse_log(data) {
    const factor = 1; // Fator de escala
  
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
    
        // Aplicar o filtro de inversão logarítmica a cada canal de cor
        data[i] = Math.exp(red / factor) - 1;
        data[i + 1] = Math.exp(green / factor) - 1;
        data[i + 2] = Math.exp(blue / factor) - 1;
    }
  
    return data;
}