// ---------------
// VARIABLES
// ---------------

let countRounds = document.getElementsByName("rounds");
let roundsNumberRankOutput = document.querySelector("#rounds-number-rank");
let roundsNumberSelectedOutput = document.querySelector("#rounds-number-selected");
let shakeRightHand = document.getElementById("hand-right");
let shakeLeftHand = document.getElementById("hand-left");
let userHandButton = document.querySelectorAll(".btn-users-hand");
let computerHandTypesArray = ["scissors", "stone", "paper"];
let counterOutputUser = document.querySelector("#counter-output-user");
let counterOutputComputer = document.querySelector("#counter-output-computer");
let roundTextWinner = document.querySelector("#round-text-winner");
let sectionRounds = document.querySelector(".rounds");
let sectionCounter = document.querySelector(".counter");
let sectionPlay = document.querySelector(".play");
let sectionRoundWinner = document.querySelector("#round-text-winner");
let sectionEndWinner = document.querySelector("#end-text-winner");
let sectionBody = document.querySelector("body");
let sectionFooter = document.querySelector("footer");

// ---------------
// STYLE
// ---------------

sectionCounter.style.display = "none";
sectionPlay.style.display = "none";
sectionRoundWinner.style.display = "none";
sectionEndWinner.style.display = "none";
sectionFooter.style.display = "none"

// ---------------
// VALUES
// ---------------

counterRankUser = 0;
counterRankComputer = 0;
roundsNumberRank = 0;

// ---------------
// FUNCTIONS FOR STYLES
// ---------------

function addShakeHands() {
  shakeRightHand.classList.add("hand-shake");
  shakeLeftHand.classList.add("hand-shake");
}

function removeShakeHands() {
  shakeRightHand.classList.remove("hand-shake");
  shakeLeftHand.classList.remove("hand-shake")
}

function addMainStyle() {
  document.querySelector("body").classList.add("main");
}

function addWinStyle() {
  document.querySelector("body").classList.add("win");
}

function addDrawStyle() {
  document.querySelector("body").classList.add("draw");
}

function addLoseStyle() {
  document.querySelector("body").classList.add("lose");
}

function removeMainStyle() {
  document.querySelector("body").classList.remove("main");
}

function removeWinStyle() {
  document.querySelector("body").classList.remove("win");
}

function removeDrawStyle() {
  document.querySelector("body").classList.remove("draw");
}

function removeLoseStyle() {
  document.querySelector("body").classList.remove("lose");
}

// ---------------
// SELECT ROUNDS ASSETS
// ---------------

// Abfrage für die gwünschte Anzahl an Spielrunden:
countRounds.forEach((btn) => {
  btn.addEventListener("change", (event) => {
    event.preventDefault();
    roundsNumberSelected = event.target.value;
    roundsNumberSelectedOutput.innerText = roundsNumberSelected;
    });
});

// Submit check, ob eine Anzahl an Spielrunden ausgewählt wurde:
// !!!!! Hier funktioniert noch nicht, dass die Radiobuttons ohne Auswahl sind, wenn die Seite neu geladen wird.
document.querySelector("#submit").addEventListener("click", (event) => {
  event.preventDefault();
  if (roundsNumberSelectedOutput.innerText >= 5){
    sectionRounds.style.display = "none";
    sectionCounter.style.display = "flex";
    sectionPlay.style.display = "unset";
    sectionFooter.style.display = "inherit";
  }
  else{
    window.alert("First things first. Please choose the number of rounds you wish to play!")
  }
});

// ---------------
// PLAY GAME ASSETS
// ---------------

