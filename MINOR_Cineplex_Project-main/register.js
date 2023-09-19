const register = async() => {
    let First_Name = document.getElementById("fname").value
    let Last_Name = document.getElementById("lname").value
    let password = document.getElementById("pass").value;
    let cfpass = document.getElementById("cfpass").value;
    let username = document.getElementById("username").value;
    
    console.log(firstname);
    if(pass !==cfpass){
        window.alert("Password doesn't match");
    }
    else{
        
        let userdata = {
            firstname: First_Name,
            lastname: Last_Name,
            Username : username,
            Password : password
        }     
        const response = await axios.post('http://localhost:8000/member/register', userdata)
    }
}
