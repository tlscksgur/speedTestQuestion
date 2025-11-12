<?php

$postData = $_POST['page'];

$data = json_decode(file_get_contents('test_data1.json'), true);

$range = 5;

$slice = array_slice($data,0, $range * $postData);

echo json_encode($slice);
