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
    <link rel="stylesheet" href="http://localhost/chat-room/css/global.css" />
    <link rel="stylesheet" href="http://localhost/chat-room/css/login.css" />
    <title>ChatRoom - Signup</title>
</head>

<body style="margin:0;padding:0;">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <header style="display:flex; justify-content: space-between; align-items: center;">
        <h1 id="header-h1">🐦 ChatRoom - Signup</h1>
    </header>
    <main>
        <div style="width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;">
        <div id="login-box">
            <div>
            <h1 style="text-align: center;">Create your account</h1>
            <p style="color: red" id="error-container"></p>
            </div>
            <div style="display: flex; flex-direction: column; width: 70%;">
                <label>Name</label>
                <input type="text" placeholder="name" id="name" type="surname" />
                <br />
                <label>Email</label>
                <input type="text" placeholder="email" id="email" type="email" />
                <br />
                <label>Password</label>
                <input type="text" placeholder="password" id="pwd" type="password" required/>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; width: 90%;">
                <a href="/chat-room/login">Log in instead.</a>
                <input id="signup-invoker" type="submit" value="Sign up" />
            </div></div>
        </div>
    </main>
    <script src="http://localhost/chat-room/js/login.js?b"></script>
</body>

</html>