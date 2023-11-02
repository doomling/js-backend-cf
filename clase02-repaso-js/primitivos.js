// // Number
// const thisIsANumber = 1;

// // String
// const thisIsAString = 'hello';

// // Boolean
// const thisIsABoolean = true;

// // Array
// const firstArray = [1, 2, 3];
// const secondArray = [1, 'a', false];

// // Object
// const thisIsAnObject = {
//   name: "Juani",
//   age: 29
// }


// // Undefined
// const thisIsUndefined = undefined;

// // Null
// const thisIsNull = null;

// const numbers = [1, 2, 3];

// const newNumbers = []

// numbers.forEach((number) => {
//   newNumbers.push(number * 2);
// })

// console.log(numbers);
// console.log(newNumbers)


function Persona(nombre) {
  this.nombre = nombre;
}

Persona.prototype.saludar = function () {
  return `Hola, mi nombre es ${this.nombre}`
}

const newPersona = new Persona("Juani");
const newPersona2 = new Persona("Juani2");

console.log(newPersona)
console.log(newPersona.nombre);
console.log(newPersona.saludar())
console.log(newPersona.__proto__)


console.log(newPersona2.saludar())






