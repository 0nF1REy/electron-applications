const form = document.querySelector("#img-form");
const img = document.querySelector("#img");
const outputPath = document.querySelector("#output-path");
const filename = document.querySelector("#filename");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

// Carregar imagem e mostrar o formulário
function loadImage(e) {
  const file = e.target.files[0];

  // Verifica se o arquivo é uma imagem
  if (!isFileImage(file)) {
    alertError("Please select an image");
    return;
  }

  // Adiciona a largura e altura atuais ao formulário usando a API de URL
  const image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    widthInput.value = this.width;
    heightInput.value = this.height;
  };

  // Mostra o formulário, nome da imagem e caminho de saída
  form.style.display = "block";
  filename.innerHTML = img.files[0].name;
  outputPath.innerText = path.join(os.homedir(), "imageresizer");
}

// Garante que o arquivo seja uma imagem
function isFileImage(file) {
  const acceptedImageTypes = ["image/gif", "image/jpeg", "image/png"];
  return file && acceptedImageTypes.includes(file["type"]);
}

// Redimensionar imagem
function resizeImage(e) {
  e.preventDefault();

  if (!img.files[0]) {
    alertError("Please upload an image");
    return;
  }

  if (widthInput.value === "" || heightInput.value === "") {
    alertError("Please enter a width and height");
    return;
  }

  // O Electron adiciona várias propriedades extras ao objeto de arquivo, incluindo o caminho
  const imgPath = img.files[0].path;
  const width = widthInput.value;
  const height = heightInput.value;

  ipcRenderer.send("image:resize", {
    imgPath,
    height,
    width,
  });
}

// Quando terminar, mostrar mensagem
ipcRenderer.on("image:done", () =>
  alertSuccess(`Image resized to ${heightInput.value} x ${widthInput.value}`)
);

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
}

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
}

// Listener de seleção de arquivo
img.addEventListener("change", loadImage);

// Listener de envio do formulário
form.addEventListener("submit", resizeImage);
