function register(){
    let username = document.getElementById('username').value
    console.log("Username = "+username)
    let password = document.getElementById('pass').value
    console.log("Password = "+password)


    // โยนเข้าเป็น object เอาไว้คุยกับ backend
    let userdata = {
        Username : username,
        Password : password
    }
    
    console.log(userdata)
}