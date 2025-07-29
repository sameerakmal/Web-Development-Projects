const guessesText = document.querySelector(".guesses-text b");
const hangmanImg = document.querySelector(".hangman-box img");
const modalBody = document.querySelector(".modal-body");
let currentWord;
let wrongGuesses = 0;
let correctLetters = [];
const maxGuesses = 6;
const initGame = (button, clickedLetter) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, i) => {
            if(letter === clickedLetter){
              correctLetters.push(letter);
              wordDisplay.querySelectorAll("li")[i].textContent = letter;
              wordDisplay.querySelectorAll("li")[i].classList.add("guessed");
            }
        })
    }
    else{
      wrongGuesses++;
      hangmanImg.src = `../img/hangman-${wrongGuesses}.svg`;
    }
    button.disabled = true;
    guessesText.textContent = `${wrongGuesses} / ${maxGuesses}`;

    
    if(correctLetters.length === currentWord.length) return gameOver(true);
    if(wrongGuesses === maxGuesses) return gameOver(false);
  }
  
  const gameOver = ((isVictory) => {
    console.log(modalBody);
    
    const modalText = isVictory ? `You found the word:` : `The correct word was:`;
    modalBody.querySelector("img").src = `../img/${isVictory ? "victory" : "lost"}.gif`;
    modalBody.querySelector("h4").innerHTML = `${isVictory ? `<h4 style="color: green;">🎉Congrats!!</h4>` : `<h4 style="color: red;">Game Over!!</h4>`}`;
    modalBody.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.show();
  });


const keyboardDiv = document.querySelector(".keyboard");
for(let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

let api = 'data.json';
let wordList = [];
const wordDisplay = document.querySelector(".word-display");
fetch(api)
    .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    wordList = data;
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const { word, hint } = wordList[randomIndex];
    currentWord = word;
    console.log(currentWord);
    
    document.querySelector(".hint-text b").textContent = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class = "letter"></li>`).join("");
  })
    .catch(error => {
        console.error("Fetch error :", error);
    })