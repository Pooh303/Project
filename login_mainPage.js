function openForm() {
  let button = document.querySelector(".btn");
  button.style.display = "block";
  let form = document.getElementById("myForm");
  form.style.display = "block";
  
  let blurBackground = document.getElementById("blurBackground");
  setTimeout(() => {
      blurBackground.style.display = "block";
      setTimeout(() => {
          blurBackground.style.opacity = "1";
      }, 10);
  }, 10);
}


function closeForm() {
  let form = document.getElementById("myForm");
  form.style.display = "none";
  
  let blurBackground = document.getElementById("blurBackground");
  blurBackground.style.opacity = "0";
  setTimeout(() => {
      blurBackground.style.display = "none";
  }, 300);

  let registrationForm = document.querySelector(".form-popup");
  let button = document.querySelector(".btn");
  let input = document.querySelector("input[name=pass_confirm]");
  let formTitle =  document.getElementsByClassName("head1")[0];
  registrationForm.style.display = "none";
  input.style.display = "none";
  button.style.display = "block";
  formTitle.textContent = "Login";
}


function Register() {
  let registrationForm = document.querySelector(".form-popup");
  let button = document.querySelector(".btn");
  let input = document.querySelector("input[name=pass_confirm]");
  let formTitle =  document.getElementsByClassName("head1")[0];
  registrationForm.style.display = "block";
  formTitle.textContent = "Register";
  input.style.display = "block";

  let email = document.getElementsByName("email")[0].value;
  let password = document.getElementsByName("pass")[0].value;
  let confirm_password = document.getElementsByName("pass_confirm")[0].value;
  
  if (button.style.display == "none") {
    if (email == "" && password == "" && confirm_password == ""|| password == "" 
    || confirm_password == "" || confirm_password == "" && confirm_password == "" || email == ""){
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }else if (confirm_password != password) {
      alert("รหัสผ่านไม่ตรงกัน");
    }else {
      let password = document.getElementsByName("pass_confirm")[0].value;
      console.log(email, password);
      alert("ลงทะเบียนสำเร็จ");
      closeForm();
    }
  }
  button.style.display = "none";
}


async function Login() {
  let email = document.getElementsByName("email")[0].value;
  let password = document.getElementsByName("pass")[0].value;
  
  if(email == "" || password == "") {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
  }else{
    // backend
    let userdata = {
      Username: email,
      Password: password
    }
    console.log("Username = "+username)
    console.log("Password = "+password)

    console.log('submit data', userdata)
    const response = await axios.post('http://localhost:8000/member/login', userdata)
    console.log('response', response.data)
    window.alert(response.data)

    if(response.data == "login successfully"){
        window.location.href = "movies.html";
    }
  }

  // test
  if(email=="admin" && password=="admin"){
    alert("ล็อกอินสำเร็จ");
    closeForm();
  }
}
