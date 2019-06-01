$(document).ready(function (){
    if(localStorage.getItem('token')){
        normalContent()
        // $("#loginForm").hide()
        // $("#contentArea").show()
        // $('#createNewRepo').show()
        // $('#starredRepo').show()
    } else {
        $("#loginForm").show()
        $("#contentArea").hide()
        $('#createNewRepo').hide()
        $('#starredRepo').hide()
        $('#logoHome').hide()
        $('#logout').hide()
       
    }
})

function logout(){
    event.preventDefault()
    localStorage.removeItem('token')
    $("#loginForm").show()
    $("#contentArea").hide()
    $('#createNewRepo').hide()
    $('#starredRepo').hide()
    $('#logoHome').hide()
}

function normalContent(){
        $("#loginForm").hide()
        $('#logoHome').show()
        $("#contentArea").show()
        $('#createNewRepo').show()
        $('#starredRepo').show()
        $('#logout').show()
}


function register(){
    

    $.ajax({
        url: "https://morning-reaches-51758.herokuapp.com/api/user/signup",
        type : 'post',
        dataType : 'json',
        data : {
            username : `${$('#username').val()}`,
            password : `${$('#password').val()}`
        }
    })
    .done((gotData)=>{

        $('#loginForm').html(`
        <div class="col-md-4 offset-md-4">
                    <div class="card bg-light mb-3" style="max-width: 18rem;">
                        <div class="card-body">
                            <form onsubmit="login()">
                                <h3>LOGIN</h3>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="username" aria-describedby="emailHelp"
                                        placeholder="username">
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" id="password" placeholder="Password">
                                </div>
                                <button type="submit" class="btn btn-primary">Log In</button>
                                <a onclick="GenerateRegisterForm()" href="#">Register</a>
                                <div id="errMsg"></div>
                            </form>
                        </div>

                    </div>
                </div>
    `)

        
    })
    .fail((gotData)=>{
        // console.log(gotData);
        
        $('#errMsg').html(`</br><h6 class="text-center" style="color:red";>${gotData.responseJSON.message}</h6>`)
        
    })
    event.preventDefault()
}

