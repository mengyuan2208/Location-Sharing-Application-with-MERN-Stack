import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    imageUrl:
      "https://cimg9.ibsrv.net/ibimg/www.apartmentratings.com/650x350_85-1/n/5/e/N5epWBEe7zo.jpg",
    title: "Lorenzo",
    description: "My apartment!",
    address: "325 W. Adams Blvd, Los Angeles, CA 90007",
    creator: "u1",
    location: {
      lat: 34.0287216,
      lng: -118.2751453,
    },
  },
  {
    id: "p2",
    imageUrl:
      "https://cdn.cnn.com/cnnnext/dam/assets/191112141459-01-university-of-southern-california-campus-file.jpg",
    title: "University of Southern California",
    description: "My school!",
    address: "3551 Trousdale Pkwy, Los Angeles, CA 90007",
    creator: "u2",
    location: {
      lat: 34.0223563,
      lng: -118.2873057,
    },
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form">
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at leat 5 charactes)."
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
