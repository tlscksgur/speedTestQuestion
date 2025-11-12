<?php

$root = '/XX_module_a/D5/media';
$images = ['/image1.jpg', '/image2.jpg', '/image3.jpg', '/image4.jpg', '/image5.png'];

$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);
if($request_uri[0] === $root.$images[0] || $request_uri[0] === $root.$images[1] || $request_uri[0] === $root.$images[2] || $request_uri[0] === $root.$images[3] || $request_uri[0] === $root.$images[4]) {
    include_once 'image.php';
} else {
    echo 'image not found';
}