function showRepo(user){
    // console.log(user);
    
    $('#repoDiv').empty()
    $.ajax({
                url: `https://morning-reaches-51758.herokuapp.com/api/git/repo/${user}`,
                type : 'get',
                dataType : 'json',
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
            .done((gotData)=>{
                $('#repoContent').html(`
                <div class="row" id="repoDiv">
                </div>
                `)
                $.each(gotData, function(i, dataa){
                
                    $('#repoDiv').append(`
                    <div onclick="detail('${dataa.name}','${dataa.owner.login}')"  class="card col-xs-12 col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">${dataa.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${dataa.owner.login}</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk
                                of the card's content.</p>
                            <a href="#" class="card-link"> <i class="fas fa-star"></i> ${dataa.stargazers_count}</a>
                            <a href="${dataa.html_url}" class="card-link">View On Github</a>
                        </div>
                    </div>
                    `)
                })
            })
            .fail((gotData)=>{
                console.log("Gagal Maning");
                  
            })
}

function starredRepo(){
    $('#repoDiv').empty()
    $.ajax({
                url: `https://morning-reaches-51758.herokuapp.com/api/git/starred`,
                type : 'get',
                dataType : 'json',
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
            .done((gotData)=>{
                $('#repoContent').html(`
                <div class="row" id="repoDiv">
                </div>
                `)
                $.each(gotData, function(i, dataa){
                
                    $('#repoDiv').append(`
                    <div class="card col-xs-12 col-md-4">
                        <div class="card-body">
                            <h5 class="card-title">${dataa.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${dataa.owner.login}</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk
                                of the card's content.</p>
                            <a href="#" onclick="unstared(${dataa.full_name})" > <i class="fas fa-star"></i> ${dataa.stargazers_count}</a>
                            <a onclick="unstarred('${dataa.name}','${dataa.owner.login}')" href="#" >&nbsp&nbsp&nbsp&nbsp&nbsp&nbspUnstarred</a>
                            <a onclick="detail('${dataa.name}','${dataa.owner.login}')" href="#" >&nbsp&nbsp&nbsp&nbsp&nbsp&nbspDetail</a>
                        </div>
                    </div>
                    `)
                })
            })  
            .fail((gotData)=>{
                console.log("Gagal Maning");
                  
            })
}

function unstarred(repoName, owners){
    $.ajax({
        url:`https://morning-reaches-51758.herokuapp.com/api/git/repo/unstarred/${owners}/${repoName}`,
        type: 'delete',
        dataType: 'json',
        headers: {
            'token': localStorage.getItem('token')
        }
    })
    .done((gotData)=>{
        starredRepo()
    })
    .fail((gotData)=>{

    })
}

function GenerateNewRepoForm(){
    $('#starredRepo').hide()
    $('#loginForm').empty()
    $('#loginForm').html(`
        <div class="col-md-4 offset-md-4">
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-body">
                <form onsubmit="createNewRepo()">
                    <h3>Create New Repo</h3>
                    <div class="form-group">
                        <input type="text" class="form-control" id="repoName" 
                            placeholder="Repo Name">
                    </div>
                    <div class="form-group">
                        <input type="text-area" class="form-control" id="repoDescription" placeholder="Repo Description">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <div id="errMsg"></div>
                </form>
            </div>

        </div>
    </div>
    `)
    $("#loginForm").show()
    $("#contentArea").hide()
}

function GenerateRegisterForm(){
    $('#starredRepo').hide()
    $('#loginForm').empty()
    $('#loginForm').html(`
        <div class="col-md-4 offset-md-4">
        <div class="card bg-light mb-3" style="max-width: 18rem;">
            <div class="card-body">
                <form onsubmit="register()">
                    <h3>Register</h3>
                    <div class="form-group">
                        <input type="text" class="form-control" id="username" 
                            placeholder="Username">
                    </div>
                    <div class="form-group">
                        <input type="text-area" class="form-control" id="password" placeholder="Password">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <div id="errMsg"></div>
                </form>
            </div>

        </div>
    </div>
    `)
    $("#loginForm").show()
    $("#contentArea").hide()
}

function createNewRepo(){
    event.preventDefault()
    $.ajax({
        url:`https://morning-reaches-51758.herokuapp.com/api/git`,
        type: 'post',
        dataType: 'json',
        data : {
            name : `${$('#repoName').val()}`,
            description : `${$('#repoDescription').val()}`
        },
        headers: {
            'token': localStorage.getItem('token')
        }
    })
    .done((gotData)=>{
        normalContent()
        // $("#loginForm").hide()
        // $("#contentArea").show()
        // $('#createNewRepo').show()
    })
    .fail((gotData)=>{
        // console.log(gotData);
        $('#errMsg').html(`<p>${gotData.responseJSON.message}</p>`)
        
    })
    event.preventDefault()
}

function detail(repoName, owners){
    $.ajax({
        url:`https://morning-reaches-51758.herokuapp.com/api/git/${owners}/${repoName}`,
        type: 'get',
        dataType: 'json',
        headers: {
            'token': localStorage.getItem('token')
        }
    })
    .done((gotData)=>{
        $(`#repoContent`).empty()
        $(`#repoContent`).html(`
        <div class="card bg-light mb-3" col-md-12>
        <div class="card-header">${gotData.name}</div>
        <div class="card-body">
        <div class="row">
        <div class="col-md-3">
        <img class="mr-3" src="${gotData.owner.avatar_url}" style="width:100%;"></br>
        <h5 class=" font-weight-bold text-center">${gotData.owner.login}</h5>
        </div>
        <div class="col-md-9">
        <p class="card-text">User Id      : ${gotData.owner.id} </p>
        <p class="card-text">Username : ${gotData.owner.login} </p>
        <p class="card-text">Repo Name : ${gotData.name} </p>
        <p class="card-text">Repo Star : ${gotData.stargazers_count}</p>
        <p class="card-text">Repo Language : ${gotData.language}</p>
        </div>
        </div>
        <div class="row">
        <p class="card-text"> Repo Description : </p>
        <p class="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti molestias quae, tempora delectus officia numquam at, aspernatur nam iusto soluta enim praesentium perferendis debitis consectetur odit ipsum nostrum corrupti accusantium?</p>
        </div>
        </div>
        </div>
    `)
    })
    .fail((gotData)=>{

    })
    
}

function cari(data){
    // console.log(data.val());
    event.preventDefault()
    $('#listUsername').prepend(`
    <a href="#" onclick="showRepo('`+data.val()+`')" class="list-group-item list-group-item-action">`+data.val()+`</a>
    `)
    data.val('')
    
}


function login(){
    // console.log("masuk ke login func");
    
    $.ajax({
        url: "https://morning-reaches-51758.herokuapp.com/api/user/signin",
        type : 'post',
        dataType : 'json',
        data : {
            username : `${$('#username').val()}`,
            password : `${$('#password').val()}`
        }
    })
    .done((gotData)=>{
        // console.log(gotData.token);
        localStorage.setItem('token',gotData.token)
        normalContent()
        // $("#loginForm").hide()
        // $("#contentArea").show()
        // $('#createNewRepo').show()
        // $('#starredRepo').show()

        
    })
    .fail((gotData)=>{
        // console.log(gotData);
        
        $('#errMsg').html(`</br><h6 class="text-center" style="color:red";>${gotData.responseJSON.message}</h6>`)
        
    })
    event.preventDefault()
    
}