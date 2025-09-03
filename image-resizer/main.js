const path = require("path");
const os = require("os");
const fs = require("fs");
const resizeImg = require("resize-img");
const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron");

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

let mainWindow;
let aboutWindow;

// Janela principal
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1000 : 500,
    height: 600,
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Mostrar DevTools automaticamente se estiver em desenvolvimento
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

// Janela "Sobre"
function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    width: 300,
    height: 300,
    title: "About Electron",
    icon: `${__dirname}/assets/icons/Icon_256x256.png`,
  });

  aboutWindow.loadFile(path.join(__dirname, "./renderer/about.html"));
}

// Quando o app estiver pronto, cria a janela
app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // Remove variável da memória
  mainWindow.on("closed", () => (mainWindow = null));
});

// Template do menu
const menu = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  // {
  //   label: 'File',
  //   submenu: [
  //     {
  //       label: 'Quit',
  //       click: () => app.quit(),
  //       accelerator: 'CmdOrCtrl+W',
  //     },
  //   ],
  // },
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
];

// Responder ao evento de redimensionar imagem
ipcMain.on("image:resize", (e, options) => {
  // console.log(options);
  options.dest = path.join(os.homedir(), "imageresizer");
  resizeImage(options);
});

// Redimensionar e salvar imagem
async function resizeImage({ imgPath, height, width, dest }) {
  try {
    // Redimensionar imagem
    const newPath = await resizeImg(fs.readFileSync(imgPath), {
      width: +width,
      height: +height,
    });

    // Obter nome do arquivo
    const filename = path.basename(imgPath);

    // Criar pasta de destino se não existir
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }

    // Escrever o arquivo na pasta de destino
    fs.writeFileSync(path.join(dest, filename), newPath);

    // Enviar sucesso para o renderer
    mainWindow.webContents.send("image:done");

    // Abrir a pasta no explorador de arquivos
    shell.openPath(dest);
  } catch (err) {
    console.log(err);
  }
}

// Sair quando todas as janelas forem fechadas
app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});

// Abrir uma janela se nenhuma estiver aberta (macOS)
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
