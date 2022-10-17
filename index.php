<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://localhost/chat-room/css/global.css" />
    <title>Chat Room</title>
</head>

<body style="margin:0;padding:0;">
    <header style="display:flex; justify-content: space-between; align-items: center;">
        <h1 id="header-h1">ChatRoom/🌍</h1>
        <p id="popup-invoker" style="cursor:pointer;margin-right:2%;">Edit username</p>
    </header>
    <main>
        <div id="messages"></div>
        <div id="message-editor">
            <input type="text" value="" placeholder="Write your message here." id="message-editor__texter" />
            <input type="submit" value="Send" id="message-editor__sender" />
        </div>
    </main>
    <popup id="popup">
        <div>
            <h2>Username switcher</h2>
            <input type="text" value="" placeholder="Write your username here." id="username-editor__texter" />
            <input type="submit" value="Change" id="username-editor__sender" />
            <p style="text-align:center">Choose your new username well, it's the only time you'll be able to change it.</p>
        </div>
    </popup>
    <script src="http://localhost/chat-room/js/index.js?b"></script>
</body>

</html>