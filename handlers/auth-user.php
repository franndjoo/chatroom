<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

$sql_connection = new PDO("mysql:host=localhost;dbname=chat-room;charset=utf8", "root", "");

$email = $_GET["email"];
$pwd = $_GET["pwd"];

$result = $sql_connection->query("SELECT uid FROM users WHERE email = '$email' and password = '$pwd'");

// determines the number of account founds, should be 0 or 1
$count = 0;
while ($data = $result->fetch()) {
    $count += 1;
}
echo $count;
?>