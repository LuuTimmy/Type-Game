const canvas = document.getElementById('demon-hero');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 300;
const CANVAS_HEIGHT = canvas.height = 300;

const playerImage = new Image();
playerImage.src = "img/demon-288x160-spritesheet.png";
const spriteWidth = 288;
const spriteHeight = 160;

let is_anime = true;
let is_loop = true;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
let nbFrameAnimation = 5;
const staggerFrames = 5;

function animate()
{
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % nbFrameAnimation;
    frameX = spriteWidth * position;
    ctx.drawImage(playerImage, frameX, frameY * spriteHeight,
        spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    if (!is_loop && gameFrame > (nbFrameAnimation * staggerFrames) - staggerFrames) {
        gameFrame = 0;
        is_anime = false;
    }
    else {
        gameFrame++;
        requestAnimationFrame(animate);
    }
}



function demonIdle()
{
    is_loop = true;
    nbFrameAnimation = 5;
    gameFrame = 0;
    frameY = 0;
}

function waitEndAnimation()
{
    if (is_anime == true) {
        setTimeout(waitEndAnimation, 100);
    }
    else {
        is_anime = true;
        animate();
        demonIdle();
    }
}

function demonAttackAnmation()
{
    is_loop = false;
    nbFrameAnimation = 14;
    gameFrame = 0;
    frameY = 2;
    waitEndAnimation();
}

function demonDeathAnimation()
{
    is_loop = false;
    nbFrameAnimation = 22;
    gameFrame = 0;
    frameY = 4;
}

animate();

document.addEventListener("click", demonDeathAnimation);

class CreateState
{
    constructor(name, staggerFrames, frames, xPos, yPos, isLoop) {
        this.name = name;
        this.staggerFrames = staggerFrames;
        this.frames = frames;
        this.posX = xPos;
        this.posY = ypos;
        this.isLoop = isLoop;
    }
}

class DemonHero
{
    constructor() {
        this.playerImage = new Image();
        this.playerImage.src = "img/demon-288x160-spritesheet.png";
        this.spriteWidth = 288;
        this.spriteHeight = 160;
        this.frameX = 0;
        this.frameY = 0;
        this.staggerFrames = 5;
        this.demonIdle = new CreateState("Idle", 5, 5, 0, 0, true);
        this.demonAttack = new CreateState("Attack", 5, 14, 0, 2, false);
        this.demonDeath = new CreateState("Death", 5, 22, 0, 4, false);
    }
}
