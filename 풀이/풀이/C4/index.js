//Here is your CODE!

document.addEventListener('DOMContentLoaded', function() {
    function originPTagReplace() {
        const $p = document.querySelectorAll('p');
        const merge = Array.from($p).map(e => e.textContent).join(`<br style="user-select: none"><br style="user-select: none">`);

        const mergePTag = document.createElement('p');
        mergePTag.innerHTML = merge;

        $p.forEach(e => e.remove());

        document.querySelector('h1').parentNode.appendChild(mergePTag);
    }

    originPTagReplace();

    document.querySelector('.render-btn').addEventListener('click', function() {
        const selection = window.getSelection();

        if(!selection.isCollapsed) {
            const range = selection.getRangeAt(0);
            let span = document.createElement('span');
            span.className = 'highlight';

            let content = range.extractContents();
            span.appendChild(content);
            range.insertNode(span);
        }
    });
})

let render = (e) => {
};


function render() {
    document.designMode = 'on';
    document.execCommand('backColor', false, '#ff0');
    document.execCommand('foreColor', false, '#f00');
    document.designMode = 'off';
    console.log('render');
}
