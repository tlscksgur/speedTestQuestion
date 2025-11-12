document.addEventListener('click', function(e) {
    const $div = document.createElement('div');
    document.body.append($div);
    $div.id = 'circle';
    $div.style.cssText = `left : ${e.offsetX}px; top : ${e.offsetY}px; transition : width .5s, opacity .5s; opacity : 0; width : 80px`;
    setTimeout(() => $div.remove(), 500);
});
