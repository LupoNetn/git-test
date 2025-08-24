//imports
import "./index.css";
import { renderHome } from "./home.js";
import { renderAbout } from "./about.js";
import { renderContact } from "./contact.js";

//Selectors
const homeButton = document.getElementById("home");
const aboutButton = document.getElementById("about");
const contactButton = document.getElementById("contact");

function clearContent() {
  const content = document.getElementById("content");
  content.innerHTML = "";
}

function setActive(button) {
  [homeButton, aboutButton, contactButton].forEach((btn) => {
    btn.classList.remove("active");
  });
  button.classList.add("active");
}

//initial render
renderHome();
setActive(homeButton);

//Event Listeners
homeButton.addEventListener("click", () => {
  clearContent();
  renderHome();
  setActive(homeButton);
});

aboutButton.addEventListener("click", () => {
  clearContent();
  renderAbout();
  setActive(aboutButton);
});

contactButton.addEventListener("click", () => {
  clearContent();
  renderContact();
  setActive(contactButton);
});
