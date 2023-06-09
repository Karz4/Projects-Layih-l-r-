const wordEl = document.getElementById('word');
const popup = document.getElementById('popup-container');
const messageEl = document.getElementById('success-message');
const wrongLettersEl = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainBtn = document.getElementById('play-again');


const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["javascript", "html", "css", "php", "react", "bootstrap", "ruby", "typescript", "c++", "python"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {

    wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => `
    <div class ="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </div>
    `).join('')}
    `;

    const w = wordEl.innerText.replace(/\n/g, '');

    if (w === selectedWord) {
        popup.style.display = 'flex';
        messageEl.innerText = "Qalib oldunuz";
    }
}

function updateWrongLetters() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<h3>Səhv Hərflər</h3>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)} 
    `;

    items.forEach((item, index) => {

        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = 'block';
        }

        else {
            item.style.display = 'none';
        }
    })

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        messageEl.innerText = 'Təssüfki Uduzdunuz'
    }
}

function displayMessage() {

    message.classList.add('show');
    setTimeout(function () {
        message.classList.remove('show');
    }, 2000)
}

PlayAgainBtn.addEventListener('click', function () {

    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
})

window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {

        const letter = e.key;

        if (selectedWord.includes(letter)) {

            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else {
                displayMessage();
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }
            else {
                displayMessage();
            }
        }
    }
});

displayWord()
