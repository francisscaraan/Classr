// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, getDoc, getDocs, addDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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
const mysessionsRef = collection(db, 'sessions');

// Get Email
const getUser = localStorage.getItem('loggedInUserId');
let userEmail;
if(getUser){
    const emailRef = doc(db, "users", getUser);
    getDoc(emailRef)
    .then((docSnap)=>{
        if(docSnap.exists()){
            const hostData = docSnap.data();
            userEmail = hostData.email;
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


// Display My Sessions
async function displayMySessions() {
    showLoading();
    const sessionCard = document.getElementById('mysessions-container');
    const q = query(
        collection(db, 'sessions'),
        orderBy('dateCreated', 'desc')
    );
    const querySnapshot = await getDocs(q)
    try {
        // Fetch all documents from the collection
        
        let docCount = querySnapshot.size;
        let count = 0;
        // Loop through the documents and display their data
        if (querySnapshot.empty) {
            const emptyMsg = document.createElement('div');
            emptyMsg.textContent = 'No documents yet :(';
            emptyMsg.classList.add('no-doc-msg')
            sessionCard.appendChild(emptyMsg);
        } else {

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                let creator = data.hostEmail;
                // let sessionCounter = 1;
                if (userEmail === creator){

                    //Session Card
                    const card = document.createElement('div');
                    card.id = doc.id;
                    card.classList.add('mysession-card');
                    // card.onclick = goToMySessionPage;
                    card.onclick = () => {
                        window.location.href = "mysessionPage.html?docId=" + encodeURIComponent(doc.id);
                    }

                    function getRandomPastelColor() {
                        const randomColorValue = () => Math.floor(Math.random() * 256); // Random number between 0 and 255
                        const r = (randomColorValue()); // Blend with white
                        const g = (randomColorValue());
                        const b = (randomColorValue());
                        return `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
                    }
                    
                    //Session header
                    const cardHeader = document.createElement('div');
                    cardHeader.style.backgroundColor = data.sessionColor;
                    cardHeader.classList.add('card-header');

                    card.appendChild(cardHeader);

                    const cardTitleContainer = document.createElement('div');
                    cardTitleContainer.classList.add('card-title-container');
                    card.appendChild(cardTitleContainer);

                    //Session title
                    const cardTitle = document.createElement('div');
                    cardTitle.classList.add('card-title');
                    cardTitle.textContent = `${data.sessionName}`;
                    cardTitleContainer.appendChild(cardTitle);

                

                    //Session copy icon button
                    const copyButton = document.createElement('button');
                    copyButton.id = 'copy-code';
                    copyButton.addEventListener('click', function(event){
                        event.stopPropagation();
                        navigator.clipboard.writeText(doc.id)
                        .then(() => {
                            alert('Session Code Copied!');
                        })
                        .catch(err => {
                            console.error(err);
                        });
                    })

                    // //Session copy code
                    // const copyIcon = document.createElement('i');
                    // copyIcon.classList.add('bx', 'bx-copy');
                    // copyButton.appendChild(copyIcon);
                    // card.appendChild(copyButton);
            
                    //Session author
                    const cardAuthor = document.createElement('div');
                    cardAuthor.classList.add('card-info');
                    cardAuthor.textContent = `By me`;
                    card.appendChild(cardAuthor);

                    //Session date
                    const cardDate = document.createElement('div');
                    cardDate.classList.add('card-info');
                    cardDate.textContent = `${data.dateCreated.toDate().getMonth() + 1} / ${data.dateCreated.toDate().getDate()} / ${data.dateCreated.toDate().getFullYear()}`;
                    card.appendChild(cardDate);

                    //Session copy code
                    const copyIcon = document.createElement('i');
                    copyIcon.classList.add('bx', 'bx-copy');
                    copyButton.appendChild(copyIcon);

                    // Delete session button
                    const deleteButton = document.createElement('delete');
                    deleteButton.id = 'delete-btn';
                    deleteButton.addEventListener('click', function(event){
                        event.stopPropagation();
                        alert('Sorry Di pa tapos :(((');
                        // .then(() => {
                        //     alert('Session Code Copied!');
                        // })
                        // .catch(err => {
                        //     console.error(err);
                        // });
                    })

                    // Delete icon
                    const deleteIcon = document.createElement('i');
                    deleteIcon.classList.add('bx', 'bx-trash');
                    deleteButton.appendChild(deleteIcon);
                    
                    // Card button container
                    const cardBtnContainer = document.createElement('div');
                    cardBtnContainer.classList.add('card-btn-container');
                    
                    cardBtnContainer.appendChild(copyButton);
                    cardBtnContainer.appendChild(deleteButton);
                    card.appendChild(cardBtnContainer);

                    sessionCard.appendChild(card);
                    // sessionCounter++;
                } else {
                    count++;
                }
            });
            if (count == docCount){
                const emptyMsg = document.createElement('div');
                emptyMsg.textContent = 'You have not created a session yet :(';
                emptyMsg.classList.add('no-doc-msg');
                sessionCard.appendChild(emptyMsg);
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        hideLoading();
    }
}

displayMySessions();