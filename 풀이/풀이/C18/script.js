const $image = document.querySelectorAll('.image-box > img');

let index = 0;

$image.forEach((e,idx) => {
    e.addEventListener('click', function(event) {
        popupImage.src = this.src;
        index = idx;
        openPopup();
        buttonStateUpdate();
    });
})

lightBg.addEventListener('click', function() {
    closePopup();
});

closeBtn.addEventListener('click', function() {
    closePopup();
});

nextBtn.addEventListener('click', function() {
   if(index === $image.length - 1) return;
   index++;
   imageChange();
   buttonStateUpdate();
});

prevBtn.addEventListener('click', function() {
    if(!index) return;
    index--;
    imageChange();
    buttonStateUpdate();
});

const buttonStateUpdate = () => {
    if(!index) prevBtn.classList.add('disabled');
    else prevBtn.classList.remove('disabled');

    if(index === $image.length - 1) nextBtn.classList.add('disabled');
    else nextBtn.classList.remove('disabled');
}

const imageChange = () => popupImage.src = $image[index].src;

const openPopup = () => {
    lightBox.style.opacity = '1';
    lightBox.style.visibility = 'visible';
}

const closePopup = () => {
    lightBox.style.opacity = '0';
    lightBox.style.visibility = 'hidden';
}