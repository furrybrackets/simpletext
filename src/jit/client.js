/*
SimpleText Web Client
Copyright (C) 2022 Peter Johnson
*/

if (__GLOBALS__.debug) {
  console.log("Loading jit/client.js");
}

const socket = new WebSocket("ws://localhost:" + __GLOBALS__.websport);

socket.addEventListener("open", function (event) {
  if (__GLOBALS__.debug) {
    console.debug(`Connected to server at ${__GLOBALS__.websport}`);
  }
});

socket.addEventListener("message", function (event) {
  if (__GLOBALS__.debug) {
    console.debug(`Received message: ${event.data}`);
  }
  if (event.data === "UPDATE") {
    window.location.reload(); // Reload page
  }
});
