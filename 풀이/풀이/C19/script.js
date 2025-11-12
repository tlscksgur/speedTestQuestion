const romanNumber = [
    {word : 'I', value : 1},
    {word : 'IV', value : 4},
    {word : 'V', value : 5},
    {word : 'IX', value : 9},
    {word : 'X', value : 10},
    {word : 'XL', value : 40},
    {word : 'L', value : 50},
    {word : 'XC', value : 90},
    {word : 'C', value : 100},
    {word : 'CD', value : 400},
    {word : 'D', value : 500},
    {word : 'CM', value : 900},
    {word : 'M', value : 1000},
];

function romanConverter(s) {
    if (typeof s === 'string') {
        let result = 0;
        let romeArray = s.split('');
        const numArray = romeArray.map(e => romanNumber.find(ele => ele.word === e));
        for(let i = 0; i < numArray.length; i++) {
            if(numArray[i + 1] && numArray[i].value < numArray[i + 1].value) {
                result -= numArray[i].value;
            } else {
                result += numArray[i].value;
            }
        }
        document.write(result + '<br>');
    } else {
        let result = '';
        while(s > 0) {
            let min;
            romanNumber.forEach(e => {
                const minus = s - e.value;
                if(minus >= 0) min = e;
            });
            s -= min.value;
            result += min.word;
        }
        document.write(result + '<br>');
    }
}


romanConverter('DCXLVI');
romanConverter(646);
