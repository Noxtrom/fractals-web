var check_koch = document.getElementById('koch');
var check_sierpinski = document.getElementById('sierpinski');
var dibujo = document.getElementById('fractal');
var lienzo = dibujo.getContext("2d");
var txt_nivel = document.getElementById('nivel');
var btn_subir = document.getElementById('btn-arriba');
var btn_bajar = document.getElementById('btn-abajo');
var btn_dibujar = document.getElementById('btn-dibujar');
var ancho = dibujo.width;
var alto = dibujo.height;
var color = "red";
var x_0_inicial = 50;
var x_n_inicial = ancho-50;
var y_0_inicial = ancho/2;
var y_n_inicial = ancho/2;

btn_dibujar.addEventListener('click', dibujar);

function dibujar(){
  if(check_koch.checked){
    fractal_koch_0();
  } else if(check_koch.checked){
    fractal_sierpinski_0();
  } else {
    alert("Elija uno de los fractales porfavor ;3");
  }
}

function dibujarLinea(color,x_0,y_0,x_n,y_n){
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.moveTo(x_0, y_0);
  lienzo.lineTo(x_n, y_n);
  lienzo.stroke();
  lienzo.closePath();
}

function limpiarLienzo(){
  lienzo.clearRect(0,0,ancho,alto);
}

function fractal_koch_0(){
  limpiarLienzo();
  fractal_koch(txt_nivel.value, color, x_0_inicial, y_0_inicial, x_n_inicial, y_n_inicial);
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