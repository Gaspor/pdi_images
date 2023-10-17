function expansion(data, a, b) {
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
    
        data[i] = clamp((a * red + b), 0, 255);
        data[i + 1] = clamp((a * green + b), 0, 255);
        data[i + 2] = clamp((a * blue + b), 0, 255);
    }

    return data;
}