import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

import playImg from "./assets/play.png";
import resetImg from "./assets/reset.png";
import idleGif from "./assets/idle.gif";
import workGif from "./assets/work.gif";
import breakGif from "./assets/break.gif";
import meowSound from "./assets/meow.mp3";

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");
  const [gifImage, setGifImage] = useState(idleGif);
  const [image, setImage] = useState(playImg);

  const meowAudio = useMemo(() => new Audio(meowSound), []);

  const cheerMessages = useMemo(
    () => [
      "Vamos lá!",
      "Foco no trabalho!",
      "Continue concentrado!",
      "Mantenha o ritmo!",
      "Você consegue terminar!",
    ],
    []
  );

  const breakMessages = useMemo(
    () => [
      "Faça uma pausa rápida",
      "Alongue-se um pouco",
      "Respire fundo",
      "Relaxe por alguns minutos",
      "Hora de descansar",
    ],
    []
  );

  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]);
      let index = 1;

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000);
    } else {
      setEncouragement("");
    }

    return () => clearInterval(messageInterval);
  }, [isRunning, isBreak, breakMessages, cheerMessages]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    switchMode(false);
  }, []);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      meowAudio
        .play()
        .catch((err) => console.error("Falha ao reproduzir áudio:", err));
      setIsRunning(false);
      setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
      setGifImage(idleGif);
      setImage(playImg);
    }
  }, [timeLeft, isBreak, isRunning, meowAudio]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
    setGifImage(idleGif);
    setImage(playImg);
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

  return (
    <div className="container">
      <div className="home-content">
        <div className="home-controls">
          <button
            className={`text-button ${!isBreak ? "active" : ""}`}
            onClick={() => switchMode(false)}
          >
            Trabalho
          </button>
          <button
            className={`text-button ${isBreak ? "active" : ""}`}
            onClick={() => switchMode(true)}
          >
            Pausa
          </button>
        </div>

        <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
          {encouragement}
        </p>

        <h1 className="home-timer">{formatTime(timeLeft)}</h1>

        {/* GIF animado */}
        <div className="home-gif">
          <img src={gifImage} alt="GIF animado" />
        </div>

        {/* Botão com ícone */}
        <button className="home-button" onClick={handleClick}>
          <img src={image} alt={isRunning ? "Reset" : "Play"} />
        </button>
      </div>
    </div>
  );
}

export default App;
