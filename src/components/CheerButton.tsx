import { useEffect, useRef, useState } from "react";
import "./CheerButton.css";

const WAIT_MINUTES = 3

interface Particle {
  id: number;
  x: number;
  y: number;
  r: number;
  char: string;
}

interface CheerButtonProps {
    prefectureId: string;
    onSendSuccess: (addedCount: number) => void;
}

export default function CheerButton({ prefectureId, onSendSuccess }: CheerButtonProps) {
    const [count, setCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [sent, setSent] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);

    const sendBuffer = useRef(0);
    const timeLeftRef = useRef(0);
    const intervalRef = useRef<number | null>(null);

    // 都道府県が変更された場合に、状態をリセットする
    useEffect(() => {
        setCount(0);
        setTimeLeft(0);
        setSent(false);
        sendBuffer.current = 0;
        timeLeftRef.current = 0;
        if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
        }
    }, [prefectureId]);

    useEffect(() => {
        const sendCheers = async () => {
            setSent(true);
            const countToSend = sendBuffer.current;
            if (countToSend === 0) return;

            // 送信前にバッファをクリア（二重送信防止）
            sendBuffer.current = 0;
            
            try {
                const response = await fetch("/api/cheers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        prefectureId,
                        count: countToSend,
                    }),
                });

                if (response.ok) {
                    onSendSuccess(countToSend);
                } else {
                    throw new Error("Failed to send cheers to API");
                }
            } catch (error) {
                console.error("送信に失敗しました:", error);
                setSent(false);
            }
        };

        if (timeLeft === 0 && sendBuffer.current > 0) {
            sendCheers();
        }
    }, [timeLeft, prefectureId, onSendSuccess]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                window.clearInterval(intervalRef.current);
            }
        };
    }, []);

    const clickHandler = () => {
        // すでに送信完了している場合は処理を行わない
        if (sent) return;

        timeLeftRef.current = WAIT_MINUTES;
        setTimeLeft(WAIT_MINUTES);

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
    const progressWidth = `${((timeLeft - 1) / (WAIT_MINUTES - 1)) * 100}%`;

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

            <button className="cheer-btn-main" onClick={clickHandler} disabled={sent}>
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
                {sent && (
                    <span className="status-badge sent">
                        ✓ Sent to Database
                    </span>
                )}
                {!sent && timeLeft > 0 && (
                    <span className="status-badge waiting">
                        ⚡ Buffering...
                    </span>
                )}
            </div>
        </div>
    );
}