<?php
require_once 'vendor/autoload.php';

use App\DB;

session_start();

if (isset($_POST['action']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    extract($_POST);

    switch ($action) {
        case 'join.chat' :
            $userCount = DB::rowCount("SELECT * FROM users WHERE username = ?", [$username]);

            if (!$userCount) {
                DB::execute("INSERT INTO users (`username`) VALUES (?)", [$username]);
            }

            $user = DB::fetch('SELECT * FROM users WHERE username = ?', [$username]);
            DB::execute('INSERT INTO room (`u_id`) VALUES (?)', [$user['id']]);

            $_SESSION['username'] = $user['username'];

            header('Location: /chatroom.php');
            break;
        case 'chat.create' :
            break;
        case 'cur.user' :
            $curUser = DB::fetchAll('SELECT * FROM users LEFT JOIN room ON users.id = room.u_id WHERE room.u_id IS NOT NULL AND users.username != ?',[$_SESSION['username']]);

            echo json_encode($curUser);
            break;
        case 'msg.create' :
            $userId = DB::fetch('SELECT * FROM users WHERE username = ?', [$username])['id'];

            DB::execute('INSERT INTO msg (`msg`,`user_id`) VALUES (?,?)', [$msg, $userId]);
            break;
        case 'msg.get' :
            $userMsg = DB::fetchAll('SELECT * FROM msg LEFT JOIN users ON msg.user_id = users.id ORDER BY msg.id ASC');
            echo json_encode($userMsg);
            break;
    }
}
