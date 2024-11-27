// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, arrayUnion, getDoc, getDocs, updateDoc, addDoc, doc, serverTimestamp, runTransaction } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Z3zE5eRU3eCZCMl-h6LmB0fr84p9s0I",
  authDomain: "classr-49b17.firebaseapp.com",
  projectId: "classr-49b17",
  storageBucket: "classr-49b17.appspot.com",
  messagingSenderId: "91395202268",
  appId: "1:91395202268:web:a7787f5d1d6fa619a5e819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

//Collection Ref
const sessionsRef = collection(db, 'sessions');

//Create Session
//Create Session - Get email
const user = localStorage.getItem('loggedInUserId');
let hostEmail, hostName, userName, userEmail;
if(user){
    const emailRef = doc(db, "users", user);
    getDoc(emailRef)
    .then((docSnap)=>{
        if(docSnap.exists()){
            const userData = docSnap.data();
            hostEmail = userData.email;
            hostName = userData.fullName;
            userName = userData.fullName;
            userEmail = userData.email;
        }
        else{
            console.log("no document found matching id")
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}
else{
    console.log("User Id not Found in Local storage")
}

//Create Session - Get Form
function getRandomPastelColor() {
    const randomColorValue = () => Math.floor(Math.random() * 256);
    const r = (randomColorValue() + 150)/2;
    const g = (randomColorValue() + 150)/2;
    const b = (randomColorValue() + 150)/2;
    return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
}

const createSession = document.querySelector('#create-session-form')

createSession.addEventListener('submit', (event) => {
    event.preventDefault()
    // console.log(createSession.sessionName.value);
    addDoc (sessionsRef, {
        // sessionCode: createSession.sessionCode.value,
        sessionName: createSession.sessionName.value,
        hostName: hostName, 
        hostEmail: hostEmail,
        // membersName: arrayUnion(hostName),
        // membersEmail: arrayUnion(hostEmail),
        dateCreated: serverTimestamp(),
        sessionColor: getRandomPastelColor(),
        membersName: [],
        membersEmail: [],
        membersPoint: [],
        membersId: [],
        groupsName: [],
        groupsMembers: [],
        groupsPoint: [],
        iHistoryName: [],
        iHistoryDate: [],
        iHistoryPoint: [],
        gHistoryName: [],
        gHistoryDate: [],
        gHistoryPoint: [],
        // role: 'host',
    })
    .then(() => {
        createSession.reset();
        window.location.href='mysessions.html';
    })
});

//Join Session
const joinSession = document.querySelector('#join-session-form')

joinSession.addEventListener('submit', (event) => {
    event.preventDefault()
    // console.log(joinSession.inputCode.value);
    const joinRef = doc(db, 'users', user);
    const memberRef = doc(db, 'sessions', joinSession.inputCode.value)

    //Check first if session exist
    async function check() {
        const docSnap = await getDoc(memberRef);
        if(docSnap.exists()) {
            const addName = docSnap.data().membersName || [];
            const addPoint = docSnap.data().membersPoint || [];
            const updateName = [...addName, userName];
            const updatePoint = [...addPoint, 0];
            
            updateDoc (memberRef, {
                // members: arrayUnion(userName),
                membersName: updateName,
                membersEmail: arrayUnion(userEmail),
                membersPoint: updatePoint,
                membersId: arrayUnion(user),
            })
            updateDoc (joinRef, {
                // membersName: arrayUnion(userName),
                joinedSessions: arrayUnion(joinSession.inputCode.value),
            })
            .then(() => {
                joinSession.reset();
                window.location.href='sessions.html';
            })       
        } else {
            alert('Session does not exist :(');
        }
    }
    check();
})

// Display recents









