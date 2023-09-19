function myFunction(){
    var pass = document.getElementById("pass").value;
    var cfpass = document.getElementById("cfpass").value;
    var username = document.getElementById("username").value;
    console.log(username);
    if(pass.localeCompare(cfpass)){
        window.alert("Password doesn't match");
    }
}
