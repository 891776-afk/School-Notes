const noteButton =
document.getElementById("noteButton");
const notePopup =
document.getElementById("notePopup");
const backButton =
document.getElementById("closeButton");

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