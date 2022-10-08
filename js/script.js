const menu = document.getElementById("menu");
const playGameButton = document.getElementById("play-game");
const playGame = document.getElementById("game");

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

let canvasPlayer1;
let ctxPlayer1;
let canvasPlayer2;
let ctxPlayer2;

let player1;
let player2;


function selectHero(str) {
    if (str == "DemonHero")
        return (new DemonHero());
    else if (str == "FireKnightHero")
        return (new DemonHero());
    else
        console.log("error");
}

function animate(ctx, player)
{
    console.log(player.gameFrame);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(player.gameFrame / player.staggerFrames) % player.frames;
    player.posX = player.spriteWidth * position;
    ctx.drawImage(player.spriteSheet, player.posX, player.posY * player.spriteHeight,
        player.spriteWidth, player.spriteHeight, 0, 0, player.spriteWidth, player.spriteHeight);
    if (!player.isLoop && player.gameFrame > (player.frames * player.staggerFrames) - player.staggerFrames) {
        player.gameFrame = 0;
    }
    else {
        player.gameFrame++;
        window.requestAnimationFrame(() => {
            animate(ctx, player); 
        });
    }
}

function startGame() {
    const hero = document.getElementById("select-hero").value;
    const difficulty = document.getElementById("select-difficulty").value;

    menu.style.display = "none";

    canvasPlayer1 = document.createElement("canvas");
    canvasPlayer1.classList.add("player1");
    playGame.appendChild(canvasPlayer1);
    ctxPlayer1 = canvasPlayer1.getContext('2d');
    canvasPlayer1.width = CANVAS_WIDTH;
    canvasPlayer1.height = CANVAS_HEIGHT; 
    player1 = selectHero(hero);

    canvasPlayer2 = document.createElement("canvas");
    canvasPlayer2.classList.add("player2");
    playGame.appendChild(canvasPlayer2);
    ctxPlayer2 = canvasPlayer2.getContext('2d');
    canvasPlayer2.width = CANVAS_WIDTH;
    canvasPlayer2.height = CANVAS_HEIGHT;
    player2 = selectHero(hero);

    player1.idleAnim();
    player2.idleAnim();
    animate(ctxPlayer1, player1);
    animate(ctxPlayer2, player2);
}

playGameButton.addEventListener('click', startGame);