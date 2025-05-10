import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../Header.jsx";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, deleteEvent } from "../../utils/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { queryClient } from "../../utils/http.js";
import Modal from "../UI/Modal.jsx";
export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigator = useNavigate();
  let content;
  let formatedDate;

  // #####################################
  // Delete event
  // #####################################

  function handleStartDelete() {
    setIsDeleting(true);
  }

  // #####################################
  // handle stop delete
  // #####################################
  function handleDelete() {
    mutate({ id });
  }

  // #####################################
  // handle start delete
  // #####################################
  function handleStopDelete() {
    setIsDeleting(false);
  }

  // #####################################
  // Handel Get event details
  // #####################################
  const { data, isError, isPending, error } = useQuery({
    queryKey: ["event", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });

  // ####################################
  // handle Wich content to show
  // ####################################
  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p> Fetching event details... </p>
      </div>
    );
  }
  // if featching the details contains some error ?
  if (isError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="fiald to load events"
          message={error.info?.message || "Failed to fetch events."}
        />
      </div>
    );
  }
  if (data) {
    formatedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {data.date} @ {formatedDate}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>{" "}
        );
      </>
    );
  }

  // #####################################.

  // Delete the event with react-query
  // #####################################
  const {
    mutate,
    isPending: isPendingError,
    isError: isDeleteingError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });

      navigator("/events");
    },
  });

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h1>Are you sure?</h1>
          <p>Do you really want to delete this event?</p>
   <div className="form-actions">
          {!isPendingError && (
         <> <button className="button-text" onClick={handleStopDelete}>
                Cancel
              </button>
              <button className="button" onClick={handleDelete}>
                Delete
              </button>
         </>
             
          
          )}

          {isPendingError && <p className="center">Deleting event...</p>}
           </div> {isDeleteingError && (
            <ErrorBlock
              title="fiald to delete event"
              message={deleteError.info?.message || "Failed to delete event."}
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
