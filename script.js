// Number Guessing Game
const targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
const maxAttempts = 10;

console.log("Welcome to the Number Guessing Game!");
console.log("I'm thinking of a number between 1 and 100.");
console.log(`You have ${maxAttempts} attempts to guess it.`);

function makeGuess() {
  if (attempts >= maxAttempts) {
    console.log(`Game Over! The number was ${targetNumber}`);
    return;
  }

  let input = prompt("Enter your guess (1-100): ");
  let guess = parseInt(input);
  attempts++;

  if (isNaN(guess)) {
    console.log("Please enter a valid number!");
    makeGuess();
    return;
  }

  if (guess === targetNumber) {
    console.log(
      `Congratulations! You guessed the number in ${attempts} attempts!`
    );
  } else if (guess < targetNumber) {
    console.log(
      `Too low! You have ${maxAttempts - attempts} attempts remaining.`
    );
    makeGuess();
  } else {
    console.log(
      `Too high! You have ${maxAttempts - attempts} attempts remaining.`
    );
    makeGuess();
  }
}

makeGuess();
