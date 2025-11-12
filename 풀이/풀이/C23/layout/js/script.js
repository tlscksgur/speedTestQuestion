// Input your code
const $leftCost = document.querySelector('.cost-left > span');
const $rightCost = document.querySelector('.cost-right > span');
const $bar = document.querySelector('.bar');
const $slider = document.getElementById('slider');

const MAX_PRICE = 1000;
const RANGE = 50;
const PERCENT_RANGE = 5;

let leftIndex = 8;
let rightIndex = 12;
let pointIndex = 0;
let isMouseDown = false;
let curCircle;
const getBarWidth = () => (rightIndex - leftIndex) * PERCENT_RANGE + '%';
const getBarLeft = () => leftIndex * PERCENT_RANGE + '%';
const getLeftCost = () => RANGE * leftIndex;
const getRightCost = () => RANGE * rightIndex;

const barUpdate = () => {
    $bar.style.left = getBarLeft();
    $bar.style.width = getBarWidth();
}

const costUpdate = () => {
    $leftCost.innerText = getLeftCost();
    $rightCost.innerText = getRightCost();
}

const update = () => {
    barUpdate();
    costUpdate();
}

const createSliderPoint = () => {
    for (let i = 0; i <= MAX_PRICE; i += RANGE) {
        const ratio = slider.getBoundingClientRect().width / 1000;

        const left = i * ratio;

        const $div = document.createElement('div');
        $div.className = 'slider-point';
        $div.style.left = left + 'px';

        slider.append($div);
    }
}

createSliderPoint();
update();

const $point = document.querySelectorAll('.slider-point');

$point.forEach((e,idx) => {
    e.addEventListener('mousemove', function(event) {
        $point.forEach(ele => {
            ele.style.zIndex = 0;
        });
        pointIndex = idx;
        this.style.zIndex = -1;
    });
});

$slider.addEventListener('mousedown', function(e) {
    const $target = e.target;
    if(!$target.classList.contains('circle')) return;
    curCircle = $target;
    isMouseDown = true;
});
document.addEventListener('mouseup', () => isMouseDown = false);
$slider.addEventListener('mousemove', function(e) {
    const $target = e.target;
    if(!$target.classList.contains('circle') && !$target.classList.contains('slider-point') || !isMouseDown) return;

    if($target.classList.contains('slider-point')) {
        if(curCircle.classList.contains('circle-left')) {
            if(pointIndex >= rightIndex && leftIndex + 1 <= rightIndex) return;
            leftIndex = pointIndex;
        }
        if(curCircle.classList.contains('circle-right')) {
            if(pointIndex <= leftIndex && rightIndex - 1 >= leftIndex) return;
            rightIndex = pointIndex;
        }

        update();
    }
});

