// Input your code

let isMouseDown = false;
let curCard = null;

const $card = document.querySelectorAll('.card');

const cardStyleReset = () => {
    $card.forEach(e => e.style.transform = 'rotate(0)');
}

$card.forEach(card => {
    card.addEventListener('mousedown', function (e) {
        cardStyleReset();
        this.style.transform = 'rotate(5deg)';
        curCard = e.currentTarget;
        isMouseDown = true;
    });
    card.addEventListener('mousemove', function(e) {
        const $cur = e.currentTarget;
        $cur.style.left = $cur.getBoundingClientRect().left + e.movementX + 'px';
        $cur.style.top = $cur.getBoundingClientRect().top + e.movementY + 'px';
    });
});

document.addEventListener('mouseup', function () {
    cardStyleReset();
    curCard = null;
    isMouseDown = false;
});

