
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.style.background = "url('assets/fondo.jpg') no-repeat center center";
canvas.style.backgroundSize = "cover";

let score = 0;
let insects = [];


const insectImage = new Image();
insectImage.src = "assets/insecto1.png";

class Insect {
    constructor(x, size, speed) {
        this.posX = x;
        this.posY = -size;
        this.size = size;
        this.speed = speed;
    }

    draw(context) {
        context.drawImage(insectImage, this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
    }

    update() {
        this.posY += this.speed;
        if (this.posY - this.size > canvas.height) {
            this.posY = -this.size;
            this.posX = Math.random() * (canvas.width - this.size * 2) + this.size;
        }
    }

    containsPoint(x, y) {
        return x > this.posX - this.size / 2 && x < this.posX + this.size / 2 &&
               y > this.posY - this.size / 2 && y < this.posY + this.size / 2;
    }
}

function generateInsects() {
    setInterval(() => {
        let size = Math.random() * 50 + 30;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let speed = Math.random() * 4 + 1;
        insects.push(new Insect(x, size, speed));
    }, 500);
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    insects = insects.filter(insect => {
        const hit = insect.containsPoint(mouseX, mouseY);
        if (hit) {
            score++;
            document.getElementById("score").textContent = "Puntuación: " + score;
        }
        return !hit;
    });
});

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    insects.forEach(insect => {
        insect.update();
        insect.draw(ctx);
    });
    requestAnimationFrame(update);
}

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9; 
    canvas.height = window.innerHeight * 0.8; 
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Personalizar cursor
const styleSheet = document.createElement("style");
styleSheet.innerHTML = "body {cursor: url('assets/cursor.cur'), auto;}";
document.head.appendChild(styleSheet);

generateInsects();
update();