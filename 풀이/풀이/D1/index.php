<?php

$csvFile = 'actualAnswers.csv';

$fileHandle = fopen($csvFile, 'r');

$actual = [];
while (($row = fgetcsv($fileHandle)) !== false) {
    $actual[] = $row;
}

fclose($fileHandle);

$csvFile = 'submittedAnswers.csv';

$fileHandle = fopen($csvFile, 'r');
$answer = [];
while (($row = fgetcsv($fileHandle)) !== false) {
    $answer[] = $row;
}

fclose($fileHandle);

$point = 0;

for($i = 0; $i < count($actual); $i++) {
    if($actual[$i] === $answer[$i]) $point++;
}

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<table border="1">
    <thead>
    <tr>
        <th>Question</th>
        <th>Actual Answer</th>
        <th>Submitted Answer</th>
    </tr>
    </thead>
    <tbody>
    <?php for ($i = 0; $i < count($actual); $i++) { ?>
        <tr>
            <td><?= $i + 1 ?></td>
            <td><?= explode('"', json_encode($actual[$i][0]))[1] ?></td>
            <td><?= explode('"', json_encode($answer[$i][0]))[1] ?></td>
        </tr>
    <?php } ?>
    </tbody>
</table>
<p>Score : <?= $point ?> / <?= count($answer) ?></p>
</body>
</html>
