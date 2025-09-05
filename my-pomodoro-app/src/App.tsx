import "./App.css";

import React, { useState, useEffect, useMemo, useCallback } from "react";

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
  const [audioEnabled, setAudioEnabled] = useState(false);

  const meowAudio = useMemo(() => {
    const audio = new Audio(meowSound);
    audio.preload = "auto";
    audio.volume = 0.7;
    return audio;
  }, []);

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
    if (timeLeft === 0 && isRunning) {
      if (audioEnabled) {
        meowAudio.currentTime = 0;
        const playPromise = meowAudio.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Áudio reproduzido com sucesso!");
            })
            .catch((err) => {
              console.error("Falha ao reproduzir áudio:", err);
              setTimeout(() => {
                meowAudio
                  .play()
                  .catch((e) => console.error("Segundo tentativa falhou:", e));
              }, 100);
            });
        }
      } else {
        console.log(
          "Áudio não foi habilitado ainda. Clique em qualquer botão primeiro."
        );
      }

      if (isBreak) {
        setIsBreak(false);
        setTimeLeft(25 * 60);
        setGifImage(workGif);
      } else {
        setIsBreak(true);
        setTimeLeft(5 * 60);
        setGifImage(breakGif);
      }

      setIsRunning(true);
      setImage(resetImg);
    }
  }, [timeLeft, isBreak, isRunning, meowAudio, audioEnabled]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const switchMode = useCallback(
    (breakMode: boolean) => {
      setAudioEnabled((prev) => {
        if (!prev) {
          meowAudio.load();
          return true;
        }
        return prev;
      });

      setIsBreak(breakMode);
      setIsRunning(false);
      setTimeLeft(breakMode ? 5 * 60 : 25 * 60);
      setGifImage(idleGif);
      setImage(playImg);
    },
    [meowAudio] 
  );

  const handleClick = () => {
    if (!audioEnabled) {
      setAudioEnabled(true);
      meowAudio.load();
    }

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
