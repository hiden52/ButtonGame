const { uniqueSort } = require("jquery");

//alert("Loaded!");
const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let isPlaying = false;
let level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100);

  // for (let i = 0; i < gamePattern.length; i++) {
  //   playSound(gamePattern[i]);
  //   $("#" + gamePattern[i])
  //     .fadeOut(150)
  //     .fadeIn(150);
  // }
}

function playSound(buttonName) {
  let srcAudio = `../sounds/${buttonName}.mp3`;
  let buttonAudio = new Audio(srcAudio);
  buttonAudio.play();
}

function animatePress(currentColor) {
  //console.log(currentColor);
  const btn = $("#" + currentColor);
  btn.addClass("pressed");
  setTimeout(function () {
    btn.removeClass("pressed");
  }, 100);
}
function buttonClickHandler(e) {
  const userChosenColor = e.target.id;
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  animatePress(userChosenColor);
  if (userClickedPattern.length === level) {
    checkAnswer(level);
  }
}

function checkAnswer(currentLevel) {
  for (let i = 0; i < currentLevel; i++) {
    let isSuccess = gamePattern[i] === userClickedPattern[i] ? true : false;

    if (!isSuccess) {
      console.log("wrong");
      $("#level-title").text("Press A Key to Start");
      isPlaying = false;
      level = 0;
      return;
    }
  }
  console.log("success");
  setTimeout(nextSequence, 1000);
}

$(document).keypress(function () {
  if (!isPlaying) {
    $(".level-title").text(`Level ${level}`);
    nextSequence();
    isPlaying = true;
  }
});
$(".btn").click(buttonClickHandler);
