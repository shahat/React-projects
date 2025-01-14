import { useState , useRef } from "react";
export default function Player() {
 const [enteredPlayerName , setEngteredPlayerName] = useState('');
 const nameRef = useRef(null);
 const handleSetName = () => {
   setEngteredPlayerName(nameRef.current.value);  
   // Reset the input field after setting the name is imparrative not declarative 
  //  but its allowed to use if this way make your code easy 
   nameRef.current.value = '';
}
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName || ' unknown entity'}</h2>
      <p>
        <input ref={nameRef} type="text"/>
        <button onClick={handleSetName}>Set Name</button>
      </p>
    </section>
  );
}
