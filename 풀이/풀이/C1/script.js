const $btn = document.querySelector('.search-btn');

const origin = content.textContent;
let variable = content.textContent;
const spanRegex = /<span\b[^>]*>(.*?)<\/span>/g;
let except = [];

$btn.addEventListener('click', function () {

    // let regex = new RegExp(search.value, "gi");
    //
    // const color = getRandomColor();
    //
    // let highlightedText = content.innerHTML.replace(/<span style="background-color:rgb\([0-9]+,\s*[0-9]+,\s*[0-9]+\);?">|<\/span>/gi, "");
    //
    // let newText = highlightedText.replace(regex, function(match) {
    //     return `<span style="background-color:${color}">${match}</span>`;
    // });
    //
    // content.innerHTML = newText;

    // const value = search.value;
    // const color = getRandomColor();
    //
    // const replace = `<span style="background : ${color}">${value}</span>`;
    //
    // const length = value.length;
    //
    // let location = [];
    //
    // while (variable.search(value) !== -1) {
    //     location.push(variable.search(value));
    //     variable = variable.replace(value, '');
    // }
    //
    // except.push({value, replace, length, location});
    //
    // let result = variable;
    // except.forEach(e => {
    //     for(let i = 0; i < e.location.length; i++) {
    //         result = result.substring(0,e.location[i]) + e.replace + result.substring(e.location[i]);
    //     }
    // });
    //
    // console.log(result);
    //
    // console.log(except, variable);

    // except.push(search.value);

    const color = getRandomColor();

    content.innerHTML = content.innerHTML.replaceAll(search.value, `<span style="background: ${color}">${search.value}</span>`);

    // const contentMatch = content.textContent.match(new RegExp())
    // except.forEach(e => {
    //     const regex = new RegExp(`${e}`, 'g');
    //
    //     content.innerHTML = replace;
    //     console.log(replace);
    //     console.log(replace.replace(spanRegex, e));
    // })
});

const getRandomColor = () => `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
