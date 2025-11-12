<?php

/**
 * This function checks to see if a user is logged in and will
 * redirect to the login page if required.
 */
session_start();
function checkLogin(){
//    if (!$_COOKIE['logged_in']){
    if(!$_SESSION['logged_in']) {
        header('Location:' . ROOT_LEVEL . 'login.php');
        exit;
    }
//    }
}

/**
 * This method attempts to connect to the database and returns a PDO
 * connection object.
 *
 * @return PDO
 */
function dbConnect(){
    try{
        $pdo = new PDO(
            'mysql:host=localhost;dbname=d15;charset=utf8',
            'root', '0000');
        return $pdo;
    } catch (Exception $e){
        die($e->getMessage());
    }
}

/**
 * This function returns an array of information about the user who
 * is logged in.
 *
 * @return mixed
 */
function userInfo(){
//    return unserialize($_COOKIE['logged_in']);
    return $_SESSION['logged_in'];
}


/*
 * my Code (cookie protect)
 * */

/* my secret key */
//$encryptionKey = 'Hyeonbin Son';
//$iv = openssl_random_pseudo_bytes(16);
//function setEncryptedCookie($name, $value, $expiry) {
//    global $encryptionKey, $iv;
//    $encryptedValue = openssl_encrypt($value, 'AES-256-CBC', $encryptionKey, 0, $iv);
//    setcookie($name, base64_encode($iv . $encryptedValue), $expiry, '/');
//}
//
//function getDecryptedCookie($name) {
//    global $encryptionKey;
//    if (isset($_COOKIE[$name])) {
//        $data = base64_decode($_COOKIE[$name]);
//        $iv = substr($data, 0, 16);
//        $encryptedValue = substr($data, 16);
//        return openssl_decrypt($encryptedValue, 'AES-256-CBC', $encryptionKey, 0, $iv);
//    }
//    return null;
//}