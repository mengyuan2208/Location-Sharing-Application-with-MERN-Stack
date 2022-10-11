// middleware functions
const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");

let DUMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (!places || places.length === 0) {
    // Use return to make sure the following code doesn't run.
    // next() doesn't automatically stop the function. throw does.
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }
  res.json({ places }); // { place } expands to { place: place }
};

const createPlace = async (req, res, next) => {
  // Data is encoded in the post request body.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // throw will not work correctly with async
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body; // shortcut for const title = req.body.title;

  // handle error when using async await
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

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

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const placeId = req.params.pid;
  const { title, description } = req.body;

  // ... creates a new object and copies all key-value pairs
  // the constant stores the address of the object, not the object itself
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  // Filter runs the given function on every element in DUMMY_PLACES.
  // If it returns true, we keep the place in the newly returned array.
  // If it returns false, we drop it.
  // The original array is not touched.
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

// export multiple things
exports.getPlaceById = getPlaceById; //don't execute it, just want to export a pointer to the function
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;
