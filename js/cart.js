var cart_product = JSON.parse(localStorage.getItem("id")) || [];
function render() {
    let body = document.getElementsByTagName('tbody')[0];
    let total = 0;
    let html = cart_product.map((item)=>{
        let image = item.name.split(' ').join('_');
        total += item.cost * item.quantity
        return `<tr>
                    <th scope="row"><img src="../img/${image}.jpg" class="img-rounded">${item.name}</th>
                    <td>${item.cost}</td>
                    <td>
                        <button type="button" class="btn sub" data-name="${item.name}">-</button>
                        ${item.quantity}
                        <button type="button" class="btn add" data-name="${item.name}">+</button>

                    </td>
                    <td>${item.cost * item.quantity} $</td>
                </tr>`;
    });
    body.innerHTML = html.join('');
    document.getElementById('total').innerHTML = `Total: ${total} $`;
}
render();


let arrAddButton = document.getElementsByClassName('add');
let arrSubButton = document.getElementsByClassName('sub');
for(let i = 0; i < arrAddButton.length; i++){
    arrAddButton[i].addEventListener('click', function(event){
        let addButton = event.target;
        let name = addButton.dataset.name;
        let items = JSON.parse(localStorage.getItem("id"));
        items.forEach(item => {
            if(item.name == name)++item.quantity;
        });
        localStorage.setItem('id',JSON.stringify(items));
        location.reload();
    })
}
for(let i = 0; i < arrSubButton.length; i++){
    arrSubButton[i].addEventListener('click', function(event){
        let subButton = event.target;
        let name = subButton.dataset.name;
        let items = JSON.parse(localStorage.getItem("id"));
        items.forEach((item,i) => {
            if(item.name == name) --item.quantity;
            if(item.quantity == 0){
                items.splice(i, 1);
            }
        });
        localStorage.setItem('id',JSON.stringify(items));
        location.reload();
    })
}

let checkOutButton = document.getElementById('checkout');

checkOutButton.addEventListener('click', function(){
    alert('Payment successful!');
    localStorage.setItem('id','[]');
    location.reload();
});