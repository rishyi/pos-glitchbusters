
import CustomerModel from "../models/customer_model.js";
console.log(CustomerModel); 
import { customer_array } from "../db/database.js";

// let customer_array  = [];

let selected_customer_index = null;

const loadCustomerTable = () => {
    let tableBody = $("#customerTableBody"); 
    tableBody.empty(); 

    customer_array.map((item, index) => {
        let data = `<tr>
            <td>${item.id}</td> <!-- Display customer ID -->
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.tele}</td>
            <td>
                 <button class="btn btn-sm btn-warning update-btn-cus"><i class="fas fa-edit"></i> Update</button>
                 <button class="btn btn-sm btn-danger delete-btn-cus" data-id="${item.id}"><i class="fas fa-trash"></i> Delete</button>
            </td>
        </tr>`;
        tableBody.append(data); 
    });
};

// Add a customer
$("#customer_add_btn").on('click', function() {

    let name = $('#customerName').val();
    let email = $('#customerEmail').val();
    let tele = $('#customerPhone').val();

    if (name.length === 0) {
      Swal.fire("Name cannot be empty !");
        return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(email)){
      Swal.fire("Ivalid Emil address. please check the email type !");
      return;
    }

    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    if(!sriLankanMobileRegex.test(tele)){
      Swal.fire("Invalid mobile number.please enter sri lankn number!");
      return;
    }

    let customer = new CustomerModel(
      customer_array.length + 1,
      name,
      email,
      tele
    );

    customer_array.push(customer);

    loadCustomerTable();

    clearTextFeilds();

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Customer has been saved !!",
      showConfirmButton: false,
      timer: 1500
    });
});

// delete custoer
$("#customerTableBody").on('click', '.delete-btn-cus', function() {

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
      
            customer_array.splice(selected_customer_index,1);
            loadCustomerTable(); 

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
$("#customerTableBody").on('click', '.update-btn-cus', function() {

  $('#addCustomerModal').modal('show');

  $('#customerTableBody').on('click', 'tr', function () {
    let index = $(this).index();

    selected_customer_index = index;

    let customer_obj = customer_array[index];

    let name = customer_obj.name;
    let email = customer_obj.email;
    let tele = customer_obj.tele;

    $('#customerName').val(name);
    $('#customerEmail').val(email);
    $('#customerPhone').val(tele);
  });

  clearTextFeilds();

});

// update customer
$('#customer_update_btn').on('click',function () {

  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't update`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      let name = $('#customerName').val();
      let email = $('#customerEmail').val();
      let tele = $('#customerPhone').val();
    
      let update_customer = new CustomerModel(
        customer_array[selected_customer_index].id,
        name,
        email,
        tele
      );
    
      customer_array[selected_customer_index] = update_customer;
    
      loadCustomerTable();
    
      clearTextFeilds();
      Swal.fire("Saved!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });



})

// clear text feilds
const clearTextFeilds = () => {
$('#customerName').val('');
$('#customerEmail').val('');
$('#customerPhone').val('');
}