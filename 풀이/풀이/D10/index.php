<?php
$result = null;
    if(isset($_GET['text'])) {
        $result = preg_replace('/[0-9]/', '', $_GET['text']);
    }
?>

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
<form>
    <input type="text" name="text">
    <button type="submit">Submit</button>
</form>
<p>result : <?= $result ?></p>
</body>
</html>


