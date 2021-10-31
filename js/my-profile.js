// función que guarda los datos del usuario ingresados en los campos.
function camposPerfil() {
//  objeto
      let perfil = {}
     perfil.nombre = document.getElementById('Nombre').value
     perfil.apellido = document.getElementById('Apellido').value
     perfil.telefono = document.getElementById('Telefono').value
     perfil.email = document.getElementById('InputEmail').value
     perfil.age = document.getElementById('bday').value
    // guarda en el local storage, guardar en JSON
    localStorage.setItem("info",JSON.stringify(perfil))
    // obtener datos
    let infoUser = localStorage.getItem("info")
    // notificación para el usuario
    alert("Cambios guardados")
    console.log(infoUser)
}

// funcion extra para calcular la edad del usuario a partir de su fecha de nacimiento.
function calcularEdad(fecha) {
    var hoy = new Date();
    var bday = new Date(fecha);
    var edad = hoy.getFullYear() - bday.getFullYear();
    var m = hoy.getMonth() - bday.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < bday.getDate())) {
        edad--;
    }
    console.log(edad) 
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    // muestra los datos ingresados por el usuario.
  let perfil = JSON.parse(localStorage.getItem("info"))
    if (perfil != null){
        document.getElementById('Nombre').value = perfil.nombre 
        document.getElementById('Apellido').value = perfil.apellido
        document.getElementById('Telefono').value = perfil.telefono
        document.getElementById('InputEmail').value = perfil.email 
        document.getElementById('bday').value = perfil.age
    }
    // realiza calculo de la edad del usuario.
    let age = document.getElementById('bday').value 
    calcularEdad(age)
});