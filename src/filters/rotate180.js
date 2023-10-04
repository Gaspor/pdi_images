function apply180degrees(data) {
    let rotatedData = [];
    console.log(data);
    for (let index = 0; index < data.length - 1; index += 4) {
        rotatedData[data.length - index - 4] = data[index];
        rotatedData[data.length - index - 3] = data[index + 1];
        rotatedData[data.length - index - 2] = data[index + 2];
        rotatedData[data.length - index - 1] = data[index + 3];
      
    }
  
    rotatedData = new Uint8ClampedArray(rotatedData);
    console.log(rotatedData);
  
    return rotatedData;
}