# Cosas que tienes que saber diferenciar en JavaScript (.js)

- En JavaScript podemos utilizar miles de formas para escribir código pero debemos hacerlo de la forma más actualizada y eficiente

## 🔹 Declaración de variables

En JS podemos declarar variables con `var`, `let` y `const`:

* **var** → Antiguo, evita usarlo. Tiene *scope global* o de función.
* **let** → Variable que **sí puede cambiar**. Tiene *scope de bloque*.
* **const** → Constante, **no se puede reasignar** (aunque en objetos/arrays sus propiedades sí pueden cambiar).

✅ Ejemplos:

```js
let nombre = "Ana";   // Puede cambiar
const PI = 3.1416;    // Constante
var edad = 25;        // Evitar usar
```


## 🔹 Declaración de funciones

### 1. **Funciones declaradas (clásicas)**

* Se cargan antes de ejecutarse (*hoisting*).
* Tienen su propio `this` y `arguments`.

```js
function saludar(nombre) {
  console.log("Hola " + nombre);
}
saludar("Luis"); // Hola Luis
```

⚠️ Se pueden sobreescribir fácilmente:

```js
function saludar() { console.log("Hola"); }
saludar = 123; 
// Ahora saludar ya no es una función → ❌ Error si la llamo
```

---

### 2. **Funciones anónimas (expresadas)**

* Se guardan en una variable/constante.
* No son hoisted (no se pueden usar antes de declararlas).

```js
const saludar2 = function(nombre) {
  console.log("Hola " + nombre);
};
saludar2("María");
```

### 3. **Funciones arrow (λ →)**

* Sintaxis más corta.
* No tienen su propio `this`.
* No son hoisted.
* Ideales para callbacks y funciones cortas.

```js
const saludarLambda = () => console.log("Hola lambda");
const saludarLambda2 = nombre => console.log("Hola " + nombre);

saludarLambda();             // Hola lambda
saludarLambda2("Martín");    // Hola Martín
```

## 🔹 Return

Sirve para **devolver valores** desde una función.

```js
function sumar(a, b) {
  return a + b;
}

const sumar2 = (a, b) => a + b; // arrow function simplificada

console.log(sumar(2, 3));   // 5
console.log(sumar2(5, 7));  // 12
```

👉 Si el cuerpo de la función tiene **solo un return**, no hace falta `{}` ni escribir `return`.

## 🔹 Argumentos

### Funciones clásicas → tienen `arguments` (un objeto con todos los parámetros pasados).

```js
function imprimirArgs() {
  console.log(arguments);
}
imprimirArgs(10, "Hola", true);
// [Arguments] { '0': 10, '1': 'Hola', '2': true }
```

### Funciones arrow → no tienen `arguments`.

Usan **rest parameters (`...`)**:

```js
const imprimirArgs2 = (edad, ...args) => {
  console.log({ edad, args });
};
imprimirArgs2(30, "Pepe", true);
// { edad: 30, args: [ 'Pepe', true ] }
```

## 🔹 Desestructuración

Permite extraer valores de arrays u objetos de forma rápida.

### Arrays

```js
const argumentos = (10, true, false, "Pepe", "Hola");
const [ casado, vivo, nombre, saludo ] = argumentos;

console.log(casado, nombre); // true Pepe
```

### Objetos

```js
let persona = {
  nombre: "Harley Quinn",
  edad: 30,
  vivo: true
};

const { nombre, edad } = persona;
console.log(nombre, edad); // Harley Quinn 30

// Cambiar el nombre de la variable
const { edad: años } = persona;
console.log(años); // 30

// Valores por defecto
const { casado = false } = persona;
console.log(casado); // false
```

## 🔹 Diferencia entre Valor y Referencia

* **Valor (tipos primitivos)**
  Los **primitivos** (`number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`) se **copian por valor**.
  Cada variable almacena su propio dato en memoria.

* **Referencia (objetos y arrays)**
  Los **objetos, arrays y funciones** se **pasan por referencia**.
  Varias variables pueden apuntar al **mismo espacio de memoria**, por lo que modificar uno afecta a todos.


## 🔹 Ejemplo con Valor

```js
let a = 10;
let b = a;  // copia el valor de a
a = 30;

console.log({ a, b }); 
// { a: 30, b: 10 }
```

✅ Al cambiar `a`, **b no se ve afectado** porque son independientes.


## 🔹 Ejemplo con Referencia

```js
let juan = { nombre: 'Juan' };
let ana = juan; // copia la referencia, no el objeto

ana.nombre = 'Ana';
console.log({ juan, ana });
// { juan: { nombre: 'Ana' }, ana: { nombre: 'Ana' } }
```

