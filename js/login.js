// conseguir info de usuario
function userStorage() {
    let userName = document.getElementById("nombreU").value;
 localStorage.setItem("nombre", userName); 
  };
// transmite la indo para mostrar en la navbar
  function showUser() {
  var UnavName = localStorage.getItem("nombre");
  document.getElementById("perfil").innerHTML = UnavName;
  };
  
  document.addEventListener("DOMContentLoaded", function(e){
showUser();
  
  });
  