// esta funcion redirige si no se realiza logIn
redi();


function showImagesGallery(array) {
  let htmlContentToAppend = "";
 
    htmlContentToAppend +=

     ` <div class="carousel-item active">
           
         <img src="${array[0]}"  alt="...">
         </div> `
         for (let i = 1; i < array.length; i++) {
          let imageSrc = array[i];
          htmlContentToAppend +=
          ` <div class="carousel-item">
          <img src="${imageSrc}"  alt="...">
          </div> `

    document.getElementById("imgpro").innerHTML = htmlContentToAppend;
  }
}
// muestra los productos recomendados
function recomendados(product) {
  getJSONData(PRODUCTS_URL).then((response) => {
    let dataprods = response.data;
    console.log(response)
    htmlContentToAppend = "";
    for (let i = 0; i < product.relatedProducts.length; i++) {
     
      htmlContentToAppend +=
      
       `<div class="col-3 flex">
       <h6>${dataprods[product.relatedProducts[i]].name}</h6>
       <img src ="${dataprods[product.relatedProducts[i]].imgSrc}" class="img-thumbnail">
       </div>`
      
      document.getElementById("recomendado").innerHTML = htmlContentToAppend;
    
    }
  });
}

// funciones de la seccion de comentarios.
function mostrarComentarios(array) {
  let htmlContentToAppend = "";
  let star = `<span class="fa fa-star checked"></span>`;

  for (let i = 0; i < array.length; i++) {
    let comment = array[i];

    htmlContentToAppend +=
      `<div class="list-group-item list-group-item-action container p-md-5">
         <h4> ` +
      comment.user +
      `</h4>
         <p>` +
      comment.description +
      `</p>
       <p>` +
      comment.dateTime +
      `</p>
       ` +
      star.repeat(comment.score) +
      `
        </div>`;

    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
  }
}
const estrellas = [...document.getElementsByClassName("calificar")];

function DefinirClasificacion(stars) {
  const starClassActive = "calificar fas fa-star";
  const starClassInactive = "calificar far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className === starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
function agregarComment(comment) {
  let nuevoComentario = document.getElementById("nc").value;
  let usuario = localStorage.getItem("nombre");
  let date = new Date();
  let dateTime =
    date.getFullYear() +
    "-" +
    date.getMonth() +
    "-" +
    date.getDate() +
    "  " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  let htmlContentToAppend = "";

  htmlContentToAppend +=
    `<div class="list-group-item list-group-item-action">
 <h4> ` +
    usuario +
    `</h4>
 <p>` +
    nuevoComentario +
    `</p>
<p>` +
    dateTime +
    `</p>
</div>`;
  document.getElementById("comentarios").innerHTML += htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML =
        document.getElementById("productDescription");
      let productsoldCountHTML = document.getElementById("productsoldCount");
      let productCostHTML = document.getElementById("productcost");
      let productCategoryHTML = document.getElementById("pcategoria");

      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productsoldCountHTML.innerHTML = product.soldCount + ` unidades vendidas`;
      productCostHTML.innerHTML = product.cost + product.currency;
      productCategoryHTML.innerHTML = product.category;

      //Muestro las imagenes en forma de galería
      showImagesGallery(product.images);
      recomendados(product)
     
    }
  });
});
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comment = resultObj.data;
      mostrarComentarios(comment);
      DefinirClasificacion(estrellas);
    }
  });
});
