var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/books/getAll/",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "wdith": "20%" },
            { "data": "author", "wdith": "20%" },
            { "data": "isbn", "wdith": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `
                        <div class="text-center">
                            <a href="/Books/Upsert?id=${data}" class="btn btn-success text-white" style="cursor: pointer; width: 100px"> Edit </a>
                            &nbsp;
                            <a 
                                onclick=Delete('/books/Delete?id=${data}')
                                class="btn btn-danger text-white" 
                                style="cursor: pointer; 
                                width: 100px"> Delete </a>
                        </div>
                    `;
                },
                "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    })
}

function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    })
}