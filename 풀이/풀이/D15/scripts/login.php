<?php

/**
 * define the number of ../ to get to the root folder
 */
define('ROOT_LEVEL', '../');

/**
 * require the general functions file
 */
require(ROOT_LEVEL . 'include/functions.php');

/*
 * look up the user
 */

$pdo = dbConnect();
/*
 * my Code (SQL Injection protect)
 * */
$stmt = $pdo->prepare("SELECT * FROM `users` WHERE `username` = ?");
$stmt->execute([$_POST['username']]);
$user = $stmt->fetch();

if(!$user) echo "<script>alert('The id or password is incorrect.');history.back();</script>";
else if($user['try'] === 5) echo "<script>alert('Your account has been locked.');history.back();</script>";
else if(!password_verify($_POST['password'], $user['password'])) {
    $stmt2 = $pdo->prepare("UPDATE `users` SET `try` = ? WHERE `id` = ?");
    $stmt2->execute([$user['try'] + 1, $user['id']]);
    $user2 = $stmt2->fetch();

    $count = 5 - ($user['try'] + 1);

    echo "<script>alert('The id or password is incorrect.');history.back();</script>";
}
else {
    $pdo->prepare("UPDATE `users` SET `try` = ? WHERE `id` = ?")->execute([1, $user['id']]);
    session_start();
    $_SESSION['logged_in'] = $user['id'];
    header('Location:' . ROOT_LEVEL . 'index.php');
    exit;
}
/*
 * origin code
 * */
//$user = $stmt->fetch();
//$stmt = $pdo->query("SELECT `id`, `username` FROM `users` WHERE `username`='" . $_POST['username'] . "' AND `password`='" . $_POST['password'] . "'");


/*
 * if no user is found, redirect to the login page with an error,
 * otherwise, save the info in a cookie
 */
//if (!$user){
    /*my code*/

//    echo "<script>alert('The id or password is incorrect.');history.back();</script>";

    /*origin code*/
//    header('Location:' . ROOT_LEVEL . 'login.php');
//    exit;
//} else {
    /*
     * my code
     * */

//    setEncryptedCookie('logged_in', $user['id'], time() + 3600);

    /*
     * origin code
     * */

//    setcookie('logged_in', serialize(['id' => $user['id'], 'username' => $user['username']]), 0, '/');
//    header('Location:' . ROOT_LEVEL . 'index.php');
//    exit;
//}

