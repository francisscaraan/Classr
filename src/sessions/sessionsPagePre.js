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

// display individual recitation mode
async function displayIndividualMode(){
  // const recitationContent = document.getElementById('s-recitation-content');
  const recitationBoardContainer = document.getElementById('s-mode-recitation-container1')

  try {
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      const data = docSnap.data();
      const member = data.membersName;
      const point = data.membersPoint;
      if(Array.isArray(member) && Array.isArray(point)){
        // const arrayLength = Math.min(member.length, point.length);
        if (member.length == point.length){
          const arrayLength = member.length;
          if (arrayLength > 0){
            for (let i = 0; i < arrayLength; i++){
              // member card
              const memberCard = document.createElement('div');
              memberCard.classList.add('member-card');
              recitationBoardContainer.appendChild(memberCard);

              // name container
              const nameContainer = document.createElement('div');
              nameContainer.classList.add('name-container');
              nameContainer.textContent = `${member[i]}`;
              memberCard.appendChild(nameContainer);

              // point container
              const pointContainer = document.createElement('div');
              pointContainer.classList.add('point-container');
              pointContainer.textContent = `${point[i]}`;
              memberCard.appendChild(pointContainer);
            }
          } else {
              
          }
        } else {
            console.log("Error");
        }
      }
    }
  } catch {

  }
}
displayIndividualMode();

async function displayIRH(){
  const irhContainer = document.getElementById('irh-container');

  try {
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      const irhNameList = data.iHistoryName;
      const irhDateList = data.iHistoryDate;
      const irhPointList = data.iHistoryPoint;

      if(Array.isArray(irhNameList) && Array.isArray(irhDateList)){
          // console.log(irhNameList.length, irhDateList.length);
          if (irhNameList.length == irhDateList.length){
              if (irhNameList.length > 0){
                  for (let i = irhNameList.length - 1; i >= 0; i--) {
                      // irh card
                      const irhCard = document.createElement('div');
                      irhCard.classList.add('irh-card');
                      irhContainer.appendChild(irhCard);

                      const irhNameContainer = document.createElement('div');
                      irhNameContainer.classList.add('irh-name-container');
                      irhCard.appendChild(irhNameContainer);

                      const irhName = document.createElement('div');
                      irhName.classList.add('irh-name');
                      irhName.textContent = `${irhNameList[i]}`;
                      irhNameContainer.appendChild(irhName);

                      const irhDateContainer = document.createElement('div');
                      irhDateContainer.classList.add('irh-date-container');
                      irhCard.appendChild(irhDateContainer);

                      const irhDate = document.createElement('div');
                      irhDate.classList.add('irh-date');
                      irhDate.textContent = `${irhDateList[i]}`;
                      irhDateContainer.appendChild(irhDate);

                      const irhApContainer = document.createElement('div');
                      irhApContainer.classList.add('irh-ap-container');
                      irhCard.appendChild(irhApContainer);

                      const irhAp = document.createElement('div');
                      irhAp.classList.add('irh-ap');
                      if (irhPointList[i] > 0){
                        irhAp.classList.add('plusGreen');
                      } else {
                          irhAp.classList.add('minusRed');
                      }
                      irhAp.textContent = `${irhPointList[i]}`;
                      irhApContainer.appendChild(irhAp);
                  }
              } else {
                const noIrh = document.createElement('div');
                noIrh.classList.add('no-irh');
                noIrh.textContent = 'There are no records yet :(';
                irhContainer.appendChild(noIrh);
              }
          } else {
              console.log("error");
          }
      }
  } catch {
      console.log("error");
  }
}
displayIRH();

async function displayGroupMode(){
  // const recitationContent = document.getElementById('s-recitation-content');
  const groupModeContent = document.getElementById('s-mode-recitation-container2');

  try {
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
          const data = docSnap.data();
          const groupName = data.groupsName;
          const groupPoint = data.groupsPoint;
          const groupMembers = data. groupsMembers;
          
          if (groupName.length > 0){
              for (let i = 0; i < groupName.length; i++){
                // groups card
                const groupCard = document.createElement('div');
                groupCard.classList.add('group-card');
                groupModeContent.appendChild(groupCard);

                // name container
                const nameContainer = document.createElement('div');
                nameContainer.classList.add('name-container');
                groupCard.appendChild(nameContainer);

                // groups and members container
                const gmContainer = document.createElement('div');
                gmContainer.classList.add('gname-gmembers-container');
                nameContainer.appendChild(gmContainer);

                // group name
                const gName = document.createElement('div');
                gName.classList.add('gname');
                gName.textContent = `${groupName[i]}`;
                gmContainer.appendChild(gName);

                // group members
                const gMembers = document.createElement('div');
                gMembers.classList.add('gmembers');
                gMembers.textContent = `${groupMembers[i]}`;
                gmContainer.appendChild(gMembers);

                // Points
                const pointContainer = document.createElement('div');
                pointContainer.classList.add('point-container');
                pointContainer.textContent = `${groupPoint[i]}`;
                groupCard.appendChild(pointContainer);
              }
          } else {
              const noGroups = document.createElement('div');
              noGroups.classList.add('no-groups');
              noGroups.textContent = 'There are no groups yet :(';
              groupModeContent.appendChild(noGroups);
          }
      }
  } catch(error) {
      console.log(error);
  }
}
displayGroupMode();

