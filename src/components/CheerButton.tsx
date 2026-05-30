import { useEffect, useState } from "react";
import "./CheerButton.css";

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
    const [particles, setParticles] = useState<Particle[]>([]);

    // 都道府県が変更された場合に、状態をリセットする
    useEffect(() => {
        setCount(0);
    }, [prefectureId]);

    const clickHandler = () => {
        setCount((prev) => prev + 1);
        
        // 親の応援数ステートもローカルでインクリメントして即時反映させる（保存はされない）
        onSendSuccess(1);

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
    };

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
                        <span className="count-label">Your Cheers (Session)</span>
                    </>
                ) : (
                    <span className="count-label" style={{ opacity: 0.6 }}>
                        タップしてエールを送る（エフェクト確認用）
                    </span>
                )}
            </div>

            <div className="timer-section">
                {/* 待機タイマーは削除 */}
            </div>

            <button className="cheer-btn-main" onClick={clickHandler}>
                エールを送る（エフェクト確認）
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
                <span className="status-badge demo-mode" style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", color: "var(--text-dim)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                    🔒 デモモード（保存されません）
                </span>
            </div>
        </div>
    );
}