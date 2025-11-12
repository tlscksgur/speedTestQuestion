function wordRank(words) {
    const word = words.split(' ');

    const char = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ';
    let charArr = [];
    for (let i = 0; i < char.length; i += 2) {
        charArr.push(char.slice(i, i + 2));
    }

    let calc = [];

    word.forEach(e => {
        let score = 0;
        for (let i = 0; i < e.length; i++) {
            charArr.forEach((w, idx) => {
                if (w.includes(e[i])) score += idx + 1;
            });
        }
        calc.push({word: e, score});
    });

    const scoreArr = calc.map(e => e.score);
    const max = Math.max(...scoreArr);

    let result = calc.filter(e => e.score === max);

    return result[0].word;
}

document.write(wordRank('apple SORT tros sort'));
