$.ajax({
    method: "GET",
    url: "https://reqres.in/api/users?page=1",
    success: function (result) {
        second_func(result.data)
    },
    error: function (err) {
        console.log(err);

    }

});



function second_func(first_list) {
    $.ajax({
        method: "GET",
        url: "https://reqres.in/api/users?page=2",
        success: function (second_list) {

            for (var i = 0; i < first_list.length; i++) {
                result.push(first_list[i]);
            }
            for (var i = 0; i < first_list.length; i++) {
                result.push(second_list.data[i]);
            }
            create_page(result);
        },
        error: function (err) {
            console.log(err);

        }

    });

}

$("#pagination").on('change', function () {
    create_page(result)
});

function create_page(result) {
    clearBody();
    var first = 0;
    var second = 6;
    let selectBox = document.getElementById("pagination");
    console.log(selectBox.value);
    if (selectBox.value == 1) {
        console.log(999999999999);
        first = 0;
        second = 6;

    } else if (selectBox.value == "2") {
        first += 6;
        second += 6;

    } else if (selectBox.value == "3") {
        first += 12;
        second += 12;

    }

    for (let i = first; i < second; i++) {
        let user =
            `


            <div class="mt-3 col-12 col-md-6 col-lg-4">
                <div class="card">
                    <img class="card-img-top" src="${result[i].avatar}" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">id: ${result[i].id}</h5>
                        <p class="card-text">First Name: <span>${result[i].first_name}</span></p>
                        <p class="card-text">Last Name: <span>${result[i].last_name}</span></p>
                        <p class="card-text">email: <span>${result[i].email}</span></p>
                        <a  class="btn btn-primary" onclick="show_profile(${result[i].id})">user profile</a>
                    </div>
                </div>

            `

        $("#card_body").append(user);

    }


}


function show_profile(temp) {

    for (var i = 0; i < result.length; i++) {
        if (result[i].id == temp) {


            $("#myModal").css("display", "block");
            let modal_element = `
    <div class="modal-content">
      <div class="modal-header">
      <h2><span class="float-left">${temp} </span></h2>
        <span class="close" onclick="close_onclick()">&times;</span>
      </div>
      <div class="modal-body card-img-top" id="modal-body" >
        <img src="${result[i].avatar}" style="  position: absolute;   height: 400px; width:100%;">
        <div style="  position: relative; padding=10%; ">
            <span class="p-color">id: <span> ${result[i].id}</span></span></br>
            <span class="p-color">First Name: <span> ${result[i].first_name}</span></span></br>
            <span class="p-color">Last Name: <span> ${result[i].last_name}</span></span></br>
            <span class="p-color">Email: <span> ${result[i].email}</span></span></br>
        </div>
      </div>
      <div class="modal-footer">
        <button id="edit" onclick="edit_user(${result[i].id})">Update</button>
        <button id="delete" class="delete" onclick="delete_ueser(${result[i].id})" >Delete</button>
      </div>
    </div>
    `
            $("#myModal").html(modal_element);
            console.log(result[i].id);
        }
    }
}

function clearBody() {

    $("#card_body").html("")
}

function delete_ueser(user) {
    for (let i = 0; i < result.length; i++) {
        if (result[i].id === user) {
            result.splice(i, 1);
        }
    }
    $("#myModal").css("display", "none");
    clearBody();
    create_page(result);
}

function edit_user(temp) {

    for (let i = 0; i < result.length; i++) {
        let x = result[i].id;
        if (x == temp) {

            console.log(result[i].id);
            console.log(temp);


            $("#myModal").css("display", "block");
            let update_element = `
<div class="modal-content">
  <div class="modal-header">
    <span class="close" onclick="close_onclick()">&times;</span>
    <h2>UID: ${result[i].id}</h2>
  </div>
  <div class="modal-body">
  <input type="file" class="update" id="avatar" placeholder="">
  <input type="text" class="update" id="first_name" placeholder=" ${result[i].first_name}">
  <input type="text" class="update" id="last_name" placeholder="${result[i].last_name}">
  <input type="text" class="update" id="email" placeholder="${result[i].email}">
  </div>
  <div class="modal-footer">
    <button id="edit" onclick="save_user(${result[i].id})">Save Update</button>
    <h3>Modal Footer</h3>
  </div>
</div>
`
            $("#myModal").html(update_element);


            break;
        }
    }


}

function save_user(uid) {

    for (let i = 0; i < result.length; i++) {
        console.log(uid);
        console.log($("#avatar")[0].value);
        if (result[i].id === uid) {
            console.log($("#avatar")[0].value);
            if ($("#avatar")[0].value !== "") {
                let URL = $("#avatar")[0].value;
                result[i].avatar = window.open(URL, null);
            }
            if ($("#first_name")[0].value !== "") {
                result[i].first_name = $("#first_name")[0].value;
            }
            if ($("#last_name")[0].value !== "") {
                result[i].last_name = $("#last_name")[0].value;
            }
            if ($("#email")[0].value !== "") {
                result[i].email = $("#email")[0].value;
            }

            break;
        }
    }
    $("#myModal").css("display", "none");
    clearBody();
    create_page(result);
}

function checkUID(inUid) {
    for (let i = 0; i < result.length; i++) {
        if (result[i].id == inUid) {
            return true;
        }
    }
    return false;
}

function create() {
    $("#myModal").css("display", "block");
    let update_element = `
<div class="modal-content">
  <div class="modal-header">
  <h2 class="float-left">Create a New User</h2>
    <span class="close" onclick="close_onclick()">&times;</span>
  </div>
  <div class="modal-body">
  <input type="file" class="update" id="avatar" >
  <input type="text" class="update" id="id" placeholder="Enter ID">
  <input type="text" class="update" id="first_name" placeholder="Enter First Name">
  <input type="text" class="update" id="last_name" placeholder="Enter Last Name">
  <input type="text" class="update" id="email" placeholder="Enter Email">

  </div>
  <div class="modal-footer">
    <button id="edit" onclick="Create_user()">Save Update</button>
  </div>
</div>
`
    $("#myModal").html(update_element);

}

function Create_user() {

    while (true) {

        if (checkUID($("#id")[0].value)) {
            alert("Invalid UID")
            return create();
        }


        if ($("#id")[0].value === "" || $("#avatar")[0].value === "" || $("#first_name")[0].value === "" || $("#last_name")[0].value === "" || $("#email")[0].value === "") {
            alert("Please fill in all the blanks");
            return create();
        } else {
            break;
        }
    }
    // convert avatar url and delet C:\fakepath\ from url
    let fakepath = $("#avatar")[0].value;
    fakepath = fakepath.split(`C:\\fakepath\\`)
    console.log(fakepath);


    let obj = {

        id: parseInt($("#id")[0].value),
        avatar: fakepath[1],
        first_name: $("#first_name")[0].value,
        last_name: $("#last_name")[0].value,
        email: $("#email")[0].value

    }
    console.log(obj.avatar);

    result.push(obj);

    $("#myModal").css("display", "none");
    clearBody();
    create_page(result);

}


function search_users() {
    show_profile($("#search")[0].value);
}



// When the user clicks on <span> (x), close the modal
function close_onclick() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}