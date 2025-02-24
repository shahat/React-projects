import  { OpinionsContext } from "../store/opinions-context";
import {use , useActionState  , useOptimistic} from "react";
export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const {upvoteOpinion, downvoteOpinion} = use(OpinionsContext);

  async function handleUpvote() {
    await upvoteOpinion(id);
  }
  async function handleDownvote() {
    await downvoteOpinion(id);
  }
  const [downVoteFormState , downVoteFormAction , downVoteFormActionPending] =  useActionState(handleDownvote);

  const [upVoteFormState , upVoteFormAction , upVoteFormActionPending] =  useActionState(handleUpvote); 

  const [optimisticVotes, setVotesOptimistically] = useOptimistic(votes, (prevVotes, mode) => (mode === "up" ? prevVotes + 1 : prevVotes - 1));

async function handleUpvote() {
  setVotesOptimistically("up");
  await upvoteOpinion(id);
}
async function handleDownvote() {
  setVotesOptimistically("down");
  await downvoteOpinion(id);
}

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upVoteFormAction} disabled={downVoteFormActionPending || upVoteFormActionPending } >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button 
        formAction={downVoteFormAction} disabled={downVoteFormActionPending || upVoteFormActionPending } >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
