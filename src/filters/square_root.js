function square_root(data, gamma) {
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
    
        // Aplicar o filtro de raiz quadrada a cada canal de cor
        data[i] = Math.pow(Math.sqrt(red / 255), gamma) * 255;
        data[i + 1] = Math.pow(Math.sqrt(green / 255), gamma) * 255;
        data[i + 2] = Math.pow(Math.sqrt(blue / 255), gamma) * 255;
    }
  
    return data;
}