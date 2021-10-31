let ASC_PRICE = "MENOR COSTO";
let DESC_PRICE = "MAYOR COSTO";
const ORDER_BY_COUNT = "Productos destacados.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
redi();

function sortPrice(criteria, array) {
  let result = [];
  if (criteria === ASC_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === DESC_PRICE) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) {
        return -1;
      }
      if (a.cost < b.cost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_COUNT) {
    result = array.sort(function (a, b) {
      let aCount = parseInt(a.soldCount);
      let bCount = parseInt(b.soldCount);

      if (aCount > bCount) {
        return -1;
      }
      if (aCount < bCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}

function showProductsList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (
      (minCount == undefined ||
        (minCount != undefined && parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
    ) {
      htmlContentToAppend +=
        
    ` <div class="col-md-2">
    <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
      <img class="bd-placeholder-img card-img-top" src="${product.imgSrc}">
      <h3 class="m-3">${product.name}</h3>
      <div class="card-body">
        <p class="card-text"> ${product.description}</p>
        <span id="precio" class="badge bg-warning text-dark">` +
        product.cost +
        product.currency +
        `</span>  <p  class="badge bg-secondary text-light" > Únidades vendidas ` +
        product.soldCount +
        `</p>
      </div>
      </div>`
      document.getElementById("productos").innerHTML = htmlContentToAppend;
    }
  }
}

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }

  currentProductsArray = sortPrice(currentSortCriteria, currentProductsArray);
  showProductsList();
}

    
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      sortAndShowProducts(ASC_PRICE, resultObj.data);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    sortAndShowProducts(ASC_PRICE);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    sortAndShowProducts(DESC_PRICE);
  });

  document.getElementById("sortByCount").addEventListener("click", function () {
    sortAndShowProducts(ORDER_BY_COUNT);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterCountMin").value = "";
      document.getElementById("rangeFilterCountMax").value = "";

      minCount = undefined;
      maxCount = undefined;

      showProductsList();
    });

  document
    .getElementById("rangeFilterCount")
    .addEventListener("click", function () {
      //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
      //de productos por categoría.
      minCount = document.getElementById("rangeFilterCountMin").value;
      maxCount = document.getElementById("rangeFilterCountMax").value;

      if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
        minCount = parseInt(minCount);
      } else {
        minCount = undefined;
      }

      if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
        maxCount = parseInt(maxCount);
      } else {
        maxCount = undefined;
      }

      showProductsList();
    });
    
  });