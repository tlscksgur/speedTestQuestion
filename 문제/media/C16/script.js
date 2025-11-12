const ctx = canvas.getContext('2d');

let wrapperMouse = false;
let isMouseDown = false;

let color = '';
let path = [];
let curPath = {};

const $palette = document.querySelectorAll('.palette > div');
const $btn = document.querySelectorAll('.save-btn > button');

wrapper.addEventListener('mouseup', () => wrapperMouse = false)
wrapper.addEventListener('mousedown', () => wrapperMouse = true)
wrapper.addEventListener('mousemove', function (e) {
    if (!wrapperMouse) return;

    canvas.width = this.getBoundingClientRect().width;
    canvas.height = this.getBoundingClientRect().height;

    draw();
});

canvas.addEventListener('mousedown', (e) => {
    if (!color) return alert('please select color');
    isMouseDown = true;

    const newPath = new Path2D();

    path.push({path: newPath, color});
    curPath = newPath;

    curPath.moveTo(e.offsetX, e.offsetY);
});
canvas.addEventListener('mouseup', (e) => isMouseDown = false);
canvas.addEventListener('mousemove', function (e) {
    e.stopPropagation();
    if (!isMouseDown) return;
    draw();
    curPath.lineTo(e.offsetX, e.offsetY);
});

$palette.forEach(e => {
    e.addEventListener('click', function () {
        $palette.forEach(ele => {
            ele.classList.remove('active');
        });
        color = getComputedStyle(this).backgroundColor;
        this.classList.add('active');
    })
});

$btn.forEach(e => {
    e.addEventListener('click', function () {
        const $a = document.createElement('a');
        let type = this.id === 'jpg' ? 'image/jpeg' : 'image/png';
        $a.href = canvas.toDataURL(type);
        $a.download = 'canvas';
        $a.click();
    });
});

const draw = () => {
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    path.forEach(e => {
        ctx.strokeStyle = e.color;
        ctx.stroke(e.path);
    });
}