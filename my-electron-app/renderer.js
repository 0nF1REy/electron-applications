const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};

const information = document.getElementById("info");

func();

information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;
