// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js"; 
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, query, orderBy, limit, getDoc, updateDoc, arrayUnion, arrayRemove, getDocs, addDoc, doc, serverTimestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
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

// Random Call Member
const rcpModal = document.getElementById('rcp-modal');
const callBtn = document.getElementById('callRandom');
const rcpMsg = document.getElementById('calling-mssg');
const randomName = document.getElementById('random-name'); 
const randomAgain = document.getElementById('rcp-again-btn');

callBtn.addEventListener('click', async () => {
    rcpMsg.classList.add('show');
    randomName.textContent = '';
    rcpModal.classList.remove('showPoppers');
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const membersList = docSnap.data().membersName;
            if (membersList.length > 0){
                setTimeout(() => {
                    const randomPick = membersList[Math.floor(Math.random() * membersList.length)];
                    rcpModal.classList.add('showPoppers');
                    randomName.textContent = `${randomPick}`;
                    rcpMsg.classList.remove('show');
                }, 3000);
            } else {
                alert('No members yet :(');
            }
        }
    } catch {
        console.log('Error');
    }
})

randomAgain.addEventListener('click', async () => {
    rcpMsg.classList.add('show');
    randomName.textContent = '';
    rcpModal.classList.remove('showPoppers');
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const membersList = docSnap.data().membersName;
            if (membersList.length > 0){
                setTimeout(() => {
                    const randomPick = membersList[Math.floor(Math.random() * membersList.length)];
                    rcpModal.classList.add('showPoppers');
                    randomName.textContent = `${randomPick}`;
                    rcpMsg.classList.remove('show');
                }, 3000);
            } else {
                alert('No members yet :(');
            }
        }
    } catch {
        console.log('Error');
    }
})

// Random Call Group
const rcpModalGroup = document.getElementById('rcp-modal-group');
const callGroup = document.getElementById('callGroup');
const rcpMssgGroup = document.getElementById('calling-mssg-group');
const randomGroupName = document.getElementById('group-random-name');
const groupRandomMem = document.getElementById('group-random-members');
const groupAgain = document.getElementById('group-again-btn');

callGroup.addEventListener('click', async () => {
    rcpMssgGroup.classList.add('show');
    randomGroupName.textContent = '';
    groupRandomMem.textContent = '';
    rcpModalGroup.classList.remove('showPoppers');
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const groupN = docSnap.data().groupsName;
            const groupM = docSnap.data().groupsMembers;
            if (groupN.length > 0){
                setTimeout(() => {
                    const index = Math.floor(Math.random() * groupN.length);
                    rcpModalGroup.classList.add('showPoppers');
                    randomGroupName.textContent = `${groupN[index]}`;
                    groupRandomMem.textContent = `${groupM[index]}`;
                    rcpMssgGroup.classList.remove('show');
                }, 3000);
            } else {
                alert('No members yet :(');
            }
        }
    } catch {
        console.log('Error');
    }
})

groupAgain.addEventListener('click', async () => {
    rcpMssgGroup.classList.add('show');
    randomGroupName.textContent = '';
    groupRandomMem.textContent = '';
    rcpModalGroup.classList.remove('showPoppers');
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
            const groupN = docSnap.data().groupsName;
            const groupM = docSnap.data().groupsMembers;
            if (groupN.length > 0){
                setTimeout(() => {
                    const index = Math.floor(Math.random() * groupN.length);
                    rcpModalGroup.classList.add('showPoppers');
                    randomGroupName.textContent = `${groupN[index]}`;
                    groupRandomMem.textContent = `${groupM[index]}`;
                    rcpMssgGroup.classList.remove('show');
                }, 3000);
            } else {
                alert('No members yet :(');
            }
        }
    } catch {
        console.log('Error');
    }
})

// const bHeader = document.getElementById('b-header');
// getDoc(docRef).then((doc) => {
//     bHeader.style.backgroundColor = doc.data().sessionColor;
// })


