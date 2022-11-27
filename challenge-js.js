//Se configura el módulo readline

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout, 
});

// Se parte de un listado de alumnos inicial:

const students = [{
  age: 32,
  examScores: [],
  gender: 'male',
  name: 'edu'
},
{
  age: 29,
  examScores: [],
  gender: 'female',
  name: 'silvia'
}]

// Se establecen una serie de utilidades de apoyo en los ejercicios

const availableMaleNames = ['pepe', 'juan', 'victor', 'leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

// Se establecen las opciones disponibles

const availableOptions = 
'Debes introducir un número del siguiente listado para ejecutar la aplicación:\n\
1- Mostrar en formato de tabla todos los alumnos.\n\
2- Mostrar por consola la cantidad de alumnos que hay en clase.\n\
3- Mostrar por consola todos los nombres de los alumnos.\n\
4- Eliminar el último alumno de la clase.\n\
5- Eliminar un alumno aleatoriamente de la clase.\n\
6- Mostrar por consola todos los datos de los alumnos que son chicas.\n\
7- Mostrar por consola el número de chicos y chicas que hay en la clase.\n\
8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.\n\
9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.\n\
10- Añadir un alumno nuevo.\n\
11- Mostrar por consola el nombre de la persona más joven de la clase.\n\
12- Mostrar por consola la edad media de todos los alumnos de la clase.\n\
13- Mostrar por consola la edad media de las chicas de la clase.\n\
14- Añadir nueva nota a los alumnos.\n\
15- Ordenar el array de alumnos alfabéticamente según su nombre.\n\
***Si deseas salir, pulsa 0.***'

const options = () => {
  console.log(availableOptions)
}

// Se establece el mensaje de inicio

console.log("¡Te damos la bienvenida a Classroom management!");

// Se le pide un valor al usuario por consola

const isNumber = (num) => {
  return !Number.isNaN(num)
}

function getUserOption() {
  const promise = new Promise((resolve, reject) => {
    rl.question("Introduce un número: ", (num) => {
      rl.pause();
      if (isNumber(num)) {
        num = Number.parseInt(num);
        resolve(num);
      } else {
          reject(`El valor ${numAsString} no es un número.`);
      }
    });
  });
  return promise;
}

async function showOptions() {
  let optionFromUser

// Una vez la ejecución termine, volveremos a mostrar el listado de requisitos para que el usuario pueda seleccionar otro

do {
  try {
      options()
      optionFromUser = await getUserOption();

  } catch (error) {
      console.error(error)
      process.exit(0)
 }

 // 
 switch(optionFromUser) {
      
  case 1: 
    // Se muestran todos los alumnos en formato tabla

    console.table(students);
    break;

  case 2:
    // Se muestra por consola la cantidad de alumnos

    console.log(`La cantidad de alumnos es: ${students.length}`)
    break;
  
  case 3:
    // Se muestran todos los nombres de los alumnos por consola

    for (let elements of students) {
      console.log(`${elements.name}`)
    }
    break;

  case 4:
    // Se elimina el último alumno de la clase

    let lastStudent = students.pop()
    console.log(`Se ha eliminado el alumno: ${lastStudent.name}`)
    console.log("Tabla de alumnos actualizada:")
    console.table(students);
    break;

  case 5:
    // Se elimina un alumno aleatoriamente

    let randomStudent = students.splice(Math.floor(Math.random() * students.length),1);
    randomStudent.forEach(function(element) {
    console.log(`Se ha eliminado el alumno: ${element.name}`);
    })
    console.log("Tabla de alumnos actualizada:")
    console.table(students);
    break;

  case 6:
    // Se muestran por consola los datos de los alumnos con availableGenders 'female'

    let femaleStudents = students.filter(student => student.gender === 'female');
    console.log("Tabla de alumnos con género femenino:")
    console.table(femaleStudents)
    break;

  case 7:
    // Se muestra por consola el nº de chicas y chicos de la clase

    let numberOfFemaleStudents = students.filter(student => student.gender === 'female');
    let numberOfMaleStudents = students.filter(student => student.gender === 'male');
    console.log(`La cantidad de chicas en la clase es: ${numberOfFemaleStudents.length}`)
    console.log(`La cantidad de chicos en la clase es: ${numberOfMaleStudents.length}`)
    break;

  case 8:
    // Se muestra true o false por consola si todos los alumnos son chicas

    let allFemaleStudents = students.every(student => student.gender === 'female');
    console.log(allFemaleStudents);
    break;

  case 9:
    // Se muestran por consola los nombres de los alumnos entre 20 y 25 años

    let ageOfStudents = students.filter(student => student.age >= 20 && student.age <= 25);
    ageOfStudents.forEach(function(element) {
    console.log(`Los alumnos que tienen entre 20 y 25 años son: ${element.name}`);
    })
    break;

  case 10:
    // Se añade un nuevo alumno con los datos facilitados
  
  case 11:
    // Se muestra por consola el nombre del alumno más jóven

    let minAgeStudent = Math.min(...students.map(student => student.age));
    let minValues = students.filter(student => student.age == minAgeStudent);
    minValues.forEach(function(element) {
    console.log(`El alumno más jóven es: ${element.name}`);
    })
    break;

case 12:
    // Se muestra por consola la edad media de todos los alumnos

    let avgAgeStudents = students.reduce((accum,a) => a.age + accum,0)/students.length
    let intAvgStudents = parseInt(avgAgeStudents)
    console.log(`La edad media de todos los alumnos es: ${intAvgStudents}`)
    break;

case 13:
    // Se muestra por consola la edad media de los alumnos con género femenino

    let ageOfFemaleStudents = students.filter(student => student.gender === 'female');
    let avgAgeFemaleStudents = ageOfFemaleStudents.reduce((accum,a) => a.age + accum,0)/ageOfFemaleStudents.length
    let intAvgFemaleStudents = parseInt(avgAgeFemaleStudents)
    console.log(`La edad media de los alumnos con género femenino es: ${intAvgFemaleStudents}`)
    break;

case 14:
    // Se añade una nota (0-10) de forma aleatroria a cada alumno
    
    let randomExamscore = Math.floor(Math.random() * 10) + 1;
    let randomAddedExamScore = students.examScores.push([randomExamscore]);
    console.table(students);
  }

  // En caso de que el usuario pulse el 0 o un número no contemplado, la aplicación terminará

} while (optionFromUser >= 1 && optionFromUser <= 18)
}
showOptions();