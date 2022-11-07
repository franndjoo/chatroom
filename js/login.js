// Cross page file made for the login and signup page, made to handle both actions
$("#login-invoker").on("click", () => {
  // Asks the server if the user can be authenticated or not
  fetch(
    "http://localhost/chat-room/handlers/auth-user.php?email=" +
      $("#email").val() +
      "&pwd=" +
      $("#pwd").val()
  )
    .then(async (res) => {
      const result = parseInt(await res.text());

      if (result > 0) {
        sessionStorage.setItem("sessionID", $("#email").val());
        window.location.assign("/chat-room");
      } else $("#error-container").text("Incorrect email or password.");
    })
    .catch((e) => console.error(e));
});

$("#signup-invoker").on("click", () => {
  // Asks the server if the user can be authenticated or not
  fetch(
    "http://localhost/chat-room/handlers/get-user-by-email.php?target_email=" +
      $("#email").val()
  ).then(async (res) => {
    const readStream = await res.text();

    // parse the stream and determines it's length, if the length is 0
    // it means that no user exists with this email and the account
    // creation is allowed, otherwise an error is shown to the user
    if (JSON.parse(readStream.replace(",]", "]")).length === 0) {
      fetch(
        "http://localhost/chat-room/handlers/set-user.php?email=" +
          $("#email").val() +
          "&pwd=" +
          $("#pwd").val() +
          "&name=" +
          $("#name").val()
      ).then(() => {
        window.location.assign("/chat-room/login");
      });
    } else
      $("#error-container").text("Another account uses this email address.");
  });
});
