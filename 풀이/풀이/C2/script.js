const $imgBox = document.querySelector('.img-box');

const MIN_SIZE = 10;
const INCREASE = 2;

$imgBox.addEventListener('mousemove', function(e) {
    spotlight.style.display = 'block';
    spotlight.style.left = e.offsetX + 'px';
    spotlight.style.top = e.offsetY + 'px';
});
$imgBox.addEventListener('mouseleave', function () {
    spotlight.style.display = 'none';
});

$imgBox.addEventListener('wheel', function(e) {
    if(e.deltaY < 0) spotlight.style.width = spotlight.getBoundingClientRect().width + INCREASE + 'px';
    else {
        if(spotlight.getBoundingClientRect().width <= MIN_SIZE) return;
        spotlight.style.width = spotlight.getBoundingClientRect().width - INCREASE + 'px';
    }
})