import {useState , useEffect} from "react";

export default function ProgressBar({ time }) {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const interval = onInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);
  return <progress value={remainingTime} max={time} />;
}
