import React, { useState, useEffect } from "react";
import SectionLabel from "./SectionLabel";
import "./AttendSection.css";

interface AttendanceResponse {
  success: boolean;
  userHash?: string;
  alreadyRegistered?: boolean;
  error?: string;
  message?: string;
}

export default function AttendSection() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredHash, setRegisteredHash] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 参加表明統計用の状態
  const [totalCount, setTotalCount] = useState<number>(0);
  const [recentCount, setRecentCount] = useState<number>(0);

  // 統計データの取得
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/attendance");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTotalCount(data.total);
          setRecentCount(data.recent);
        }
      }
    } catch (e) {
      console.error("Failed to fetch attendance stats:", e);
    }
  };

  // 初回ロード時にlocalStorageから登録状況を確認 & 統計の定期取得開始
  useEffect(() => {
    const savedHash = localStorage.getItem("iwsp_attendee_hash");
    if (savedHash) {
      setRegisteredHash(savedHash);
      // バックグラウンドでサーバー側の登録状況を確認
      checkServerRegistration(savedHash);
    }

    fetchStats();
    // 5秒おきに統計データを更新ポーリング
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkServerRegistration = async (hash: string) => {
    try {
      const res = await fetch(`/api/attendance?userHash=${hash}`);
      if (res.ok) {
        const data = await res.json();
        if (!data.registered) {
          // サーバー側にデータがない場合はローカルのキャッシュをクリア
          localStorage.removeItem("iwsp_attendee_hash");
          setRegisteredHash(null);
        }
      }
    } catch (e) {
      console.error("Failed to verify registration with server:", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // バリデーション
    if (!name.trim()) {
      setErrorMsg("お名前を入力してください。");
      return;
    }
    if (!birthday) {
      setErrorMsg("生年月日を入力してください。");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, birthday }),
      });

      const data: AttendanceResponse = await res.json();

      if (res.ok && data.success) {
        const hash = data.userHash!;
        localStorage.setItem("iwsp_attendee_hash", hash);
        setRegisteredHash(hash);
        setSuccessMsg(data.message || "参加表明が完了しました！");
        
        // 新規登録成功時は、統計データを楽観的に更新
        if (!data.alreadyRegistered) {
          setTotalCount((prev) => prev + 1);
          setRecentCount((prev) => prev + 1);
        }

        // フォーム入力をクリア
        setName("");
        setBirthday("");
      } else {
        setErrorMsg(data.error || "送信に失敗しました。時間をおいて再度お試しください。");
      }
    } catch (err) {
      console.error("Error submitting attendance:", err);
      setErrorMsg("通信エラーが発生しました。ネットワーク接続を確認してください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("登録情報をクリアして、再度参加表明し直しますか？")) {
      localStorage.removeItem("iwsp_attendee_hash");
      setRegisteredHash(null);
      setSuccessMsg(null);
      setErrorMsg(null);
      // リセット後に統計を再取得
      fetchStats();
    }
  };

  return (
    <section className="section attend-section-wrap" id="attendance-section">
      <SectionLabel accent>事前参加表明</SectionLabel>
      
      <div className="attend-container">
        {/* 参加表明の統計掲示ボード */}
        <div className="attend-stats-board">
          <div className="stat-item total-stats">
            <span className="stat-label">現在の参加表明数</span>
            <div className="stat-count-wrap">
              <span className="stat-number" key={totalCount}>
                {totalCount.toLocaleString()}
              </span>
              <span className="stat-unit">人</span>
            </div>
          </div>
          {recentCount > 0 && (
            <div className="stat-item recent-stats animate-pulse-neon" key={recentCount}>
              <span className="fire-icon">🔥</span>
              <span className="recent-text">
                過去20分間に <strong>{recentCount}人</strong> が表明！
              </span>
            </div>
          )}
        </div>

        {registeredHash ? (
          /* 登録済み状態のUI */
          <div className="attend-card registered-card animate-fade-in">
            <div className="registered-badge-wrap">
              <div className="success-icon-ring">
                <span className="success-icon">✓</span>
              </div>
              <h3 className="attend-status-title">参加表明 完了</h3>
            </div>
            
            <p className="attend-status-desc">
              本イベントへの参加表明が完了しています。ご来場をお待ちしております！
            </p>
            
            <div className="attend-hash-box">
              <span className="hash-label">TICKET ID (HASH)</span>
              <span className="hash-value">
                {registeredHash.substring(0, 8)}...{registeredHash.substring(registeredHash.length - 8)}
              </span>
            </div>

            {successMsg && <p className="success-banner">{successMsg}</p>}
            
            <button type="button" className="attend-reset-btn" onClick={handleReset}>
              参加表明を変更する
            </button>
          </div>
        ) : (
          /* 未登録状態のUI（入力フォーム） */
          <div className="attend-card form-card">
            <h3 className="attend-form-title">事前参加表明フォーム</h3>
            <p className="attend-form-desc">
              イベント当日の動員目標3,000人達成に向けて、事前参加表明にご協力ください。<br />
              入力された個人情報はサーバー側で暗号化（ハッシュ化）され、厳重に管理されます。
            </p>

            <form onSubmit={handleSubmit} className="attend-form">
              <div className="form-group">
                <label htmlFor="attendee-name" className="form-label">
                  お名前（フルネーム）
                </label>
                <input
                  id="attendee-name"
                  type="text"
                  className="form-input"
                  placeholder="例: 山田 太郎"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="attendee-birthday" className="form-label">
                  生年月日
                </label>
                <input
                  id="attendee-birthday"
                  type="date"
                  className="form-input"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </div>

              {errorMsg && (
                <div className="attend-error-msg animate-shake">
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className={`attend-submit-btn ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner-wrap">
                    <span className="spinner"></span> 送信中...
                  </span>
                ) : (
                  "参加を表明する"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
