
let item_db = [];
let itemId = 1;

const loadItemTable = () => {

    let tableBody = $('#itemTableBody');
    tableBody.empty();
   
    item_db.map((item, index) => {
        console.log(item);

        let data = `<tr>
            <td>${item.id}</td>        
            <td>${item.name}</td>        
            <td>${item.category}</td>        
            <td>${item.price}</td>        
            <td>${item.stock}</td>
            <td>
                 <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i> Update</button>
                 <button class="btn btn-sm btn-danger delete-btn-item" data-id="${item.id}"><i class="fas fa-trash"></i> Delete</button>
            </td>        
        </tr>`;
        $("#itemTableBody").append(data);
    });
};


// add Item
$("#item_add_btn").on('click',function(){
    let name = $('#itemName').val();
    let category = $('#itemCategory').val();
    let price = $('#itemPrice').val();
    let stock = $('#itemStock').val();

    console.log(name);
    console.log(category);
    console.log(price);
    console.log(stock);

    if(!name || !category || !price || !stock){
        alert("please fill all the feilds !!")
        return;
    }

    let item = {
        id: itemId++,
        name: name,
        category: category,
        price: price,
        stock: stock
    };

    item_db.push(item);

    loadItemTable();
    

});

$("#itemTableBody").on('click','.delete-btn-item',function(){
    let ItemIdToDelete = $(this).data('id');

    let confirmation = confirm("Are you sure to delete this item");

    if(confirmation){
        item_db = item_db.filter(item => item.id !== ItemIdToDelete);
        loadItemTable();
    }else{
        console.log("Item deletion canceled")
    }
});

