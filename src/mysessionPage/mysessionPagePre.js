// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, getDoc, updateDoc, arrayUnion, getDocs, addDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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

// const auth = getAuth();
const db = getFirestore();

// Session Reference
const sessionRef = doc(db, "sessions", sId);

getDoc(sessionRef)
    .then((doc) => {
        if (doc.exists()) {
            const sessionData = doc.data();
            document.getElementById('navSessionName').innerText=sessionData.sessionName;
        } else {
            console.log("error")
        }
    })
// const getSessionId = localStorage.getItem("sessionId");
// if (getSessionId) {
//     console.log("Document ID: ", getSessionId);
//     // You can now use this docId in Firestore queries or anywhere else
//   } else {
//     console.log("No document ID found");
// }

//  console.log(sId);

// Recitation Board Display (Member Card)
const docRef = doc(collection(db, 'sessions'), sId); //document reference

// Recitation Tab
async function displayRecitation(){
    const recitationContent = document.getElementById('recitation-content');
    const recitationBoardContainer = document.getElementById('recitation-board-container')


    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const data = docSnap.data();
            const member = data.membersName;
            const point = data.membersPoint;
            if(Array.isArray(member) && Array.isArray(point)){
                // const arrayLength = Math.min(member.length, point.length);
                if (member.length == point.length){
                    const arrayLength = member.length;
                    if (arrayLength > 0){
                        for (let i = 0; i < arrayLength; i++){
                            // Member Card
                            const memberCard = document.createElement('div');
                            memberCard.classList.add('member-card');
    
                            // Name Container
                            const nameContainer = document.createElement('div');
                            nameContainer.classList.add('name-container');
    
                            // Name checkbox and label
                            const nameLabel = document.createElement('label');
                            nameLabel.classList.add('name-label');
                            nameLabel.textContent = `${member[i]}`;
    
                            const checkbox = document.createElement('input');
                            checkbox.id = 'checkbox-' + i;
                            checkbox.type = 'checkbox';
                            nameLabel.appendChild(checkbox);

                            
    
                            const checkmark = document.createElement('span');
                            checkmark.classList.add('checkmark');
                            nameLabel.appendChild(checkmark);
    
                            nameContainer.appendChild(nameLabel);
    
                            // const cb = document.getElementById('checkbox-' + i);
                            // document.addEventListener("DOMContentLoaded", () => {
                            //     const isChecked = localStorage.getItem("cbStatus") === "true";
                            //     cb.checked = isChecked;
                            // })

                            // cb.addEventListener("change", () => {
                            //     localStorage.setItem("cbStatus", cb.checked);
                            // })

                            // Point Container
                            const pointContainer = document.createElement('div');
                            pointContainer.classList.add('point-container');
                            pointContainer.textContent = `${point[i]}`;
    
                            

                            // Edit points popup
                            const editPointsPopup = document.createElement('div');
                            editPointsPopup.classList.add('edit-points-popup');
                            editPointsPopup.id = "ep-popup-" + i;
                            recitationContent.appendChild(editPointsPopup);

                            const eppModal = document.createElement('div');
                            eppModal.classList.add('epp-modal');
                            editPointsPopup.appendChild(eppModal);

                            const eppInfo = document.createElement('div');
                            eppInfo.classList.add('epp-info');
                            eppModal.appendChild(eppInfo);

                            const eppTitle = document.createElement('p');
                            eppTitle.classList.add('epp-title');
                            eppTitle.textContent = 'Edit Points';
                            eppInfo.appendChild(eppTitle);

                            const eppName = document.createElement('div');
                            eppName.classList.add('epp-name');
                            eppName.textContent = `${member[i]}`;
                            eppInfo.appendChild(eppName);

                            eppModal.appendChild(document.createElement('hr'));

                            const editPointForm = document.createElement('form');
                            editPointForm.classList.add('edit-point-form');
                            editPointForm.id = 'epp-form-' + i;
                            eppModal.appendChild(editPointForm);

                            const currentPointContainer = document.createElement('div');
                            currentPointContainer.classList.add('current-point-container');
                            editPointForm.appendChild(currentPointContainer);

                            const currentPointTitle = document.createElement('div');
                            currentPointTitle.classList.add('current-point');
                            currentPointTitle.textContent = 'Current points:';
                            currentPointContainer.appendChild(currentPointTitle);
                            
                            const currentPointValue = document.createElement('div');
                            currentPointValue.classList.add('current-point');
                            currentPointValue.textContent = `${point[i]}`;
                            currentPointContainer.appendChild(currentPointValue);

                            const newPointContainer = document.createElement('div');
                            newPointContainer.classList.add('new-point-container');
                            editPointForm.appendChild(newPointContainer);

                            const newPoint = document.createElement('div');
                            newPoint.classList.add('new-point');
                            newPoint.textContent = 'Update point:';
                            newPointContainer.appendChild(newPoint);

                            const inputEppContainer = document.createElement('div');
                            inputEppContainer.classList.add('input-epp-container');
                            newPointContainer.appendChild(inputEppContainer);

                            const inputEpp = document.createElement('input');
                            inputEpp.classList.add('input-epp');
                            inputEpp.id = 'input-epp-' + i;
                            inputEpp.type = "number";
                            inputEpp.placeholder = "Edit points";
                            // inputEpp.value = `${point[i]}`;
                            inputEpp.required = true;
                            inputEppContainer.appendChild(inputEpp);
                            
                            const eppBtnContainer = document.createElement('div');
                            eppBtnContainer.classList.add('epp-btn-container');
                            editPointForm.appendChild(eppBtnContainer);

                            const cancelEdit = document.createElement('button');
                            cancelEdit.classList.add('epp-btn');
                            cancelEdit.id = 'cancel-edit-' + i;
                            cancelEdit.type = "button";
                            cancelEdit.textContent = "Cancel";
                            eppBtnContainer.appendChild(cancelEdit);

                            const saveEdit = document.createElement('button');
                            saveEdit.classList.add('epp-btn');
                            saveEdit.id = 'save-edit-' + i;
                            saveEdit.type = "submit";
                            saveEdit.textContent = "Save";
                            eppBtnContainer.appendChild(saveEdit);

                            const pleaseWait = document.createElement('div');
                            pleaseWait.classList.add('waitMssg');
                            pleaseWait.id = 'wait-' + i;
                            pleaseWait.textContent = 'Saving changes...';
                            eppModal.appendChild(pleaseWait);

                            document.getElementById('cancel-edit-' + i).addEventListener('click', () => {
                                event.preventDefault();
                                eppContainer.classList.remove('showEpp');
                                document.getElementById('epp-form-' + i).reset();
                            })

                            const editForm  = document.getElementById('epp-form-' + i);
                            const waitMssg = document.getElementById('wait-' + i);
                            function showMssg(){
                                waitMssg.style.display = 'block';
                            }
                            editForm.addEventListener('submit', (event) => {
                                event.preventDefault()
                                const updatedPoint = parseInt(document.getElementById('input-epp-' + i).value);
                                async function epp() {
                                    showMssg();
                                    const memInfo = await getDoc(docRef);
                                    try {
                                        if(memInfo.exists()) {
                                            let pointsArray = memInfo.data().membersPoint || [];
                                            pointsArray[i] = updatedPoint;
                                            
                                            updateDoc (docRef, {
                                                membersPoint: pointsArray,
                                            })
                                            .then(() => {
                                                editForm.reset();
                                                location.replace(location.href);
                                                // window.location.href='mysessionPage.html';
                                            })
                                        }
                                    } catch (error){
                                        console.error(error);
                                    }
                                }
                                epp();
                            })

                            // Edit Button
                            const editBtn = document.createElement('button');
                            editBtn.classList.add('open-edit-popup');

                            const eppContainer = document.getElementById('ep-popup-' + i);
                            editBtn.addEventListener("click", function() {
                                eppContainer.classList.add('showEpp');
                            });
    
                            const editIcon = document.createElement('i');
                            editIcon.classList.add('bx', 'bx-edit');
                            editBtn.appendChild(editIcon);
    
                            memberCard.appendChild(nameContainer);
                            memberCard.appendChild(pointContainer);
                            memberCard.appendChild(editBtn);
                            recitationBoardContainer.appendChild(memberCard);
                        }
                    } else {
                        const noMembers = document.createElement('div');
                        noMembers.classList.add('no-members');

                        const mssg = document.createElement('div');
                        mssg.classList.add('mssg');
                        mssg.innerText = `There are no members yet :(`;

                        const copyInv = document.createElement('button');
                        copyInv.id = 'copyInv';
                        copyInv.innerText = 'Copy invitation code';
                        copyInv.addEventListener('click', function(event){
                            event.stopPropagation();
                            navigator.clipboard.writeText(sId)
                            .then(() => {
                                alert('Sesssion Code Copied!');
                            })
                            .catch(err => {
                                console.error(err);
                            })
                        })

                        const copyI = document.createElement('i');
                        copyI.classList.add('bx', 'bx-copy');

                        copyInv.appendChild(copyI);

                        noMembers.appendChild(mssg);
                        noMembers.appendChild(copyInv);

                        recitationBoardContainer.appendChild(noMembers);
                    }
                } else {
                    console.log("Error");
                }
            }
        } else {
            console.log("empty");
        }
    } catch (error){
        console.error(error);
    }
}
displayRecitation();

