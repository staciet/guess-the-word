const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

//FINISHED. ADD and COMMIT CHANGES TO GITHUB

const getWord = async function () {
  const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await res.text();
  const wordArray = words.split("\n");
  console.log(wordArray);
  const pickWord = Math.floor(Math.random() * wordArray.length);
  word = wordArray[pickWord].trim();
  placeholderSymbol(word);
};
getWord();



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
    correctGuess();
    userGuessRemaining(guess);
    updateWordInProgress(guessedLetters);
  }
};

//Display word and guessed letters

const correctGuess = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

//Create a Function to Update the Word in Progress

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const newLetterList = [];
  //console.log(wordArray);
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      newLetterList.push(letter.toUpperCase());
    } else {
      newLetterList.push("●");
    }
  }
      //console.log(newLetterList);
      wordInProgress.innerText = newLetterList.join("");
      didTheyWin();
};

//FETCH WORDS AND REMAINING guesses
//Funcion to count guesses remaining

const userGuessRemaining = function (guess) {
  const guessUpper = word.toUpperCase();
  if (guessUpper.includes(guess)) {
    message.innerText = "Congrats! You guessed a correct letter.";
    remainingGuesses = remainingGuesses - 1;
  } else {
        message.innerText = "Sorry. That letter isn't in the word.";
        remainingGuesses = remainingGuesses - 1;
    }
  if (remainingGuesses === 0) {
    message.innerText = `GAME OVER...The word is ${word}`;
    startOver();
  } else if (remainingGuesses === 1) {
      remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//Create a Function to Check if Player won

const didTheyWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = "<p class='highlight'>You guessed correct the word! Congrats!</p>";
    startOver();
  }
};

const startOver = function () {
  playAgain.classList.remove("hide");
  guessButton.classList.add("hide");
  remainingGuessesSpan.classList.add("hide");
  guessedLettersElement.classList.add("hide");
};
//Need to finish and host to github
playAgain.addEventListener("click", function () {
  message.classList.remove("win");
  message.innerText = "";
  guessedLettersElement.innerHTML = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
  getWord();

  playAgain.classList.add("hide");
  guessedLettersElement.classList.remove("hide");
  guessButton.classList.remove("hide");
  remainingGuessesSpan.classList.remove("hide");
});
