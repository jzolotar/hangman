// DOM elements
const secretWord = document.getElementById("word");
const usedLetters = document.getElementById("wrong-letters");
const playAgain = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const gameMessage = document.getElementById("game-message");
const figureBody = document.querySelectorAll(".figure--part");

//words to guess
const words = ["test", "korus", "zwierzak", "piec"];

// arrays for correct/wrong letters
const correctLetters = [];
const wrongLetters = [];

// pick a random word from words's array
let selectedWord = words[Math.floor(Math.random() * words.length)];

// display selected word
function displayWord() {
  secretWord.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `<span class="game__letter">
  ${correctLetters.includes(letter) ? letter : ""}
  </span>`
    )
    .join("")}`;

  const innerWord = secretWord.innerText.replace(/\n/g, "");

  //set and display winner popup
  if (innerWord === selectedWord) {
    gameMessage.innerText = "Congratulation, You win 🏆";
    popup.style.display = "flex";
  }
}

function addWrongLetter() {
  usedLetters.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong<p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;
}

function displayfigurePart() {
  figureBody.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) part.style.display = "block";
    else part.style.display = "none";
  });

  //set and display loser popup
  if (wrongLetters.length === figureBody.length) {
    gameMessage.innerText = "Sorry,You lost 😢";
    popup.style.display = "flex";
  }
}

// let user know that he used the same letter again
function displayNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// event listener for letter
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        displayNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        addWrongLetter();
        displayfigurePart();
      } else {
        displayNotification();
      }
    }
  }
});

//reset settings
function resetGame() {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  addWrongLetter();
  figureBody.forEach((element) => (element.style.display = "none"));
  popup.style.display = "none";
}

// event listener  play again
playAgain.addEventListener("click", resetGame);

displayWord();
