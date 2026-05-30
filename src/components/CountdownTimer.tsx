import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isOver: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false });

  const target = new Date("2026-05-30T10:30:00+09:00").getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft((prev) => {
          if (!prev.isOver) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
          }
          return prev;
        });
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
  }, [target]);

  // 手動で紙吹雪を降らせる演出
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ["#CC1A1A", "#C8971A", "#FFFFFF"]
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ["#CC1A1A", "#C8971A", "#FFFFFF"]
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  if (timeLeft.isOver) {
    return (
      <div className="countdown-container ended finished">
        <div className="live-status-badge finished">
          <span className="live-status-text">EVENT FINISHED</span>
        </div>
        <span className="countdown-ended-text">イベントは終了しました</span>
        <p className="countdown-sub-text">たくさんのご来場ありがとうございました！</p>
        
        {/* 動員数速報表示 */}
        <div className="attendance-flash">
          <span className="attendance-label">速報動員数</span>
          <span className="attendance-value">2,833<span className="attendance-unit">人</span></span>
        </div>

        {/* 紙吹雪の確認ボタン */}
        <button className="confetti-demo-btn" onClick={triggerConfetti}>
          🎉 紙吹雪演出を確認する
        </button>
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

