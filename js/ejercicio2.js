/**
* @author Jose Antonio Pozo Gonzalez
* @email iwc70842@educastur.es
* @version 1.0
* @description  Funciones para Generar el tablero de Sudoku y mostrar en funcion de la dificultad un número determinado de casillas. 
*/

var sudoku = [];
var valoresValidos = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//Llenamos la matriz de ceros

for (let i = 0; i < 9; i++) {
  sudoku[i] = [];
  for (let j = 0; j < 9; j++) {
    sudoku[i][j] = 0;
  }
}

rellenaSudoku();

function rellenaSudoku() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        let posiblesValores = obtenerValoresPosibles(sudoku, i, j);
        for (let k = 0; k < posiblesValores.length; k++) {
          let valor = posiblesValores[Math.floor(Math.random()* posiblesValores.length)];                
          if (compruebaCasilla(sudoku, i, j, valor)) {
            sudoku[i][j] = valor
            document.getElementById(i + "," + j).innerText = sudoku[i][j];
            break;                       
          }          
        }
        if(posiblesValores.length==0){
          for(let a=0;a<9;a++){
            sudoku[i][a]=0;            
          }
          rellenaSudoku();
        }
      }
    }
  }
  
}

function obtenerValoresPosibles(sudoku, fila, columna) {
  // Creamos un array de todos los números posibles (1-9)
  let posiblesValores = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Eliminamos los números que ya están en la fila
  for (let i = 0; i < 9; i++) {
    let indice = posiblesValores.indexOf(sudoku[fila][i]);
    if (indice !== -1) {
      posiblesValores.splice(indice, 1);
    }
  }

  // Eliminamos los números que ya están en la columna
  for (let i = 0; i < 9; i++) {
    let indice = posiblesValores.indexOf(sudoku[i][columna]);
    if (indice !== -1) {
      posiblesValores.splice(indice, 1);
    }
  }

  // Eliminamos los números que ya están en el cuadrante 3x3
  let inicioFila = Math.floor(fila / 3) * 3;
  let inicioColumna = Math.floor(columna / 3) * 3;

  for (let i = inicioFila; i < inicioFila + 3; i++) {
    for (let j = inicioColumna; j < inicioColumna + 3; j++) {
      let indice = posiblesValores.indexOf(sudoku[i][j]);
      if (indice !== -1) {
        posiblesValores.splice(indice, 1);
      }
    }
  }

  return posiblesValores;
}


function compruebaCasilla(sudoku, fila, columna, valor) {
  //comprobación fila
  for (let i=0;i<9;i++){
    if(i!==columna&&sudoku[fila][i]===valor){
      return false;
    }
  }
  //comprobación columna
  for (let i = 0; i < 9; i++) {
    if (i !== fila && sudoku[i][columna] === valor) {
      return false;  
  }
}
  //comprobación cuadrante 3x3
  let inicioFila = Math.floor(fila / 3) * 3;
  let inicioColumna = Math.floor(columna / 3) * 3;

  for (let i = inicioFila; i < inicioFila + 3; i++) {
    for (let j = inicioColumna; j < inicioColumna + 3; j++) {
      if (sudoku[i][j] === valor) {
        return false; 
      }
    }
  }

  return true;

}
// muestra el sudoku 
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    document.getElementById(i + "," + j).innerText = sudoku[i][j];
  }
}

