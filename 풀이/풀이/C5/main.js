function hexToRgb(hex) {
    return {
        r : parseInt(hex.slice(1,3), 16),
        g : parseInt(hex.slice(3,5), 16),
        b : parseInt(hex.slice(5,7), 16)
    }
}

function rgbToHex(rgb) {
    return '#' + rgb.match(/\d+/g).map(e => parseInt(e).toString(16).padStart(2, '0')).join('');
}

const hexRegex = /^#[a-zA-Z0-9]{6}$/;
const rgbRegex = /^rgb\((\s*\d+\s*,){2}\s*\d+\s*\)$/;

const $input = document.getElementById('color-input');
const $success = document.querySelector('.success-result');
const $error = document.querySelector('.error-result');

$success.innerHTML = '';
$error.innerHTML = '';

$input.addEventListener('input',function() {
    const value = this.value.trim();
    if(hexRegex.test(value)) {
        const rgb = hexToRgb(value);
        $error.innerHTML = '';
        $success.innerHTML = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if(rgbRegex.test(value)) {
        const hex = rgbToHex(value);
        $error.innerHTML = '';
        $success.innerHTML = hex;
    } else {
        $success.innerHTML = '';
        $error.innerHTML = 'Error';
    }
});