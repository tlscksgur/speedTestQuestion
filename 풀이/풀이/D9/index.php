<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<textarea name="content" cols="30" rows="10"></textarea>
<button id="sort-btn">sort</button>
<script>
    const $btn = document.getElementById('sort-btn');
    const $text = document.querySelector('[name="content"]');

    let number = [];

    $btn.addEventListener('click', function() {
        number = [];
        JSON.stringify($text.value).split('\\n').forEach(e => {
            e = e.replace(/[^0-9]/, '');
            number.push(parseInt(e));
        });
        const filter = number.filter(e => Number.isInteger(e));
        const sort = filter.map(e => e / 2).sort((a, b) => a - b);
        const text = sort.join('\n');
        $text.value = text;
    });
</script>
</body>
</html>