async function displayGroupMode(){
    const recitationContent = document.getElementById('recitation-content');
    const groupModeContent = document.getElementById('mode-recitation-container2');

    try {
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            const data = docSnap.data();
            const groupName = data.groupsName;
            const groupPoint = data.groupsPoint;
            const groupMembers = data. groupsMembers;
            
            if (groupName.length > 0){
                for (let i = 0; i < groupName.length; i++){
                    // Group Card
                    const groupCard = document.createElement('div');
                    groupCard.classList.add('group-card');

                    // Group Name Container
                    const groupNameContainer = document.createElement('div');
                    groupNameContainer.classList.add('gName-container');
                    groupCard.appendChild(groupNameContainer);

                    const gNameMembers = document.createElement('div');
                    gNameMembers.classList.add('gname-gmembers-container');
                    groupNameContainer.appendChild(gNameMembers);

                    const gName = document.createElement('div');
                    gName.classList.add('gname');
                    gName.textContent = `${groupName[i]}`;
                    gNameMembers.appendChild(gName);
                    
                    const gMembers = document.createElement('div');
                    gMembers.classList.add('gmembers');
                    gMembers.textContent = `${groupMembers[i]}`;
                    gNameMembers.appendChild(gMembers);

                    // Group Point Container
                    const gPointContainer = document.createElement('div');
                    gPointContainer.classList.add('point-container');
                    gPointContainer.textContent = `${groupPoint[i]}`;
                    groupCard.appendChild(gPointContainer);

                    // Group Edit Popup
                    const editGroupPop = document.createElement('div');
                    editGroupPop.id = 'epp-group-' + i;
                    editGroupPop.classList.add('edit-points-popup');
                    recitationContent.appendChild(editGroupPop);

                    const eppGroupModal = document.createElement('div');
                    eppGroupModal.classList.add('epp-modal');
                    editGroupPop.appendChild(eppGroupModal);

                    const eppGroupInfo = document.createElement('div');
                    eppGroupInfo.classList.add('epp-info');
                    eppGroupModal.appendChild(eppGroupInfo);

                    const eppGroupTitle = document.createElement('p');
                    eppGroupTitle.classList.add('epp-title');
                    eppGroupTitle.textContent = `Edit Points`;
                    eppGroupInfo.appendChild(eppGroupTitle);

                    const eppGroupName = document.createElement('div');
                    eppGroupName.classList.add('epp-name');
                    eppGroupName.textContent = `${groupName[i]}`;
                    eppGroupInfo.appendChild(eppGroupName);

                    // const eppGroupDivider = document.createElement('hr');
                    // eppGroupModal.appendChild(eppGroupDivider);

                    const eppGroupForm = document.createElement('form');
                    eppGroupForm.classList.add('edit-point-form');
                    eppGroupForm.id = 'group-form-' + i;
                    eppGroupModal.appendChild(eppGroupForm);

                    const groupCurrent = document.createElement('div');
                    groupCurrent.classList.add('current-point-container');
                    eppGroupForm.appendChild(groupCurrent);

                    const currentPointTitle = document.createElement('div');
                    currentPointTitle.classList.add('current-point');
                    currentPointTitle.textContent = 'Current points:';
                    groupCurrent.appendChild(currentPointTitle);

                    const currentPointValue = document.createElement('div');
                    currentPointValue.classList.add('current-point');
                    currentPointValue.textContent = `${groupPoint[i]}`;
                    groupCurrent.appendChild(currentPointValue);

                    const npcNewValCont = document.createElement('div');
                    npcNewValCont.classList.add('new-point-container');
                    eppGroupForm.appendChild(npcNewValCont);

                    const newGroupPoint = document.createElement('div');
                    newGroupPoint.classList.add('new-point');
                    newGroupPoint.textContent = 'Update points:';
                    npcNewValCont.appendChild(newGroupPoint);

                    const newGroupPointCont = document.createElement('div');
                    newGroupPointCont.classList.add('input-epp-container');
                    npcNewValCont.appendChild(newGroupPointCont);

                    const groupPointInput = document.createElement('input');
                    groupPointInput.classList.add('input-epp');
                    groupPointInput.id = 'input-epp-group-' + i;
                    groupPointInput.type = "number";
                    groupPointInput.placeholder = "Add points";
                    // inputEpp.value = `${point[i]}`;
                    groupPointInput.required = true;
                    newGroupPointCont.appendChild(groupPointInput);

                    const epGroupBtnCont = document.createElement('div');
                    epGroupBtnCont.classList.add('epp-btn-container');
                    eppGroupForm.appendChild(epGroupBtnCont);

                    const cancelGroupEp = document.createElement('button');
                    cancelGroupEp.classList.add('epp-btn');
                    cancelGroupEp.id = 'cancel-edit-group-' + i;
                    cancelGroupEp.type = "button";
                    cancelGroupEp.textContent = "Cancel";
                    epGroupBtnCont.appendChild(cancelGroupEp);

                    const saveGroupEp = document.createElement('button');
                    saveGroupEp.classList.add('epp-btn');
                    saveGroupEp.id = 'save-group-ep-' + i;
                    saveGroupEp.type = "submit";
                    saveGroupEp.textContent = "Save";
                    epGroupBtnCont.appendChild(saveGroupEp);

                    const pleaseWait = document.createElement('div');
                    pleaseWait.classList.add('waitMssg');
                    pleaseWait.id = 'wait-ep-' + i;
                    pleaseWait.textContent = 'Saving changes...';
                    pleaseWait.style.alignSelf = "center";
                    eppGroupForm.appendChild(pleaseWait);

                    document.getElementById('cancel-edit-group-' + i).addEventListener('click', () => {
                        event.preventDefault();
                        eppContainer.classList.remove('showEpp');
                        document.getElementById('group-form-' + i).reset();
                    })

                    const editForm  = document.getElementById('group-form-' + i);
                    const waitMssg = document.getElementById('wait-ep-' + i);
                    function showMssgG(){
                        waitMssg.style.display = 'block';
                    }
                    editForm.addEventListener('submit', (event) => {
                        event.preventDefault()
                        
                        const updatedPoint = parseInt(document.getElementById('input-epp-group-' + i).value);
                        
                        async function eppGroup() {
                            showMssgG();
                            const grpInfo = await getDoc(docRef);
                            try {
                                if(grpInfo.exists()) {
                                    const pointsArray = grpInfo.data().groupsPoint || [];
                                    pointsArray[i] = pointsArray[i] + updatedPoint;
                                    
                                    const gNameHistory = grpInfo.data().gHistoryName || [];
                                    const updateGNameHistory = [...gNameHistory, groupName[i]];
                                    
                                    const gDateHistory = grpInfo.data().gHistoryDate || [];
                                    const updateGDateHistory = [...gDateHistory, `${year}-${month}-${day} ${hours}:${minutes}`];
                                    
                                    const gPointHistory = grpInfo.data().gHistoryPoint || [];
                                    const updateGPointHistory = [...gPointHistory, `+${updatedPoint}`];
                                    
                                    console.log(gNameHistory.length);
                                    
                                    
                                    
                                    

                                    if (gNameHistory.length > 4){
                                        updateGNameHistory.splice(0, 1);
                                    }
                                    if (gDateHistory.length > 4){
                                        updateGDateHistory.splice(0, 1);
                                    }
                                    if (gPointHistory.length > 4){
                                        updateGPointHistory.splice(0, 1);
                                    }
                                    
                                    updateDoc (docRef, {
                                        groupsPoint: pointsArray,
                                        gHistoryName: updateGNameHistory,
                                        gHistoryDate: updateGDateHistory,
                                        gHistoryPoint: updateGPointHistory,
                                    })
                                    .then(() => {
                                        editForm.reset();
                                        const url = new URL(window.location);
                                        url.searchParams.set('modeList', 2);
                                        window.location.href = url;
                                        
                                        // location.replace(location.href);
                                        // window.location.href='mysessionPage.html';
                                    })
                                }
                            } catch (error){
                                console.error(error);
                            }
                        }
                        eppGroup();
                    })


                    // Group Edit Button

                    const gEditBtn = document.createElement('button');
                    gEditBtn.id = 'group-edit-btn-' + i;
                    gEditBtn.classList.add('group-edit-btn');
                    groupCard.appendChild(gEditBtn);

                    const gEditIcon = document.createElement('i');
                    gEditIcon.classList.add('bx', 'bx-edit');
                    gEditBtn.appendChild(gEditIcon);

                    const eppContainer = document.getElementById('epp-group-' + i);
                    gEditBtn.addEventListener("click", function() {
                        eppContainer.classList.add('showEpp');
                    });

                    groupModeContent.appendChild(groupCard);
                }
            } else {
                const noMembers = document.createElement('div');
                noMembers.classList.add('no-members');
                const mssg = document.createElement('div');
                mssg.classList.add('mssg');
                mssg.innerText = `There are no groups yet :(`;
                noMembers.appendChild(mssg);
                groupModeContent.appendChild(noMembers);
            }
        }
    } catch(error) {
        console.log(error);
    }
}


                        
displayGroupMode();