async function displayGRH(){
  const grhContainer = document.getElementById('grh-container');

  try {
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      const grhNameList = data.gHistoryName;
      const grhDateList = data.gHistoryDate;
      const grhPointList = data.gHistoryPoint;

      if(Array.isArray(grhNameList) && Array.isArray(grhDateList)){
          // console.log(grhNameList.length, grhDateList.length);
          if (grhNameList.length == grhDateList.length){
              if (grhNameList.length > 0){
                  for (let i = grhNameList.length - 1; i >= 0; i--) {
                      // irh card
                      const grhCard = document.createElement('div');
                      grhCard.classList.add('grh-card');
                      grhContainer.appendChild(grhCard);

                      const grhNameContainer = document.createElement('div');
                      grhNameContainer.classList.add('grh-name-container');
                      grhCard.appendChild(grhNameContainer);

                      const grhName = document.createElement('div');
                      grhName.classList.add('grh-name');
                      grhName.textContent = `${grhNameList[i]}`;
                      grhNameContainer.appendChild(grhName);

                      const grhDateContainer = document.createElement('div');
                      grhDateContainer.classList.add('grh-date-container');
                      grhCard.appendChild(grhDateContainer);

                      const grhDate = document.createElement('div');
                      grhDate.classList.add('grh-date');
                      grhDate.textContent = `${grhDateList[i]}`;
                      grhDateContainer.appendChild(grhDate);

                      const grhApContainer = document.createElement('div');
                      grhApContainer.classList.add('grh-ap-container');
                      grhCard.appendChild(grhApContainer);

                      const grhAp = document.createElement('div');
                      grhAp.classList.add('grh-ap');
                      if (grhPointList[i] > 0){
                        grhAp.classList.add('plusGreen');
                    } else {
                        grhAp.classList.add('minusRed');
                    }
                      grhAp.textContent = `${grhPointList[i]}`;
                      grhApContainer.appendChild(grhAp);

                      
                  }
              } else {
                const noIrh = document.createElement('div');
                noIrh.classList.add('no-irh');
                noIrh.textContent = 'There are no records yet :(';
                grhContainer.appendChild(noIrh);
              }
          } else {
              console.log("error");
          }
      }
  } catch {
      console.log('error');
  }
}
displayGRH();

async function displayMember(){
    
  try {
      const mSnap = await getDoc(docRef);

      if (mSnap.exists()){
          const mtData = mSnap.data();

          document.getElementById('mtHostName').innerText=mtData.hostName;
          document.getElementById('mtHostEmail').innerText=mtData.hostEmail;

          const membersContainer = document.getElementById('membersContainer');
          const mName = mtData.membersName;
          const mEmail = mtData.membersEmail;

          if (mName.length > 0){
              for (let i = 0; i < mName.length; i++){
                  // member card
                  const mtMemberCard = document.createElement('div');
                  mtMemberCard.classList.add('mt-member-card');
                  membersContainer.appendChild(mtMemberCard);

                  // name and email container
                  const neContainer = document.createElement('div');
                  neContainer.classList.add('name-email-container');
                  mtMemberCard.appendChild(neContainer);

                  // name container
                  const mtMName = document.createElement('div');
                  mtMName.classList.add('mt-name-text');
                  mtMName.textContent = `${mName[i]}`;
                  neContainer.appendChild(mtMName);

                  // email container
                  const mtMEmail = document.createElement('div');
                  mtMEmail.classList.add('mt-email-text');
                  mtMEmail.textContent = `${mEmail[i]}`;
                  neContainer.appendChild(mtMEmail);

                  // divider
                  const divider = document.createElement('hr');
                  divider.classList.add('divider');
                  membersContainer.appendChild(divider);
              }
          } else {
              // ERROR
          }
      }
  } catch (error){
      console.error("Error");
  }

}
displayMember();

