<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = [];
    if (file_exists('log.json')) {
        $json = json_decode(file_get_contents('log.json'), true);
    }

    $new_data = ['name' => $_POST['name'], 'content' => $_POST['content'], 'date' => date('Y-m-d')];
    $json[] = $new_data;

    file_put_contents('log.json', json_encode($json, JSON_PRETTY_PRINT));
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<style>
    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    main {
        width: 600px;
        display: flex;
        flex-direction: column;
    }

    .f {
        display: flex;
    }

    .fd {
        flex-direction: column;
    }

    .jcc {
        justify-content: center;
    }

    .aic {
        align-items: center;
    }
</style>
<main>
    <h1>Board</h1>
    <form class="f fd" method="post">
        <input type="text" name="name" placeholder="name" required>
        <hr>
        <textarea name="content" cols="30" rows="10" required placeholder="content"></textarea>
        <hr>
        <button type="submit">Submit</button>
    </form>
    <h2>List</h2>
    <?php if (empty($json)) { ?>
        <p>empty</p>
    <?php } else { ?>
        <table border="1">
            <thead>
            <tr>
                <th>Name</th>
                <th>Content</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            <?php foreach($json as $item) { ?>
                <tr>
                    <td><?= $item['name'] ?></td>
                    <td><?= $item['content'] ?></td>
                    <td><?= $item['date'] ?></td>
                </tr>
            <?php } ?>
            </tbody>
        </table>
    <?php } ?>
</main>
</body>
</html>