async function displayIndividualMode(){
    const recitationContent = document.getElementById('recitation-content');
    const recitationBoardContainer = document.getElementById('mode-recitation-container1')

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
                            nameContainer.classList.add('iName-container');
                            nameContainer.textContent = `${member[i]}`;
                            // // Name checkbox and label
                            // const nameLabel = document.createElement('div');
                            // nameLabel.classList.add('name-label');
                            // nameLabel.textContent = `${member[i]}`;
    
                            // const checkbox = document.createElement('input');
                            // checkbox.id = 'checkbox-' + i;
                            // checkbox.type = 'checkbox';
                            // nameLabel.appendChild(checkbox);

                            
    
                            // const checkmark = document.createElement('span');
                            // checkmark.classList.add('checkmark');
                            // nameLabel.appendChild(checkmark);
    
                            // nameContainer.appendChild(nameLabel);
    
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

                            // eppModal.appendChild(document.createElement('hr'));

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
                            inputEpp.placeholder = "Add points";
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
                                            pointsArray[i] = pointsArray[i] + updatedPoint;
                                            
                                            const iNameHistory = memInfo.data().iHistoryName || [];
                                            const updateINameHistory = [...iNameHistory, member[i]];
                                            
                                            const iDateHistory = memInfo.data().iHistoryDate || [];
                                            const updateIDateHistory = [...iDateHistory, `${year}-${month}-${day} ${hours}:${minutes}`];
                                            
                                            const iPointHistory = memInfo.data().iHistoryPoint || [];
                                            const updateIPointHistory = [...iPointHistory, `+${updatedPoint}`];
                                    
                                            console.log(iNameHistory.length);

                                            if (iNameHistory.length > 4){
                                                updateINameHistory.splice(0, 1);
                                            }
                                            if (iDateHistory.length > 4){
                                                updateIDateHistory.splice(0, 1);
                                            }
                                            if (iPointHistory.length > 4){
                                                updateIPointHistory.splice(0, 1);
                                            }

                                            updateDoc (docRef, {
                                                membersPoint: pointsArray,
                                                iHistoryName: updateINameHistory,
                                                iHistoryDate: updateIDateHistory,
                                                iHistoryPoint: updateIPointHistory,
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
                        irhAp.textContent = `${irhPointList[i]}`;
                        irhApContainer.appendChild(irhAp);

                        
                    }
                } else {
                    const noIRH = document.createElement('div');
                    noIRH.classList.add('no-irh');
                    irhContainer.appendChild(noIRH);

                    const noIrhM = document.createElement('div');
                    noIrhM.classList.add('mssg');
                    noIrhM.textContent = "No records yet";
                    noIRH.appendChild(noIrhM);
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
                        grhAp.textContent = `${grhPointList[i]}`;
                        grhApContainer.appendChild(grhAp);

                        
                    }
                } else {
                    const noGRH = document.createElement('div');
                    noGRH.classList.add('no-grh');
                    grhContainer.appendChild(noGRH);

                    const noGrhM = document.createElement('div');
                    noGrhM.classList.add('mssg');
                    noGrhM.textContent = "No records yet";
                    noGRH.appendChild(noGrhM);
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
                    deleteMember.id = 'delete-member-' + i;
                    deleteMember.classList.add('delete-member')

                    const deleteIcon = document.createElement('i');
                    deleteIcon.classList.add('bx', 'bx-trash');
                    
                    deleteMember.appendChild(deleteIcon);

                    const divider = document.createElement('hr');
                    divider.classList.add('divider');

                    mtMemberCard.appendChild(nameEmailContainer);
                    mtMemberCard.appendChild(deleteMember);

                    membersContainer.appendChild(mtMemberCard);
                    membersContainer.appendChild(divider);

                    const membersContent = document.getElementById('members-content');
                    // Delete Mem Popup
                    const dmpContainer = document.createElement('div');
                    dmpContainer.id = 'dmp-container-' + i;
                    dmpContainer.classList.add('delete-mem-popup');
                    membersContent.appendChild(dmpContainer);

                    const dmpModal = document.createElement('div');
                    dmpModal.classList.add('dmp-modal');
                    dmpContainer.appendChild(dmpModal);

                    const dmpInfo = document.createElement('div');
                    dmpInfo.classList.add('dgp-info');
                    dmpModal.appendChild(dmpInfo);

                    const dmpTitle = document.createElement('p');
                    dmpTitle.classList.add('dmp-title');
                    dmpTitle.textContent = "Delete Member";
                    dmpInfo.appendChild(dmpTitle);

                    const deleteQ = document.createElement('p');
                    deleteQ.classList.add('deleteQ');
                    deleteQ.textContent = `Delete `;
                    dmpModal.appendChild(deleteQ);

                    const dmqBold = document.createElement('b');
                    dmqBold.textContent = `${mName[i]}`;
                    deleteQ.appendChild(dmqBold);

                    const qm = document.createElement('span');
                    qm.textContent = "?";
                    deleteQ.appendChild(qm);


                    const deleteMemForm = document.createElement('form');
                    deleteMemForm.id = 'deleteMemForm-' + i;
                    deleteMemForm.action = "";
                    deleteMemForm.method = "post";
                    deleteMemForm.classList.add('deleteGroupForm');
                    dmpModal.appendChild(deleteMemForm);
                    
                    const dmpBtnContainer = document.createElement('div');
                    dmpBtnContainer.classList.add('dmp-btn-container');
                    deleteMemForm.appendChild(dmpBtnContainer);

                    const cancelDMP = document.createElement('button');
                    cancelDMP.id = 'cancel-deleteMem-' + i;
                    cancelDMP.addEventListener('click', () => {
                        dmpContainer.classList.remove('showDmp');
                    })
                    cancelDMP.classList.add('egp-btn');
                    cancelDMP.type = "button";
                    cancelDMP.textContent = "Cancel";
                    dmpBtnContainer.appendChild(cancelDMP);
                    
                    const deleteDMP = document.createElement('button');
                    deleteDMP.id = 'delete-deleteMem-' + i;
                    deleteDMP.classList.add('dgp-btn');
                    deleteDMP.type = "submit";
                    deleteDMP.textContent = "Delete";
                    dmpBtnContainer.appendChild(deleteDMP);

                    const deleteWait = document.createElement('div');
                    deleteWait.classList.add('waitDelete');
                    deleteWait.id = 'delete-wait-' + i;
                    deleteWait.textContent = "Deleting member...";
                    deleteMemForm.appendChild(deleteWait);

                    deleteMember.addEventListener("click", function() {
                        dmpContainer.classList.add('showDmp');
                    });

                    function showDMM(){
                        deleteWait.style.display = "block";
                    } 
                    deleteMemForm.addEventListener('submit', (event) => {
                        event.preventDefault()
                        
                        async function dmp() {
                            showDMM();
                            const memInfo = await getDoc(docRef);
                            try {
                                if(memInfo.exists()) {
                                    const memNameArray = memInfo.data().membersName || [];
                                    memNameArray.splice(i, 1);
                                    
                                    const memEmailArray = memInfo.data().membersEmail || [];
                                    memEmailArray.splice(i, 1);

                                    const memPointArray = memInfo.data().membersPoint || [];
                                    memPointArray.splice(i, 1);

                                    const memIdArray = memInfo.data().membersId || [];
                                    // console.log(memIdArray[i]);
                                    const memRef = doc(db, "users", memIdArray[i]);
                                    const memSnap = await getDoc(memRef);
                                    const mId = memSnap.data().joinedSessions || [];
                    
                                    
                                    updateDoc (memRef, {
                                        joinedSessions: arrayRemove(sId),
                                    })

                                    memIdArray.splice(i, 1);
                                    
                                    
                                    
                                    updateDoc (docRef, {
                                        membersName: memNameArray,
                                        membersEmail: memEmailArray,
                                        membersPoint: memPointArray,
                                        membersId: memIdArray,
                                    })
                                    .then(() => {
                                        deleteMemForm.reset();
                                        const url = new URL(window.location);
                                        url.searchParams.set('screen', 2);
                                        window.location.href = url;
                                    })
                                }
                            } catch (error){
                                console.error(error);
                            }
                        }
                        dmp();
                    })
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
        console.error("Error");
    }

}
displayMember();

