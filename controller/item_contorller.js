
import ItemModel from "../models/item_model.js";
import { item_array } from "../db/database.js"; 

// let item_array = [];

let selected_item_index = null;

const loadItemTable = () => {

    let tableBody = $('#itemTableBody');
    tableBody.empty();
   
    item_array.map((item, index) => {
        console.log(item);

        let data = `<tr>
            <td>${item.id}</td>        
            <td>${item.name}</td>        
            <td>${item.category}</td>        
            <td>${item.price}</td>        
            <td>${item.stock}</td>
            <td>
                 <button class="btn btn-sm btn-warning update-btn-item"><i class="fas fa-edit"></i> Update</button>
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

    let item = new ItemModel (
         item_array.length + 1,
         name,
         category,
         price,
         stock
    );

    item_array.push(item);

    loadItemTable();

    clearTxtFeilds();

});

// delete customer
$("#itemTableBody").on('click','.delete-btn-item',function(){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        
        if (result.isConfirmed) {
      
            item_array.splice(selected_item_index,1);
            loadItemTable();
         
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
});

// table action update
$("#itemTableBody").on('click','.update-btn-item', function() {

    $('#addItemModal').modal('show');

    $("#itemTableBody").on('click', 'tr', function () {
        let index = $(this).index();

        selected_item_index = index;

        let item_obj = item_array[index];

        let name = item_obj.name;
        let category = item_obj.category;
        let price = item_obj.price;
        let stock = item_obj.stock

        $('#itemName').val(name);
        $('#itemCategory').val(category);
        $('#itemPrice').val(price);
        $('#itemStock').val(stock);

    });
});


// update item 
$("#item_update_btn").on('click',function(){

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't update`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            let name = $('#itemName').val();
            let category = $('#itemCategory').val();
            let price = $('#itemPrice').val();
            let stock = $('#itemStock').val();
        
            let update_item = new ItemModel (
                item_array[selected_item_index].id,
                name,
                category,
                price,
                stock
           );    
        
           item_array[selected_item_index] = update_item;
        
           loadItemTable();
        
           clearTxtFeilds();
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });


});


// clear txt feilds
const clearTxtFeilds = () => {

    $('#itemName').val('');
    $('#itemCategory').val('');
    $('#itemPrice').val('');
    $('#itemStock').val('');

}