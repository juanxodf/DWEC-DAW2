// Ejercicio 1
function obtenerLetraDNI(dni) {
    const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    // Comprobamos que el número sea válido (entero, positivo y menor que 100 millones)
    if (typeof dni !== "number" || dni < 0 || dni > 99999999) {
        throw new Error("DNI no válido");
    }

    const letra = letras[dni % 23];
    return letra;
}

// Ejercicio 2
function invertirTexto(texto) {
    // Convertimos el texto en un array de caracteres
    // y lo invertimos, para despues volverlo a un string
    // con join
    return texto.split("").reverse().join("");
}

// Ejercicio 3
function generarNumeros() {
    // utilizamos Set para evitar duplicados
    const numeros = new Set();

    // Seguimos generando numeros hasta llegar a 100
    while (numeros.size < 100) {
        // Generamos un numero aleatorio
        const num = Math.floor(Math.random() * 1000) + 1;
        numeros.add(num);
    }

    // Convertimos el Set en un array y lo retornamos
    return [...numeros];
}

// Ejercicio 4
function contarLetra(frase, letra) {
    let contador = 0;
    // Recorremos la frase y contamos las veces que aparece la letra
    for (let char of frase) {
        // Convertimos la letra a minúscula
        // para evitar problemas con mayúsculas
        if (char.toLowerCase() === letra.toLowerCase()) {
            // Incrementamos el contador cuando encontramos la letra
            contador++;
        }
    }

    // Retornamos el contador
    return contador;
}

// Ejercicio 5
function divisores(num) {
    const resultado = [];

    // Recorremos los divisores
    for (let i = 1; i <= num; i++) {
        // Si el numero es divisible por el divisor
        if (num % i === 0) {
            // Lo agregamos al array
            resultado.push(i);
        }
    }

    // Retornamos el array con los divisores
    return resultado;
}

// Ejemplos ejercicios

console.log(obtenerLetraDNI(12345678)); // Z

console.log(invertirTexto("Hola mundo")); // "odnum aloH"

console.log(generarNumeros());

console.log(contarLetra("Hola mundo hola", "o")); // 3

console.log(divisores(28)); // [1, 2, 4, 7, 14, 28]
