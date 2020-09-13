import path from "path";
import express from "express";
import fetch from "node-fetch";

const app = express();
const port = 4000;

app.use(express.static("public"));

app.get("/api/map", (req, res) => {
  res.sendFile("california_map.json", {
    root: path.resolve(),
    headers: {
      "content-type": "application/json",
    },
  });
});

app.get("/api/db", (req, res) => {
  res.sendFile("model_output.json", {
    root: path.resolve(),
    headers: {
      "content-type": "application/json",
    },
  });
});

app.get("/api/incident", (req, res) => {
  fetch("https://www.fire.ca.gov/umbraco/api/IncidentApi/List?inactive=false")
    .then(
      (response) => response.json(),
      (rej) => res.sendStatus(500)
    )
    .then(
      (obj) => res.json(obj),
      (rej) => res.sendStatus(500)
    );
});

app.listen(port, () => {
  console.log("CalGuard started.");
});
