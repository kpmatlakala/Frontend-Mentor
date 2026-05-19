const shareButton = document.querySelector(".share-btn");
const sharePopup = document.querySelector(".share-popup");

shareButton.addEventListener("click", () => {
  sharePopup.classList.toggle("active");
});