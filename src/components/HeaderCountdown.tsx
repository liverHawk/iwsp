import { useState, useEffect } from "react";

export default function HeaderCountdown() {
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
        return true;
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

  const pad = (num: number) => String(num).padStart(2, "0");

  if (timeLeft.isOver) {
    return (
      <div className="header-live-badge">
        <span className="live-pulse-dot" />
        <span className="header-live-text">LIVE NOW</span>
      </div>
    );
  }

  return (
    <div className="header-countdown">
      <span className="header-countdown-label">EVENT UNTIL</span>
      <div className="header-countdown-time">
        <span className="h-num">{pad(timeLeft.days)}</span><span className="h-unit">D</span>
        <span className="h-colon">:</span>
        <span className="h-num">{pad(timeLeft.hours)}</span><span className="h-unit">H</span>
        <span className="h-colon">:</span>
        <span className="h-num">{pad(timeLeft.minutes)}</span><span className="h-unit">M</span>
        <span className="h-colon">:</span>
        <span className="h-num">{pad(timeLeft.seconds)}</span><span className="h-unit">S</span>
      </div>
    </div>
  );
}
