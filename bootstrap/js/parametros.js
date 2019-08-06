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

var x_A = ancho*3/4;
var y_A = ancho*2/3;
var x_B = ancho - x_A;
var y_B = y_A;
var x_C = x_B + ( x_A - x_B ) / 2;
var y_C = y_A - ( x_A - x_B ) * Math.sqrt(3) / 2;

// var x_A = ancho/4;
// var y_A = ancho/3;
// var x_B = ancho - x_A;
// var y_B = y_A;
// var x_C = x_A + ( x_B - x_A ) / 2;
// var y_C = y_A + ( x_B - x_A ) * Math.sqrt(3) / 2;

var input_color = document.getElementById('entrada_color');
var color;

// Radio Buttons
// Botonos de Radio
var radio_1 = document.getElementById('radio-1');
var radio_2 = document.getElementById('radio-2');
var radio_3 = document.getElementById('radio-3');
var radios = [radio_1, radio_2, radio_3];

// Textboxes
// Cajas de textos
var txt_nivel = document.getElementById('nivel');
var txt_rojo = document.getElementById('rojo');
var txt_verde = document.getElementById('verde');
var txt_azul = document.getElementById('azul');

// Checkboxes
// Cajas de Verificacion
var check_auto = document.getElementById('check-auto');

// Butttons
// Botones
var btn_aumentar = document.getElementById('btn-arriba');
var btn_disminuir = document.getElementById('btn-abajo');
var btn_dibujar = document.getElementById('btn-dibujar');
var btn_menu = document.getElementById('btn-menu');

// Auxiliary 2
// Auxiliares 2
var menu = [radio_1.parentElement, radio_2.parentElement, radio_3.parentElement];
var nombre = document.getElementById('titulo');
var fractales = ["Copo de Nieve de Koch", "Triangulo de Sierpinski", "Copo de Nieve de Koch Invertido"];
var num = 0;
var menu_parametros = document.getElementById('parametros');
var altura_parametros = menu_parametros.offsetHeight + "px";
console.log("La altura inicial de parametros es: "+altura_parametros);
if(screen.width<576){
  menu_parametros.style.maxHeight = 0;
  console.log("xs");
}

// Images
// Imagenes

var img_1 = document.getElementById('img-1');
var img_2 = document.getElementById('img-2');
var img_3 = document.getElementById('img-3');
var imgs = [img_1, img_2, img_3];

// Levels
// ------
// The code of Koch's Snowflake generates ( 4 ^ level + 1 ) points, that's why the browser may
// crash if you use a higher value

// Niveles
// -------
// El codigo del Copo de Nieve de Koch genera ( 4 ^ nivel + 1 ) puntos, por eso no es recomendable
// dibujar a un nivel muy alto pues puede hacer que el navegador crashee

var nivel_max = 7;
var nivel_min = 0;
var nivel = txt_nivel.value;
if (nivel.value===""){
  nivel = nivel_min;
}

// VALUES
// Valores

radio_1.checked = "true";
check_auto.checked = "true";

// EVENTS
// EVENTOS

// Buttons' events
// Eventos de botones

btn_dibujar.addEventListener('click', dibujar);
btn_aumentar.addEventListener('click', aumentar);
btn_disminuir.addEventListener('click', disminuir);
btn_menu.addEventListener('click', mostrar);

// Color Events
// Eventos Color

input_color.addEventListener('change', elegir_color_hex);

// Textboxes' events
// Eventos de Cajas de Texto

txt_nivel.addEventListener('keyup', leer);
txt_rojo.addEventListener('keyup', elegir_color_rgb);
txt_verde.addEventListener('keyup', elegir_color_rgb);
txt_azul.addEventListener('keyup', elegir_color_rgb);

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
  if(txt_nivel.value>nivel_max){
    txt_nivel.value=nivel_max;
  }
  if(txt_nivel.value<nivel_min){
    txt_nivel.value=nivel_min;
  }
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
    txt_nivel.value=nivel;
    if(check_auto.checked){
      dibujar();
    }
  }
}

function disminuir(){
  if(nivel>nivel_min){
    nivel--;
    txt_nivel.value=nivel;
    if(check_auto.checked){
      dibujar();
    }
  }
}

function dibujar(){
  if(nivel<nivel_min || nivel>nivel_max){
    nivel=nivel_min;
    txt_nivel.value=nivel;
  }
  nivel=txt_nivel.value;
  if(radio_1.checked){
    fractal_koch_0();
  } else if(radio_2.checked){
    fractal_sierpinski_0();
  } else if (radio_3.checked) {
    fractal_koch_invertido_0();
  } else {
    alert("Elija uno de los fractales porfavor");
  }
}

// Menu Style Toggle Function
// Funcion para Alternar Estilo de Menu

for (var i = 0; i < menu.length; i++) {
  menu[i].addEventListener('click', function comprobar() {
    num++;
    console.log("Veces ejecutado: " + num);
    // TODO Idk why this runs twice ;-;
    // TODO No se porque se ejecuta 2 veces ;-;
    if(!check_auto.checked){
      txt_nivel.value=0;
      nivel=0;
    }
    for (var i = 0; i < menu.length; i++) {
      console.log("Comprobando menu " + (i + 1));
      if (menu[i].children[1].checked) {
        menu[i].classList.add("active");
        imgs[i].src="img/"+(i+1)+".png";
        nombre.innerHTML = "&laquo;" + fractales[i] + "&raquo;";
        console.log("Se selecciono el menu " + (i + 1));
      } else {
        menu[i].classList.remove("active");
        imgs[i].src="img/"+(10*(i+1))+".png";
        console.log("Se deselecciono el menu " + (i + 1))
      }
    }
    dibujar();
  });
  console.log("Evento 1-" + (i + 1) + " añadido");
}

