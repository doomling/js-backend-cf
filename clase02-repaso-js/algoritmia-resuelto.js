/*
 * Tenemos una funcion que sirve para determinar si una palabra es un palindromo sin utilizar funciones predefinidas de javascript
 * Se les ocurre como mejorarla?
*/

const word = "reconocer"

// Inicial
function isPalindrome(word) {
  let reversedWord = ""

  for (let i = 0; i < word.length; i++) {
    reversedWord += word[word.length - i - 1]
  }

  return reversedWord === word
}

// Primera mejora
function isPalindrome(word) {
  for (let i = word.length - 1; i >= 0; i--) {
    if (word[i] !== word[word.length - i - 1]) {
      return false
    }
  }

  return true
}

// Segunda mejora
function isPalindrome(word) {
  for (let i = 0; i < Math.floor(word.length / 2); i++) {
    if (word[i] !== word[word.length - 1 - i]) {
      return false;
    }
  }

  return true
}

console.log(isPalindrome(word))



/*
 * Tenemos un array de estudiantes con su nombre, edad y numero de pasaporte. Tambien tenemos una funcion que nos devuelve la edad de 
 * un estudiante a partir de su numero de pasaporte.
 * Como podemos mejorar nuestra funcion? Total libertad para cambiar lo que quieran
*/


// Inicial
const students = [
  {
    name: "Juani",
    passportId: 1,
    age: 29
  },
  {
    name: "Carla",
    passportId: 2,
    age: 25
  }
]

function getStudentAge(passportId) {
  for (let i = 0; i < students.length; i++) {
    if (students[i].passportId === passportId) {
      return students[i].age
    }
  }
}


// Mejora
const improvedStudents = {
  1: {
    name: "Juani",
    age: 29
  },
  2: {
    name: "Carla",
    age: 25
  }
}


function getStudentAge(passportId) {
  return improvedStudents[passportId].age
}


console.log(getStudentAge(1))
