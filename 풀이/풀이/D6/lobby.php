<?php

use App\DB;

require_once 'vendor/autoload.php';
session_start();
if (isset($_SESSION['username'])) {

    $user = $_SESSION['username'];

    $userChk = DB::rowCount('SELECT * FROM users WHERE username = ?', [$user]);

    if ($userChk == 0) die;

    $u_id = DB::fetch('SELECT * FROM users WHERE username = ?', [$user])['id'];
    DB::execute('DELETE FROM room WHERE u_id = ?', [$u_id]);
}

?>

<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
<div id="layout">
    <div class="w-100 h-100">
        <div class="d-flex h-100">
            <button id="chat-btn">Join Chat</button>
            <div class="row-line"></div>
        </div>
    </div>
</div>
<form id="popup" action="route.php" method="post">
    <input type="hidden" name="action" value="join.chat">
    <h4>NickName Setting</h4>
    <div class="d-flex">
        <input type="text" name="username" required>
        <button type="submit">Join</button>
    </div>
</form>
<script>
    const $btn = document.querySelector('#chat-btn');
    const $popup = document.querySelector('#popup');

    $btn.addEventListener('click', function (e) {
        e.stopPropagation();
        $popup.style.display = 'block';
    });
</script>
</body>
</html>