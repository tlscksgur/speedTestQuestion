const getRandomLocation = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;

    return {x, y};
}
const getRandomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

setInterval(() => {
    const {x, y} = getRandomLocation();
    const $div = document.createElement('div');
    $div.classList.add('fire');
    $div.style.left = x + 'px';
    $div.style.top = y + 'px';
    $div.style.filter = `drop-shadow(0 0 0 ${getRandomColor()})`;
    document.body.append($div);

    setTimeout(() => {
        $div.remove();
    }, 450);

}, 100);