// Groups Tab
// Create Group
const createGroup = document.getElementById('create-group-form');

createGroup.addEventListener('submit', (event) => {
    event.preventDefault();
    
    async function check() {
        showCreatingGroup();
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const addGroupPoint = docSnap.data().groupsPoint || [];
            const groupPoint = [...addGroupPoint, 0];
            updateDoc(docRef, {
                groupsName: arrayUnion(groupName.value),
                groupsMembers: arrayUnion(groupMembers.value),
                groupsPoint: groupPoint,
            })
            .then(() => {
                createGroup.reset();
                const url = new URL(window.location);
                url.searchParams.set('screen', 3);
                window.location.href = url;
                // cgpContainer.classList.remove('showCgp');
            })
        } else {
            console.log('Error');
        }
    }
    check();
})

// Display groups
async function displayGroups(){
    const groupsContent = document.getElementById('groups-content');
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
                            //Group card
                            const groupCard = document.createElement('div');
                            groupCard.classList.add('gt-group-card');

                            // Group name and members container
                            const groupNameMember = document.createElement('div');
                            groupNameMember.classList.add('groupName-members-container');

                            const gtName = document.createElement('div');
                            gtName.classList.add('gt-groupName-text');
                            gtName.textContent = `${groupName[i]}`;
                            groupNameMember.appendChild(gtName);

                            const gtMembers = document.createElement('div');
                            gtMembers.classList.add('gt-members-text');
                            gtMembers.textContent = `${groupMember[i]}`;
                            groupNameMember.appendChild(gtMembers);

                            groupCard.appendChild(groupNameMember);

                            // Edit Group Popup
                            const egpContainer = document.createElement('div');
                            egpContainer.id = 'egp-container-' + i;
                            egpContainer.classList.add('edit-group-popup');
                            groupsContent.appendChild(egpContainer);

                            const egpModal = document.createElement('div');
                            egpModal.classList.add('egp-modal');
                            egpContainer.appendChild(egpModal);

                            const egpInfo = document.createElement('div');
                            egpInfo.classList.add('egp-info');
                            egpModal.appendChild(egpInfo);

                            const egpTitle = document.createElement('p');
                            egpTitle.classList.add('egp-title');
                            egpTitle.textContent = 'Edit Group';
                            egpInfo.appendChild(egpTitle);

                            const editGroupName = document.createElement('div') 
                            editGroupName.classList.add('edit-group-name');
                            editGroupName.textContent = `${groupName[i]}`;
                            egpModal.appendChild(editGroupName);

                            const editGroupMembers = document.createElement('div');
                            editGroupMembers.classList.add('edit-group-members');
                            editGroupMembers.textContent = `${groupMember[i]}`;
                            egpModal.appendChild(editGroupMembers);

                            const editGroupForm = document.createElement('form');
                            editGroupForm.id = 'edit-group-form-' + i;
                            editGroupForm.method = "post";
                            editGroupForm.action = "";
                            egpModal.appendChild(editGroupForm);

                            const inputEgpContainer = document.createElement('div');
                            inputEgpContainer.classList.add('input-egp-container');
                            editGroupForm.appendChild(inputEgpContainer);

                            const inputEgpName = document.createElement('input');
                            inputEgpName.id = 'editGroupName-' + i;
                            inputEgpName.type = "text";
                            inputEgpName.name = "editGroup";
                            inputEgpName.classList.add('input-egp');
                            inputEgpName.placeholder = "Edit group name";
                            inputEgpName.value = `${groupName[i]}`;
                            inputEgpName.required = true;
                            inputEgpContainer.appendChild(inputEgpName);

                            const inputEgpContainerM = document.createElement('div');
                            inputEgpContainerM.classList.add('input-egp-container');
                            editGroupForm.appendChild(inputEgpContainerM);

                            const inputEgpMembers = document.createElement('input');
                            inputEgpMembers.id = 'editGroupMembers-' + i;
                            inputEgpMembers.type = "text";
                            inputEgpMembers.name = "groupMembers";
                            inputEgpMembers.classList.add('input-egp');
                            inputEgpMembers.placeholder = "Edit group members";
                            inputEgpMembers.value = `${groupMember[i]}`;
                            inputEgpMembers.required = true;
                            inputEgpContainerM.appendChild(inputEgpMembers);

                            const egpBtnContainer = document.createElement('div');
                            egpBtnContainer.classList.add('egp-btn-container');
                            editGroupForm.appendChild(egpBtnContainer);

                            const cancelEditGroup = document.createElement('button');
                            cancelEditGroup.id = 'cancel-editGroup-' + i;
                            cancelEditGroup.addEventListener('click', () => {
                                event.preventDefault();
                                egpContainer.classList.remove('showEgp');
                                document.getElementById('edit-group-form-' + i).reset();
                            })
                
                            cancelEditGroup.classList.add('egp-btn');
                            cancelEditGroup.type = "button";
                            cancelEditGroup.textContent = "Cancel";
                            egpBtnContainer.appendChild(cancelEditGroup);

                            const saveEditGroup = document.createElement('button');
                            saveEditGroup.id = 'save-editGroup-' + i;
                            saveEditGroup.classList.add('egp-btn');
                            saveEditGroup.type = "submit";
                            saveEditGroup.textContent = "Save";
                            egpBtnContainer.appendChild(saveEditGroup);

                            const editWait = document.createElement('div');
                            editWait.classList.add('waitCreate');
                            editWait.id = 'edit-wait-' + i;
                            editWait.textContent = "Saving changes...";
                            editGroupForm.appendChild(editWait);

                            const gtBtnContainer = document.createElement('div');
                            gtBtnContainer.classList.add('gt-btn-container');

                            const gtEdit = document.createElement('button');
                            gtEdit.id = 'gtEdit-' + i;
                            gtEdit.addEventListener("click", function() {
                                egpContainer.classList.add('showEgp');
                            });

                            gtEdit.classList.add('edit-group-member');
                            gtBtnContainer.appendChild(gtEdit);

                            const gtEditIcon = document.createElement('i');
                            gtEditIcon.classList.add('bx', 'bx-edit');
                            gtEdit.appendChild(gtEditIcon);

                            const gtDelete = document.createElement('button');
                            gtDelete.id = 'gtDelete-' + i;
                            gtDelete.classList.add('delete-group-member');
                            gtBtnContainer.appendChild(gtDelete);

                            

                            const gtDeleteIcon = document.createElement('i');
                            gtDeleteIcon.classList.add('bx', 'bx-trash');
                            gtDelete.appendChild(gtDeleteIcon);

                            
                            groupCard.appendChild(gtBtnContainer);

                            groupContainer.appendChild(groupCard);

                            const gtDivider = document.createElement('hr');
                            gtDivider.classList.add('divider');
                            groupContainer.appendChild(gtDivider);

                            // Submit edit group form
                            function showEGM(){
                                editWait.style.display = "block";
                            } 
                            editGroupForm.addEventListener('submit', (event) => {
                                event.preventDefault()
                                const updatedGroupName = document.getElementById('editGroupName-' + i).value;
                                const updatedGroupMembers = document.getElementById('editGroupMembers-' + i).value;
                                console.log(updatedGroupMembers);
                                async function egp() {
                                    showEGM();
                                    const grpInfo = await getDoc(docRef);
                                    try {
                                        if(grpInfo.exists()) {
                                            let grpNameArray = grpInfo.data().groupsName || [];
                                            grpNameArray[i] = updatedGroupName;
                                            
                                            let grpMembersArray = grpInfo.data().groupsMembers || [];
                                            grpMembersArray[i] = updatedGroupMembers;

                                            updateDoc (docRef, {
                                                groupsName: grpNameArray,
                                                groupsMembers: grpMembersArray,
                                            })
                                            .then(() => {
                                                editGroupForm.reset();
                                                const url = new URL(window.location);
                                                url.searchParams.set('screen', 3);
                                                window.location.href = url;
                                            })
                                        }
                                    } catch (error){
                                        console.error(error);
                                    }
                                }
                                egp();
                            })

                            // Delete Group Popup
                            const dgpContainer = document.createElement('div');
                            dgpContainer.id = 'dgp-container-' + i;
                            dgpContainer.classList.add('delete-group-popup');
                            groupsContent.appendChild(dgpContainer);

                            const dgpModal = document.createElement('div');
                            dgpModal.classList.add('dgp-modal');
                            dgpContainer.appendChild(dgpModal);

                            const dgpInfo = document.createElement('div');
                            dgpInfo.classList.add('dgp-info');
                            dgpModal.appendChild(dgpInfo);

                            const dgpTitle = document.createElement('p');
                            dgpTitle.classList.add('dgp-title');
                            dgpTitle.textContent = "Delete Group";
                            dgpInfo.appendChild(dgpTitle);

                            const deleteQ = document.createElement('p');
                            deleteQ.classList.add('deleteQ');
                            deleteQ.textContent = `Delete `;
                            dgpModal.appendChild(deleteQ);

                            const dqBold = document.createElement('b');
                            dqBold.textContent = `${groupName[i]}`;
                            deleteQ.appendChild(dqBold);

                            const qm = document.createElement('span');
                            qm.textContent = "?";
                            deleteQ.appendChild(qm);


                            const deleteGroupForm = document.createElement('form');
                            deleteGroupForm.id = 'deleteGroupForm-' + i;
                            deleteGroupForm.action = "";
                            deleteGroupForm.method = "post";
                            deleteGroupForm.classList.add('deleteGroupForm');
                            dgpModal.appendChild(deleteGroupForm);
                            
                            const dgpBtnContainer = document.createElement('div');
                            dgpBtnContainer.classList.add('dgp-btn-container');
                            deleteGroupForm.appendChild(dgpBtnContainer);

                            const cancelDGP = document.createElement('button');
                            cancelDGP.id = 'cancel-deleteGroup-' + i;
                            cancelDGP.addEventListener('click', () => {
                                dgpContainer.classList.remove('showDgp');
                            })
                            cancelDGP.classList.add('egp-btn');
                            cancelDGP.type = "button";
                            cancelDGP.textContent = "Cancel";
                            dgpBtnContainer.appendChild(cancelDGP);
                            
                            const deleteDGP = document.createElement('button');
                            deleteDGP.id = 'delete-deleteGroup-' + i;
                            deleteDGP.classList.add('dgp-btn');
                            deleteDGP.type = "submit";
                            deleteDGP.textContent = "Delete";
                            dgpBtnContainer.appendChild(deleteDGP);

                            const deleteWait = document.createElement('div');
                            deleteWait.classList.add('waitDelete');
                            deleteWait.id = 'delete-wait-' + i;
                            deleteWait.textContent = "Deleting group...";
                            deleteGroupForm.appendChild(deleteWait);

                            gtDelete.addEventListener("click", function() {
                                dgpContainer.classList.add('showDgp');
                            });

                            function showDGM(){
                                deleteWait.style.display = "block";
                            } 
                            deleteGroupForm.addEventListener('submit', (event) => {
                                event.preventDefault()
                                
                                async function dgp() {
                                    showDGM();
                                    const grpInfo = await getDoc(docRef);
                                    try {
                                        if(grpInfo.exists()) {
                                            const grpNameArray = grpInfo.data().groupsName || [];
                                            grpNameArray.splice(i, 1);
                                            
                                            const grpMembersArray = grpInfo.data().groupsMembers || [];
                                            grpMembersArray.splice(i, 1);

                                            const grpPointArray = grpInfo.data().groupsPoint || [];
                                            grpPointArray.splice(i, 1);

                                            updateDoc (docRef, {
                                                groupsName: grpNameArray,
                                                groupsMembers: grpMembersArray,
                                                groupsPoint: grpPointArray,
                                            })
                                            .then(() => {
                                                editGroupForm.reset();
                                                const url = new URL(window.location);
                                                url.searchParams.set('screen', 3);
                                                window.location.href = url;
                                            })
                                        }
                                    } catch (error){
                                        console.error(error);
                                    }
                                }
                                dgp();
                            })
                        }
                    } else {
                        // no groups yet
                        const noGroups = document.createElement('div');
                        noGroups.classList.add('no-groups');

                        const noGroupsMssg = document.createElement('p');
                        noGroupsMssg.innerText = 'There are no groups yet :(';

                        noGroups.appendChild(noGroupsMssg);
                        groupContainer.appendChild(noGroups);
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
  
// Call the function
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
displaySortedGroupsAndPoints();

const deleteSession = document.getElementById('delete-session-btn');
const cancelDelete = document.getElementById('cancel-delete');
const saveDelete = document.getElementById('save-delete');
const waitDelete = document.getElementById('waitDelete');
const dsPopup = document.getElementById('dsp');
deleteSession.addEventListener('click', () => {
    dsPopup.classList.add('showDsp');
})

cancelDelete.addEventListener('click', () => {
    dsPopup.classList.remove('showDsp');
})

function showDLoading () {
    waitDelete.style.display = "block";
}

saveDelete.addEventListener('click', async() => {
    showDLoading();
    try {
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const data = docSnap.data();
            const idList = data.membersId;

            for(let i = 0; i < idList.length; i++){
                const memRef = doc(db, "users", idList[i]);
                
                updateDoc(memRef, {
                    joinedSessions: arrayRemove(sId),
                })
            }
        }
        deleteDoc(docRef)
        .then(() => {
            console.log("Document successfully deleted!");
            window.location.href = "mysessions.html";
          })
          .catch((error) => {
            console.error("Error deleting document: ", error);
          });
        
    } catch(error) {
        console.log(error);
    }
})