//SIDEBAR
let btn = document.getElementById('nav-btn');
let sidebar = document.querySelector('.sidebar');

btn.onclick = function () {
    sidebar.classList.toggle('active');
};

//PROFILE MENU
let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
};

//Go to  mysessionPage
function goToMySessionPage(){
    window.location.href = 'mysessionPage.html';
}

// //Go to sessionPage
// function goToSessionPage(){
//     window.location.href = 'sessionPage.html';
// }

// window.onscroll = function() {
//     var navbar = document.getElementById("navbar");
//     if (window.pageYOffset > 0){
//         navbar.classList.add("nav-shadow");
//     } else {
//         navbar.classList.remove("nav-shadow");
//     }
// }