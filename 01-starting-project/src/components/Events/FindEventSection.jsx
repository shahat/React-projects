import { useRef , useState} from "react";
import { useQuery } from "@tanstack/react-query";
import {fetchEvents} from "../../utils/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import EventItem from "./EventItem.jsx";

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  // fetch events based on the search term
  // if same seach term is searched again, the data is fetched from the cache
  // if different search term is searched, the data is fetched from the server
  // isLoading is true when the data is being fetched

  const { isLoading, isError, error,data } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    queryFn: ({signal}) => fetchEvents({signal , searchTerm}),
    enabled:  searchTerm !== undefined, // only fetch when search term is set
  });

  // once the form is submitted, the search term is set and the form is reset
  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }
  let content = <p>Please enter a search term and to find events.</p>
  if(isLoading){
    content = <LoadingIndicator />
  }
  if(isError){
    content = <ErrorBlock title="An error occurred" message={ error.info?.message || "Failed to fetch events."} />
  }
  if(data && data.length > 0){
    content = (
      <ul id="events-list">
        {data.map((event) => (
          <li key={event.id}><EventItem event={event} /></li>
        ))}
      </ul>
    )
  }

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
