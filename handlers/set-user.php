<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: X-Requested-With");

  $sql_connection = new PDO("mysql:host=localhost;dbname=chat-room;charset=utf8", "root", "");

  $name = $_GET["name"];
  $email = $_GET["email"];
  $pwd = $_GET["pwd"];

  $sql_connection->query("INSERT INTO users (name, password, email, uid) VALUES ('$name', '$pwd', '$email', NULL)")->fetch();
  echo 200;
?>