userHandButton.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();

    // Zähle die Anzahl der Runden, die bisher gespielt wurden:
    roundsNumberRank ++;
    roundsNumberRankOutput.innerText = roundsNumberRank;

    // Computer wählt durch Zufallsprinzip eine eigene Hand aus:
    let computerHandTypesIndex = Math.floor(Math.random() * 3);
    let computersHand = computerHandTypesArray[computerHandTypesIndex];

    // Entfernt die CSS Klasse für das Händeschütteln, die Buttons und Gewinnertexte:
    removeShakeHands();
    sectionPlay.style.display = "none"
    sectionRoundWinner.style.display = "none";
    sectionEndWinner.style.display = "none";
    removeWinStyle();
    removeDrawStyle();
    removeLoseStyle();

    // Fügt die CSS Klasse nach einem Timeout hinzu und gibt die Hand des Users aus.
    setTimeout(function(){
      let usersHand = event.target.parentNode.id;
      roundTextWinner.innerText = "";
      addShakeHands();
      document.querySelector("#hand-right").innerHTML = '<img src="./assets/images/hand-back-fist-regular.svg">';
      document.querySelector("#hand-left").innerHTML = '<img src="./assets/images/hand-back-fist-regular.svg">';
      sectionFooter.style.display = "none";

      // Checke den Gewinner der Runde, nach 2500 Millisekunden:
      setTimeout(function checkRoundWinner(){
        if (usersHand === computersHand) {
          roundTextWinner.innerHTML = `<span id="left">${usersHand}</span> against <span id="right">${computersHand}</span>.<br>Oops! This round was a draw.`;
          sectionRoundWinner.style.display = "unset";
          sectionPlay.style.display = "unset";
          sectionFooter.style.display = "inherit";
          addDrawStyle();
        }
        else if (usersHand == "paper" && computersHand == "stone" || usersHand == "scissors" && computersHand == "paper" || usersHand == "stone" && computersHand == "scissors" ){
          roundTextWinner.innerHTML = `<span id="left">${usersHand}</span> beats <span id="right">${computersHand}</span>.<br>One point for you!`;
          sectionRoundWinner.style.display = "unset";
          sectionPlay.style.display = "unset";
          sectionFooter.style.display = "inherit";
          addWinStyle();
          counterRankUser ++;
          counterOutputUser.innerText = counterRankUser;
        }
        else if (computersHand == "paper" && usersHand == "stone" || computersHand == "scissors" && usersHand == "paper" || computersHand == "stone" && usersHand == "scissors" ){
          roundTextWinner.innerHTML = `<span id="right">${computersHand}</span> beats <span id="left">${usersHand}</span>.<br>One point for the computer!`;
          sectionRoundWinner.style.display = "unset";
          sectionPlay.style.display = "unset";
          sectionFooter.style.display = "inherit";
          addLoseStyle();
          counterRankComputer ++;
          counterOutputComputer.innerText = counterRankComputer;
        }
        function checkGraphic(){
          switch (document.querySelector("span#right").innerText) {
            case "STONE":
              document.getElementById("hand-right").innerHTML = '<img src="./assets/images/hand-back-fist-regular.svg">';
              break;
            case "PAPER":
              document.getElementById("hand-right").innerHTML = '<img src="./assets/images/hand-regular.svg">';
              break;
              default:
              document.getElementById("hand-right").innerHTML = '<img src="./assets/images/hand-scissors-regular.svg">';
              break;
          }
          switch (document.querySelector("span#left").innerText) {
            case "STONE":
              document.getElementById("hand-left").innerHTML = '<img src="./assets/images/hand-back-fist-regular.svg">';
              break;
            case "PAPER":
              document.getElementById("hand-left").innerHTML = '<img src="./assets/images/hand-regular.svg">';
              break;
            default:
              document.getElementById("hand-left").innerHTML = '<img src="./assets/images/hand-scissors-regular.svg">';
              break;
          }
        }
        checkGraphic()
      }, 2500)

      // Beende das Spiel, wenn die Runden gespielt sind, nach 2500 Millisekunden:
      setTimeout(function checkRoundCount(){
        if (roundsNumberRankOutput.innerText == roundsNumberSelectedOutput.innerText){
          sectionPlay.style.display = "none";
          sectionEndWinner.style.display = "unset";
          sectionFooter.style.display = "inherit";
          if (counterRankUser > counterRankComputer){
            sectionEndWinner.innerHTML = "Woohoo! You win!";
            removeDrawStyle();
            removeLoseStyle();
            addWinStyle();
          }
          else if (counterRankUser < counterRankComputer){
            sectionEndWinner.innerHTML = "You're a loooser!";
            removeDrawStyle();
            removeWinStyle();
            addLoseStyle();
          }
          else{
            sectionEndWinner.innerHTML = "This game was a draw.";
            removeLoseStyle();
            removeWinStyle();
            addDrawStyle();
          }
        }
      }, 2500)
    })
  });
});