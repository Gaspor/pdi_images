function power(data, gamma) {
    for (let i = 0; i < data.length; i += 4) {
        // Separa os componentes R, G, B e A do pixel
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
    
        // Aplica o filtro de potência a cada canal de cor (R, G, B)
        data[i] = Math.pow(r / 255, gamma) * 255;
        data[i + 1] = Math.pow(g / 255, gamma) * 255;
        data[i + 2] = Math.pow(b / 255, gamma) * 255;
    }
  
    return data;
}