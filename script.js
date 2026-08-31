
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

  const firebaseConfig = {
    apiKey: "AIzaSyA57KV7h6dMQQHWTzSaM_RBJ5ox0gRU0Lk",
    authDomain: "schoolnotes-370090.firebaseapp.com",
    projectId: "schoolnotes-370090",
    storageBucket: "schoolnotes-370090.firebasestorage.app",
    messagingSenderId: "184039056186",
    appId: "1:184039056186:web:3e116510f9f6faf4b0e603"
  };

const app =
initializeApp(firebaseConfig);

const db = getFirestore(app);

const noteButton =
document.getElementById("noteButton");

const notePopup =
document.getElementById("notePopup");

const backButton =
document.getElementById("closeButton");

const saveButton =
document.getElementById("saveButton");

const noteTitle =
document.getElementById("noteTitle");

const noteNotes =
document.getElementById("noteNotes");

const notesGrid =
document.getElementById("notesGrid");


noteButton.addEventListener("click",
    function() {
        notePopup.style.display = "flex";
    }
);

backButton.addEventListener("click",
    function() {
        notePopup.style.display = "none";
    }
);

saveButton.addEventListener("click", async function() {

    const title = noteTitle.value;
    const description = noteDescription.value;
    const notes = noteNotes.value;

    if (title.trim() === "") {
        alert("Please enter a title.");
        return;
    }

    try {

        const docRef = await addDoc(collection(db, "notes"), {
            title: title,
            description: description,
            notes: notes,
            completed: false,
            createdAt: new Date()
        });

        console.log("Note saved with ID:", docRef.id);

        const noteCard = document.createElement("div");

        noteCard.classList.add("note-card");

        noteCard.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <p>${notes}</p>
            <button class="completeButton">
                Mark Completed
            </button>
        `;

        notesGrid.appendChild(noteCard);

        noteTitle.value = "";
        noteDescription.value = "";
        noteNotes.value = "";

        notePopup.style.display = "none";

    } catch (error) {

        console.error("Error saving note:", error);
        alert("There was a problem saving your note.");

    }
});