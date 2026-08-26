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

const noteDescription =
document.getElementById("noteDescription");

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

saveButton.addEventListener("click",
    function() {

        const title = noteTitle.value;
        const description =
    noteDescription.value;
        const notes = noteNotes.value;

        const noteCard =
    document.createElement("div");
        
        noteCard.classList.add("note-card");

        noteCard.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            <p>${notes}</p>
        `;

        notesGrid.appendChild(noteCard);
        notePopup.style.display = "none";
    }
);