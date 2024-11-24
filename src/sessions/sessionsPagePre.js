// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, getDoc, updateDoc, arrayUnion, arrayRemove, getDocs, addDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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

const currentDateTime = new Date();
const year = currentDateTime.getFullYear();
const month = currentDateTime.getMonth() + 1;
const day = currentDateTime.getDate();
const hours = currentDateTime.getHours();
const minutes = currentDateTime.getMinutes();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = getAuth();
const db = getFirestore();

// Session Reference
const sessionRef = doc(db, "sessions", sId);
const docRef = doc(db, "sessions", sId);

getDoc(sessionRef)
    .then((doc) => {
        if (doc.exists()) {
            const sessionData = doc.data();
            document.getElementById('navJoinedSessionName').innerText=sessionData.sessionName;
        } else {
            console.log("error")
        }
    })
const userId=localStorage.getItem('loggedInUserId');
// console.log(userId);

let userIndex;

const getUserInfo = async (targetValue) => {
    try {
      // Retrieve the document
        const docSnap = await getDoc(sessionRef);
        
        if (docSnap.exists()) {
        // Get the array from Firestore
        const myArray = docSnap.data().membersId; // Replace 'myArray' with your field name
  
        // Find the index of the target value
        userIndex = myArray.indexOf(targetValue);
  
        if (userIndex !== -1) {
            const sUserName = document.getElementById('s-userName');
            sUserName.textContent = `${docSnap.data().membersName[userIndex]}`;

            const sUserPoint = document.getElementById('s-userPoint');
            sUserPoint.textContent = `${docSnap.data().membersPoint[userIndex]}`;
        } else {
          console.log(`The value ${targetValue} was not found in this session.`);
        }
      } else {
        console.error("Document does not exist!");
      }
    } catch (error) {
      console.error("Error retrieving Firestore data:", error);
    }
  };
  getUserInfo(userId);

const getRankInfo = async () => {
    try {
        // Retrieve the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        // Get the arrays from Firestore
        const names = docSnap.data().membersName; // Replace 'namesArray' with your field name
        const points = docSnap.data().membersPoint; // Replace 'pointsArray' with your field name

        // Check if both arrays have the same length
        if (names.length !== points.length) {
            console.error("Names and points arrays must have the same length.");
            return;
        }

        // Combine the arrays into an array of objects
        const combinedArray = names.map((name, index) => ({
            name: name,
            points: points[index],
        }));

        // Sort the combined array by points in descending order
        combinedArray.sort((a, b) => b.points - a.points);

        // Display the sorted array
        // console.log("Sorted Names and Points:");
        const sUserRef = doc(db, "users", userId);
        getDoc(sUserRef)
        .then((docSnap)=>{
            const userData = docSnap.data();
            const sUserName = userData.fullName;
            let rank = 0;
            combinedArray.forEach((entry) => {
                // console.log(`${sUserName} ${rank} ${entry.name}: ${entry.points}`);
                if (sUserName == entry.name){
                    const userRank = document.getElementById('s-userRank');
                    userRank.textContent = `${rank + 1}`;
                }
                rank++;
            });
        })
        
        } else {
        console.error("Document does not exist!");
        }
    } catch (error) {
        console.error("Error retrieving data:", error);
    }
};

// Call the function
getRankInfo();