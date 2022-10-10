// routes only
const express = require("express");

const HttpError = require("../models/http-error");

const router = express.Router();

const placesControllers = require("../controllers/places-controller");

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlaceByUserId);

module.exports = router;