// Parameters' Button Function
// Funcion del Boton de Parametros

function mostrar(){
  var mh = menu_parametros.style.maxHeight;
  console.log(mh);
  mh = (mh == "" || mh == "0px") ? altura_parametros : "0px";
  console.log(mh);
  menu_parametros.style.maxHeight = mh;
  console.log(menu_parametros.style.maxHeight);
}

// Color Functions
// Funciones de color

function elegir_color_hex(){
  color = input_color.value;
  var rgb = hexToRgb(color);
  txt_rojo.value = rgb.rChannel;
  txt_verde.value = rgb.gChannel;
  txt_azul.value = rgb.bChannel;
  if(check_auto.checked){
    dibujar();
  }
  console.log("color actualizado: "+color);
}

function elegir_color_rgb(){
  var r = txt_rojo.value;
  var g = txt_verde.value;
  var b = txt_azul.value;
  if(r<0){r=0;}
  if(r>255){r=255;}
  if(g<0){g=0;}
  if(g>255){g=255;}
  if(b<0){b=0;}
  if(b>255){b=255;}
  txt_rojo.value = r;
  txt_verde.value = g;
  txt_azul.value = b;
  color = fullColorHex(r, g, b);
  input_color.value = color;
  if (check_auto.checked) {
    dibujar();
  }
  console.log("color actualizado: " + color);
}

// Those functions: hexToRgb and rgbToHex, are from coderwall.com and campushippo.com respectively
// Estas funciones: hexToRgb y rgbToHex son de coderwall.com y campushippo.com respectivamente

function hexToRgb(color) {
  // Check for # infront of the value, if it's there, strip it
  if (color.substring(0, 1) == '#') {
    color = color.substring(1);
  }
  var rgbColor = {};
  // Grab each pair (channel) of hex values and parse them to ints using hexadecimal decoding
  rgbColor.rChannel = parseInt(color.substring(0, 2), 16);
  rgbColor.gChannel = parseInt(color.substring(2, 4), 16);
  rgbColor.bChannel = parseInt(color.substring(4), 16);
  return rgbColor;
}

var fullColorHex = function (r, g, b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return "#" + red + green + blue;
};

var rgbToHex = function (rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

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
  fractal_sierpinski(nivel, color, x_A, y_A, x_B, y_B, x_C, y_C);
}

function fractal_sierpinski(nivel, color, x_0, y_0, x_n, y_n, x_m, y_m) {
  if (nivel > 0) {
    var x_a = ( x_0 + x_n ) / 2;
    var y_a = ( y_0 + y_n ) / 2;
    var x_b = ( x_n + x_m ) / 2;
    var y_b = ( y_n + y_m ) / 2;
    var x_c = ( x_m + x_0 ) / 2;
    var y_c = ( y_m + y_0 ) / 2;
    fractal_sierpinski(nivel - 1, color, x_0, y_0, x_a, y_a, x_c, y_c);
    fractal_sierpinski(nivel - 1, color, x_a, y_a, x_n, y_n, x_b, y_b);
    fractal_sierpinski(nivel - 1, color, x_c, y_c, x_b, y_b, x_m, y_m);
  } else {
    dibujarLinea(color, x_0, y_0, x_n, y_n);
    dibujarLinea(color, x_n, y_n, x_m, y_m);
    dibujarLinea(color, x_m, y_m, x_0, y_0);
  }
}

// 3. Inverted Koch's Snowflake
// 3. Estrella de Koch Invertido

function fractal_koch_invertido_0() {
  limpiarLienzo();
  fractal_koch_invertido(nivel, color, x_A, y_A, x_B, y_B);
  fractal_koch_invertido(nivel, color, x_B, y_B, x_C, y_C);
  fractal_koch_invertido(nivel, color, x_C, y_C, x_A, y_A);
}

function fractal_koch_invertido(nivel,color,x_0, y_0, x_n, y_n) {
  if (nivel > 0) {
    var x_a = x_0 + (x_n - x_0) / 3;
    var y_a = y_0 + (y_n - y_0) / 3;
    var x_b = x_0 + ((x_n - x_0) * 2) / 3;
    var y_b = y_0 + ((y_n - y_0) * 2) / 3;
    var x_c = x_0 + (x_n - x_0) / 2 - ((y_n - y_0) * Math.sqrt(3)) / 6;
    var y_c = y_0 + (y_n - y_0) / 2 + ((x_n - x_0) * Math.sqrt(3)) / 6;
    fractal_koch_invertido(nivel - 1, color, x_0, y_0, x_a, y_a);
    fractal_koch_invertido(nivel - 1, color, x_a, y_a, x_c, y_c);
    fractal_koch_invertido(nivel - 1, color, x_c, y_c, x_b, y_b);
    fractal_koch_invertido(nivel - 1, color, x_b, y_b, x_n, y_n);
  } else {
    dibujarLinea(color, x_0, y_0, x_n, y_n);
  }
}

dibujar();
