<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Convert code 64 to image</title>
</head>
<body>


<form method="POST">
    <textarea name="code" required placeholder="CODE64"></textarea>
    <input type="submit" value="Convert">
</form>

<?php

if (isset($_POST['code'])) {
    $image_data = base64_decode($_POST['code']);
    $directory = __DIR__ . '/img/';
    if (!file_exists($directory)) {
        mkdir($directory);
    }

    file_put_contents(__DIR__ . '/img/image'.time().'.png', $image_data);
}

?>

</body>
</html>