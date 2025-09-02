setInterval(() => {
  const now = new Date();

  document.getElementById("clock").innerHTML = now.toLocaleTimeString();

  document.getElementById("day").innerHTML = now.toLocaleDateString();
}, 1000);

tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 50,
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.2,
      random: true,
    },
    size: {
      value: 3,
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.5,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      out_mode: "bounce",
    },
  },
});
