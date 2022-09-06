const express = require("express");

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Lorenzo",
    description: "My apartment!",
    location: {
      lat: 34.0287216,
      lng: -118.2729566,
    },
    address: "325 W Adams Blvd, Los Angeles, CA 90007",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  // didn't find a place
  if (!place) {
    const error = new Error("Could not find a place for the provided id.");
    error.code = 404;
    // This will trigger the error handling middleware.
    throw error;
  }

  res.json({ place }); // { place } expands to { place: place }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    const error = new Error("Could not find a place for the provided user id.");
    error.code = 404;
    // Use return to make sure the following code doesn't run.
    return next(error);
  }
  res.json({ place }); // { place } expands to { place: place }
});

module.exports = router;
