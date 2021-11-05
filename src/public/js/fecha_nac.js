const fechaNacimiento = document.getElementById("fechaNacimiento");
  const edad_ = document.getElementById("edad_");

  window.addEventListener('load', function(){
  fechaNacimiento.addEventListener('change', function(){
  console.log(this.value);
  });

  });






  //------------------------------------

  const fechaNacimiento = document.getElementById("fechaNacimiento");
  const edad_ = document.getElementById("edad_");

  const calcularedad = (fechaNacimiento) =>{

    const fechaActual = new Date();
    const anoActual = parseInt(fechaActual.getFullYear());
    const mesActual = parseInt(fechaActual.getMonth() + 1);
    const diaActual = parseInt(fechaActual.getDay());

    //format 2021-12-22

    const anoNaciemiento = parseInt(String(fechaNacimiento).substring(0, 4));
    const mesNaciemiento = parseInt(String(fechaNacimiento).substring(5, 7));
    const diaNaciemiento = parseInt(String(fechaNacimiento).substring(8, 10));

    let edad_ = anoActual - anoNaciemiento;

    if(mesActual < mesNaciemiento){
      edad_--;
    }else if(mesActual = mesNaciemiento){
      if(diaActual < diaNaciemiento){
        edad_;
      }
    }
    return edad_;
    console.log(edad_);

  };

    window.addEventListener('load', function(){

    fechaNacimiento.addEventListener('change', function(){
      
      if(this.value){
        edad_.innerText = `${calcularedad(this.value)}`;
      }

    });
  });