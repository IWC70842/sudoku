function muestraSudoku(dificultad) {
  rellenaSudoku(); // Generamos un nuevo sudoku resuelto
  document.getElementById("dificultad").style.display = "none";

  let casillasVisibles = 0;
  let minPorCuadrante;
  let maxPorCuadrante;

  // Según la selección de dificultad de usuario asignamos valores o mostramos todo.
  switch (dificultad) {
    case 'facil':
      casillasVisibles = 38;
      minPorCuadrante = 3;
      maxPorCuadrante = 6;
      break;
    case 'media':
      casillasVisibles = 30;
      minPorCuadrante = 2;
      maxPorCuadrante = 5;
      break;
    case 'alta':
      casillasVisibles = 25;
      minPorCuadrante = 1;
      maxPorCuadrante = 4;
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

  // Arreglo para controlar las casillas visibles por cuadrante
  let casillasPorCuadrante = [];
  let casillasRestantes = casillasVisibles;  // Casillas visibles restantes a distribuir

  // Asignamos casillas visibles a cada cuadrante respetando el rango de casillas
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      let casillasEnCuadrante = [];

      // Recolectamos todas las posiciones posibles dentro de este cuadrante
      for (let fi = i; fi < i + 3; fi++) {
        for (let fj = j; fj < j + 3; fj++) {
          casillasEnCuadrante.push([fi, fj]);
        }
      }

      // Determinamos cuántas casillas se deben dejar visibles en este cuadrante
      let maxVisiblesCuadrante = Math.min(maxPorCuadrante, casillasRestantes);  // No exceder las casillas restantes
      let casillasVisiblesEnCuadrante = Math.min(
        Math.max(minPorCuadrante, Math.floor(casillasRestantes / (9 - (i / 3)))), 
        maxVisiblesCuadrante
      );
      
      // Actualizamos el número de casillas restantes a mostrar
      casillasRestantes -= casillasVisiblesEnCuadrante;

      // Seleccionamos aleatoriamente las casillas visibles de este cuadrante
      let casillasDescubiertas = [];
      let casillasDisponibles = [...casillasEnCuadrante];  // Copiar el array original
      while (casillasDescubiertas.length < casillasVisiblesEnCuadrante) {
        let indice = Math.floor(Math.random() * casillasDisponibles.length);
        let casilla = casillasDisponibles.splice(indice, 1)[0]; // Eliminar la casilla seleccionada
        casillasDescubiertas.push(casilla);
      }

      // Guardamos las casillas visibles de este cuadrante
      casillasPorCuadrante.push(casillasDescubiertas);
    }
  }

  // Verificamos que se hayan asignado el número correcto de casillas visibles
  if (casillasRestantes !== 0) {
    alert("No se han distribuido correctamente las casillas visibles.");
    return;
  }

  // Procedemos a ocultar o mostrar las casillas del sudoku
  let casillasOcultas = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let esVisible = false;

      // Verificamos si la casilla debe ser visible en algún cuadrante
      for (let k = 0; k < casillasPorCuadrante.length; k++) {
        if (casillasPorCuadrante[k].some(([fi, fj]) => fi === i && fj === j)) {
          esVisible = true;
          break;
        }
      }

      if (esVisible) {
        // Mostrar la casilla
        document.getElementById(i + "," + j).innerText = sudoku[i][j];
        document.getElementById(i + "," + j).style.cssText = "font-weight: bold; color: blue;";
      } else {
        // Ocultar la casilla (con un espacio invisible)
        document.getElementById(i + "," + j).innerText = '\u200B';  // Caracter invisible
        casillasOcultas++;
      }
    }
  }

  // Mostrar el Sudoku con las casillas visibles
  document.getElementById("sudoku").style.display = "block";
}
