const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placeRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

// Parses incoming request body, extracts JSON data, and converts it to regular JS data structures,
// and calls next automatically.
app.use(bodyParser.json());

app.use("/api/places", placeRoutes);
app.use("/api/users", userRoutes);

// Handles errors for unsupported routes.
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// If providing four parameters, Express will recognize it as an error handling middleware function.
// Only be executed on the requests that have an error.
app.use((error, req, res, next) => {
  // check if a response has already been sent
  if (res.headerSent) {
    // In this case we won't send a response, because we have already sent a response, and you can only send one response in total.
    return next(error);
  }
  // 500 as default error code
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect("mongodb+srv://Meng:ym.6549516@cluster0.6km9p.mongodb.net/places?retryWrites=true&w=majority")
  .then(() => {
    // If the connection is successful, start the backend server.
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
