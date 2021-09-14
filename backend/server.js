import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "./data.js";

const app = express();

app.get("/", (request, response) => {
  response.send("Server is ready");
});

app.get(
  "/api/moonData/seed",
  expressAsyncHandler(async (request, response) => {
    response.status(200).send(data);
  })
);

app.use((error, request, response, next) => {
  response.status(500).send({
    message:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
