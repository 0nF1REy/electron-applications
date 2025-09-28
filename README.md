# Electron Projects

Este repositório contém diversos projetos desenvolvidos com Electron, cada um com propósitos e tecnologias variadas. Abaixo está uma visão geral de cada projeto presente na pasta principal.

## Índice

- [image-resizer](#image-resizer)
- [ipc](#ipc)
- [meu-hello-electron](#meu-hello-electron)
- [my-clock-app](#my-clock-app)
- [my-electron-app](#my-electron-app)
- [my-note-app](#my-note-app)
- [my-pomodoro-app](#my-pomodoro-app)
- [neo-browser](#neo-browser)
- [pressound](#pressound)
- [react-vite-starter](#react-vite-starter)
- [resonus](#resonus)
- [screen-capturer](#screen-capturer)
- [tuturu-timer](#tuturu-timer)
- [user-lite](#user-lite)

---

## image-resizer

Aplicativo Electron para redimensionamento de imagens. Possui interface gráfica, suporte a múltiplos formatos e ícones para diferentes sistemas operacionais.

- **Principais arquivos:** `main.js`, `preload.js`, `renderer/index.html`, `renderer/scripts/renderer.js`
- **Recursos:** Redimensionamento de imagens, interface amigável, ícones customizados.

## ipc

Exemplo de comunicação IPC (Inter-Process Communication) no Electron, utilizando Vite para build e configuração modular.

- **Principais arquivos:** `main.js`, `preload.js`, `renderer.js`, `vite.*.config.mjs`
- **Recursos:** Demonstração de IPC, estrutura moderna com Vite.

## meu-hello-electron

Projeto simples de "Hello World" com Electron, ideal para iniciantes.

- **Principais arquivos:** `main.js`, `preload.js`, `index.html`
- **Recursos:** Estrutura básica, fácil de entender.

## my-clock-app

Aplicativo de relógio digital feito com Electron.

- **Principais arquivos:** `main.js`, `preload.js`, `renderer/scripts/script.js`, `renderer/styles/style.css`
- **Recursos:** Exibe relógio em tempo real, interface simples.

## my-electron-app

Template básico para aplicações Electron, com configuração Forge.

- **Principais arquivos:** `main.js`, `preload.js`, `renderer.js`, `forge.config.js`
- **Recursos:** Estrutura inicial para novos projetos.

## my-note-app

Aplicativo de notas com Electron.

- **Principais arquivos:** `main.js`, `preload.js`, `src/index.html`, `src/script.js`, `src/main.css`
- **Recursos:** Criação e edição de notas, interface simples.

## my-pomodoro-app

Aplicativo Pomodoro com React e Electron, focado em produtividade.

- **Principais arquivos:** `main.js`, `preload.js`, `src/App.tsx`, `src/index.tsx`, `public/index.html`
- **Recursos:** Timer Pomodoro, interface moderna, assets personalizados.

## neo-browser

Navegador simples feito com Electron e Vite.

- **Principais arquivos:** `main.js`, `preload.js`, `renderer.js`, `vite.*.config.mjs`
- **Recursos:** Estrutura de navegador, configuração modular.

## pressound

Aplicativo de sons com Electron, focado em efeitos sonoros e interface visual.

- **Principais arquivos:** `main.js`, `src/renderer.js`, `src/index.html`, `src/assets/sounds/`
- **Recursos:** Biblioteca de sons, interface visual, organização por categorias.

## react-vite-starter

Template para projetos React com Electron e Vite.

- **Principais arquivos:** `main.js`, `preload.js`, `src/renderer.jsx`, `vite.*.config.mjs`
- **Recursos:** Estrutura pronta para React + Electron + Vite.

## resonus

Aplicativo multimídia com Electron e TypeScript, usando Webpack.

- **Principais arquivos:** `app.tsx`, `index.ts`, `webpack.*.ts`, `assets/`
- **Recursos:** Interface multimídia, tipagem forte, configuração avançada.

## screen-capturer

Ferramenta simples para captura de tela com Electron.

- **Principais arquivos:** `main.js`, `assets/capture.*`
- **Recursos:** Captura de tela, ícones customizados.

## tuturu-timer

Timer com interface customizada, feito com Electron e React, usando Tailwind para estilos.

- **Principais arquivos:** `electron.vite.config.mjs`, `src/renderer/src/App.jsx`, `src/renderer/src/main.jsx`, `src/renderer/src/assets/main.css`
- **Recursos:** Timer customizado, interface moderna, assets visuais e sonoros.

## user-lite

Aplicativo de gerenciamento de usuários simples com Electron.

- **Principais arquivos:** `main.js`, `preload.js`, `renderer/index.html`, `database/database.js`
- **Recursos:** Gerenciamento de usuários, interface básica, persistência local.

---

## Como executar os projetos

Cada projeto possui seu próprio `package.json` e pode ser executado individualmente. Para rodar um projeto:

```bash
cd <nome-do-projeto>
npm install
npm start
```

Consulte o README específico de cada projeto (se houver) para instruções detalhadas.

---

## Licença

Consulte o arquivo `LICENSE` em cada projeto para detalhes sobre licenciamento.

---

## Autor

Este workspace foi organizado por [0nF1REy](https://github.com/0nF1REy).
