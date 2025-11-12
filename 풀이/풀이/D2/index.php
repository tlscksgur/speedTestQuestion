<?php

$numbers = range(1, 40);

$factor = isset($_GET['factor']) ? $_GET['factor'] : 1;

if($factor <= 0 || $factor > 40) {
    echo "Invalid factor value!";
    exit;
}

$modifyValue = function($num) use ($factor) {
    if($num % $factor === 0 && isset($_GET['factor'])) {
        return $num . ' is a multiple of ' . $factor. '**';
    } else {
        return $num;
    }
};

$modify = array_map($modifyValue, $numbers);

$output = print_r($modify, true);
$output = str_replace('Array', 'Modified Array', $output);

echo nl2br($output);

