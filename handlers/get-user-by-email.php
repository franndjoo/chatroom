<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");

try {
    $sql_connection = new PDO("mysql:host=localhost;dbname=chat-room;charset=utf8", "root", "");

    $target_email = $_GET["target_email"];
    // get every user with it's email adress
    $users = $sql_connection->query("SELECT * FROM users WHERE users.email = '$target_email'");
} catch (Exception $e) {
    die($e);
}
?>
<?php
$v = "[";
while ($data = $users->fetch()) {
    $v = $v . "[\"" . $data["name"] . "\", \"" . $data["email"] . "\", \" .  . \"],";
}
echo $v . "]"
?>