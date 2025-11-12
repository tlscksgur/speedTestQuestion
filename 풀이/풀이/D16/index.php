<?php
date_default_timezone_set('Asia/Seoul');

if(!isset($_GET['body'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request body']);
} else {
    header('Content-type: application/json');
    $fileName = date('H,i,s') . '-request.txt';

    $directory = 'store/';

    if(!file_exists($directory)) {
        mkdir($directory);
    }

    $file = file_put_contents('store/'.$fileName, json_encode($_GET['body']), JSON_PRETTY_PRINT);

    echo json_encode(['body' => $_GET['body']],JSON_PRETTY_PRINT);
}


