// Função auxiliar para garantir que os valores fiquem dentro do intervalo [min, max]
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}