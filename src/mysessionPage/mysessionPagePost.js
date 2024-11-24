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

const waitCreate = document.getElementById('waitCreate');
function showCreatingGroup(){
    waitCreate.style.display = 'block'; 
}

const iModeBtn1 = document.getElementById('iMB1');
const gModeBtn1 = document.getElementById('gMB1');
const iModeBtn2 = document.getElementById('iMB2');
const gModeBtn2 = document.getElementById('gMB2');
// const iBoard = document.getElementById('mode1');
// const gBoard = document.getElementById('mode2');

function showMode(screenNumber){
    document.querySelectorAll('.modeList').forEach(modeList => {
        modeList.classList.remove('showContent');
    })
    document.getElementById(`mode${screenNumber}`).classList.add('showContent');
    const url = new URL(window.location);
    url.searchParams.set('modeList', screenNumber);
    window.history.pushState({}, '', url);
}

iModeBtn1.addEventListener('click', () => showMode(1));
gModeBtn1.addEventListener('click', () => showMode(2));
iModeBtn2.addEventListener('click', () => showMode(1));
gModeBtn2.addEventListener('click', () => showMode(2));

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const screenNumber = params.get('modeList') || 1; // Default to 1
    showMode(screenNumber);
});

const iLModeBtn1 = document.getElementById('iLMB1');
const gLModeBtn1 = document.getElementById('gLMB1');
const iLModeBtn2 = document.getElementById('iLMB2');
const gLModeBtn2 = document.getElementById('gLMB2');
const lmode1 = document.getElementById('lmode1');
const lmode2 = document.getElementById('lmode2');

iLModeBtn1.addEventListener('click', () => {
    lmode1.classList.add('showContent');
    lmode2.classList.remove('showContent');
})

gLModeBtn1.addEventListener('click', () => {
    lmode1.classList.remove('showContent');
    lmode2.classList.add('showContent');
})

iLModeBtn2.addEventListener('click', () => {
    lmode1.classList.add('showContent');
    lmode2.classList.remove('showContent');
})

gLModeBtn2.addEventListener('click', () => {
    lmode1.classList.remove('showContent');
    lmode2.classList.add('showContent');
})

// iModeBtn.addEventListener('click', () => {
//     iModeBtn.classList.add('active');
//     gModeBtn.classList.remove('active');
//     iBoard.classList.add('showContent');
//     gBoard.classList.remove('showContent');
// })

// gModeBtn.addEventListener('click', () => {
//     iModeBtn.classList.remove('active');
//     gModeBtn.classList.add('active');
//     iBoard.classList.remove('showContent');
//     gBoard.classList.add('showContent');
// })

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
// const recitationScreen = document.getElementById('recitationScreen');
// const memberScreen = document.getElementById('memberScreen');
// const groupScreen = document.getElementById('groupScreen');
// const leaderboardScreen = document.getElementById('leaderboardScreen');

function showScreen(screenNumber){
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('visible');
    })
    document.getElementById(`screen${screenNumber}`).classList.add('visible');
    const url = new URL(window.location);
    url.searchParams.set('screen', screenNumber);
    window.history.pushState({}, '', url);
}

// Recitation
recitationButtonR.addEventListener('click', () => showScreen(1));
memberButtonR.addEventListener('click', () => showScreen(2));
groupsButtonR.addEventListener('click', () => showScreen(3));
leaderboardButtonR.addEventListener('click', () => showScreen(4));

// Members
recitationButtonM.addEventListener('click', () => showScreen(1));
memberButtonM.addEventListener('click', () => showScreen(2));
groupsButtonM.addEventListener('click', () => showScreen(3));
leaderboardButtonM.addEventListener('click', () => showScreen(4));

// Groups
recitationButtonG.addEventListener('click', () => showScreen(1));
memberButtonG.addEventListener('click', () => showScreen(2));
groupsButtonG.addEventListener('click', () => showScreen(3));
leaderboardButtonG.addEventListener('click', () => showScreen(4));

// Leaderboard
recitationButtonL.addEventListener('click', () => showScreen(1));
memberButtonL.addEventListener('click', () => showScreen(2));
groupsButtonL.addEventListener('click', () => showScreen(3));
leaderboardButtonL.addEventListener('click', () => showScreen(4));

window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const screenNumber = params.get('screen') || 1; // Default to 1
    showScreen(screenNumber);
});

function exitSession(){
    // localStorage.removeItem("sessionId");
    window.location.href= 'mysessions.html';
}

const openCallRandom = document.getElementById('callRandom');
const openCallGroup = document.getElementById('callGroup');
const rcpContainer = document.getElementById('rcp-container');
const rcpContainerGroup = document.getElementById('rcp-container-group');
const closeCallRandom = document.getElementById('rcp-done-btn');
const closeCallGroup = document.getElementById('group-done-btn');

openCallRandom.addEventListener('click', () => {
    rcpContainer.classList.add('showRcp');
})

openCallGroup.addEventListener('click', () => {
    rcpContainerGroup.classList.add('showRcp');
})

closeCallRandom.addEventListener('click', () => {
    event.preventDefault();
    rcpContainer.classList.remove('showRcp');
})

closeCallGroup.addEventListener('click', () => {
    event.preventDefault();
    rcpContainerGroup.classList.remove('showRcp');
})

const openCreateGroup = document.getElementById('create-btn');
const cgpContainer = document.getElementById('cgp-container');
const closeCreateGroup = document.getElementById('cancel-createGroup');

openCreateGroup.addEventListener('click', () => {
    cgpContainer.classList.add('showCgp');
})

closeCreateGroup.addEventListener('click', () => {
    event.preventDefault();
    cgpContainer.classList.remove('showCgp');
    document.getElementById('create-group-form').reset();
})

// const waitCreate = document.getElementById('waitCreate');
// function showCreatingGroup(){
//     waitCreate.style.display = 'block'; 
// }

// const iModeBtn = document.getElementById('individualModeBtn');
// const gModeBtn = document.getElementById('groupModeBtn');
// const iBoard = document.getElementById('mode-recitation-container1');
// const gBoard = document.getElementById('mode-recitation-container2');

// function showMode(screenNumber){
//     document.querySelectorAll('.modeContent').forEach(modeContent => {
//         modeContent.classList.remove('showContent');
//     })
//     document.getElementById(`mode-recitation-container${screenNumber}`).classList.add('showContent');
//     const url = new URL(window.location);
//     url.searchParams.set('modeContent', screenNumber);
//     window.history.pushState({}, '', url);
// }

// iModeBtn.addEventListener('click', () => showMode(1));
// gModeBtn.addEventListener('click', () => showMode(2));

// window.addEventListener('DOMContentLoaded', () => {
//     const params = new URLSearchParams(window.location.search);
//     const screenNumber = params.get('modeContent') || 1; // Default to 1
//     showMode(screenNumber);
// });

// iModeBtn.addEventListener('click', () => {
//     iModeBtn.classList.add('active');
//     gModeBtn.classList.remove('active');
//     iBoard.classList.add('showContent');
//     gBoard.classList.remove('showContent');
// })

// gModeBtn.addEventListener('click', () => {
//     iModeBtn.classList.remove('active');
//     gModeBtn.classList.add('active');
//     iBoard.classList.remove('showContent');
//     gBoard.classList.add('showContent');
// })