⚠️ Cambiar `ana` también cambia `juan`, porque ambos apuntan al mismo objeto.


## 🔹 Funciones y Referencias

```js
const cambiaNombre = (persona) => {
  persona.nombre = 'Edu';
  return persona;
};

let charles = { nombre: 'Charles' };
let edu = cambiaNombre(charles);

console.log({ charles, edu });
// { charles: { nombre: 'Edu' }, edu: { nombre: 'Edu' } }
```

👉 Los objetos pasados a funciones **se modifican directamente** si no rompemos la referencia.


## 🔹 Romper la Referencia (copiar objetos/arrays)

### Con objetos (spread `...`)

```js
let luis = { nombre: 'Luis' };
let mar = { ...luis }; // copia del objeto

mar.nombre = 'Mar';
console.log({ luis, mar });
// { luis: { nombre: 'Luis' }, mar: { nombre: 'Mar' } }
```

### Con funciones + spread

```js
const cambiaNombre2 = ({ ...persona }) => {
  persona.nombre = 'Tony';
  return persona;
};

let peter = { nombre: 'Peter' };
let tony = cambiaNombre2(peter);

console.log({ peter, tony });
// { peter: { nombre: 'Peter' }, tony: { nombre: 'Tony' } }
```

## 🔹 Arrays y Referencia

### Caso con referencia

```js
const frutas = ['Manzana', 'Pera', 'Piña'];
const otrasFrutas = frutas;

otrasFrutas.push('Mango');
console.table({ frutas, otrasFrutas });
/*
frutas      │ 'Manzana' │ 'Pera' │ 'Piña' │ 'Mango'
otrasFrutas │ 'Manzana' │ 'Pera' │ 'Piña' │ 'Mango'
*/
```

👉 Modificar `otrasFrutas` también modifica `frutas`.

### Romper referencia en arrays

```js
const otrasFrutas2 = [...frutas]; // Spread
otrasFrutas2.push('Mango');

const otrasFrutas3 = frutas.slice(); // Slice
otrasFrutas3.push('Mango');
```

🔹 Tanto **spread** como **slice** generan un **nuevo array**.


## 🔹 Eficiencia (spread vs slice)

```js
console.time('slice');
const otrasFrutas4 = frutas.slice();
console.timeEnd('slice');

console.time('spread');
const otrasFrutas5 = [...frutas];
console.timeEnd('spread');

// Ejemplo de salida:
// slice: 0.056ms
// spread: 0.003ms
```

👉 **Spread suele ser más rápido** y más legible.


# ✅ Resumen rápido

* **Primitivos** → copian el valor (independientes).
* **Objetos/arrays/funciones** → copian la referencia (comparten memoria).
* Para **romper la referencia**:

  * Objetos → `{ ...obj }`
  * Arrays → `[...arr]` o `arr.slice()`
* Spread (`...`) es más moderno, rápido y legible.

# 📘 Control de flujo y bucles

## 🔹 If / Else

Permite ejecutar bloques de código según una condición booleana.

```js
let a = 5;

if (a >= 10) {
  console.log("a es mayor o igual que 10");
} else {
  console.log("a es menor que 10");
}
// a es menor que 10
```

### Comparaciones con fecha

```js
const hoy = new Date();
let dia = hoy.getDay(); // 0: Domingo, 1: Lunes...

if (dia === 0) {
  console.log("Domingo");
} else if (dia === 1) {
  console.log("Lunes");
} else {
  console.log("Otro día");
}
```

## 🔹 Alternativa con objetos (diccionario)

En lugar de varios `if-else`:

```js
const diasLetras = {
  0: "domingo",
  1: "lunes",
  2: "martes",
  3: "miércoles",
  4: "jueves",
  5: "viernes",
  6: "sábado",
};
const hoy2 = new Date();
console.log(diasLetras[hoy2.getDay()]);
```

## 🔹 Lógica booleana

* **Not (`!`)**: Negación.
* **And (`&&`)**: Devuelve verdadero si **todos** son true.
* **Or (`||`)**: Devuelve verdadero si **al menos uno** es true.

```js
console.log(!true);  // false
console.log(true && false); // false
console.log(true || false); // true
```

⚡ Evaluación corta:

* `a && b` → si `a` es false, no evalúa `b`.
* `a || b` → si `a` es true, no evalúa `b`.

## 🔹 Asignaciones con operadores lógicos

```js
const soyFalso = false;
const soyNull = null;

const a1 = true && "Hola" && 150; // 150
const a2 = soyFalso || "Ya no soy falso"; // "Ya no soy falso"
const a3 = soyNull || soyFalso || "Valor por defecto"; // "Valor por defecto"

console.log({ a1, a2, a3 });
```

