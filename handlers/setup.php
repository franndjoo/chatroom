<?php
    $sql_connection = new PDO("mysql:host=localhost;dbname=chat-room;charset=utf8", "root", "");

    $sql_connection->query("CREATE TABLE users (uid int NOT NULL AUTO_INCREMENT, name text, password text, email text, PRIMARY KEY(uid))")->fetch();
    $sql_connection->query("CREATE TABLE messages (id int NOT NULL, content text, likes int, written_by varchar(30)), PRIMARY KEY(id), FOREIGN KEY(written_by_uid) references users(uid)")->fetch();
?>