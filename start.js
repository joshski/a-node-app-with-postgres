const express = require("express");
const pgp = require("pg-promise")();

const databaseURL = process.env.DATABASE_URL;
const port = process.env.PORT;

if (!databaseURL || !port) {
  throw new Error("PORT and DATABASE_URL environment variables are required");
}

const db = pgp(databaseURL);

const app = require("express")();

app.get("/", function(request, response) {
  console.log(new Date() + " GET /");
  db.one("SELECT $1 AS value", 123)
    .then(function(data) {
      response.status(200).send("Easy as " + data.value);
    })
    .catch(function(error) {
      console.log("ERROR:", error);
    });
});

app.listen(port, function(err) {
  if (err) {
    console.error(err);
    process.exit(666);
  } else {
    console.log("Listening on http://localhost:" + port);
  }
});
