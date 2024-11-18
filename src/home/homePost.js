//CREATE SESSION POPUP
const openCreate = document.getElementById('open-create-session');
const createContainer = document.getElementById('create-container');
const closeCreate = document.getElementById('cancel-create-session');

openCreate.addEventListener('click', () => {
    createContainer.classList.add('show');
})

closeCreate.addEventListener('click', () => {
    event.preventDefault();
    createContainer.classList.remove('show');
    document.getElementById('create-session-form').reset();
})

document.getElementById('create-session-form').addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        event.preventDefault();
    }
})

//JOIN SESSION POPUP
const openJoin = document.getElementById('open-join-session');
const joinContainer = document.getElementById('join-container');
const closeJoin = document.getElementById('cancel-join-session');

openJoin.addEventListener('click', () => {
    joinContainer.classList.add('showJoin');
})

closeJoin.addEventListener('click', () => {
    event.preventDefault();
    joinContainer.classList.remove('showJoin');
    document.getElementById('join-session-form').reset();
})

document.getElementById('join-session-form').addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        event.preventDefault();
    }
})

window.onscroll = function() {
    var navbar = document.getElementById("navbar");
    if (window.pageYOffset > 0){
        navbar.classList.add("nav-shadow");
    } else {
        navbar.classList.remove("nav-shadow");
    }
}
//GENERATE UID
// function generate(){
//     var input = document.getElementById('sessionCode');
//     var sessionUID = new Date().getTime().toString();
//     var generateUID = sessionUID;
//     input.value = generateUID;
// }

//CLEAR CREATE SESSION INPUT
// function clear(){
//     document.getElementById('cancel-create-session').value='';
// }

//Join Session
 // Function to get the value of the input field
//  function addMember() {
//     // Get the input element by its id
//     const inputValue = document.getElementById('inputCode').value;
    
//     // Display the value in the console or on the page
//     console.log('Input value:', inputValue);
//     // document.getElementById('output').innerText = 'Entered Value: ' + inputValue;
//     }
// Function to get the document by ID
//Join Session
// const joinSession = document.querySelector('.join-session-form')

// joinSession.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const joinRef = doc(db, 'sessions', joinSession.inputCode.value);
//     updateDoc (joinRef, {
//         membersName: arrayUnion(hostName),
//         membersEmail: arrayUnion(hostEmail),
//     })
//     .then(() => {
//         joinSession.reset();
//         window.location.href='home.html';
//     })
// })

//Join Session
// let codeReq;
// function getCode(event) {
//     event.preventDefault();
//     codeReq = document.getElementById('inputCode').value;
//     console.log(codeReq);
// }

// const joinRef = collection(db, 'sessions', codeReq)
