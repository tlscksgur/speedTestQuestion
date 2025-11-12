/**
 *  Your Code
 */

const ctx = canvas.getContext('2d');

const RADIUS = 40;
const DECREASE = 3;
const RANDOM_RANGE = 40;

let circle = [];
let mouse = {x: 0, y: 0};
let isMouseDown = false;
const getRandomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

const getRandomDir = () => !Math.floor(Math.random() * 2) ? 0 : 1;

const getRandomRange = () => !getRandomDir() ? -Math.random() * RANDOM_RANGE : Math.random() * RANDOM_RANGE;

class Circle {
    constructor(x, y, color, radius, random) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.random = random;
    }

    destroy() {
        if (this.radius <= 0) return true;
        else return false;
    }
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circle.forEach(e => {
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

const animation = () => {
    let time = 0;
    const frame = () => {
        time ++;
        if (circle.length && time % 3 === 0) {
            circle.forEach((e, idx) => {
                e.radius -= DECREASE;
                e.x += getRandomRange();
                e.y += getRandomRange();
                if (e.destroy()) circle.splice(idx, 1);
            });
            draw();
        }
        window.requestAnimationFrame(frame);
    }

    frame();
}

const onMouseMove = (e) => {
    if (!isMouseDown) return;
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
    circle.push(new Circle(e.offsetX, e.offsetY, getRandomColor(), RADIUS, getRandomRange()));
};
const onMouseUp = () => isMouseDown = false;
const onMouseDown = () => isMouseDown = true;

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mousedown', onMouseDown);

animation();