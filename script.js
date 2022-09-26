const contentText = document.querySelector("#content-text");
const inputField = document.querySelector("#invisible-text");
let charIndex = 0;


const paragraph = [
    "trol loll ol",
    "je suis un chololqt",
    "je suis un fromage",
    "chocolat blanc"
];

function randomParagraph() {
    let randomSentence = Math.floor(Math.random() * paragraph.length);
    paragraph[randomSentence].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        contentText.innerHTML += spanTag;
    });
    document.addEventListener("keydown", () => inputField.focus());
    contentText.addEventListener("click", () => inputField.focus());
}

function initTyping() {
    const characters = contentText.querySelectorAll("span").characters;
    let typedChar = inputField.value.split("")[charIndex];
    console.log(characters[charIndex]);
    console.log(typedChar); 
    if (characters[charIndex] == typedChar) {
        console.log("correct");
    }
    else {
        console.log("incorrect");
    }
    charIndex++;
}

randomParagraph();
inputField.addEventListener("input", initTyping);