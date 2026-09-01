
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

  import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    doc
  } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

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

const noteFilter =
    document.getElementById("noteFilter");


noteFilter.addEventListener(
    "change",
    filterNotes
);


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
    const notes = noteNotes.value;

    if (title.trim() === "") {
        alert("Please enter a title.");
        return;
    }

    try {

        const docRef = await addDoc(collection(db, "notes"), {
            title: title,
            notes: notes,
            completed: false,
            createdAt: new Date()
        });

        console.log("Note saved with ID:", docRef.id);

        const noteCard = document.createElement("div");

        noteCard.classList.add("note-card");

        noteCard.innerHTML = `
            <h3>${title}</h3>
            <p>${notes}</p>
            <button class="completeButton">
                Mark Completed
            </button>
        `;

        notesGrid.appendChild(noteCard);

        noteTitle.value = "";
        noteNotes.value = "";

        notePopup.style.display = "none";

    } catch (error) {

        console.error("Error saving note:", error);
        alert("There was a problem saving your note.");

    }
});

async function loadNotes() {

    try {

        const querySnapshot = await getDocs(
            collection(db, "notes")
        );

        notesGrid.innerHTML = "";

        querySnapshot.forEach((noteDoc) => {

            const data = noteDoc.data();

            createNoteCard(
                noteDoc.id,
                data
            );

        });

        filterNotes();

    } catch (error) {

        console.error("Error loading notes:", error);

    }
}

function createNoteCard(id, data) {

    const noteCard = document.createElement("div");

    noteCard.classList.add("note-card");

    noteCard.dataset.completed = data.completed;
    noteCard.dataset.noteId = id;

    noteCard.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.notes}</p>

        ${
            data.completed
            ? `<p>✓ Completed</p>`
            : `<button class="completeButton">
                Mark Completed
               </button>`
        }
    `;

    if (!data.completed) {

        const completeButton =
            noteCard.querySelector(".completeButton");

        completeButton.addEventListener(
            "click",
            () => completeNote(id)
        );

    }

    notesGrid.appendChild(noteCard);
}

async function completeNote(id) {

    try {

        await updateDoc(
            doc(db, "notes", id),
            {
                completed: true
            }
        );

        loadNotes();

    } catch (error) {

        console.error(
            "Error completing note:",
            error
        );

        alert("Could not complete the note.");
    }
}

function filterNotes() {

    const filter = noteFilter.value;

    const cards =
        document.querySelectorAll(".note-card");

    cards.forEach((card) => {

        const completed =
            card.dataset.completed === "true";

        if (filter === "active") {

            card.style.display =
                completed ? "none" : "block";

        } else if (filter === "completed") {

            card.style.display =
                completed ? "block" : "none";

        } else {

            card.style.display = "block";

        }

    });
}