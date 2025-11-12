const pals = ['000', '088', '00d', '438', '800', '888', '8cf', 'aa2', 'b82', 'c18', 'fbb', 'e00', 'fd0', 'feb', 'ddd', 'fff'];
const size = 16;
const $box = document.querySelector('.pixel-box');
const $palette = document.querySelector('.palette');

let color = '';
const view = () => {
    for(let y = 0; y < size; y++) {
        for(let x = 0; x < size; x++) {
            const $div = document.createElement('div');
            const left = x * size;
            const top = y * size;
            $div.style.left = left + 'px';
            $div.style.top = top + 'px';
            $box.append($div);
        }
    }
    pals.forEach(e => {
        const $div = document.createElement('div');
        $div.style.backgroundColor = `#${e}`;
        $div.setAttribute('data-color', `#${e}`);
        $palette.append($div);
    });
}
view();

const $color = document.querySelectorAll('.palette > div');
$color.forEach(e => {
    e.addEventListener('click', function() {
        $color.forEach(e => {
            e.style.border = '3px solid #aaa';
        });
        this.style.border = `3px solid yellow`;
        color = e.dataset.color;
    })
})

const $pixel = document.querySelectorAll('.pixel-box > div');
$pixel.forEach(e => {
    e.addEventListener('click', function() {
        this.style.backgroundColor = color;
    });
});

