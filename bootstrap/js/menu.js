var r_1 = document.getElementById('radio-1');
var r_2 = document.getElementById('radio-2');
var r_3 = document.getElementById('radio-3');
var l_1 = document.getElementById('label-1');
var l_2 = document.getElementById('label-2');
var l_3 = document.getElementById('label-3');
var radios = [r_1, r_2, r_3];
var labels = [l_1, l_2, l_3];

r_1.checked="true";

for(var i=0;0<labels.length;i++){
  _switch(i);
}

function _switch(i) {
  labels[i].addEventListener('click', function(){
    if(!radios[i].checked){
      if(radios[i].checked){
        labels.splice(i,1);
      }
      for(var j=0; j<labels.length; j++){
        labels[j].classList.remove("active");
      }
      labels[i].classList.add("active");
      labels.push(labels[i]);
      labels.sort();
    }
    labels[i].classList.add("active");
  })
}