<?php

namespace App;

class DB
{

    private static function connection()
    {
        $connection = new \PDO('mysql:host=localhost;dbname=d6', 'root', '0000');
        $connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        return $connection;
    }

    public static function execute($sql, $arr = null)
    {
        $stmt = self::connection()->prepare($sql);
        $stmt->execute($arr);
        return $stmt;
    }

    public static function fetch($sql, $arr = null)
    {
        return self::execute($sql, $arr)->fetch();
    }

    public static function fetchAll($sql, $arr = null)
    {
        return self::execute($sql, $arr)->fetchAll();
    }

    public static function rowCount($sql, $arr = null)
    {
        return self::execute($sql, $arr)->rowCount();
    }

}