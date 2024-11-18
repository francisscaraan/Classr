// Get Session ID for Reference
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const sId = getQueryParam("docId");

window.onscroll = function() {
    var subR = document.getElementById('sub-r');
    var subM = document.getElementById('sub-m');
    var subG = document.getElementById('sub-g');
    var subL = document.getElementById('sub-l');

    if (window.pageYOffset > 0){
        subR.classList.add("sub-nav-shadow");
        subM.classList.add("sub-nav-shadow");
        subG.classList.add("sub-nav-shadow");
        subL.classList.add("sub-nav-shadow");
    } else {
        subR.classList.remove("sub-nav-shadow");
        subM.classList.remove("sub-nav-shadow");
        subG.classList.remove("sub-nav-shadow");
        subL.classList.remove("sub-nav-shadow");
    }
}
// if (sId){
//     // document.getElementById("navSessionName").textContent = sId;
//     console.log(sId);
// }

//Recitation Screen
const recitationButtonR = document.getElementById('recitationR');
const memberButtonR = document.getElementById('membersR');
const groupsButtonR = document.getElementById('groupsR');
const leaderboardButtonR = document.getElementById('leaderboardR');

//Members Screen
const recitationButtonM = document.getElementById('recitationM');
const memberButtonM = document.getElementById('membersM');
const groupsButtonM = document.getElementById('groupsM');
const leaderboardButtonM = document.getElementById('leaderboardM');

//Groups Screen
const recitationButtonG = document.getElementById('recitationG');
const memberButtonG = document.getElementById('membersG');
const groupsButtonG = document.getElementById('groupsG');
const leaderboardButtonG = document.getElementById('leaderboardG');

//Leaderboard Screen
const recitationButtonL = document.getElementById('recitationL');
const memberButtonL = document.getElementById('membersL');
const groupsButtonL = document.getElementById('groupsL');
const leaderboardButtonL = document.getElementById('leaderboardL');

//Screens
const recitationScreen = document.getElementById('recitationScreen');
const memberScreen = document.getElementById('memberScreen');
const groupScreen = document.getElementById('groupScreen');
const leaderboardScreen = document.getElementById('leaderboardScreen');


//Recitation
recitationButtonR.addEventListener('click', function(){
    recitationScreen.style.display="block";
    memberScreen.style.display="none";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="none";
})

memberButtonR.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="block";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="none";
})

groupsButtonR.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="none";
    groupScreen.style.display="block";
    leaderboardScreen.style.display="none";
})

leaderboardButtonR.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="none";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="block";
})

//Members
recitationButtonM.addEventListener('click', function(){
    recitationScreen.style.display="block";
    memberScreen.style.display="none";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="none";
})

memberButtonM.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="block";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="none";
})

groupsButtonM.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="none";
    groupScreen.style.display="block";
    leaderboardScreen.style.display="none";
})

leaderboardButtonM.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="none";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="block";
})

//Groups
recitationButtonG.addEventListener('click', function(){
    recitationScreen.style.display="block";
    memberScreen.style.display="none";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="none";
})

memberButtonG.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="block";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="none";
})

groupsButtonG.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="none";
    groupScreen.style.display="block";
    leaderboardScreen.style.display="none";
})

leaderboardButtonG.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="none";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="block";
})

//Leaderboard
recitationButtonL.addEventListener('click', function(){
    recitationScreen.style.display="block";
    memberScreen.style.display="none";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="none";
})

memberButtonL.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="block";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="none";
})

groupsButtonL.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="none";
    groupScreen.style.display="block";
    leaderboardScreen.style.display="none";
})

leaderboardButtonL.addEventListener('click', function(){
    recitationScreen.style.display="none";
    memberScreen.style.display="none";
    groupScreen.style.display="none";
    leaderboardScreen.style.display="block";
})

function exitSession(){
    // localStorage.removeItem("sessionId");
    window.location.href= 'mysessions.html';
}

// Close EPP
// const closeEpp = document.getElementById('cancel-edit');
// const eppContainer = document.querySelector('.edit-points-popup');
// closeEpp.addEventListener('click', () => {
//     event.preventDefault();
//     eppContainer.classList.remove('showEpp');
//     document.getElementById('edit-points').reset();
// })

// document.querySelector('.edit-point-form').addEventListener('keydown', function(event){
//     if (event.key === 'Enter'){
//         event.preventDefault();
//     }
// })