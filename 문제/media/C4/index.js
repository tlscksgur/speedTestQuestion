//Here is your CODE!

let render = (e) => {

};

let saveText = [];
let saveSelection = [];
let isMouseDown = false;
window.onload = () => {
    const $p = document.querySelectorAll('.container p');
    const $container = document.querySelector('.container');
    const str = $container.innerHTML;

    const startIndex = str.indexOf('<p>');
    const lastIndex = str.lastIndexOf('</p>');

    const betweenStr = str.substring(startIndex + 3, lastIndex);

    const replaceBetweenP = betweenStr.replace(/[<p><\/p>]/g, '');

    const pTag = document.createElement('p');

    pTag.innerHTML = JSON.stringify(replaceBetweenP);

    $container.append(`${betweenStr}`);
    console.log();

    console.log(startIndex, lastIndex, betweenStr);

}

