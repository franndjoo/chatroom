<?php
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET, POST');
  header("Access-Control-Allow-Headers: X-Requested-With");

  $sql_connection = new PDO("mysql:host=localhost;dbname=chat-room;charset=utf8", "root", "");

  $msg = $_GET["msg"];
  $from = $_GET["frm"];

  $sql_connection->query("INSERT INTO messages (content, written_by, id) VALUES ('$msg', '$from', NULL)")->fetch();
  echo 200;
?>