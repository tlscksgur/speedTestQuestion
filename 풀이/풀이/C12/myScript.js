
document.addEventListener('DOMContentLoaded', function() {
    const $a = document.querySelectorAll('a');
    $a.forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            let url = this.href;
            await loadPage(url);
            window.history.pushState({path : url}, '', url);
        }) ;
    });

    window.addEventListener('popstate', async function(e) {
        let url = location.pathname;
        await loadPage(url);
    });

    async function loadPage(url) {
        await fetch(url)
            .then(res => res.text())
            .then(html => {
                let doc = new DOMParser().parseFromString(html, 'text/html');
                const h2 = doc.querySelector('h2');
                const p = doc.querySelector('p');
                const style = doc.querySelector('style');
                const footer = doc.querySelector('footer');

                document.querySelector('h2').innerHTML = h2.innerHTML;
                document.querySelector('p').innerHTML = p.innerHTML;
                document.querySelector('footer').innerHTML = footer.innerHTML;
                document.querySelector('style').innerHTML = style.innerHTML;
            });
    }
});