//Members Tab
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
            const listSize = mName.length;

            if (listSize > 0){
                for (let i = 0; i < listSize; i++){
                    const mtMemberCard = document.createElement('div');
                    mtMemberCard.classList.add('mt-member-card');

                    const nameEmailContainer = document.createElement('div');
                    nameEmailContainer.classList.add('name-email.container');

                    const mtNameText = document.createElement('div');
                    mtNameText.classList.add('mt-name-text');
                    mtNameText.textContent = `${mName[i]}`;
                    nameEmailContainer.appendChild(mtNameText);

                    const mtEmailText = document.createElement('div');
                    mtEmailText.classList.add('mt-email-text');
                    mtEmailText.textContent = `${mEmail[i]}`;
                    nameEmailContainer.appendChild(mtEmailText);

                    const deleteMember = document.createElement('button');
                    deleteMember.id = 'delete-member';

                    const deleteIcon = document.createElement('i');
                    deleteIcon.classList.add('bx', 'bx-dots-vertical-rounded');
                    
                    deleteMember.appendChild(deleteIcon);

                    const divider = document.createElement('hr');
                    divider.classList.add('divider');

                    mtMemberCard.appendChild(nameEmailContainer);
                    mtMemberCard.appendChild(deleteMember);

                    membersContainer.appendChild(mtMemberCard);
                    membersContainer.appendChild(divider);
                }
            } else {
                const mtNoMembers = document.createElement('div');
                mtNoMembers.classList.add('mt-no-members');

                const mtMssg = document.createElement('div');
                mtMssg.classList.add('mssg');
                mtMssg.textContent = `There are no members yet :(`;

                const mtCopyInv = document.createElement('button');
                mtCopyInv.id = 'mtCopyInv';
                mtCopyInv.innerText = 'Copy invitation code';
                mtCopyInv.addEventListener('click', function(event){
                    event.stopPropagation();
                    navigator.clipboard.writeText(sId)
                    .then(() => {
                        alert('Sesssion Code Copied!');
                    })
                    .catch(err => {
                        console.error(err);
                    })
                })

                mtNoMembers.appendChild(mtMssg);
                mtNoMembers.appendChild(mtCopyInv);

                membersContainer.appendChild(mtNoMembers);
            }
        }
    } catch (error){
        console.error(error);
    }

}
displayMember();

// Groups Tab

