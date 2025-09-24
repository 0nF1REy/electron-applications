var keyprss  = ""
var audio = new Audio()
document.body.addEventListener('keypress', function(event) {

  document.querySelectorAll('div div').forEach(element => {

    element.style.opacity = "50%"
    if (element.getAttribute("id") == event.code){element.style.opacity = "100%"}
  });

  switch(event.code) {
    case "KeyQ":
      if(keyprss == "KeyQ"){
        audio.pause();
        keyprss = ""
      }else{
      audio.pause();  
      keyprss = "KeyQ"
      audio = new Audio('sounds/clapping.wav');
      audio.play();
      }
      break;
    case "KeyW":
      if(keyprss == "KeyW"){
        audio.pause();
        keyprss = ""
      }else{
      audio.pause();  
      keyprss = "KeyW"
      audio = new Audio('sounds/comedic.mp3');
      audio.play();
      }
      break;
    case "KeyE":
      if(keyprss == "KeyE"){
        audio.pause();
        keyprss = ""
      }else{
      audio.pause();  
      keyprss = "KeyE"
      audio = new Audio('sounds/explosion.mp3');
      audio.play();
      }
      break;
      case "KeyR":
        if(keyprss == "KeyR"){
          audio.pause();
          keyprss = ""
        }else{
        audio.pause();  
        keyprss = "KeyR"
        audio = new Audio('sounds/goat.mp3');
        audio.play();
        }
        break;
  }

});

