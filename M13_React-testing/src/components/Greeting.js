import React , { useState } from "react";

function Greeting() {
    const [textChanged , setTextChanged] = useState(false);
  return <div>
    <h1>Hello, World!</h1>
    
    { !textChanged && <p>It's good to see you</p> }
    { textChanged && <p>changed</p>} 
    <button onClick={() => setTextChanged(true)} >Click me</button>
  </div>;
}
export default Greeting;
