let thumbsUp = 0;
let thumbsDown = 0;

$(() => {
    setEvent();
});
function onBtnClick(e) {
    const $target = $(e.currentTarget);
    const index = $target.index();
    const $each = !index ? $target.next() : $target.prev();

    if(!index) {
        if($target.hasClass('btn-primary')) thumbsUp--;
        else thumbsUp++;

        if($each.hasClass('btn-danger')) thumbsDown--;

        $each.removeClass('btn-danger').addClass('btn-light');
        $target.toggleClass('btn-primary').toggleClass('btn-light');
    } else {
        if($target.hasClass('btn-danger')) thumbsDown--;
        else thumbsDown++;

        if($each.hasClass('btn-primary')) thumbsUp--;

        $each.removeClass('btn-primary').addClass('btn-light');
        $target.toggleClass('btn-danger').toggleClass('btn-light');
    }
}

function checkBtnClick() {
    $('h5').removeClass('d-none').html(`thumbsUP : ${thumbsUp}, thumbsDOWN : ${thumbsDown}`);
}
const setEvent = () => {
    $(document)
        .on('click', 'button:not(.check)', onBtnClick)
        .on('click', '.check', checkBtnClick)
}