const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
//Empty array to hold player guesses
const guessedLetters = [];

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
  //Empty text of message element
  message.innerText = "";
  const guess = letterInput.value;
  //console.log(guess);
  const correctGuess = checkInput(guess);

  if (correctGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

//Function to Check Players input

const checkInput = function (input) {
  //regular expression below to ensure player inputs letter
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "You must enter a single letter!";
  } else if (input.length > 1) {
    message.innerText = "You must enter a single letter!";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "You must enter a single letter!";
  } else {
    return input;
  }
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You have already guessed that letter.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
