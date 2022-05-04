import { useEffect, useState } from "react";

function Timer() {
  const [isClicked, setIsClicked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const intervalId = setInterval(() => {
      isClicked && timeLeft > 0 && setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft, isClicked]);

  const startFiveMinTimer = () => {
    setIsClicked(true);
    setTimeLeft(300);
  };
  const startTenMinTimer = () => {
    setIsClicked(true);
    setTimeLeft(600);
  };
  const startFifteenMinTimer = () => {
    setIsClicked(true);
    setTimeLeft(900);
  };

  function secondsToHms(d) {
    d = Number(d);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let mDisplay = m > 0 ? m + (m === 1 ? " min " : " mins ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " sec " : " secs ") : "";
    return mDisplay + sDisplay;
}

  return (
    <div className="stopwatch">
      <h4 className="pickupTime">
        Dunzo pickup time  {isClicked && <div>{secondsToHms(timeLeft)}</div>}
      </h4>
      <div className="MainDiv">
        <span>
          <button className="bookbtn-1"> Book Now</button>
        </span>
        <span>
          <button className="minsbtn-2" onClick={startFiveMinTimer}>
            5 Mins
          </button>
        </span>
        <span>
          <button className="minsbtn-3" onClick={startTenMinTimer}>
            10 Mins
          </button>
        </span>
        <span>
          <button className="minsbtn-4" onClick={startFifteenMinTimer}>
            15 Mins
          </button>
        </span>
      </div>
    </div>
  );
}

export default Timer;