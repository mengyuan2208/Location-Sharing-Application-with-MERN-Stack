// middleware functions
const uuid = require("uuid");

const HttpError = require("../models/http-error");

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  // didn't find a place
  if (!place) {
    // This will trigger the error handling middleware.
    throw new HttpError("Could not find a place for the provided id.", 404);
  }

  res.json({ place }); // { place } expands to { place: place }
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    // Use return to make sure the following code doesn't run.
    return next(
      new HttpError("Could not find a place for the provided user id.", 404)
    );
  }
  res.json({ place }); // { place } expands to { place: place }
};

const createPlace = (req, res, next) => {
  // Data is encoded in the post request body.
  const { title, description, coordinates, address, creator } = req.body; // shortcut for const title = req.body.title;
  const createdPlace = {
    id: uuid.v4(),
    title, // shortcut for title: title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace }); // normal code if something was successfully created on the server
};

// export multiple thins
exports.getPlaceById = getPlaceById; //don't execute it, just want to export a pointer to the function
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
