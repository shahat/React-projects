import { useRef, useState, useCallback , useEffect} from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUserPlaces , fetchUserPlaces } from "./http.js";

function App() {
  const selectedPlace = useRef();
  const [userPlaces, setUserPlaces] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);

  useEffect(() => {
    async function fetchUserPlacesHandler() {
      setIsLoading(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch user places." });
      }
      setIsLoading(false);
    }
    fetchUserPlacesHandler();
  }, []);


  // handle start remove
  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }
  // handle stop remove
  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // handle select place
  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    // after select the place update the user places
    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places",
      });
    }
  }
  // handle remove place
  //  again her i'm doing optimistic update 

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(
        userPlaces.filter((place) => place.id !== selectedPlace.current.id)
      );
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to delete place",
      });
    }
    setModalIsOpen(false);
  }, []);

  // handleClose error
  function handleCloseError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
  
   <Modal open={errorUpdatingPlaces} onConfirm={handleCloseError}>
    { errorUpdatingPlaces && <Error
     title="An error occurred!"
     message={errorUpdatingPlaces.message}
     onConfirm={handleCloseError}
   />  }
 </Modal>
  
   

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
       { error && <Error title="An error occurred!" message={error.message} />} 
       {!error && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={ isLoading}
          loadingText="Loading your places..."  
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        }
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
