const   contentText = document.querySelector("#content-text");
const   inputField = document.querySelector("#invisible-text");
const   timerText = document.querySelector("#timer");
const   wpmText = document.querySelector("#wpm");
const   accText = document.querySelector("#acc");

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

function    gameInit() {
    const characters = contentText.querySelectorAll('span');
    const typedChar = inputField.value.split('');

    if (!inGame) {
        inGame = true;
        timerInterval = setInterval(myTimer, 1000);
    }
    typedChar.forEach((charac, index) => {
        if (charac === characters[index].firstChild.nodeValue)
        {
            characters[index].classList.add("correct");
            characters[index].classList.remove("fail");
            console.log("succes");
        }
        else
        {
            characters[index].classList.add("fail");
            characters[index].classList.remove("correct");
            mistake++;
            console.log("false");
        }
    });
}

function    myTimer() {
    var timer;

    if (timeLeft > 0) {
        timeLeft--;
        timerText.innerHTML = timeLeft;
    }
    else
        clearInterval(timerInterval);
}

randomParagraph();
inputField.addEventListener('input', gameInit);
