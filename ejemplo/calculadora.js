//funciones de la calculadora

module.exports = {
    add: (val1, val2) => {
        //validar datos, si son validos, retornar error
        if(isNaN(val1) || isNaN(val2)) {
            throw Error("Valores invalidos");
        }
        return val1 + val2;
    },
    subtract: (val1, val2) => {
        if(isNaN(val1) || isNaN(val2)) {
            throw Error("Valores invalidos");
        }
        return val1 - val2;
    },
}