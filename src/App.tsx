import { useEffect, useMemo, useState, type CSSProperties } from "react";

type TimeLeft = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hundredths: number;
  isOver: boolean;
};

const ONE_HOUR_MS = 60 * 60 * 1000;
const INTRO_DURATION = "1.2s";

const TARGET_TIME = Date.now() + (2 * 60 * 60 + 17 * 60 + 25) * 1000;

const calculateTimeLeft = (targetTime: number): TimeLeft => {
  const totalMs = Math.max(0, targetTime - Date.now());

  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const seconds = Math.floor((totalMs / 1000) % 60);
  const hundredths = Math.floor((totalMs % 1000) / 10);

  return {
    totalMs,
    days,
    hours,
    minutes,
    seconds,
    hundredths,
    isOver: totalMs <= 0,
  };
};

const pad = (value: number) => String(value).padStart(2, "0");
type TimeCardCSSProps = CSSProperties & Record<"--intro-delay" | "--beat-delay", string>;

export default function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(TARGET_TIME));
  const [isLastSpurt, setIsLastSpurt] = useState(false);

  const inLastSpurt = useMemo(
    () => isLastSpurt || (timeLeft.totalMs > 0 && timeLeft.totalMs <= ONE_HOUR_MS),
    [isLastSpurt, timeLeft.totalMs],
  );

  useEffect(() => {
    const interval = window.setInterval(
      () => setTimeLeft(calculateTimeLeft(TARGET_TIME)),
      inLastSpurt ? 10 : 1000,
    );

    return () => window.clearInterval(interval);
  }, [inLastSpurt]);

  const cards = [
    { label: "DAYS", value: pad(timeLeft.days) },
    { label: "HOURS", value: pad(timeLeft.hours) },
    { label: "MINUTES", value: pad(timeLeft.minutes) },
    { label: "SECONDS", value: pad(timeLeft.seconds) },
  ];

  return (
    <>
      <style>{`
        :root {
          color-scheme: dark;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          min-height: 100vh;
          background:
            radial-gradient(50rem 50rem at 15% 20%, rgba(99, 102, 241, 0.26), transparent 60%),
            radial-gradient(45rem 45rem at 85% 80%, rgba(217, 70, 239, 0.2), transparent 60%),
            linear-gradient(165deg, #020617 0%, #0f172a 45%, #090f1f 100%);
          color: #e5e7eb;
        }

        .screen {
          min-height: 100vh;
          width: 100%;
          padding: clamp(20px, 5vw, 56px);
          display: grid;
          place-items: center;
          overflow: hidden;
          position: relative;
        }

        .screen::before,
        .screen::after {
          content: "";
          position: absolute;
          inset: auto;
          width: clamp(220px, 40vw, 460px);
          aspect-ratio: 1;
          border-radius: 999px;
          filter: blur(80px);
          z-index: 0;
          pointer-events: none;
        }

        .screen::before {
          top: -120px;
          right: -120px;
          background: rgba(129, 140, 248, 0.26);
        }

        .screen::after {
          bottom: -120px;
          left: -120px;
          background: rgba(236, 72, 153, 0.2);
        }

        .timer-wrap {
          width: min(100%, 980px);
          position: relative;
          z-index: 1;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow:
            0 35px 80px rgba(2, 6, 23, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.18);
          padding: clamp(20px, 5vw, 42px);
          transition:
            border-color 500ms ease,
            box-shadow 500ms ease,
            background-color 500ms ease;
        }

        .timer-wrap.last-spurt {
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.1),
            rgba(255, 58, 127, 0.12)
          );
          border-color: rgba(239, 68, 68, 0.4);
          box-shadow:
            0 35px 90px rgba(2, 6, 23, 0.68),
            0 0 45px rgba(236, 72, 153, 0.3),
            0 0 70px rgba(239, 68, 68, 0.23),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .eyebrow {
          margin: 0 0 12px;
          font-size: clamp(11px, 1.9vw, 13px);
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(226, 232, 240, 0.82);
        }

        .heading {
          margin: 0;
          font-size: clamp(22px, 5.5vw, 38px);
          line-height: 1.15;
          letter-spacing: 0.02em;
          color: #f8fafc;
          text-wrap: balance;
        }

        .caption {
          margin: 12px 0 22px;
          font-size: clamp(13px, 2.2vw, 16px);
          color: rgba(203, 213, 225, 0.9);
        }

        .timer-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: clamp(8px, 2.2vw, 16px);
        }

        .time-card {
          border-radius: 20px;
          padding: clamp(14px, 2.5vw, 20px);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow:
            0 12px 28px rgba(2, 6, 23, 0.42),
            inset 0 1px 0 rgba(255, 255, 255, 0.17);
          animation: liquidGlow ${INTRO_DURATION} ease-in-out both;
          animation-delay: var(--intro-delay, 0s);
          transform-origin: center;
          transition:
            border-color 400ms ease,
            box-shadow 400ms ease,
            background-color 400ms ease;
          min-width: 0;
        }

        .timer-wrap.last-spurt .time-card {
          border-color: rgba(239, 68, 68, 0.4);
          background: rgba(255, 90, 110, 0.12);
          box-shadow:
            0 14px 30px rgba(2, 6, 23, 0.52),
            0 0 22px rgba(236, 72, 153, 0.26),
            inset 0 1px 0 rgba(255, 255, 255, 0.17);
          animation: heartbeat 1.9s ease-in-out infinite;
          animation-delay: var(--beat-delay, 0s);
        }

        .value-line {
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
          min-width: 0;
        }

        .value {
          margin: 0;
          font-size: clamp(32px, 8vw, 64px);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.03em;
          color: #f8fafc;
          font-family: "SF Mono", "Roboto Mono", "JetBrains Mono", ui-monospace, monospace;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
          text-shadow: 0 0 16px rgba(191, 219, 254, 0.33);
          white-space: nowrap;
        }

        .timer-wrap.last-spurt .value {
          text-shadow:
            0 0 20px rgba(251, 113, 133, 0.65),
            0 0 34px rgba(236, 72, 153, 0.55);
        }

        .ms-inline {
          display: inline-flex;
          align-items: baseline;
          white-space: nowrap;
        }

        .ms-dot {
          font-size: clamp(22px, 4.5vw, 34px);
          color: rgba(251, 113, 133, 0.95);
          line-height: 1;
          margin-right: 2px;
          font-family: "SF Mono", "Roboto Mono", "JetBrains Mono", ui-monospace, monospace;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
        }

        .ms-value {
          font-size: clamp(20px, 3.9vw, 32px);
          font-weight: 800;
          color: #fb7185;
          line-height: 1;
          font-family: "SF Mono", "Roboto Mono", "JetBrains Mono", ui-monospace, monospace;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
          text-shadow: 0 0 16px rgba(251, 113, 133, 0.7);
        }

        .label {
          margin-top: 8px;
          font-size: clamp(10px, 1.8vw, 12px);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(203, 213, 225, 0.75);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .timer-wrap.last-spurt .label {
          color: rgba(253, 164, 175, 0.86);
        }

        .status {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .status-text {
          margin: 0;
          font-size: clamp(12px, 2vw, 14px);
          color: rgba(226, 232, 240, 0.9);
        }

        .toggle {
          border: 1px solid rgba(255, 255, 255, 0.24);
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          color: #e2e8f0;
          padding: 8px 14px;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: 200ms ease;
        }

        .toggle:hover {
          border-color: rgba(251, 113, 133, 0.75);
          color: #ffe4e6;
        }

        .timer-wrap.last-spurt .toggle {
          border-color: rgba(251, 113, 133, 0.55);
          color: #ffe4e6;
        }

        @keyframes liquidGlow {
          0% {
            filter: blur(30px) brightness(2.5);
            opacity: 0;
            transform: scale(1.15);
          }
          50% {
            filter: blur(12px) brightness(1.6);
            opacity: 0.7;
          }
          100% {
            filter: blur(0px) brightness(1);
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          12% {
            transform: scale(1.06);
          }
          25% {
            transform: scale(1.01);
          }
          35% {
            transform: scale(1.1);
          }
        }

        @media (max-width: 920px) {
          .timer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 520px) {
          .timer-wrap {
            border-radius: 22px;
          }

          .timer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .time-card {
            border-radius: 16px;
          }

          .heading {
            max-width: 15ch;
          }
        }
      `}</style>

      <main className="screen">
        <section className={`timer-wrap ${inLastSpurt ? "last-spurt" : ""}`}>
          <p className="eyebrow">Glassmorphism Countdown</p>
          <h1 className="heading">Event Launch Countdown</h1>
          <p className="caption">
            {timeLeft.isOver
              ? "The event has started."
              : inLastSpurt
                ? "Fever Mode: last hour activated"
                : "Automatic Fever Mode when less than 1 hour remains"}
          </p>

          <div className="timer-grid" role="timer" aria-live="polite">
            {cards.map((card, index) => {
              const style: TimeCardCSSProps = {
                "--intro-delay": `${index * 0.08}s`,
                "--beat-delay": `${index * 0.1}s`,
              };

              return (
                <article key={card.label} className="time-card" style={style}>
                <div className="value-line">
                  <p className="value">{card.value}</p>
                  {card.label === "SECONDS" && inLastSpurt ? (
                    <span
                      className="ms-inline"
                      aria-label={`${pad(timeLeft.hundredths)} hundredths of a second`}
                    >
                      <span className="ms-dot">.</span>
                      <span className="ms-value">{pad(timeLeft.hundredths)}</span>
                    </span>
                  ) : null}
                </div>
                <div className="label">{card.label}</div>
              </article>
              );
            })}
          </div>

          <div className="status">
            <p className="status-text">
              {timeLeft.isOver
                ? "00:00:00.00"
                : `${pad(timeLeft.days)}d ${pad(timeLeft.hours)}h ${pad(timeLeft.minutes)}m ${pad(timeLeft.seconds)}s`}
            </p>
            <button type="button" className="toggle" onClick={() => setIsLastSpurt((prev) => !prev)}>
              {isLastSpurt ? "Auto Last Spurt" : "Force Fever Mode"}
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
