let title=document.getElementById('title')
let price=document.getElementById('price')
let ads=document.getElementById('ads')
let taxes=document.getElementById('taxes')
let discount=document.getElementById('discount')
let category=document.getElementById('category')
let count=document.getElementById('count')
let total=document.getElementById('total')
let submit=document.getElementById('submit')
let mood="create"//دا تبع لما يعمل create & update
let min;//اد متغير وهمي علشان يكون ظاهر لكل الدوال اللي عندي واستخدمه في الداله بتاعت update
function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value
        total.innerHTML= result;
        total.style.background ='green';
    }else{
        total.innerHTML= '';
        total.style.background ='#950d0d';
    }
}
let dataPro;
if(localStorage.product != null){
    dataPro=JSON.parse(localStorage.product)
}else{
    dataPro=[];
}
//let dataPro=[];دي كدة اسبدلناها بالمتغير اللي شبها فوق داز
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
    }
    if(title.value !='' && price.value !='' && category.value !=''
        && newPro.count <100
    ){
            if(mood === 'create'){
        if(newPro.count > 1){
            for(let i=0; i<newPro.count; i++ ){
            dataPro.push(newPro)
            }
        }else{
            dataPro.push(newPro)
        }
    }else{
        dataPro[min]=newPro; //ساوتها بي Array اللي عندي
        mood='create';
        submit.innerHTML='Create';
        count.style.display='block';
        total.style.background='#950d0d';

    }
    clearData()
    }

    
    //dataPro.push(newPro)دي احنا رفعناها لفوق في قلب اللوب علشان يعمللي بعدد التكرار بدلا من مرة واحدة
    localStorage.setItem('product',JSON.stringify(dataPro))
    
    showData()
}
function clearData(){
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}
function showData(){
    let table = '';
    for(let i =0; i < dataPro.length; i++){
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
            <td><button onclick='updateData(${i})' id="update">update</button></td>
            <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML=table;
    let btnDelete = document.getElementById('deleteAll')
    if (dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick = "deleteAll()" >delete All (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML ='';
    }
}
showData()


function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    taxes.value = dataPro[i].taxes;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display= 'none';
    getTotal()
    submit.innerHTML="Update"
    mood="update"
    min=i;
    scroll({
        top:0,
        behavior:'smooth',
    })

}
let searchMood= 'title';
function getSearchgMood(id){
    let search =document.getElementById('search');
    if (id=='searchTitle'){
        searchMood= 'title';
        //search.placeholder='Search By Titel';
    }else{
        searchMood= 'category';
        //search.placeholder='Search By Category';
    }
    search.placeholder='Search By '+ searchMood;
    search.focus()
    search.value='';
    showData()

}
function searchData(value){
    let table='';
     for(let i =0; i < dataPro.length; i++){
    if(searchMood=='titel'){
        //for(let i =0; i < dataPro.length; i++){
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
                    <td><button onclick='updateData(${i})' id="update">update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                </tr>
                `;

            }
        }

    else{
         //for(let i =0; i < dataPro.length; i++){
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
                    <td><button onclick='updateData(${i})' id="update">update</button></td>
                    <td><button onclick='deleteData(${i})' id="delete">delete</button></td>
                </tr>
                `;

            }
        }

    }
    document.getElementById('tbody').innerHTML=table;

}









