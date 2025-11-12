<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){
    require_once 'test_php_doc.php';

    $htd = new \App\test_php_doc\HTML_TO_DOC();

    $fileName = $_POST['title'].'.doc';

    $htmlContent = "<h1>{$_POST['title']}</h1> <p>{$_POST['description']}}</p>";

    $htd->createDoc($htmlContent, $fileName);

    header('Content-Type: application/msword');
    header('Content-Disposition: attachment; filename="' . $fileName . '"');
    readfile($fileName);

}


// Your code here

?>

<form method="POST">
    <input type="text" placeholder="File title" name="title" required><br/><br/>
    <textarea name="description" id="" cols="30" rows="10" placeholder="File content" required></textarea><br/>
    <input type="submit" value="Create">
</form>

</body>
</html>