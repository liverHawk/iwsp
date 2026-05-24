import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOver: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });

  useEffect(() => {
    const target = new Date("2026-05-30T10:30:00+09:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return true; // over
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
      return false;
    };

    const isOver = calculateTimeLeft();
    if (isOver) return;

    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isOver) {
    return (
      <div className="countdown-container ended">
        <span className="countdown-ended-text">RELEASE EVENT STARTED!</span>
      </div>
    );
  }

  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="countdown-container">
      <div className="countdown-label">
        <span className="countdown-pulse-dot" />
        COUNTDOWN TO EVENT
      </div>
      <div className="countdown-grid">
        <div className="countdown-item">
          <span className="countdown-num">{pad(timeLeft.days)}</span>
          <span className="countdown-unit">DAYS</span>
        </div>
        <div className="countdown-colon">:</div>
        <div className="countdown-item">
          <span className="countdown-num">{pad(timeLeft.hours)}</span>
          <span className="countdown-unit">HOURS</span>
        </div>
        <div className="countdown-colon">:</div>
        <div className="countdown-item">
          <span className="countdown-num">{pad(timeLeft.minutes)}</span>
          <span className="countdown-unit">MINS</span>
        </div>
        <div className="countdown-colon">:</div>
        <div className="countdown-item">
          <span className="countdown-num">{pad(timeLeft.seconds)}</span>
          <span className="countdown-unit">SECS</span>
        </div>
      </div>
      <p className="countdown-days-go">{timeLeft.days} {timeLeft.days === 1 ? "day" : "days"} to go</p>
    </div>
  );
}
