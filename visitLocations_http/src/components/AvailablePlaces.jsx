import Places from "./Places.jsx";
import { useEffect, useState } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { featchAvalablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      try {
      //  get the avalable places
        const data = await featchAvalablePlaces();
      //  get the user location 
        navigator.geolocation.getCurrentPosition((position) => {
        const sortedPlaces = sortPlacesByDistance(
          data,
          position.coords.latitude,
          position.coords.longitude
        );
        
        setAvailablePlaces(sortedPlaces);
        setIsLoading(false);
          });
      } catch (error) {
        setError({ message: error.message || "Failed to fetch places" });
      }
      setIsLoading(false);
    };
    fetchPlaces();
  }, []);

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
