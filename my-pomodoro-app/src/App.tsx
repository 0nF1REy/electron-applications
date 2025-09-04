import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

import playImg from "./assets/play.png";
import resetImg from "./assets/reset.png";
import workBtnClicked from "./assets/work-clicked.png";
import workBtn from "./assets/work.png";
import breakBtnClicked from "./assets/break-clicked.png";
import breakBtn from "./assets/break.png";
import idleGif from "./assets/idle.gif";
import workGif from "./assets/work.gif";
import breakGif from "./assets/break.gif";
import meowSound from "./assets/meow.mp3";
import closeBtn from "./assets/close.png";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [breakButtonImage, setBreakButtonImage] = useState(breakBtn);
  const [workButtonImage, setWorkButtonImage] = useState(workBtn);
  const [gifImage, setGifImage] = useState(idleGif);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [image, setImage] = useState(playImg);

  const meowAudio = useMemo(() => new Audio(meowSound), []);

  const cheerMessages = useMemo(
    () => [
      "Você consegue!",
      "Eu acredito em você!",
      "Você é incrível!",
      "Continue assim!",
      "Mantenha o foco!",
    ],
    []
  );

  const breakMessages = useMemo(
    () => [
      "Mantenha-se hidratado!",
      "Um lanchinho, talvez?",
      "Me manda uma mensagem!",
      "Eu te amo <3",
      "Estique as pernas!",
    ],
    []
  );

  // Atualizador de mensagens de incentivo
  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;

      // Define a primeira mensagem inicialmente
      setEncouragement(messages[0]);

      let index = 1;

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000); // A cada 4 segundos
    } else {
      setEncouragement("");
    }

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak, breakMessages, cheerMessages]);

  // Temporizador regressivo
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Define o modo inicial como falso
  useEffect(() => {
    switchMode(false);
  }, []);

  // Som de miado
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      meowAudio.play().catch((err) => {
        console.error("Falha ao reproduzir áudio:", err);
      });
      setIsRunning(false);
      setImage(playImg);
      setGifImage(idleGif);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    }
  }, [timeLeft, isBreak, isRunning, meowAudio]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setBreakButtonImage(breakMode ? breakBtnClicked : breakBtn);
    setWorkButtonImage(breakMode ? workBtn : workBtnClicked);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
    setGifImage(idleGif);
  };

  const handleClick = () => {
    if (!isRunning) {
      setIsRunning(true);
      setGifImage(isBreak ? breakGif : workGif);
      setImage(resetImg);
    } else {
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
      setGifImage(idleGif);
      setImage(playImg);
    }
  };

  const handleCloseClick = () => {
    if (window.electronAPI?.closeApp) {
      window.electronAPI.closeApp();
    } else {
      console.warn("API do Electron não disponível");
    }
  };

  const containerClass = `home-container ${
    isRunning ? "background-green" : ""
  }`;
  return (
    <div className={containerClass} style={{ position: "relative" }}>
      <div>
        <button className="close-button" onClick={handleCloseClick}>
          <img src={closeBtn} alt="Fechar" />
        </button>
      </div>

      <div className="home-content">
        <div className="home-controls">
          <button className="image-button" onClick={() => switchMode(false)}>
            <img src={workButtonImage} alt="Trabalho" />
          </button>
          <button className="image-button" onClick={() => switchMode(true)}>
            <img src={breakButtonImage} alt="Pausa" />
          </button>
        </div>

        <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
          {encouragement}
        </p>

        <h1 className="home-timer">{formatTime(timeLeft)}</h1>
        <img
          src={gifImage}
          alt="Status do temporizador"
          className="gif-image"
        />
        <button className="home-button" onClick={handleClick}>
          <img src={image} alt="Ícone do botão" />
        </button>
      </div>
    </div>
  );
}

export default App;
