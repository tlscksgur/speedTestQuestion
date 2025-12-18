const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const newEl = (tagName, attribute) => Object.assign(document.createElement(tagName), attribute);

const $fetch = (url) => fetch(url).then((res) => res.json());

if(!document.startViewTransition) { // 화면 부드럽게 이동해주는 코드
  startViewTransition = (cb) => { 
    cb();
  }
}