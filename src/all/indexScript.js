const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
    location.reload();
})

let eyeIcon = document.getElementById("eyeIcon");
let password = document.getElementById("addPassword");

eyeIcon.onclick = function(){
    if(password.type == "password"){
        password.type = "text";
        eyeIcon.src = "../static/icons/viewIcon.svg";
    } else {
        password.type = "password";
        eyeIcon.src = "../static/icons/hideIcon.svg";
    }
}