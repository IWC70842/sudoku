/**
* @author Jose Antonio Pozo Gonzalez
* @email iwc70842@educastur.es
* @version 1.0
* @description  Funciones para Generar el tablero de Sudoku y mostrar en funcion de la dificultad un número determinado de casillas. 
*/

// Variables
var sudoku = [];
var valoresValidos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var recursion = 0; //medida de seguridad para los sudokus no resolubles.

// Visibilidad inicial sudoku y boton reinicio.
document.getElementById("sudoku").style.display = "none";
document.getElementById("reiniciar").style.display = "none";
document.getElementById("modo").style.display="none";

//Llenamos la matriz de ceros
for (let i = 0; i < 9; i++) {
  sudoku[i] = [];
  for (let j = 0; j < 9; j++) {
    sudoku[i][j] = 0;
  }
}

//Soluciona el sudoku y lo almacena en el array sudoku
function rellenaSudoku() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      //Encontramos una casilla sin rellenar
      if (sudoku[i][j] === 0) {
        //Obtenemos los valores posibles para la casilla
        let posiblesValores = obtenerValoresPosibles(sudoku, i, j);
        for (let k = 0; k < posiblesValores.length; k++) {
          let valor = posiblesValores[Math.floor(Math.random() * posiblesValores.length)];
          //Probamos si el valor posible es válido para esta casilla.
          if (compruebaCasilla(sudoku, i, j, valor)) {
            sudoku[i][j] = valor
            document.getElementById(i + "," + j).innerText = sudoku[i][j];
            break;
          }
        }
        //si nos quedamos sin valores posibles pone la fila a 0 y reintenta
        if (posiblesValores.length == 0) {
          for (let a = 0; a < 9; a++) {
            sudoku[i][a] = 0;
          }
          //Si tras muchos reintentos llegamos a un callejón sin salida reiniciamos el sudoku.
          if (recursion > 100) {
            for (let i = 0; i < 9; i++) {
              sudoku[i] = [];
              for (let j = 0; j < 9; j++) {
                sudoku[i][j] = 0;
              }
            }
          }
          recursion++;
          rellenaSudoku();
        }
      }
    }
  }

}

//Comprueba los valores posibles dada una fila y una columna en concreto.
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

//Comprobamos que un numero posible comple las reglas del sudoku
function compruebaCasilla(sudoku, fila, columna, valor) {
  //Comprobación fila
  for (let i = 0; i < 9; i++) {
    if (i !== columna && sudoku[fila][i] === valor) {
      return false;
    }
  }
  //Comprobación columna
  for (let i = 0; i < 9; i++) {
    if (i !== fila && sudoku[i][columna] === valor) {
      return false;
    }
  }
  //Comprobación cuadrante 3x3
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
//En funcion de la dificultad seleccionada por boton muestra un numero de casillas o el sudoku completo. 
function muestraSudoku(dificultad) {
  rellenaSudoku(); // Generamos un nuevo sudoku resuelto
  document.getElementById("dificultad").style.display = "none";

  let casillasVisibles = 0;
  let minPorCuadrante;
  let maxPorCuadrante;

  //Según la seleccion de dificultad de usuario asignamos valores o mostramos todo.
  switch (dificultad) {
    case 'facil':
      casillasVisibles = 38;
      minPorCuadrante = 3;
      maxPorCuadrante = 6;
      document.getElementById("modo").style.display="block";
      document.querySelector("#modo h3").innerText = "Sudoku dificultad Fácil";
      document.querySelector("#solucion a").innerText = "Mostrar solución";
      break;
    case 'media':
      casillasVisibles = 30;
      minPorCuadrante = 2;
      maxPorCuadrante = 5;
      document.getElementById("modo").style.display="block";
      document.querySelector("#modo h3").innerText = "Sudoku dificultad Intermedia";
      document.querySelector("#solucion a").innerText = "Mostrar solución";
      break;
    case 'alta':
      casillasVisibles = 25;
      minPorCuadrante = 1;
      maxPorCuadrante = 4;
      document.getElementById("modo").style.display="block";
      document.querySelector("#modo h3").innerText = "Sudoku dificultad Alta";
      document.querySelector("#solucion a").innerText = "Mostrar solución";
      break;
    case 'entero':
      // Mostramos la solución del sudoku
      document.getElementById("sudoku").style.display = "block";
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          document.getElementById(i + "," + j).innerText = sudoku[i][j];
        }
      }
      document.getElementById("solucion").style.display = "none";
      document.getElementById("reiniciar").style.display = "block";
      return;
  }

  // Variables para controlar las casillas descubiertas por cuadrante
  let casillasPorCuadrante = [];

  // Aseguramos que cada cuadrante tenga al menos el mínimo de casillas visibles
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let casillasEnCuadrante = [];

      // Colectar las posiciones de las casillas del cuadrante
      for (let fi = i; fi < i + 3; fi++) {
        for (let fj = j; fj < j + 3; fj++) {
          casillasEnCuadrante.push([fi, fj]);
        }
      }

      // Determinamos cuántas casillas se deben dejar visibles en este cuadrante
      let casillasVisiblesEnCuadrante = Math.floor(Math.random() * (maxPorCuadrante - minPorCuadrante + 1)) + minPorCuadrante;

      // Seleccionamos aleatoriamente las casillas visibles
      let casillasDescubiertas = [];
      while (casillasDescubiertas.length < casillasVisiblesEnCuadrante) {
        let indice = Math.floor(Math.random() * casillasEnCuadrante.length);
        let casilla = casillasEnCuadrante.splice(indice, 1)[0];
        casillasDescubiertas.push(casilla);
      }

      // Guardamos las casillas visibles por cuadrante
      casillasPorCuadrante.push(casillasDescubiertas);
    }
  }

  // Calculamos el numero de casillas a ocultar.
  let casillasADejarOcultas = 81 - casillasVisibles;

  // Ocultar casillas
  let casillasOcultas = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let esVisible = false;

      // Verificar si la casilla debe ser visible
      for (let k = 0; k < casillasPorCuadrante.length; k++) {
        if (casillasPorCuadrante[k].some(([fi, fj]) => fi === i && fj === j)) {
          esVisible = true;
          break;
        }
      }

      if (!esVisible && casillasOcultas < casillasADejarOcultas) {
        // Ocultamos la casilla usando este caracter especial para preservar el espacio
        document.getElementById(i + "," + j).innerText = '\u200B';
        casillasOcultas++;
      } else {
        // Mantenemos la casilla visible
        document.getElementById(i + "," + j).innerText = sudoku[i][j];
      }
    }
  }

  // Mostrar el Sudoku con las casillas visibles
  document.getElementById("sudoku").style.display = "block";
}

// Recargar la pagina tras mostrar la solución si el usuario pulsa el botón reinicio.
function reiniciarSudoku() {
  location.reload();
}
