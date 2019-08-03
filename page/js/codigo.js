// This is the script and there's a mini vocabulary
// Esto es el codigo y aqui ahi un pequeño vocabulario

// +--------------+-------------+
// |   ESPAÑOL    |   ENGLISH   |
// +--------------+-------------+
// |   nivel      |   level     |
// |   aumentar   |   increase  |
// |   aumentar   |   decrease  |
// |   dibujar    |   draw      |
// |   dibujo     |   picture   |
// |   lienzo     |   canvas    |
// +--------------+-------------+

// ELEMENTS
// ELEMENTOS

// Auxiliary
// Auxiliares
var dibujo = document.getElementById('fractal');
var lienzo = dibujo.getContext("2d");

// Global variables
// Variables globales
var ancho = dibujo.width;
var alto = dibujo.height;
var x_A = ancho/4;
var y_A = ancho/3;
var x_B = ancho*3/4;
var y_B = ancho/3;
var x_C = x_A + ( x_B - x_A ) / 2;
var y_C = y_A + ( x_B - x_A ) * Math.sqrt(3) / 2;
var color = "red";

// Checkboxes
// Casillas de verificacion
var check_koch = document.getElementById('koch');
var check_sierpinski = document.getElementById('sierpinski');

// Textboxes
// Cajas de textos
var txt_nivel = document.getElementById('nivel');

// Butttons
// Botones
var btn_aumentar = document.getElementById('btn-arriba');
var btn_disminuir = document.getElementById('btn-abajo');
var btn_dibujar = document.getElementById('btn-dibujar');

// Levels
// ------
// The code generates ( 4 ^ level + 1 ) points, that's why the browser may
// crash if you use a higher value

// Niveles
// -------
// El codigo genera ( 4 ^ nivel + 1 ) puntos, por eso no es recomendable
// dibujar a un nivel muy alto pues puede hacer que el navegador crashee

var nivel_max = 8;
var nivel_min = 0;
var nivel = txt_nivel.value;
if (nivel.value==""){
  nivel = nivel_min;
}

// EVENTS
// EVENTOS

// Buttons' events
// Eventos de botones

btn_dibujar.addEventListener('click', dibujar);
btn_aumentar.addEventListener('click', aumentar);
btn_disminuir.addEventListener('click', disminuir);
txt_nivel.addEventListener('keyup', leer);

// FUNCTIONES
// FUNCIONES

// Base function
// Funcion base

function dibujarLinea(color,x_0,y_0,x_n,y_n){
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.moveTo(x_0, y_0);
  lienzo.lineTo(x_n, y_n);
  lienzo.stroke();
  lienzo.closePath();
}

// Auxiliary functions
// Funciones auxiliares

function leer(){
  nivel=txt_nivel.value;
}

function limpiarLienzo(){
  lienzo.clearRect(0,0,ancho,alto);
}

// Buttons' functions
// Funciones de botones

function aumentar(){
  if(nivel<nivel_max){
    nivel++;
  }
  txt_nivel.value=nivel;
}

function disminuir(){
  if(nivel>nivel_min){
    nivel--;
  }
  txt_nivel.value=nivel;
}

function dibujar(){
  if(nivel<nivel_min || nivel>nivel_max){
    nivel=nivel_min;
    txt_nivel.value=nivel;
  }
  nivel=txt_nivel.value;
  if(check_koch.checked){
    fractal_koch_0();
  } else if(check_koch.checked){
    fractal_sierpinski_0();
  } else {
    alert("Elija uno de los fractales porfavor ;3");
  }
}

// Recursivity functions
// Funciones de recursividad

// 1. Koch's Snowflake
// 1. Estrella de Koch

function fractal_koch_0(){
  limpiarLienzo();
  fractal_koch(nivel, color, x_A, y_A, x_B, y_B);
  fractal_koch(nivel, color, x_B, y_B, x_C, y_C);
  fractal_koch(nivel, color, x_C, y_C, x_A, y_A);
}

function fractal_koch(nivel,color,x_0, y_0, x_n, y_n) {
  if(nivel>0){
    var x_a = x_0 + ( x_n - x_0 ) / 3;
    var y_a = y_0 + ( y_n - y_0 ) / 3;
    var x_b = x_0 + ( ( x_n - x_0 ) * 2 ) / 3;
    var y_b = y_0 + ( ( y_n - y_0 ) * 2 ) / 3;
    var x_c = x_0 + ( x_n - x_0 ) / 2 + ( ( y_n - y_0 ) * Math.sqrt(3) ) / 6;
    var y_c = y_0 + ( y_n - y_0 ) / 2 - ( ( x_n - x_0 ) * Math.sqrt(3) ) / 6;
    fractal_koch(nivel-1,color,x_0,y_0,x_a,y_a);
    fractal_koch(nivel-1,color,x_a,y_a,x_c,y_c);
    fractal_koch(nivel-1,color,x_c,y_c,x_b,y_b);
    fractal_koch(nivel-1,color,x_b,y_b,x_n,y_n);
  } else {
    dibujarLinea(color,x_0, y_0, x_n, y_n);
  }
}

// 2. Sierpinski's Triangle
// 2. Triangulo de Sierpinski

function fractal_sierpinski_0(){
  limpiarLienzo();
  fractal_sierpinski(nivel, color, x_A, y_A, x_B, y_B);
}

function fractal_sierpinski(){
  if(nivel>0){

  }
}
