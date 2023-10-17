function compression(data, a, b) {
    for (let i = 0; i < data.length; i += 4) {
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
    
        data[i] = clamp((red/a - b), 0, 255);
        data[i + 1] = clamp((green/a - b), 0, 255);
        data[i + 2] = clamp((blue/a - b), 0, 255);
    }

    return data;
}