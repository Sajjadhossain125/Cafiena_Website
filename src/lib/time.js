// lib/time.js
import { useState, useEffect, useRef } from 'react';

export const useCountdownTimer = (initialDays, initialHours, initialMinutes, initialSeconds) => {
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });
  
  const targetDateRef = useRef(null);

  useEffect(() => {
    const now = new Date().getTime();
    const target =
      now +
      initialDays * 24 * 60 * 60 * 1000 +
      initialHours * 60 * 60 * 1000 +
      initialMinutes * 60 * 1000 +
      initialSeconds * 1000;
    
    targetDateRef.current = target;

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [initialDays, initialHours, initialMinutes, initialSeconds]);

  const calculateTimeLeft = () => {
    const difference = targetDateRef.current - new Date().getTime();
    
    if (difference <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  return timeLeft;
};