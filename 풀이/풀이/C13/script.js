const $editor = document.querySelector('textarea');
const $viewer = document.querySelector('.viewer');

let result = '';

$editor.addEventListener('input', function() {
    result = this.value;

    const brRegex = /\n/g;

    if(brRegex.test(result)) {
        result = result.replaceAll(brRegex, '<br>\n');
    }

    const titleRegex = /#{1,6}\s(.+)/g;
    const titleMatch = result.match(titleRegex);

    if(titleRegex.test(result)) {
        titleMatch.forEach(e => {
            result = result.replace(e, match => {
                const length = match.replace(/[^#]/g,'').length;
                const text = match.replace(/#/g, '');
                return `<h${length}>${text}</h${length}>`;
            });
        });
    }

    const strongRegex = /\*{2}(\S+)\*{2}/g;
    const strongMatch = result.match(strongRegex);

    if(strongRegex.test(result)) {
        strongMatch.forEach(e => {
            result = result.replace(e, match => {
                const text = match.replaceAll('*', '');
                return `<strong>${text}</strong>`;
            });
        });
    }

    const hrRegex = /-{3,}/g;
    const hrMatch = result.match(hrRegex);

    if(hrRegex.test(result)) {
        hrMatch.forEach(e => {
            result = result.replace(e, '<hr>');
        });
    }

    const liRegex = /-\s(.*)/gm;

    if(liRegex.test(result)) {
        result = result.replaceAll(liRegex, match => `<li>${match.replace('- ', '')}</li>`);
    }

    const imgRegex = /!\[([^\[]+)\]\(([^)]+)\)/g;

    if(imgRegex.test(result)) {
        result = result.replaceAll(imgRegex, '<img src="$2" title="$1" width="300">');
    }

    const linkRegex = /\[([^\[]+)\]\(([^)]+)\)/g;

    if(linkRegex.test(result)) {
        result = result.replaceAll(linkRegex,'<a href="$2">$1</a>');
    }


    viewerView(result);
});

const viewerView = (value) => {
    $viewer.innerHTML = value;
}
