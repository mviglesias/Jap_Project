// mostrar los productos seleccionados
let productos = []
function wantedProducts() {
    let htmlContentToAppend = "";
    for(article of productos){
       let i = 1
      htmlContentToAppend   +=
    `<div>
    <hr>
    <h4>${article.name}</h4>
    <img src="${article.src}" alt="">
    <p> Precio: ${article.currency} ${article.unitCost}</p>
    Cantidad <input class="cantidad" type="number" min="1" value = ${article.count} id="${i}" oninput=
    "subtotal(this.value,${article.unitCost},${i},'${article.currency}')">
    <br>
  <span>Subtotal <span class= "subtotal" id="subtotal${i}">${article.currency} ${article.unitCost * article.count}</span>
   </span>
   <br>
   <button type="button" class="btn btn-danger" style="size:1cm;" onclick= "quitar()">X</button>
   <hr>
  </div> `
    i++;
    }
    document.getElementById("wantedItems").innerHTML = htmlContentToAppend;

}
// actualiza los subtotales
function subtotal(count,unitCost,id,currency) {
  let subtotal = count*unitCost;
  document.getElementById("subtotal" + id).innerHTML= currency + " " + subtotal;
  totalCompra()
}

function totalCompra () {
  let total = "";
let listaSub = document.getElementsByClassName("subtotal");

for (let subtotal of listaSub){
    
  console.log(subtotal.innerHTML) 
  // hay que sacar el UYU, usar el precio
  total += subtotal.innerHTML.replace("UYU"," ");
} console.log(total)
let htmlContentToAppend = `UYU ${total}`
  document.getElementById("total").innerHTML= htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
        productos =  resultObj.data.articles
          console.log(productos)
          wantedProducts(productos)
          totalCompra ()
        }
      });
  
    });