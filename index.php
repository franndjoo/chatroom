<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://localhost/chat-room/css/global.css?a" />
    <link rel="stylesheet" href="http://localhost/chat-room/css/feed.css?b" />
    <title>ChatRoom</title>
</head>

<body style="margin:0;padding:0;">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <header style="display:flex; justify-content: space-between; align-items: center;">
        <h1 id="header-h1">🐦 ChatRoom</h1>
        <input type="submit" value="Log out" id="popup-invoker" />
    </header>
    <main>
        <div id="messages">
            <h2>Feed</h2>
        </div>
        <div id="message-editor">
            <textarea rows="7" type="text" value="" placeholder="Write your message here." id="message-editor__texter"></textarea>
            <br />
            <input type="submit" value="Send" id="message-editor__sender" />
        </div>
    </main>
    <script src="http://localhost/chat-room/js/index.js?c"></script>
</body>

</html>