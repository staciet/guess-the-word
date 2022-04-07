const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

// Display our symbols as placeholders for the chosen word's letters
const placeholderSymbol = function (word) {
  const placeholder = [];
  for (const letter of word) {
    console.log(letter);
    placeholder.push("●");
  }
  wordInProgress.innerText = placeholder.join("");
};

placeholderSymbol(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = letterInput.value;
  console.log(guess);
  letterInput.value = "";
});
