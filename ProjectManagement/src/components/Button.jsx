import React from "react";
function Button({ children , ...props}) {
  return (
    <button className="  text-left px-2 py-1 rounded-md   hover:text-stone-200
     bg-stone-700 text-stone-400  hover:bg-stone-800" {...props}>
      {children}
    </button>
  );
}
export default Button;
