const noteButton =
document.getElementById("noteButton");
const notePopup =
document.getElementById("notePopup");

noteButton.addEventListener("click",
    function() {
        notePopup.style.display = "flex";
    }
);