////////////////////// Start Var CRUD ////////////////////////
let productNameInput = document.getElementById('ProductName');
let ProductCatagoryInput = document.getElementById('ProductCatagory');
let productPriceInput = document.getElementById('ProductPrice');
let productDescriptionInput = document.getElementById('ProductDescription');
let btnAddProduct = document.getElementById('addBtn');
let btnClearProduct = document.getElementById('clearBtn');
let inputs = document.getElementsByClassName('form-control');
let productsList = [];
let currentIndex = 0;


///////////////////// Stert Rajex validtion ////////////////////
let alertName = document.getElementById('alertName');
let alertCatagory = document.getElementById('alertCatagory');
let alertPrice = document.getElementById('alertPrice');
let alertDesc = document.getElementById('alertDesc');
///////////////////// End Rajex validtion ///////////////////


////////////////////// End Var CRUD ////////////////////////


////////////////////// Start Fun CRUD ////////////////////////
if (localStorage.getItem('products') == null) {
    let productsList = [];
} else {
    productsList = JSON.parse(localStorage.getItem('products'))
    displayProducts()
}
btnAddProduct.onclick = function() {
    if (btnAddProduct.innerHTML == 'Add Product') {
        addProduct();
        clearForm()
    } else {
        updateProduct();
        clearForm()
        btnAddProduct.innerHTML = 'Add Product'
    }
    displayProducts();
}
btnClearProduct.onclick = function() {
        clearForm()
    }
    ////////////////// Add Products ////////////////////////////
function addProduct() {
    let productAll = {
        productName: productNameInput.value,
        productCategory: ProductCatagoryInput.value,
        productPrice: productPriceInput.value,
        productDesc: productDescriptionInput.value,
    }
    productsList.push(productAll);
    localStorage.setItem('products', JSON.stringify(productsList));
    console.log(productsList)
}

function displayProducts() {
    let containerData = "";

    for (let i = 0; i < productsList.length; i++) {
        containerData += `
        <tr>
            <td>${[i]}</td>
            <td>${productsList[i].productName}</td> 
            <td>${productsList[i].productCategory}</td>
            <td>${productsList[i].productPrice}</td>
            <td>${productsList[i].productDesc}</td>
            <td><button onclick="deleteProduct(${i})"  class="btn btn-outline-danger"> Delete </button></td>
            <td><button  onclick="getProductInfo(${i})"  class="btn btn-outline-warning"> Update </button> </td>
        </tr>`
    }
    document.getElementById('tbodyProductData').innerHTML = containerData;
};
///////// Stert clearForm  /////////////

function clearForm() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}
///////// End clearForm  /////////////

///////// Stert delete Product  /////////////

function deleteProduct(indexDelete) {
    productsList.splice(indexDelete, 1)
    displayProducts()
    localStorage.setItem('products', JSON.stringify(productsList));
}
///////// End delete Product  /////////////

///////// Stert search Product  /////////////

function search(searchTxt) {
    let containerData = "";
    for (let i = 0; i < productsList.length; i++) {
        if (productsList[i].productName.toLowerCase().includes(searchTxt.toLowerCase())) {
            containerData += `
            <tr>
                <td>${[i]}</td>
                <td>${productsList[i].productName}</td> 
                <td>${productsList[i].productCategory}</td>
                <td>${productsList[i].productPrice}</td>
                <td>${productsList[i].productDesc}</td>
                <td><button onclick="deleteProduct(${i})"  class="btn btn-outline-danger"> Delete </button></td>
                <td><button class="btn btn-outline-warning"> Update </button> </td>
            </tr>`
        }
    }
    document.getElementById('tbodyProductData').innerHTML = containerData;


}
///////// End search Product  /////////////

///////// Stert getProductInfo  /////////////

function getProductInfo(index) {
    currentIndex = index;
    let produact = productsList[index];
    productNameInput.value = produact.productName;
    ProductCatagoryInput.value = produact.productCategory;
    productPriceInput.value = produact.productPrice;
    productDescriptionInput.value = produact.productDesc;
    btnAddProduct.innerHTML = 'Update Prodauct'
}

///////// End getProductInfo  /////////////

///////// Stert update Products /////////////

function updateProduct() {
    let productAll = {
        productName: productNameInput.value,
        productCategory: ProductCatagoryInput.value,
        productPrice: productPriceInput.value,
        productDesc: productDescriptionInput.value,
    }
    productsList[currentIndex].productName = productAll.productName;
    productsList[currentIndex].productCategory = productAll.productCategory;
    productsList[currentIndex].productPrice = productAll.productPrice;
    productsList[currentIndex].productDesc = productAll.productDesc;
    localStorage.setItem('products', JSON.stringify(productsList));


}
///////// End update Products /////////////

productNameInput.onkeyup = function() {
    let nameRejax = /^[A-Z][a-z]{2,8}$/
    if (nameRejax.test(productNameInput.value)) {
        btnAddProduct.removeAttribute('disabled');
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid');
        alertName.classList.add('d-none')
    } else {
        productNameInput.classList.add('is-invalid');
        productNameInput.classList.remove('is-valid');
        alertName.classList.remove('d-none')

    }
    console.log(nameRejax.test(productNameInput.value))
}

ProductCatagoryInput.onkeyup = function() {
    let categRejax = /^[A-Z][a-z]{1,8}$/
    if (categRejax.test(ProductCatagoryInput.value)) {
        btnAddProduct.removeAttribute('disabled');
        ProductCatagoryInput.classList.add('is-valid');
        ProductCatagoryInput.classList.remove('is-invalid');
        alertCatagory.classList.add('d-none')
    } else {
        ProductCatagoryInput.classList.add('is-invalid');
        ProductCatagoryInput.classList.remove('is-valid');
        alertCatagory.classList.remove('d-none')

    }
    console.log(categRejax.test(ProductCatagoryInput.value))
}
productPriceInput.onkeyup = function() {
    let priceRejax = /^\d{0,8}(\.\d{1,4})?$/
    if (priceRejax.test(productPriceInput.value)) {
        btnAddProduct.removeAttribute('disabled');
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid');
        alertPrice.classList.add('d-none')
    } else {
        productPriceInput.classList.add('is-invalid');
        productPriceInput.classList.remove('is-valid');
        alertPrice.classList.remove('d-none')

    }
    console.log(priceRejax.test(productPriceInput.value))
}
productDescriptionInput.onkeyup = function() {
        let descRejax = /^[a-z]| {5,10}$/
        if (descRejax.test(productDescriptionInput.value)) {
            btnAddProduct.removeAttribute('disabled');
            productDescriptionInput.classList.add('is-valid');
            productDescriptionInput.classList.remove('is-invalid');
            alertDesc.classList.add('d-none')
        } else {
            productDescriptionInput.classList.add('is-invalid');
            productDescriptionInput.classList.remove('is-valid');
            alertDesc.classList.remove('d-none')

        }
        console.log(descRejax.test(productDescriptionInput.value))
    }
    ////////////////////// End Fun CRUD ////////////////////////
    ////////////////////// End Fun CRUD ////////////////////////