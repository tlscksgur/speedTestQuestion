<?php

$watermark_text = 'WorldSkills';
$font_size = 20;

$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);

$root = explode('/XX_module_a/D5/media', $request_uri[0])[1];
$image_src = 'images'.$root;


$image = imagecreatefromjpeg($image_src);
$font_color = imagecolorallocate($image, 255, 255, 255);

$bbox = imagettfbbox($font_size, 0, 'arial.ttf', $watermark_text);
$text_width = $bbox[2] - $bbox[0];
$text_height = $bbox[7] - $bbox[1];
$text_x = imagesx($image) - $text_width - 10;
$text_y = imagesy($image) - $text_height - 30;

imagettftext($image, $font_size, 0, $text_x, $text_y, $font_color, 'arial.ttf', $watermark_text);

header('Content-Type: image/jpeg');
imagejpeg($image);

imagedestroy($image);