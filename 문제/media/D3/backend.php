<?php

$host = "127.0.0.1";
$port = "3306";
$username = "root";
$password = "0000";
$database = "d3";

$connection = new PDO("mysql:host=$host;port=$port;dbname=$database", $username, $password);
$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $connection->prepare("SELECT * FROM tictactoe");
$stmt->execute();
$rowCount = $stmt->rowCount();
$fetchAll = $stmt->fetchAll();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!$rowCount) {
        $id = 0;
        for ($y = 0; $y < 3; $y++) {
            for ($x = 0; $x < 3; $x++) {
                $id++;
                $sql = "INSERT INTO tictactoe (id, x, y, `check`, `player`, `computer`) VALUES ($id, $x, $y, 0,0,0)";
                $connection->exec($sql);
            }
        }
    }
    echo json_encode($fetchAll);
} else {
    extract($_POST);
    foreach(json_decode($data) as $item) {
        $sql = "UPDATE tictactoe SET `check` = $item->check, `player` = $item->player, `computer` = $item->computer WHERE id = $item->id";
        $connection->exec($sql);
    }
}

