const fs = require("fs");
const path = require("path");

const workspaceFolder = __dirname;
const vscodeFolder = path.join(workspaceFolder, ".vscode");

// Cria a pasta .vscode caso não exista
if (!fs.existsSync(vscodeFolder)) {
  fs.mkdirSync(vscodeFolder);
}

// Lista todos os diretórios com main.js (projetos Electron)
const projects = fs.readdirSync(workspaceFolder).filter((f) => {
  const projPath = path.join(workspaceFolder, f);
  return (
    fs.lstatSync(projPath).isDirectory() &&
    fs.existsSync(path.join(projPath, "main.js"))
  );
});

let configurations = [];
let compounds = [];
let portCounter = 9222; // Porta inicial para debugger do Chrome

projects.forEach((proj) => {
  const projPath = path.join(workspaceFolder, proj);
  const mainConfigName = `${proj} Main`;
  let rendererConfigName = "";
  let rendererPath = "";

  // Detecta se é React/Electron (tem react-scripts)
  const pkgPath = path.join(projPath, "package.json");
  let isReact = false;
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
    if (pkg.dependencies && pkg.dependencies["react-scripts"]) {
      isReact = true;
    }
  }

  // Configuração do Main (processo principal do Electron)
  configurations.push({
    name: mainConfigName,
    type: "node",
    request: "launch",
    cwd: projPath,
    runtimeExecutable: path.join(projPath, "node_modules", ".bin", "electron"),
    windows: {
      runtimeExecutable: path.join(
        projPath,
        "node_modules",
        ".bin",
        "electron.cmd"
      ),
    },
    args: [".", `--remote-debugging-port=${portCounter}`],
    outputCapture: "std",
    console: "integratedTerminal",
  });

  let compoundConfigs = [mainConfigName];

  // Detecta renderer automaticamente
  if (fs.existsSync(path.join(projPath, "renderer"))) {
    rendererPath = path.join(projPath, "renderer");
  } else if (isReact) {
    // CRA: aponta para src ou public
    rendererPath = fs.existsSync(path.join(projPath, "src"))
      ? path.join(projPath, "src")
      : path.join(projPath, "public");
  } else if (fs.existsSync(path.join(projPath, "index.html"))) {
    rendererPath = projPath;
  }

  if (rendererPath) {
    rendererConfigName = `${proj} Renderer`;
    configurations.push({
      name: rendererConfigName,
      type: "chrome",
      request: "attach",
      port: portCounter,
      webRoot: rendererPath,
      sourceMaps: true,
    });
    compoundConfigs.push(rendererConfigName);
  }

  // Cria compound para rodar Main + Renderer juntos
  compounds.push({
    name: proj,
    configurations: compoundConfigs,
    stopAll: true,
  });

  portCounter++; // Incrementa porta para o próximo projeto
});

// Monta launch.json com comentários explicativos
const launchJson = {
  version: "0.2.0",
  // Compounds permitem rodar Main + Renderer juntos
  compounds,
  configurations,
};

// Salva o arquivo
fs.writeFileSync(
  path.join(vscodeFolder, "launch.json"),
  JSON.stringify(launchJson, null, 2)
);

console.log("launch.json gerado com sucesso na pasta .vscode!");
