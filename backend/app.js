const express = require("express");
const bodyParser = require("body-parser");

const placeRoutes = require("./routes/places-routes");

const app = express();

app.use("/api/places", placeRoutes);

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

app.listen(5000);
