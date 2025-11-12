document.addEventListener('DOMContentLoaded', function () {
    const $modal = document.querySelector('.modal');
    const $openBtn = document.querySelector('#open');
    const $closeBtn = document.querySelector('#close');

    const modalHidden = (e) => {
        e.stopPropagation();
        $modal.style.display = 'block';
    }

    $openBtn.addEventListener('click', function (e) {
        modalHidden(e);
        document.body.style.overflow = 'hidden';
    });

    $modal.addEventListener('click', function (e) {
        modalHidden(e);
        document.body.style.overflow = 'hidden';
    })

    $closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        document.body.style.overflow = 'auto';
        $modal.style.display = 'none';
    });

    document.addEventListener('click', function (e) {
        document.body.style.overflow = 'auto';
        $modal.style.display = 'none';
    })
});