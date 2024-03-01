"use strict";

const http = require("http");

function startServer(port) {
  const server = http.createServer(handleRequest);
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Node HTTP listening on ${port}`);
  });
}

function handleRequest(request, response) {
  const body = [];
  request.on("error", (err) => console.log(err));
  request.on("data", (chunk) => body.push(chunk));
  request.on("end", () => {
    response.end("Server response.");
  });
}

startServer(8080);
