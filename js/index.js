// this is the session ID, it's gonna be used as long as the session storage is not erased
// the session ID cannot be set more than one time.
let customID = sessionStorage.getItem("sessionID");

// hide the message editor if no user is logged in
if (customID === null)
  $("#message-editor").html("<p>Log in to send messages</p>");

// this function continuously checks for username editor integrity
function usernameEditorIntegrity() {
  // change the text on the popup invoker if no user is logged in (customID = null)
  if (customID === null) $("#popup-invoker").attr("value", "Login/Signup");
  // setup a listener for the popup invoker
  document.getElementById("popup-invoker").onclick = function (ev) {
    // if the user is not logged in, it redirects to the login page
    if (customID === null) {
      window.location.assign("/chat-room/login");
    } else {
      sessionStorage.clear();
      window.location.reload();
    }
  };
}
usernameEditorIntegrity();

if (customID !== null) {
  // setup a listener in the message editor
  document.getElementById("message-editor__sender").onclick = function (ev) {
    // get the content of the linked input
    const inputData = document.getElementById("message-editor__texter").value;
    // clear the input data
    document.getElementById("message-editor__texter").value = "";
    // sends the input to the database if there is no corrupted data in there
    fetch(
      "http://localhost/chat-room/handlers/new-message.php?msg=" +
        btoa(inputData) +
        "&frm=" +
        btoa(customID)
    );
  };
}

// setup an interval which merges new messages with the existing ones
// by rendering them on the page
let loadedMessagesNumber = 0;
setInterval(() => {
  fetch("http://localhost/chat-room/handlers/get-messages.php").then(
    async (res) => {
      // parse the data returned by this query to use it later.
      // the data is expected to be formatted as [str, str][]
      const parsedData = JSON.parse((await res.text()).replace(",]", "]"));

      // if the number of messages loaded by this snapshot is not the same as the
      // number of loaded messages currently, all the messages not loaded from the
      // number of loaded messages to the current number of messages are rendered
      // and the `loadedMessagesNumber` value is updated.
      if (loadedMessagesNumber < parsedData.length) {
        const protectedLength = parsedData.length;
        const messagesToRender = parsedData.splice(loadedMessagesNumber);
        loadedMessagesNumber = protectedLength;

        messagesToRender.forEach((message) => {
          //parses all the values that will be rendered here
          const messageContent = atob(message[0]);
          let messageSender = atob(message[1]);

          // Asks the server if the user can be authenticated or not
          fetch(
            "http://localhost/chat-room/handlers/get-user-by-email.php?target_email=" +
              messageSender
          ).then(async (res) => {
            const readStream = JSON.parse(
              (await res.text()).replace(",]", "]")
            );
            messageSender = readStream[0][0];

            // empty messages are skipped
            if (messageContent === "") return;
            const messageContainer = document.createElement("div");

            // create a custom element to render with the content of the message
            // and the sender. This step is needed because the message cannot be
            // pushed into the DOM in an HTML Element otherwise.
            const messageEl = document.createElement("p");
            messageEl.textContent = messageContent;
            messageEl.style.width = messageContent.length * 11 + "px";

            // create a custom element to show the sender of the message
            const senderEl = document.createElement("p");
            senderEl.textContent = messageSender;

            // those freshly created elements are pushed to the DOM to be rendered.
            messageContainer.appendChild(messageEl);
            messageContainer.appendChild(senderEl);
            document.getElementById("messages").appendChild(messageContainer);
          });
        });
      }
    }
  );
}, 1000);
