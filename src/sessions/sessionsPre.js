// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, where, orderBy, limit, getDoc, getDocs, addDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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

/*
Algorithm:
1. Get listed session ids from the joinedSessions of the currently logged in user
2. Display session if its id matches an id(s) from the joinedSessions array field of the logged in user

To do step 2:
1. Loop through each element of the array field "joinedSessions" of the currently logged in user
2. In each iteration, check if the id stored in that element matches a session
3. If an id matches, display the session card
4. If there the array has no elements, display "You have not joined a session yet :("
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = getAuth();
const db = getFirestore();

const getUser = localStorage.getItem('loggedInUserId');

// Reference to the loading screen and content
const loadingScreen = document.getElementById('loading');

// Function to show loading screen
function showLoading() {
  loadingScreen.style.display = 'block';
}

// Function to hide loading screen
function hideLoading() {
  loadingScreen.style.display = 'none';
}

async function displaySessions() {
    showLoading();
    const sessionCard = document.getElementById('sessions-container');
    try {
        const getUserSessions = doc(db, 'users', getUser); //Reference to get data fields of the currently logged in user
        const docSnap = await getDoc(getUserSessions); //Get fields of the referenced document
        
        if (docSnap.exists()){
            const joinedSessions = docSnap.data().joinedSessions; //Get the array
            
            if(Array.isArray(joinedSessions) && joinedSessions.length > 0){
                const q = query(collection(db, 'sessions'), where('__name__', 'in', joinedSessions.slice(0, 10)));
                // In case joined sessions are more than 10
                // for (let i = 0; i < docIdsArray.length; i += 10) {
                //     const batch = docIdsArray.slice(i, i + 10);
                //     const q = query(collection(db, 'otherCollectionName'), where('__name__', 'in', batch));
                // 
                // }
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {

                    // console.log(doc.data());
                    const card = document.createElement('div');
                    card.id = 'session-card';
                    // card.onclick = goToSessionPage();
                    
                    //Session header
                    const cardHeader = document.createElement('div');
                    cardHeader.classList.add('card-header');

                    card.appendChild(cardHeader);

                    const cardTitleContainer = document.createElement('div');
                    cardTitleContainer.classList.add('card-title-container');
                    card.appendChild(cardTitleContainer);

                    //Session title
                    const cardTitle = document.createElement('div');
                    cardTitle.classList.add('card-title');
                    cardTitle.textContent = `${doc.data().sessionName}`;
                    cardTitleContainer.appendChild(cardTitle);

                    //Session author
                    const cardAuthor = document.createElement('div');
                    cardAuthor.classList.add('card-info');
                    cardAuthor.textContent = `By ${doc.data().hostName}`;
                    card.appendChild(cardAuthor);

                    //Session date
                    const cardDate = document.createElement('div');
                    cardDate.classList.add('card-info');
                    cardDate.textContent = `${doc.data().dateCreated.toDate().getMonth() + 1} / ${doc.data().dateCreated.toDate().getDate()} / ${doc.data().dateCreated.toDate().getFullYear()}`;
                    card.appendChild(cardDate);

                    sessionCard.appendChild(card);
                });
            } else {
                const noSessions = document.createElement('div');
                noSessions.classList.add('no-sessions-container');
                noSessions.textContent = 'You have not joined a session yet :(';
                sessionCard.appendChild(noSessions);
            }
        }
    } catch(error){
        console.log(error);
    } finally {
        hideLoading();
    }
}
displaySessions();


