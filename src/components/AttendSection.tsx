import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

export default function AttendSection() {
    const { data: session, isPending } = authClient.useSession();
    const [isAttended, setIsAttended] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [errorOccurred, setErrorOccurred] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    // 初回ロード時にローカルストレージをチェック
    useEffect(() => {
        const attended = localStorage.getItem("iwsp_attended");
        if (attended === "true") {
            setIsAttended(true);
        }
    }, []);

    // OAuthコールバックの検知と来場登録API呼び出し
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const isCallback = urlParams.get("oauth_callback") === "true";

        if (isCallback && !isPending) {
            if (session) {
                // セッションが存在する場合、来場登録APIを呼び出す
                const registerAttendee = async () => {
                    setIsRegistering(true);
                    setErrorOccurred("");
                    try {
                        const response = await fetch("/api/attend", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

                        if (response.ok) {
                            const data = await response.json();
                            if (data.success) {
                                // 登録成功
                                localStorage.setItem("iwsp_attended", "true");
                                setIsAttended(true);
                                setStatusMessage("来場登録が完了しました！イベント会場でお待ちしております。");
                                
                                // セッションを破棄 (ログイン情報は残さない)
                                await authClient.signOut();
                            } else {
                                setErrorOccurred(data.message || "登録処理に失敗しました。");
                            }
                        } else {
                            setErrorOccurred("サーバーとの通信に失敗しました。");
                        }
                    } catch (err) {
                        console.error("Error registering attendee:", err);
                        setErrorOccurred("予期しないエラーが発生しました。");
                    } finally {
                        setIsRegistering(false);
                        // クエリパラメータをURLから削除
                        window.history.replaceState({}, document.title, window.location.pathname);
                    }
                };

                registerAttendee();
            } else {
                // セッションが取得できない場合（何らかの理由で認証失敗など）
                setErrorOccurred("認証情報の取得に失敗しました。もう一度お試しください。");
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }
    }, [session, isPending]);

    const handleSignIn = async () => {
        setErrorOccurred("");
        setStatusMessage("");
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: window.location.origin + "?oauth_callback=true",
            });
        } catch (err) {
            console.error("Sign in failed:", err);
            setErrorOccurred("Googleログインの起動に失敗しました。");
        }
    };

    const handleReset = () => {
        if (window.confirm("登録情報をリセットし、別のアカウントで登録し直しますか？")) {
            localStorage.removeItem("iwsp_attended");
            setIsAttended(false);
            setStatusMessage("");
            setErrorOccurred("");
        }
    };

    return (
        <section className="section attend-section">
            <div className="section-label accent">来場登録 / ATTEND REGISTRATION</div>
            
            <div className="attend-container">
                <p className="attend-desc">
                    イベントへの来場登録を行います。Googleアカウントでログインすると、メールアドレスのハッシュが安全に記録され、セッションなどのログイン情報は保持されずに処理が完了します。
                </p>

                {isRegistering ? (
                    <div className="attend-loading-box">
                        <div className="spinner"></div>
                        <p className="loading-text">来場登録を処理しています...</p>
                    </div>
                ) : isAttended ? (
                    <div className="attend-success-box">
                        <div className="success-badge">
                            <span className="success-icon">✓</span>
                            <span>REGISTERED</span>
                        </div>
                        <h3 className="success-title">来場登録が完了しています</h3>
                        <p className="success-desc">イベントへのご来場、心よりお待ちしております！</p>
                        {statusMessage && <p className="flash-message">{statusMessage}</p>}
                        
                        <div className="reset-action">
                            <button className="reset-btn" onClick={handleReset}>
                                登録情報をリセットする
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="attend-action-box">
                        {errorOccurred && (
                            <div className="attend-error-box">
                                <span className="error-icon">⚠️</span>
                                <span className="error-text">{errorOccurred}</span>
                            </div>
                        )}
                        <button className="google-login-btn" onClick={handleSignIn}>
                            <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
                                <path
                                    fill="#EA4335"
                                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.355-2.845-6.355-6.355s2.845-6.355 6.355-6.355c1.618 0 3.097.616 4.227 1.625l3.073-3.073C18.665 1.942 15.632.8 12.24.8 5.922.8.8 5.922.8 12.24s5.122 11.44 11.44 11.44c6.356 0 10.742-4.468 10.742-10.932 0-.693-.062-1.348-.182-1.963H12.24z"
                                />
                            </svg>
                            <span>Googleアカウントで登録</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
