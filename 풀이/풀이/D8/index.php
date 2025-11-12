<?php
$result = null;
if (isset($_GET['red']) && isset($_GET['green']) && isset($_GET['blue'])) {
    $result = sprintf('#%02X%02X%02X', $_GET['red'], $_GET['green'], $_GET['blue']);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>RGB to HEX</title>
</head>

<body>
<h4>RGB to HEX</h4>

<form>
    <label for="red">Red:
        <input type="text" name="red" id="red">
    </label>

    <label for="green">Green:
        <input type="text" name="green" id="green">
    </label>

    <label for="blue">Blue:
        <input type="text" name="blue" id="blue">
    </label>

    <input type="submit"/>
</form>

<p>Hexadecimal: <?= !$result ? '#' : $result ?></p>
</body>

</html>