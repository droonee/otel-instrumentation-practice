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
      path: "/goodbyeworld",
    },
    (response) => {
      const body = [];
      response.on("data", (chunk) => body.push(chunk));
      response.on("end", () => {
        console.log(body.toString());
      });
    }
  );

  setTimeout(() => {
    console.log("Client operation complete.");
  }, 5000);
}

makeRequest();
