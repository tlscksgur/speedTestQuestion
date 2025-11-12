const $btn = document.querySelector('.search-btn');

$btn.addEventListener('click', function () {
    const regex = new RegExp(`${search.value}`, 'g');
    content.innerHTML = content.textContent.replace(regex, `<span style="background: ${getRandomColor()}">${search.value}</span>`);
});

const getRandomColor = () => `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;