## 🔹 Operador ternario

Versión corta de un `if-else`.

```js
const hora = 10;
const dia = 0; // domingo

const horaApertura = [0,6].includes(dia) ? 9 : 11;
const mensaje = hora >= horaApertura
  ? "Está abierto"
  : `Está cerrado, abrimos a las ${horaApertura}`;

console.log({ horaApertura, mensaje });
```

### Ejemplos prácticos:

```js
const elMayor = (a,b) => (a > b ? a : b);
console.log(elMayor(20, 3)); // 20

const precio = (esMiembro) => esMiembro ? "2 euros" : "10 euros";
console.log(precio(false)); // 10 euros

const nota = 65;
const grado = nota >= 95 ? "A+" :
              nota >= 90 ? "A" :
              nota >= 85 ? "B+" :
              nota >= 70 ? "C" : "F";
console.log(grado); // F
```
## 🔹 Switch

Útil cuando hay muchas comparaciones de un mismo valor.
Hace comparación estricta (`===`).

```js
const dia = 2;

switch (dia) {
  case 0:
    console.log("Domingo");
    break;
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  default:
    console.log("Otro día");
}
```

## 🔹 Bucles

### While

Evalúa la condición antes de ejecutar.

```js
const coches = ["Ford", "Mazda", "Honda"];
let i = 0;

while (coches[i]) {
  console.log(coches[i]);
  i++;
}
```

* `break` → sale del bucle.
* `continue` → salta a la siguiente iteración.


### Do While

Se ejecuta **al menos una vez**, aunque la condición sea falsa.

```js
let j = 0;
do {
  console.log(coches[j]);
  j++;
} while (coches[j]);
```


### For tradicional

Se usa cuando conocemos el número de iteraciones.

```js
const heroes = ["Batman", "Superman", "Wonder Woman"];

for (let i = 0; i < heroes.length; i++) {
  console.log(heroes[i]);
}
```

### For in (índices)

Recorre los **índices** (keys).

```js
for (let i in heroes) {
  console.log(i, heroes[i]);
}
```

### For of (valores)

Recorre directamente los **valores**.

```js
for (let heroe of heroes) {
  console.log(heroe);
}
```

# ✅ Resumen rápido

* **if / else** → control básico de condiciones.
* **switch** → más limpio para múltiples casos.
* **&& y ||** → combinan condiciones y sirven en asignaciones.
* **ternario (`? :`)** → versión compacta de `if-else`.
* **while** → repite mientras la condición sea true.
* **do while** → siempre se ejecuta al menos una vez.
* **for** → clásico, con índice.
* **for in** → recorre índices.
* **for of** → recorre valores directamente.


# 📑 Resúmenes rápidos

## 🔹 Variables

* `var` → desaconsejado, scope global/función.
* `let` → variable que puede cambiar, scope de bloque.
* `const` → constante, no se reasigna (objetos/arrays sí mutan internamente).

---

## 🔹 Funciones

* **Declaradas** → hoisting, tienen `this` propio y `arguments`.
* **Anónimas** → guardadas en variable, no hoisted.
* **Arrow** → sintaxis corta, sin `this` ni `arguments`, no hoisted.

---

## 🔹 Return

* Devuelve valores.
* En arrow con una sola instrucción → se puede omitir `{}` y `return`.

---

## 🔹 Argumentos

* Funciones clásicas → tienen `arguments`.
* Arrow → usar `...rest` para capturar parámetros.

---

## 🔹 Desestructuración

* Arrays → `const [a, b] = arr;`
* Objetos → `const {prop, otraProp: alias} = obj;`
* Valores por defecto: `const {edad=20} = persona;`

---

## 🔹 Valor vs Referencia

* **Primitivos** → copian valor.
* **Objetos/arrays** → copian referencia.
* Para **romper referencia**:

  * Objetos → `{...obj}`
  * Arrays → `[...arr]` o `arr.slice()`

---

## 🔹 Control de flujo

* `if / else` → control básico.
* `switch` → mejor con muchos casos (usa `===`).
* `&&` y `||` → evalúan condiciones, sirven también en asignaciones.
* **Operador ternario (`cond ? a : b`)** → versión corta de if/else.

---

## 🔹 Bucles

* **while** → ejecuta mientras la condición sea true.
* **do while** → ejecuta al menos una vez.
* **for tradicional** → con índice.
* **for in** → recorre índices/keys.
* **for of** → recorre valores directamente.
* `break` → rompe el bucle.
* `continue` → salta a la siguiente iteración.
