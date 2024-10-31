let customer_db = [];
let customerId = 1;

const loadCustomerTable = () => {
    let tableBody = $('tbody'); 
    tableBody.empty(); 

    customer_db.map((item, index) => {
        let data = `<tr>
            <td>${item.id}</td> <!-- Display customer ID -->
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.tele}</td>
            <td>
                 <button class="btn btn-sm btn-warning"><i class="fas fa-edit"></i> Update</button>
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

    if (!name || !email || !tele) {
        alert("Please fill all fields !!");
        return;
    }

    let customer = {
        id: customerId++,  
        name: name,
        email: email,
        tele: tele
    };

    customer_db.push(customer);

    loadCustomerTable();

    $('#customerName').val('');
    $('#customerEmail').val('');
    $('#customerPhone').val('');
});

$('tbody').on('click', '.delete-btn-cus', function() {

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
        let customerIdToDelete = $(this).data('id'); 
        
            customer_db = customer_db.filter(customer => customer.id !== customerIdToDelete);
            loadCustomerTable(); 

    
        if (result.isConfirmed) {
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




