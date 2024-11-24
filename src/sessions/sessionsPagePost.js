// Get Session ID for Reference
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const sId = getQueryParam("docId");

function exitSession(){
    // localStorage.removeItem("sessionId");
    window.location.href= 'sessions.html';
}

window.onscroll = function() {
    var subR = document.getElementById('sub-r');
    // var subM = document.getElementById('sub-m');
    // var subG = document.getElementById('sub-g');
    // var subL = document.getElementById('sub-l');

    if (window.pageYOffset > 0){
        subR.classList.add("sub-nav-shadow");
        // subM.classList.add("sub-nav-shadow");
        // subG.classList.add("sub-nav-shadow");
        // subL.classList.add("sub-nav-shadow");
    } else {
        subR.classList.remove("sub-nav-shadow");
        // subM.classList.remove("sub-nav-shadow");
        // subG.classList.remove("sub-nav-shadow");
        // subL.classList.remove("sub-nav-shadow");
    }
}