import { useActionState , use} from "react";
import  { OpinionsContext } from "../store/opinions-context";
import  Submit  from "./Submit.jsx";
export function NewOpinion() {
  
  
  
  const { addOpinion } = use(OpinionsContext);
  
  async function submitOpinin(preFromState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");
    let errors = [];
    if (title.trim().length < 5) {
      errors.push("Please enter a title with at least 5 characters.");
    }
    if (body.trim().length < 5 || body.trim().length > 300) {
      errors.push("Openion must be between 5 and 300 characters.");
    }
    if (!userName.trim()) {
      errors.push("Please enter your name ");
    }
    if (errors.length > 0) {
      return { errors, enteredValues: { userName, title, body } };
    }
    await addOpinion({ userName, title, body });

    return { errors: null };
  }
  const [formData, formAction] = useActionState(submitOpinin, { errors: null });
  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formData.enteredValues?.userName}
            />
          </p>
          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formData.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formData.enteredValues?.body}
          ></textarea>
        </p>
        {formData.errors && (
          <ul className="errors">
            {formData.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
       <Submit />
      </form>
    </div>
  );
}
