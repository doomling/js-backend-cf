// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// // Map, filter, etc
// const even = arr.filter((number) => number % 2 === 0)
// console.log(even)


// Optional chaining (?.)
// const firstStudent = {
//   name: "Juani",
//   age: 29,
//   passport: {
//     number: 123456,
//     country: "Argentina"
//   }
// }

// const secondStudent = {
//   name: "Juani",
//   age: 29,
// }

// console.log(firstStudent?.passport?.country)
// console.log(secondStudent?.passport?.country)


// Nullish operator (??)

const age = 20;

//Sin nullish operator
const canDrive = age >= 18 ? true : false

//Con nullish operator
const canDrive2 = age >= 18 ?? false

console.log(canDrive)
console.log(canDrive2)
