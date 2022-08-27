import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
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

  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
