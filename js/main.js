var product = [
    {id:1, name:'Nite Jogger Pride Shoes', href:'Nite_Jogger_Pride_Shoes_White.html', cost:85},
    {id:2, name:'Nite Jogger Shoes Black', href:'Nite_Jogger_Shoes_Black.html', cost:153},
    {id:3, name:'Nizza Shoes Black', href:'Nizza_Shoes_Black.html', cost:190},
    {id:4, name:'NMD R1 Pride Shoes', href:'NMD_R1_Pride_Shoes.html', cost:98},
    {id:5, name:'NMD R1 SHOES', href:'NMD_R1_Shoes.html', cost:140},
    {id:6, name:'NMD R1 Shoes Black', href:'NMD_R1_Shoes_Black.html', cost:1159},
    {id:7, name:'NMD R1 Shoes Grey', href:'NMD_R1_Shoes_Grey.html', cost:90},
    {id:8, name:'Stan Smith Shoes', href:'Stan_Smith_Shoes.html', cost:110},
    {id:9, name:'Stan Smith Shoes White', href:'Stan_Smith_Shoes_White.html', cost:115},
    {id:10, name:'Superstan Shoes White', href:'Superstan_Shoes_White.html', cost:990},
    {id:11, name:'Superstar Shoes White', href:'Superstar_Shoes_White_FV2819.html', cost:200},
    {id:12, name:'Swift Run X Shoes Black', href:'Swift_Run_X_Shoes_Black.html', cost:200},
    {id:13, name:'Swift Run X Shoes Blue', href:'Swift_Run_X_Shoes_Blue.html', cost:1157},
    {id:14, name:'Continental 80 Shoes', href:'Continental_80_Shoes.html', cost:205}
];


document.addEventListener('DOMContentLoaded', function() {
    let myInput = document.getElementById('myInput');
    function render(items) {
        var html = document.getElementsByClassName('containers')[0];
        // lồng các obj vào html
        var htmlItems = items.map(item => {
            return `<div class="container_item">
                        <div class="image_item image${item.id}"></div>
                        <div class="overlay"></div>
                        <div class="add_cart" data-id="${item.id}" data-name="${item.name}" data-cost="${item.cost}">
                          <i class="fa fa-cart-plus" aria-hidden="true"></i>
                        </div>
                        <div class="detail">
                            <p class="name_item"><a href="./${item.href}">${item.name}</a></p>
                            <p class="cost_item">${item.cost}$</p>
                        </div>
                    </div>`;
        });
        html.innerHTML = htmlItems.join('');
    }
    render(product); // render lần đầu tất cả sản phẩm
    myInput.addEventListener('keyup', function(){
        var key_item = myInput.value;// lấy từ khoá từ thanh input
        // lọc từ khoá
        var items = product.filter(item => {
            return item.name.toLowerCase().indexOf(key_item.toLowerCase()) !== -1;
        });
        render(items);// render lại cái sản phẩm
    });


    let itemsID = document.getElementsByClassName("add_cart"); // lấy mảng sản phẩm
    for(let i = 0; i < itemsID.length; i++){ // lặp tất cả để thêm sự kiện click
        itemsID[i].addEventListener('click', ()=>{
            let id = itemsID[i].dataset.id;
            let name = itemsID[i].dataset.name;
            let cost = itemsID[i].dataset.cost;

            let cart_product = JSON.parse(localStorage.getItem("id")) || [];
            let exits = cart_product.findIndex(el => el.id == id);

            if(exits !== -1){
                ++cart_product[exits].quantity;
            } else {
                cart_product.push({id:id, name:name, cost:cost, quantity:1});
            }
            alert('Product successfully added to cart!');
            localStorage.setItem('id',JSON.stringify(cart_product));
        
        })
    }
});