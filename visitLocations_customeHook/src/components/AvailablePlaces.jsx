import Places from "./Places.jsx";
import { useEffect, useState } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { featchAvalablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";


async function handleFeatchAvalablePlaces() {
  const places = await featchAvalablePlaces();
  // why me have to make promise her because the useFetch function wait for a promise
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    fetchedData: availablePlaces,
    isFetching: isLoading,
    error,
    setFetchedData: setAvailablePlaces,
    setIsFetching: setIsLoading,
    setError: setError
  } = useFetch(handleFeatchAvalablePlaces, []);


  if (error) {
    return <Error title="Error" message={error.message} />;
  }
  return (
    <Places
      isLoading={isLoading}
      loadingText="Fetching place data..."
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
