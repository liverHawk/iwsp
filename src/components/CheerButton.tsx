import { useEffect, useRef, useState } from "react";
import "./CheerButton.css";

interface Particle {
  id: number;
  x: number;
  y: number;
  r: number;
  char: string;
}

export default function CheerButton() {
    const [count, setCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [sended, setSended] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    const sendBuffer = useRef(0);
    const timeLeftRef = useRef(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (timeLeft === 0 && sendBuffer.current > 0) {
            setSended(true);
            console.log(`sended at ${sendBuffer.current}`);

            sendBuffer.current = 0;
        }
    }, [timeLeft]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, []);

    const clickHandler = () => {
        setSended(false);
        timeLeftRef.current = 3;
        setTimeLeft(3);

        setCount((prev) => prev + 1);
        sendBuffer.current += 1;

        // エフェクト用のパーティクル（絵文字）を作成
        const emojis = ["🔥", "🎉", "❤️", "🌟", "✨", "👏"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const newParticle: Particle = {
            id: Date.now() + Math.random(),
            x: (Math.random() - 0.5) * 160,    // 左右にランダム散布
            y: -100 - Math.random() * 80,       // 上方向にランダム上昇
            r: (Math.random() - 0.5) * 60,     // ランダム回転
            char: randomEmoji
        };
        setParticles((prev) => [...prev, newParticle]);

        // 800ms後にパーティクルを消去
        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 800);

        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
        }
        
        intervalRef.current = window.setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    if (intervalRef.current) {
                        window.clearInterval(intervalRef.current);
                    }
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    // 残り時間（3〜0秒）に基づくプログレスバーの幅
    const progressWidth = `${(timeLeft / 3) * 100}%`;

    return (
        <div className="cheer-container">
            <h2 className="cheer-title">Cheer Section</h2>

            <div className="count-display-wrap">
                {count > 0 ? (
                    <>
                        {/* key属性を付与することで、値が変わるたびにCSSアニメーション（popCount）が再適用されます */}
                        <h1 className="count-display" key={count}>
                            {count}
                        </h1>
                        <span className="count-label">Total Cheers</span>
                    </>
                ) : (
                    <span className="count-label" style={{ opacity: 0.6 }}>
                        Tap to start cheering!
                    </span>
                )}
            </div>

            <div className="timer-section">
                {timeLeft > 0 && (
                    <>
                        <span className="timer-text">Sending in {timeLeft}s...</span>
                        <div className="timer-bar-container">
                            <div 
                                className="timer-bar" 
                                style={{ width: progressWidth }}
                            />
                        </div>
                    </>
                )}
            </div>

            <button className="cheer-btn-main" onClick={clickHandler} disabled={sended}>
                Cheer!!
            </button>

            {/* パーティクルエフェクトの描画 */}
            {particles.map((p) => (
                <span 
                    key={p.id} 
                    className="particle"
                    style={{ 
                        "--x": `${p.x}px`, 
                        "--y": `${p.y}px`, 
                        "--r": `${p.r}deg` 
                    } as React.CSSProperties}
                >
                    {p.char}
                </span>
            ))}

            <div className="status-badge-wrap">
                {sended && (
                    <span className="status-badge sended">
                        ✓ Sent to Database
                    </span>
                )}
                {!sended && timeLeft > 0 && (
                    <span className="status-badge waiting">
                        ⚡ Buffering...
                    </span>
                )}
            </div>
        </div>
    );
}