async function displayGroups(){
  const groupContainer = document.getElementById('group-container');;

  try {
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      const data = docSnap.data();
      const groupName = data.groupsName;
      const groupMember = data.groupsMembers;
      const groupPoint = data.groupsPoint;

      if(Array.isArray(groupName) && Array.isArray(groupMember) && Array.isArray(groupPoint)){
        if ((groupName.length == groupMember.length) && (groupName.length == groupPoint.length)){
          const arrayLength = groupName.length;
          if(arrayLength > 0){
            for (let i = 0; i < arrayLength; i++){
              // group card
              const gtGroupCard = document.createElement('div');
              gtGroupCard.classList.add('gt-group-card');
              groupContainer.appendChild(gtGroupCard);

              // group name and members container
              const groupNameMembrsContainer = document.createElement('div');
              groupNameMembrsContainer.classList.add('groupName-members-container');
              gtGroupCard.appendChild(groupNameMembrsContainer);

              // group name
              const gtGroupName = document.createElement('div');
              gtGroupName.classList.add('gt-groupName-text');
              gtGroupName.textContent = `${groupName[i]}`;
              groupNameMembrsContainer.appendChild(gtGroupName);

              // group members
              const gtMembersName = document.createElement('div');
              gtMembersName.classList.add('gt-members-text');
              gtMembersName.textContent = `${groupMember[i]}`;
              groupNameMembrsContainer.appendChild(gtMembersName);

              // divider
              const divider = document.createElement('hr');
              divider.classList.add('divider');
              groupContainer.appendChild(divider);
            }
          } else {
              // No groups
              const gtNoGroup = document.createElement('div');
              gtNoGroup.classList.add('gt-no-groups');
              gtNoGroup.textContent = 'There are no groups yet :(';
              groupContainer.appendChild(gtNoGroup);
          }
        }
      }
    }
  } catch (error){
    console.log(error);
  }
}
displayGroups();

const displaySortedNamesAndPoints = async () => {
  const lBoardCont1 = document.getElementById('lboard-container1');

  try {
      // Retrieve the document
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          // Get the arrays from Firestore
          const memNames = docSnap.data().membersName; // Replace 'namesArray' with your field name
          const memPoints = docSnap.data().membersPoint; // Replace 'pointsArray' with your field name

          // Check if both arrays have the same length
          if (memNames.length !== memPoints.length) {
          console.error("Names and points arrays must have the same length.");
          return;
          }

          // Combine the arrays into an array of objects
          const combinedArray = memNames.map((memName, index) => ({
          memName: memName,
          memPoints: memPoints[index],
          }));

          // Sort the combined array by points in descending order
          combinedArray.sort((a, b) => b.memPoints - a.memPoints);

          // Display the sorted array
          // console.log("Sorted Names and Points:");
          let i = 1;
          combinedArray.forEach((entry) => {
              // console.log(`${i}  ${entry.memName}: ${entry.memPoints}`);
              const lBoardCard = document.createElement('div');
              lBoardCard.classList.add('lboard-card');
              lBoardCont1.appendChild(lBoardCard);

              const lboardRank = document.createElement('div');
              lboardRank.classList.add('lboard-rank');
              lboardRank.textContent = `${i}`;
              lBoardCard.appendChild(lboardRank);

              const lboardName = document.createElement('div');
              lboardName.classList.add('lboard-name');
              lboardName.textContent = `${entry.memName}`;
              lBoardCard.appendChild(lboardName);

              const lboardPoints = document.createElement('div');
              lboardPoints.classList.add('lboard-points');
              lboardPoints.textContent = `${entry.memPoints}`;
              lBoardCard.appendChild(lboardPoints);


              i++;
          });
      } else {
          console.log("no data");
      }
  } catch (error) {
      console.error("Error retrieving data:", error);
  }
  };
displaySortedNamesAndPoints();

const displaySortedGroupsAndPoints = async () => {
  const lBoardCont2 = document.getElementById('lboard-container2');
  
  try {
      // Retrieve the document
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
          // Get the arrays from Firestore
          const grpNames = docSnap.data().groupsName; // Replace 'namesArray' with your field name
          const grpPoints = docSnap.data().groupsPoint; // Replace 'pointsArray' with your field name
  
          // Check if both arrays have the same length
          if (grpNames.length !== grpPoints.length) {
          console.error("Names and points arrays must have the same length.");
          return;
          }
  
          // Combine the arrays into an array of objects
          const combinedArray = grpNames.map((grpName, index) => ({
          grpName: grpName,
          grpPoints: grpPoints[index],
          }));
  
          // Sort the combined array by points in descending order
          combinedArray.sort((a, b) => b.grpPoints - a.grpPoints);
  
          // Display the sorted array
          // console.log("Sorted Names and Points:");
          let i = 1;
          
          combinedArray.forEach((entry) => {
              // console.log(`${i}  ${entry.memName}: ${entry.memPoints}`);
              if (i <= 10){
                  const lBoardCard = document.createElement('div');
                  lBoardCard.classList.add('lboard-card');
                  lBoardCont2.appendChild(lBoardCard);
      
                  const lboardRank = document.createElement('div');
                  lboardRank.classList.add('lboard-rank');
                  lboardRank.textContent = `${i}`;
                  lBoardCard.appendChild(lboardRank);
                  
      
                  const lboardName = document.createElement('div');
                  lboardName.classList.add('lboard-name');
                  lboardName.textContent = `${entry.grpName}`;
                  lBoardCard.appendChild(lboardName);
      
                  const lboardPoints = document.createElement('div');
                  lboardPoints.classList.add('lboard-points');
                  lboardPoints.textContent = `${entry.grpPoints}`;
                  lBoardCard.appendChild(lboardPoints);
                  i++;
              }
          });
  
          
      } else {
          console.log("no data");
      }
  } catch (error) {
      console.error("Error retrieving data:", error);
  }
  };
  
  // Call the function
  displaySortedGroupsAndPoints();