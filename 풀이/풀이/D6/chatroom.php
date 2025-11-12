<?php
require_once 'vendor/autoload.php';

session_start();

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
    <div class="w-100 h-100 d-flex">
        <div class="d-flex h-100 left fd">
            <button id="chat-btn" class="leave">Leave Chat</button>
            <h3 class="cur-user"><?= $_SESSION['username']; ?></h3>
            <button id="chat-btn">Current Users</button>
            <div class="cur-user-area"></div>
        </div>
        <div class="row-line"></div>
        <div class="right">
            <div class="msg-area">

            </div>
            <div class="chat-area d-flex">
                <input type="hidden" name="username" value="<?= $_SESSION['username'] ?>">
                <input type="text" required placeholder="Enter Message" name="msg">
                <button class="send-btn">Send</button>
            </div>
        </div>
    </div>
</div>
<script>
    const $leave = document.querySelector('.leave');
    const $send = document.querySelector('.send-btn');
    const $msg = document.querySelector('[name="msg"]');
    const $user = document.querySelector('[name="username"]');

    $leave.addEventListener('click', function () {
        location.href = '/lobby.php';
    });

    $send.addEventListener('click', async function () {
        if (!$msg.value) return;

        const formData = new FormData();
        formData.append('msg', $msg.value);
        formData.append('username', $user.value);
        formData.append('action', 'msg.create');

        await fetch('/route.php', {
            body: formData,
            method: 'post'
        });

        $msg.value = '';
        $msg.focus();
    });

    const getCurUser = () => {
        setInterval(async () => {
            const formData = new FormData();
            formData.append('action', 'cur.user');
            const curUser = await fetch('/route.php', {
                method: 'post',
                body: formData
            })
                .then(res => res.json())
                .then(data => data);

            let curUserHtml = ``;
            curUser.forEach(e => {
                curUserHtml += `<p class="cur-user">${e.username}</p>`;
            });

            document.querySelector('.cur-user-area').innerHTML = curUserHtml;
        }, 500);
    }

    const getMessage = () => {
        setInterval(async () => {
            const formData = new FormData();
            formData.append('action', 'msg.get');
            const userMsg = await fetch('/route.php', {
                method: 'post',
                body: formData,
            }).then(res => res.json())
                .then(data => data);

            let msgHtml = ``;
            userMsg.forEach(e => {
                msgHtml += `<div class="msg w-100 ${e.username === $user.value ? 'aie d-flex fd' : ''}">
                                <h3>${e.username}</h3>
                                <span>${e.msg}</span>
                            </div>`;

                document.querySelector('.msg-area').innerHTML = msgHtml;
            });
        }, 500);
    }

    getCurUser();
    getMessage();
</script>
</body>
</html>