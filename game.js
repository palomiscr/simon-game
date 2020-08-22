var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var checkindex = 0;
var level = 0;

function ini() {
  $(document).one("keydown", function() {
    gamePattern = [];
    userClickedPatter = [];
    level = 0;
    $("h1").text("Level 0");
    $(".btn").click(handleClick);
    nextSequence();
  });
}

function nextSequence() {
  userClickedPattern = [];
  checkindex = 0;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeOut().fadeIn();
  playSound(randomColor);
  level++;
  $("h1").text("Level " + level);

}
/*en mi solucion añado el listener de click solo despues de
que el user halla pulsado una tecla
*/
ini();

function handleClick() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("user " + userClickedPattern);
  console.log("game " + gamePattern);
  if (userClickedPattern[checkindex] != gamePattern[checkindex]) {
    gameOver();
  } else if (userClickedPattern.length == gamePattern.length) {
    //el array de clicks de usuario tiene la misma longitud que el gamepattern
    //antes de enseñarle la proxima secuencia hacemos el timeout
    //si lo hacemos en otro momento se pueden solapar los timeout dando fallo
    setTimeout(function() {
      nextSequence();
    }, 700);
  }
  //si no entra en ningun if significa que el click estaba bien pero que no ha terminado
  else {
    checkindex++;
  }
}

function gameOver() {
  $("h1").text("Game Over. Press any key to restart");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 300);
  ini();

}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
