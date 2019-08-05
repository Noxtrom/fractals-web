var r_1 = document.getElementById('radio-1');
var r_2 = document.getElementById('radio-2');
var r_3 = document.getElementById('radio-3');
var radios = [r_1, r_2, r_3];
var menu = [r_1.parentElement, r_2.parentElement, r_3.parentElement];

r_1.checked = "true";

var num=0;

for(var i=0;i<menu.length;i++){
  menu[i].addEventListener('click', function comprobar() {
    num++;
    console.log("Veces ejecutado: " + num);
    // TODO Idk why this runs twice ;-;
    // TODO No se porque se ejecuta 2 veces ;-;
    for (var i = 0; i < menu.length; i++) {
      console.log("Comprobando menu " + (i + 1));
      if (menu[i].children[1].checked) {
        menu[i].classList.add("active");
        menu[i].children[0].setAttribute("src", "img/" + (i + 1) + ".png");
        console.log("Se selecciono el menu " + (i + 1));
      } else {
        menu[i].classList.remove("active");
        menu[i].children[0].setAttribute("src", "img/" + (10 * (i + 1)) + ".png");
        console.log("Se deselecciono el menu " + (i + 1))
      }
    }
  });
  console.log("Evento "+(i+1)+" añadido");
}

