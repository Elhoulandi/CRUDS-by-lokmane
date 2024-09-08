let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create' ;
let temp ;
let menu = document.getElementById('menu');
let btnMenu = document.getElementById('btnMenu');
let btnHide = document.querySelector('.hide');


// get total price 
function getTotale() 
{
  if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
    total.innerHTML  = result;
    total.style.background = '#040' ;
  }else{
    total.innerHTML = '';
    total.style.background = '#a00d02';
  }
}


// create product

let dataPro;
if (localStorage.product != null){
  dataPro = JSON.parse(localStorage.product);
}else{
  dataPro = [];
}





submit.onclick = function(){
  let newPro = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  };
  
  
  
  
  if(title.value != '' && price.value != '' && category.value != '' && newPro.count < 100 ){
      if(mood === 'create'){
    if(newPro.count > 1){
    for(let i = 1; i < newPro.count;i++){
      dataPro.push(newPro);
    }
  }else{
    dataPro.push(newPro);
    clearData();
  }
  }else{
    dataPro[ temp  ] = newPro ;
    mood = 'create';
    submit.innerHTML = 'create';
    count.style.display = 'block';
    
  }
  
  }

  
  
  
  //save data on local storage
  localStorage.setItem('product',    JSON.stringify(dataPro)   );
  
  
  
  showData();
  
};













// clear inputs values added by user

function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}







//read data (products)

function showData(){
  getTotale();
  let table = '';
  for(let i = 0; i < dataPro.length;i++){
    table += `
    <tr>
    <td>${i+1}</td>
   <td>${dataPro[i].title}</td>
   <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
   <td>${dataPro[i].discount}</td>
   <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
 <td><button onclick="updateData(${i})" id="update">update</button></td>
  <td><button onclick="deleteData(${i})" id="delete">delete</button>  </td>
  </tr>
    `;
    
  }
  
document.getElementById('tbody').innerHTML = table;
let btnDelete = document.getElementById('deleteAll');
if(dataPro.length > 0){
  btnDelete.innerHTML = `
  <button onclick="deleteAll()">delete All (${dataPro.length })</button>
  `;
}else {
   btnDelete.innerHTML = '';
}



}
showData();



//count






// delete data (products)
function deleteData(i)
{
  dataPro.splice(i,1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
// delete all data (products)
function deleteAll(){
  localStorage.clear();
  dataPro.splice(0);
  showData();
}





// update data (products)
function updateData(i){
title.value = dataPro[i].title;
price.value = dataPro[i].price;
taxes.value = dataPro[i].taxes;
ads.value = dataPro[i].ads;
discount.value = dataPro[i].discount;
getTotale();
count.style.display = 'none';
category.value = dataPro[i].category;
submit.innerHTML = 'Update';
mood = 'update' ;
temp = i ;
scroll({
  top:0,
  behavior:'smooth',
})
}


// search data (products)
let searchMood = 'title';
function getSearchMood(id)
{
  let search = document.getElementById('search');
  if(id == 'searchTitle'){
    searchMood = 'title' ;
    search.placeholder = 'Search By Title';
  }else{
    searchMood = 'category' ;
        search.placeholder = 'Search By Category';
  }
  search.focus();
  search.value = '';
  showData();
  
}



function searchData(value)
{
  let table = '';
  if(searchMood == 'title'){
    
 for(let i = 0; i < dataPro.length;i++){
   if(dataPro[i].title.includes(value.toLowerCase())){
  table += `
    <tr>
    <td>${i}</td>
   <td>${dataPro[i].title}</td>
   <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
   <td>${dataPro[i].discount}</td>
   <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
 <td><button onclick="updateData(${i})" id="update">update</button></td>
  <td><button onclick="deleteData(${i})" id="delete">delete</button>  </td>
  </tr>
    `;
   }
 }
    
    
    
    
    
    
  }else{
    for(let i = 0; i < dataPro.length;i++){
   if(dataPro[i].category.includes(value.toLowerCase())){
  table += `
    <tr>
    <td>${i}</td>
   <td>${dataPro[i].title}</td>
   <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
     <td>${dataPro[i].ads}</td>
   <td>${dataPro[i].discount}</td>
   <td>${dataPro[i].total}</td>
  <td>${dataPro[i].category}</td>
 <td><button onclick="updateData(${i})" id="update">update</button></td>
  <td><button onclick="deleteData(${i})" id="delete">delete</button>  </td>
  </tr>
    `;
   }
 }
  }
  document.getElementById('tbody').innerHTML = table;
}


// menu decoration
function showMenu(){
    document.getElementById('menu').style.transform = 'translateX(150px)';
  menu.style.transition = '0.5s';
  btnMenu.style.display = 'none';
  btnHide.style.transition = '1s';
  btnHide.style.display = 'inline';
  btnHide.style.transform = 'translateX(160px)';
}

btnHide.onclick = function(){
  menu.style.transform = 'translateX(-150px)';
  menu.style.transition = '0.5s';
  btnMenu.style.display = 'inline';
  btnHide.style.display = 'none'
  
  
};






