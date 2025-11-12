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
$stmt = $pdo->query("SELECT `id`, `username` FROM `users` WHERE `username`='" . $_POST['username'] . "' AND `password`='" . $_POST['password'] . "'");
$user = $stmt->fetch();

/*
 * if no user is found, redirect to the login page with an error,
 * otherwise, save the info in a cookie
 */
if (!$user){
    header('Location:' . ROOT_LEVEL . 'login.php');
    exit;
} else {
    setcookie('logged_in', serialize(['id' => $user['id'], 'username' => $user['username']]), 0, '/');
    header('Location:' . ROOT_LEVEL . 'index.php');
    exit;
}

