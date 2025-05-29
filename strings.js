/* ------------------------
FileName: Project.js
Date: 04/21/2025
Author: Sarah Holt
----------------------------*/

// Array for the mystery words
let mysteryWords = ["pizza", "ball", "game"];

// Generate a random number equal to one of the indexes
let randomIndex = Math.floor(Math.random() * mysteryWords.length);

// Random number to select the word from the array
let selectedWord = mysteryWords[randomIndex];

// String of * match the number of letters
//let asterisks = "*".repeat(selectedWord.length);

// Creating arrays for the word and guesses
let wordArray = selectedWord.split("");
let displayArray = Array(selectedWord.length).fill("*");

let playerGuesses = ['p', 'i', 'z', 'a', 'b', 'l', 'g', 'm', 'e'];


function updateDisplay() {
    document.getElementById("mystery").value = displayArray.join("");
    console.log("Current Word: " + displayArray.join(""));
}

// Event listener for the game
document.getElementById("guessingGame").addEventListener("submit", function(event){
    event.preventDefault();

    let guess = document.getElementById("letterBox").value.toLowerCase();
    
    if (guess === "") {
        alert("Please enter a letter before hitting submit");
        return;
    } 
        let correct = false;

        for (let i = 0; i <wordArray.length; i++) {
            if (wordArray[i] === guess) {
                displayArray[i] = guess;
                correct = true;
            }
        }

        updateDisplay();

        if (displayArray.join("") === selectedWord) {
            alert("You guess correctly! The mystery word is: " + selectedWord );
            // clear input
            document.getElementById("letterBox").value = ""
            return;
        }

        document.getElementById("letterBox").value = "";
});

