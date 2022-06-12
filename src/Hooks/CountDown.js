import { useEffect, useState } from "react";

const useCountdown = () => {
  const [remainingTime, setRemainingTime] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return remainingTime;
};

export { useCountdown };
