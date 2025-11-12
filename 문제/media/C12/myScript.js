const data = {
    'a.html' : {color : '#f99', h2 : 'A Page', p : 'This is a page content'},
    'b.html' : {color : '#9f9', h2 : 'B Page', p : 'This is b page content'},
    'c.html' : {color : '#99f', h2 : 'C Page', p : 'This is c page content'}
}

const $a = document.querySelectorAll('a');

$a.forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const $main = document.querySelector('main');
        const $h2 = document.querySelector('h2');
        const $p = document.querySelector('p');

        const $data = data[a.getAttribute('href')];

        $main.style.backgroundColor = $data.color;
        $h2.innerText = $data.h2;
        $p.innerText = $data.p;

        history.pushState({}, null, a.href);
    });
});
