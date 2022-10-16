// if the session storage doesn't contains any sessionID token, a new one is created.
if (sessionStorage.getItem("sessionID") === null)
  sessionStorage.setItem(
    "sessionID",
    Math.floor(Math.random() * 1000) + "-Anonymous"
  );

// this is the session ID, it's gonna be used as long as the session storage is not erased
// the session ID cannot be set more than one time.
let customID = sessionStorage.getItem("sessionID");

// set the value to the popup input to the current custom ID
document
  .getElementById("username-editor__texter")
  .setAttribute("value", customID);
// this function continuously checks for username editor integrity
function usernameEditorIntegrity() {
  // disables the username editor if the name has already been customed
  if (!customID.endsWith("-Anonymous")) {
    document.getElementById("popup-invoker").style.setProperty("visibility", "hidden");
    document.getElementById("popup").style.setProperty("visibility", "hidden");
    document.getElementById("username-editor__sender").onclick = undefined;
    document
      .getElementById("username-editor__texter")
      .setAttribute("disabled", true);
    document
      .getElementById("username-editor__sender")
      .setAttribute("disabled", true);
  } else {
    // setup a listener for the popup invoker
    document.getElementById("popup-invoker").onclick = function (ev) {
      document.getElementById("popup").style.setProperty("visibility", "visible");
    }
    // setup a listener in the username editor
    document.getElementById("username-editor__sender").onclick = function (ev) {
      // get the content of the linked input
      const inputData = document.getElementById("username-editor__texter").value;
      // performs only if the input is not empty
      if(inputData === "" || inputData === " ") return;

      // clear the input data
      document.getElementById("username-editor__texter").value = "";
      // changes the username
      document.getElementById("popup").style.setProperty("visibility", "hidden");
      sessionStorage.setItem("sessionID", inputData);
      customID = inputData;
      usernameEditorIntegrity();
    };
  }
  
}
usernameEditorIntegrity();

// setup a listener in the message editor
document.getElementById("message-editor__sender").onclick = function (ev) {
  // get the content of the linked input
  const inputData = document.getElementById("message-editor__texter").value;
  // clear the input data
  document.getElementById("message-editor__texter").value = "";
  // sends the input to the database if there is no corrupted data in there
  fetch(
    "http://192.168.1.35/chat-room/handlers/new-message.php?msg=" +
      btoa(inputData) +
      "&frm=" +
      btoa(customID)
  );
};

// setup an interval which merges new messages with the existing ones
// by rendering them on the page
let loadedMessagesNumber = 0;
setInterval(() => {
  fetch("http://192.168.1.35/chat-room/handlers/get-messages.php").then(
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
          const messageSender =
            atob(message[1]) === customID ? "Vous(" + customID + ")" : atob(message[1]);

          // empty messages are skipped
          if (messageContent === "") return;

          // create a custom element to render with the content of the message
          // and the sender. This step is needed because the message cannot be
          // pushed into the DOM in an HTML Element otherwise.
          const messageEl = document.createElement("p");
          messageEl.textContent = messageContent;
          messageEl.style.width =
            messageContent.length * 11 + "px";
          messageEl.classList.add(messageSender.startsWith("Vous(") ? "custom" : "_");

          // create a custom element to show the sender of the message
          const senderEl = document.createElement("p");
          senderEl.textContent = messageSender;
          senderEl.classList.add(messageSender.startsWith("Vous(") ? "custom" : "_");
          senderEl.classList.add("sender__container");

          // those freshly created elements are pushed to the DOM to be rendered.
          document.getElementById("messages").appendChild(messageEl);
          document.getElementById("messages").appendChild(senderEl);
        });
      }
    }
  );
}, 1000);
