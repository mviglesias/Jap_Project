//  consguir info
 var getJSONData = function(){
    var result = {};
    return fetch("https://japdevdep.github.io/ecommerce-api/product/all.json")
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}
// hacer muestra de productos en el body
var productsArray = [];

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                <h3 class="mb-4">`+ product.name +`</h4>
                    <div class="d-flex w-100 justify-content-between"> ` + product.description +`
                    <span id="precio" class="badge bg-warning text-dark">` + product.cost+ product.currency +`</span> 
                    </div>
                    <span><br><br></span>
                    <div>
                    <p  class="badge bg-secondary text-light" > Únidades vendidas `+ product.soldCount+`</p>
                   </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("productos").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
});