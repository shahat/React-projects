import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, handleStop, timeRemaining, handleRestTimeRemaining },
  ref
) {
  const uLost = timeRemaining <= 0;

  const internalRef = useRef();
  const formatedRemainingTime = timeRemaining / 1000;
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => ({
    //   this open method can be accessed directly from the parent
    open() {
      internalRef.current.showModal();
    },
  }));
  return createPortal(
    <dialog ref={internalRef} className="result-modal">
      {uLost ? <h2> You lost</h2> : <h2> Your score {score} </h2>}
      <p>
        {" "}
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer<strong>{formatedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog">
        <button
          type="submit"
          onSubmit={() => {
            handleStop;
            handleRestTimeRemaining;
          }}>
          Close
        </button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
