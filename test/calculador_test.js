var assert = require('assert');

//importar las funciones de calculadora
const calculadora = require("../ejemplo/calculadora");

describe("Calculadora TEST", () => {
 //aca van los casos de prueba 

 //antes de ejecutar todas las prueba
 before(() =>{
     console.log("Probarás las funciones de calculadora");
 });

 after(() => {
     console.log("Fin del test de calculadora");
 });
 //aca van los  casos de prueba

 //peubas de la funcion sumar
 describe("Sumar", () => {

    it("Debe retornar 5 cuando: 3 + 2", () => {
        assert.equal(calculadora.add(3, 2), 5);
    });

    //segundo escenario sumar
    it("Debe retornar 0 cuando: 0 + 0", () => {
        assert.equal(calculadora.add(0, 0), 0);
    });

            //otro escenario
    it("Debe retornar -5 cuando: 10 + (-15)", () => {
        assert.equal(calculadora.add(10, -15), -5);
    })
 });
 //tercer escenario 
 it("Debe retornar Error cuando: 5 + 'hola'", ()=> {
    assert.throws(function() {
        calculadora.add(5, 'hola')
    },{
        name: "Error",
        message: "Valores inválidos"
    })
});

    //restar
    it("Debe retornar Error cuando: 'abc' - 8", ()=> {
        assert.throws(function() {
            calculadora.add('abc', 8)
        },{
            name: "Error",
            message: "Valores inválidos"
        })
    });

});
