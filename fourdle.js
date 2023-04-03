const wordList = ['rain', 'wind', 'snow', 'fire', 'hail', 'cold', 'warm', 'tree'];
const secretWord = wordList[Math.floor(Math.random() * wordList.length)];
const maxAttempts = 6;
let attempts = 0;

function submitGuess() {
  const guessInput = document.getElementById('guess');
  const guess = guessInput.value.toLowerCase();

  if (guess.length !== 4) {
    showMessage('Please enter a 4 letter word.');
    return;
  }

  attempts++;
  const result = evaluateGuess(secretWord, guess);
  displayGuess(guess, result);

  if (result.correct === 4) {
    showMessage(`Congratulations! You've guessed the word "${secretWord}" in ${attempts} attempts.`);
    guessInput.disabled = true;
  } else if (attempts >= maxAttempts) {
    showMessage(`Sorry, you've run out of attempts. The secret word was "${secretWord}".`);
    guessInput.disabled = true;
  } else {
    showMessage(`Attempts left: ${maxAttempts - attempts}`);
  }

  guessInput.value = '';
}

function evaluateGuess(secret, guess) {
  let correct = [];
  let misplaced = [];
  const secretChars = secret.split('');
  const guessChars = guess.split('');

  for (let i = 0; i < secretChars.length; i++) {
    if (secretChars[i] === guessChars[i]) {
      correct.push(secretChars[i]);
      secretChars[i] = null;
      guessChars[i] = null;
    }
  }

  for (let i = 0; i < secretChars.length; i++) {
    if (guessChars[i] === null) continue;
    const index = secretChars.indexOf(guessChars[i]);
    if (index !== -1) {
      misplaced.push(guessChars[i]);
      secretChars[index] = null;
    }
  }

  return { correct, misplaced };
}

function displayGuess(guess, result) {
  const guessesDiv = document.getElementById('guesses');
  const guessElement = document.createElement('p');
  guessElement.innerHTML = `${guess} - Correct: ${result.correct.join(', ')} Misplaced: ${result.misplaced.join(', ')}`;
  guessesDiv.appendChild(guessElement);
}

function showMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
}

