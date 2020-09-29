const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];


const correct = [];
const wrong = [];


//show the hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter"> 
                    ${correct.includes(letter) ? letter : ''}
                </span>
                `)
            .join('')
        }
`;
    const innerWord = wordEl.innerText.replace(/\n/g, '')
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'congratulations! You won!';
        popup.style.display = 'flex'

    }
};

//show wrong letter function 
function showWrongLetter() {
    //DISPLAY WRONG LETTERS
    wrongLettersEl.innerHTML = `
        ${wrong.length > 0 ? '<p>wrong</p>' : ''}
        ${wrong.map(letter => `<span>${letter}</span>`)}
    `;
    //Display parts
    figureParts.forEach((part, index) => {
        const errors = wrong.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        };
    });

    //Check if lost
    if (wrong.length === figureParts.length) {
        popup.style.display = 'flex'
        finalMessage.textContent = 'Unfortunately! you Lost!'
    };
};

//Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(function () {
        notification.classList.remove('show')
    }, 2000);
};
//key down letter press

window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correct.includes(letter)) {
                correct.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrong.includes(letter)) {
                wrong.push(letter);
                showWrongLetter();
            } else {
                showNotification();
            };
        };


    };

});

//play again button
playAgainBtn.addEventListener('click', () => {
    correct.splice(0);
    wrong.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    showWrongLetter();
    popup.style.display = "none";
});
displayWord();