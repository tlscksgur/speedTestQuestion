button.addEventListener('click', function(e){
   effect.style.left = e.offsetX + 'px';
   effect.style.top = e.offsetY + 'px';

   effect.style.transition = 'width .5s ease, opacity .5s ease';
   effect.style.width = '200%';
   effect.style.opacity = '0';
});

effect.addEventListener('transitionend', function(e) {
    this.style.transition = 'none';
    this.style.width = '0px';
    this.style.opacity = '1';
});