"use strict";

const http = require("http");

function makeRequest() {
  http.get(
    {
      host: "localhost",
      port: 8080,
      path: "/helloworld",
    },
    (response) => {
      const body = [];
      response.on("data", (chunk) => body.push(chunk));
      response.on("end", () => {
        console.log(body.toString());
      });
    }
  );
  http.get(
    {
      host: "localhost",
      port: 8080,
      path: "/pathtosomething",
    },
    (response) => {
      const body = [];
      response.on("data", (chunk) => body.push(chunk));
      response.on("end", () => {
        console.log(body.toString());
      });
    }
  );

  console.log("Client operation complete.");
}

makeRequest();
