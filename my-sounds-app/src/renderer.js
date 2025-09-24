document.addEventListener("DOMContentLoaded", () => {
  const soundboard = {
    KeyQ: {
      sound: new Audio("assets/sounds/clapping.wav"),
      element: document.getElementById("KeyQ"),
    },
    KeyW: {
      sound: new Audio("assets/sounds/comedic.mp3"),
      element: document.getElementById("KeyW"),
    },
    KeyE: {
      sound: new Audio("assets/sounds/explosion.mp3"),
      element: document.getElementById("KeyE"),
    },
    KeyR: {
      sound: new Audio("assets/sounds/goat.mp3"),
      element: document.getElementById("KeyR"),
    },
  };

  let currentlyPlaying = null;

  const playSound = (key) => {
    const soundData = soundboard[key];
    if (!soundData) return;

    if (currentlyPlaying && currentlyPlaying !== soundData.sound) {
      currentlyPlaying.pause();
      currentlyPlaying.currentTime = 0;
    }

    soundData.sound.currentTime = 0;
    soundData.sound.play();
    currentlyPlaying = soundData.sound;

    updateVisuals(soundData.element);
  };

  const updateVisuals = (activeElement) => {
    Object.values(soundboard).forEach(({ element }) => {
      element.classList.remove("active");
    });

    if (activeElement) {
      activeElement.classList.add("active");
    }
  };

  document.body.addEventListener("keydown", (event) => {
    playSound(event.code);
  });

  Object.keys(soundboard).forEach((key) => {
    const { element } = soundboard[key];
    if (element) {
      element.addEventListener("click", () => {
        playSound(key);
      });
    }
  });
});
