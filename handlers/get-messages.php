<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST');
    header("Access-Control-Allow-Headers: X-Requested-With");

try {
    $sql_connection = new PDO("mysql:host=localhost;dbname=chat-room;charset=utf8", "root", "");

    // get all the todos
    $msg = $sql_connection->query("SELECT * FROM messages");
} catch (Exception $e) {
    die("Cannot open database");
}
?>
<?php
$v = "[";
while ($data = $msg->fetch()) {
    $v = $v . "[\"" . $data["content"] . "\", \"" . $data["written_by"] . "\"],";
}
echo $v . "]"
?>