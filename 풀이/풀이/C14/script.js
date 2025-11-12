const $loadImage = document.querySelectorAll('.load-image');
const $closeBtn = document.querySelector('.close-btn');
const $filter = document.querySelector('.filter');
const $grid = document.querySelector('.grid');
const $color = document.querySelector('#color-area');
const $colorBlock = document.querySelector('#color-block');
const $code = document.querySelector('#code');
const bgCanvas = document.querySelector('#bg-canvas');
const canvas = document.querySelector('#filter-canvas');

const bgCtx = bgCanvas.getContext('2d');
const ctx = canvas.getContext('2d');

const range = 50;

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

canvas.width = 100;
canvas.height = 100;

let mode = false;

$loadImage.forEach(e => {
    e.addEventListener('click', async function () {
        bgCanvas.style.display = 'block'
        $closeBtn.style.display = 'flex';
        $filter.style.display = 'block';
        $color.style.display = 'flex';
        canvas.style.display = 'block';

        const bgImage = await renderImage(this.src);
        bgCtx.clearRect(0,0,bgCanvas.width, bgCanvas.height);
        bgCtx.drawImage(bgImage, 0,0,bgCanvas.width, bgCanvas.height);

        mode = true;
    });
});

$closeBtn.addEventListener('click', function () {
    bgCanvas.style.display = 'none';
    $filter.style.display = 'none';
    this.style.display = 'none';
    $color.style.display = 'none';
    canvas.style.display = 'none';

    mode = false;
});

document.addEventListener('mousemove', function (e) {
    if (!mode) return;
    $filter.style.left = e.clientX + 10 + 'px';
    $filter.style.top = e.clientY + 10 + 'px';
    canvas.style.left = e.clientX + 10 + 'px';
    canvas.style.top = e.clientY + 10 + 'px';

    const sx = e.clientX - range;
    const sy = e.clientY - range;
    const ex = e.clientX + range;
    const ey = e.clientY + range;

    const imageData = bgCtx.getImageData(sx,sy,ex,ey);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.putImageData(imageData, 0, 0);

    const colorData = bgCtx.getImageData(e.clientX - 1, e.clientY - 1,1,1);
    const color = rgbToHex(colorData.data[0], colorData.data[1], colorData.data[2]);
    $colorBlock.style.backgroundColor = color;
    $code.innerHTML = color;
});

const renderImage = src => {
    return new Promise(res => {
        const image = new Image();
        image.src = src;
        image.onload = () => {
            res(image);
        };
    })
}

const renderGrid = () => {
    for(let i = 0; i < 400; i++) {
        const $div = document.createElement('div');
        $grid.append($div);
    }
}

const rgbToHex = (r, g, b) => {
    console.log(r,g,b);
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
}

renderGrid();