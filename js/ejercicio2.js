/**
* @author Jose Antonio Pozo Gonzalez
* @email iwc70842@educastur.es
* @version 1.0
* @description  Funciones para Generar el tablero de Sudoku y mostrar en funcion de la dificultad un número determinado de casillas. 
*/

var sudoku = [];
var esValida = false;

//Llenamos la matriz de ceros
for (let i = 0; i < 9; i++) {
  sudoku[i] = [];
  for (let j = 0; j < 9; j++) {
    sudoku[i][j] = 0;
  }
}
// muestra el sudoku 
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    document.getElementById(i + "," + j).innerText = sudoku[i][j];
  }
}

rellenaSudoku();

function rellenaSudoku() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (sudoku[i][j] === 0) {
        while (!esValida) {
          let valor = Math.floor(Math.random() * 9) + 1
          document.getElementById(i + "," + j).innerText = valor;
          compruebaCasilla(i, j, valor)
        }
        
      }
      esValida = false;
    }
  }
}

function compruebaCasilla(fila, columna, valor) {
  //comprobación fila
  for (let i = 0; i < 9; i++) {
    if (i===columna) continue;
    if (valor === sudoku[fila][i]) {
      return;
    }else{esValida= true;}
  }

  //comprobación columna

  //comprobación cuadrante 3x3

  //esValida = true;
}