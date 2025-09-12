import "./index.css";

// Buttons
const backButton = document.getElementById("back-button");

const forwardButton = document.getElementById("forward-button");

const reloadButton = document.getElementById("reload-button");

const newWindowButton = document.getElementById("new-window-button");

const goButton = document.getElementById("go");

// Url Field
const urlInputField = document.getElementById("url-input");

// Webview
const webview = document.getElementById("webview");

urlInputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleUrl();
  }
});

function handleUrl() {
  const inputUrl = urlInputField.value;
  webview.src = inputUrl;
}
