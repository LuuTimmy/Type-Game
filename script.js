const   contentText = document.querySelector("#content-text");
const   inputField = document.querySelector("#invisible-text");
const   timerText = document.querySelector("#timer");
const   wpmText = document.querySelector("#wpm");
const   accText = document.querySelector("#acc");

let nbtype = 0;
let lengthPhrase;
let charIndex = 0;
let timerInterval;
let inGame = false;

let maxTime = 30;
let timeLeft = maxTime;

let mistake = 0;

const paragraph = [
    "trol loll ol",
    "je suis un chololat",
    "je suis un fromage",
    "chocolat blanc"
];

function    randomParagraph() {
    let randomSentence = Math.floor(Math.random() * paragraph.length);
    paragraph[randomSentence].split('').forEach(span => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = span;
        contentText.appendChild(characterSpan);
    });
    document.addEventListener("keydown", () => inputField.focus());
    contentText.addEventListener("click", () => inputField.focus());
}

function    game(event) {
    const characters = contentText.querySelectorAll('span');
    lengthPhrase = characters.length;
    const typedChar = inputField.value.split('')[charIndex];
    if (!inGame) {
        inGame = true;
        timerInterval = setInterval(myTimer, 1000);
    }
    if (event.inputType === "insertText") {
        if (characters[charIndex].firstChild.nodeValue == typedChar) {
            characters[charIndex].classList.remove("fail");
            characters[charIndex].classList.add("correct");
            console.log("succes");
        }
        else {
            mistake++;
            characters[charIndex].classList.remove("correct");
            characters[charIndex].classList.add("fail");
            console.log("failure");
        }
        nbtype++;
        if (charIndex != lengthPhrase - 1)
            charIndex++;
        else
            alert("youwin");
    }
    const nbCorrect = contentText.querySelectorAll('.correct').length;
    wpmText.innerText = Math.round((nbCorrect / 5)) * (60 / maxTime);
    accText.innerText = Math.round(100 - (mistake / nbtype * 100));
}

function    myTimer() {
    var timer;

    if (timeLeft > 0) {
        timeLeft--;
        timerText.innerText = timeLeft;
    }
    else
        clearInterval(timerInterval);
}



randomParagraph();
inputField.addEventListener('input', game);
inputField.addEventListener('keydown', (event) => {
    if (charIndex > 0 && (event.key === "Backspace" || event.key === "Delete"))
        charIndex--;
    if (charIndex > 0 && event.key === "ArrowLeft")
        charIndex--;
    if (charIndex < lengthPhrase - 1 && event.key === "RightArrow")
        charIndex++;
});