import { Link, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import { createNewEvent } from "../../utils/http.js";
import { useMutation } from "@tanstack/react-query";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../utils/http.js";
export default function NewEvent() {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      // her i make any query invalid that contains events
      // this will refetch the events
      // this is a good practice to keep the data fresh
      //  in case you add exactly the same event

      queryClient.invalidateQueries({queryKey:["events"] });
      navigate(`/events`);
    },
  });
  function handleSubmit(formData) {
    mutate({ event: formData });

  }

  return (
    <Modal onClose={() => navigate("../")}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && <p>Loading...</p>}
        {!isPending && (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        )}
      </EventForm>{" "}
      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "Failed to create event."}
        />
      )}
    </Modal>
  );
}
