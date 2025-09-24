document.addEventListener("DOMContentLoaded", () => {
  const soundPacks = {
    gto: {
      name: "Great Teacher Onizuka",
      sounds: [
        {
          id: "gto-1",
          key: "Q",
          image: "assets/images/gto/onizuka-bike.jpg",
          sound: "assets/sounds/gto/onizuka-great.wav",
        },
        {
          id: "gto-2",
          key: "W",
          image: "assets/images/gto/onizuka-crest.jpg",
          sound: "assets/sounds/gto/onizuka-yoroshiku.mp3",
        },
      ],
    },
    naruto: {
      name: "Naruto",
      sounds: [
        {
          id: "naruto-1",
          key: "Q",
          image: "assets/images/naruto/rasengan.jpg",
          sound: "assets/sounds/naruto/rasengan.mp3",
        },
        {
          id: "naruto-2",
          key: "W",
          image: "assets/images/naruto/chidori.jpg",
          sound: "assets/sounds/naruto/chidori.mp3",
        },
      ],
    },
  };

  const tabsContainer = document.getElementById("tabs-container");
  const soundGridContainer = document.getElementById("sound-grid-container");

  let currentlyPlaying = null;
  let activePackId = Object.keys(soundPacks)[0];

  const renderTabs = () => {
    tabsContainer.innerHTML = "";
    Object.keys(soundPacks).forEach((packId) => {
      const pack = soundPacks[packId];
      const tabButton = document.createElement("button");
      tabButton.className = "tab-button";
      tabButton.textContent = pack.name;
      tabButton.dataset.packId = packId;
      if (packId === activePackId) {
        tabButton.classList.add("active");
      }
      tabsContainer.appendChild(tabButton);
    });
  };

  const renderSoundGrid = () => {
    soundGridContainer.innerHTML = "";
    const activePack = soundPacks[activePackId];
    if (!activePack) return;

    activePack.sounds.forEach((sound) => {
      const soundItem = document.createElement("div");
      soundItem.className = "sound-item";
      soundItem.dataset.soundId = sound.id;

      soundItem.innerHTML = `
        <img src="${sound.image}" alt="${sound.id}" />
        <kbd>${sound.key}</kbd>
      `;
      soundGridContainer.appendChild(soundItem);
    });
  };

  const playSound = (soundData) => {
    if (!soundData) return;

    if (currentlyPlaying) {
      currentlyPlaying.pause();
    }

    const audio = new Audio(soundData.sound);
    audio.currentTime = 0;
    audio.play();
    currentlyPlaying = audio;

    const soundElement = document.querySelector(
      `.sound-item[data-sound-id="${soundData.id}"]`
    );
    if (soundElement) {
      document
        .querySelectorAll(".sound-item")
        .forEach((el) => el.classList.remove("active"));
      soundElement.classList.add("active");
      setTimeout(() => soundElement.classList.remove("active"), 500);
    }
  };

  tabsContainer.addEventListener("click", (event) => {
    const target = event.target.closest(".tab-button");
    if (target) {
      activePackId = target.dataset.packId;
      renderTabs();
      renderSoundGrid();
    }
  });

  soundGridContainer.addEventListener("click", (event) => {
    const target = event.target.closest(".sound-item");
    if (target) {
      const soundId = target.dataset.soundId;
      const soundData = soundPacks[activePackId].sounds.find(
        (s) => s.id === soundId
      );
      playSound(soundData);
    }
  });

  document.body.addEventListener("keydown", (event) => {
    const key = event.key.toUpperCase();
    const soundData = soundPacks[activePackId].sounds.find(
      (s) => s.key === key
    );
    playSound(soundData);
  });

  const init = () => {
    renderTabs();
    renderSoundGrid();
  };

  init();
});
