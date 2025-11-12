canvas.width = 1000;
canvas.height = 300;

const RADIUS = 5;
const DISTANCE = 12;
const DRAW_LOCATION = {x: canvas.width / 10, y: canvas.height / 4};
const LIMIT = 5;

const ctx = canvas.getContext("2d");

let curClock = '';
let prevClock = '';

let defaultNumber = [];
let particleNumber = [];

let t = 0;

const getCurClock = (type) => {
    const date = new Date();
    if (type === 'prev') date.setSeconds(date.getSeconds() - 1);
    const hour = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');

    return `${hour}:${min}:${second}`;
}


const animation = () => {
    const frame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (defaultNumber.length) {
            defaultNumber.forEach(e => {
                for (let i = 0; i < NUMBERS[e.number].length; i++) {
                    const y = DISTANCE * i + DRAW_LOCATION.y;
                    for (let j = 0; j < NUMBERS[e.number][i].length; j++) {
                        const x = DISTANCE * j + (DRAW_LOCATION.x * e.idx + DRAW_LOCATION.x);
                        const check = NUMBERS[e.number][i][j];
                        if (check) {
                            ctx.fillStyle = 'black';
                            ctx.beginPath();
                            ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            });
        }
        if (particleNumber.length) {
            t += 1 / 60;
            if (t > 1) t = 1;
            particleNumber.forEach(e => {
                for (let i = 0; i < NUMBERS[e.number].length; i++) {
                    for (let j = 0; j < NUMBERS[e.number][i].length; j++) {
                        const check = NUMBERS[e.number][i][j];
                        if (check) {
                            let dir = e.r[i][j] === 1 ? -LIMIT : e.r[i][j] === 2 ? LIMIT : 0;
                            let p0 = {x: e.x[j], y: e.y[i]};
                            let p1 = {x: e.x[j] + dir, y: e.y[i] - LIMIT * 30};
                            let p2 = {x: e.x[j] + dir * 10, y: canvas.height + RADIUS};
                            const {x, y} = quadraticBezierPoint(p0, p1, p2);
                            ctx.fillStyle = e.color[i][j];
                            ctx.beginPath();
                            ctx.arc(x + dir, y + dir, RADIUS, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            });

        }

        window.requestAnimationFrame(frame);
    };
    frame();
}

const draw = () => {
    defaultNumber = [];
    particleNumber = [];
    for (let i = 0; i < curClock.length; i++) {
        defaultNumber.push({number: getClockNumberIndex(curClock[i]), idx: i, type: 'default'});
        if (curClock[i] !== prevClock[i]) particleNumber.push({
            number: getClockNumberIndex(curClock[i]),
            idx: i,
            type: 'particle',
            color: Array.from({length: 11}, () => Array.from({length: 7}, () => getRandomColor())),
            x: Array.from({length: 7}, (e, index) => DISTANCE * index + (DRAW_LOCATION.x * i + DRAW_LOCATION.x)),
            y: Array.from({length: 11}, (e, index) => DISTANCE * index + DRAW_LOCATION.y),
            r: Array.from({length: 11}, () => Array.from({length: 7}, () => Math.ceil(Math.random() * 3)))
        });
    }
}

function quadraticBezierPoint(p0, p1, p2) {
    const invT = 1 - t;
    const invT2 = invT * invT;
    const t2 = t * t;

    const x = invT2 * p0.x + 2 * invT * t * p1.x + t2 * p2.x;
    const y = invT2 * p0.y + 2 * invT * t * p1.y + t2 * p2.y;

    return {x, y};
}

const getClockNumberIndex = (number) => number === ':' ? 10 : number;
const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

setInterval(() => {
    curClock = getCurClock('cur').split('');
    prevClock = getCurClock('prev').split('');
    draw();
    t = 0;
}, 1000);
animation();