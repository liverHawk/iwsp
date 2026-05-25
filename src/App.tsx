import { useState, useEffect } from "react";
import flyerImg from "./assets/flyer.jpg";
import artistImg from "./assets/artist.jpg";
import charImg from "./assets/char.png";
import "./App.css";

// Type & Static Data Imports
import { type Member, memberList, payments, tokutenItems, notes } from "./data/eventData";

// Component Imports
import SectionLabel from "./components/SectionLabel";
import CountdownTimer from "./components/CountdownTimer";
// import SiteHeader from "./components/SiteHeader";
import CheerButton from "./components/CheerButton";
import JapanMap from "./components/JapanMap";
import AttendSection from "./components/AttendSection";

const prefectureList = [
  { id: "01", name: "北海道" }, { id: "02", name: "青森県" }, { id: "03", name: "岩手県" },
  { id: "04", name: "宮城県" }, { id: "05", name: "秋田県" }, { id: "06", name: "山形県" },
  { id: "07", name: "福島県" }, { id: "08", name: "茨城県" }, { id: "09", name: "栃木県" },
  { id: "10", name: "群馬県" }, { id: "11", name: "埼玉県" }, { id: "12", name: "千葉県" },
  { id: "13", name: "東京都" }, { id: "14", name: "神奈川県" }, { id: "15", name: "新潟県" },
  { id: "16", name: "富山県" }, { id: "17", name: "石川県" }, { id: "18", name: "福井県" },
  { id: "19", name: "山梨県" }, { id: "20", name: "長野県" }, { id: "21", name: "岐阜県" },
  { id: "22", name: "静岡県" }, { id: "23", name: "愛知県" }, { id: "24", name: "三重県" },
  { id: "25", name: "滋賀県" }, { id: "26", name: "京都府" }, { id: "27", name: "大阪府" },
  { id: "28", name: "兵庫県" }, { id: "29", name: "奈良県" }, { id: "30", name: "和歌山県" },
  { id: "31", name: "鳥取県" }, { id: "32", name: "島根県" }, { id: "33", name: "岡山県" },
  { id: "34", name: "広島県" }, { id: "35", name: "山口県" }, { id: "36", name: "徳島県" },
  { id: "37", name: "香川県" }, { id: "38", name: "愛媛県" }, { id: "39", name: "高知県" },
  { id: "40", name: "福岡県" }, { id: "41", name: "佐賀県" }, { id: "42", name: "長崎県" },
  { id: "43", name: "熊本県" }, { id: "44", name: "大分県" }, { id: "45", name: "宮崎県" },
  { id: "46", name: "鹿児島県" }, { id: "47", name: "沖縄県" }
];

function App() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [photoType, setPhotoType] = useState<'official' | 'special'>('official');

  const [selectedPrefId, setSelectedPrefId] = useState<string>("");
  const [hoveredPrefId, setHoveredPrefId] = useState<string>("");
  const [totalCheers, setTotalCheers] = useState<number>(0);
  const [allPrefectureCheers, setAllPrefectureCheers] = useState<Record<string, number>>({});
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const selectedMemberPrefId = selectedMember ? selectedMember.prefectureId : "";
  const selectedMemberColor = selectedMember ? selectedMember.color : "";

  // 全国の応援状況をバッチで取得する
  const fetchAllCheers = async (showLoading = false) => {
    if (showLoading) setIsFetching(true);
    try {
      const response = await fetch("/api/cheers");
      if (response.ok) {
        const data = await response.json();
        setTotalCheers(data.total);
        setAllPrefectureCheers(data.prefectures);
      }
    } catch (error) {
      console.error("Failed to fetch all cheers:", error);
    } finally {
      if (showLoading) setIsFetching(false);
    }
  };

  // 初回マウント時および5秒おきの定期ポーリング
  useEffect(() => {
    fetchAllCheers(true);
    const interval = setInterval(() => fetchAllCheers(false), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSendSuccess = (addedCount: number) => {
    // 即時反映（楽観的UI更新）
    setTotalCheers((prev) => prev + addedCount);
    if (selectedPrefId) {
      setAllPrefectureCheers((prev) => ({
        ...prev,
        [selectedPrefId]: (prev[selectedPrefId] || 0) + addedCount,
      }));
    }
  };

  const prefectureCheers = selectedPrefId ? (allPrefectureCheers[selectedPrefId] || 0) : null;

  return (
    <div className="page">
      {/* <SiteHeader /> */}
      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section className="hero">
        <div className="hero-bg-anim" />

        {/* logo image */}
        <div className="hero-logo-wrap">
          <img
            src={charImg}
            alt="I.W.S.P. IKEBUKURO WHITE SCORPION PROJECT"
            className="hero-logo-img"
          />
        </div>

        <div className="hero-body">
          {/* left: event info */}
          <div className="hero-brand">
            <div className="hero-event-label">
              <span className="event-label-line">
                WHITE SCORPION 8TH DIGITAL SINGLE
              </span>
              <span className="event-label-dash">—</span>
              <span className="event-label-line">RELEASE EVENT</span>
            </div>
            <h1 className="hero-title">『7秒のレジスタンス』</h1>
            <p className="hero-release-sub">リリースイベント</p>
            <CountdownTimer />
          </div>

          {/* right: flyer */}
          <div className="hero-poster">
            <img src={flyerImg} alt="IWSP Flyer" className="flyer-img" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          ARTIST STRIP
      ════════════════════════════════ */}
      <div className="artist-strip">
        <img src={artistImg} alt="WHITE SCORPION" />
        <div className="artist-strip-fade bottom" />
      </div>

      {/* ════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════ */}
      <main className="main">
        {/* ── DATE & SCHEDULE ── */}
        <section className="section">
          <SectionLabel>DATE &amp; SCHEDULE</SectionLabel>

          <div className="schedule-row">
            <div className="schedule-date-block">
              <span className="s-month">May</span>
              <span className="s-day">30</span>
            </div>
            <div className="schedule-info">
              <p className="s-year-dow">
                <span className="s-year">2026</span>
                <span className="s-dow">土曜日</span>
              </p>
              <p className="s-venue">
                池袋西口公園野外劇場（グローバルリング シアター）
              </p>
            </div>
          </div>

          <div className="timeline">
            <div className="tl-item">
              <span className="tl-time">10:30</span>
              <div className="tl-bar" />
              <div className="tl-content">
                <span className="tl-title">生写真販売 開始</span>
              </div>
            </div>
            <div className="tl-item">
              <span className="tl-time">16:00</span>
              <div className="tl-bar" />
              <div className="tl-content">
                <span className="tl-title">ミニライブ</span>
                <span className="tl-note">観覧無料・動員目標 3,000人</span>
              </div>
            </div>
            <div className="tl-item">
              <span className="tl-time">17:30</span>
              <div className="tl-bar" />
              <div className="tl-content">
                <span className="tl-title">特典会 開始</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="rule" />

        {/* ── 来場者特典 ── */}
        <section className="section">
          <SectionLabel accent>来場者特典</SectionLabel>
          <ul className="diamond-list">
            <li>
              来場者全員に撮り下ろし限定L判ハーフサイズ生写真（約1,000種）をランダムで1枚プレゼント
            </li>
            <li>5月6日 豊洲リリイベの引換券持参者は2枚</li>
            <li>
              友だち招待キャンペーン参加で招待者・友だち全員に「全員ハイタッチ会参加券」を1枚配布
            </li>
          </ul>
        </section>

        <hr className="rule" />

        {/* ── 事前参加表明 ── */}
        <AttendSection />

        <hr className="rule" />

        {/* ── 特典会参加メンバー ── */}
        <section className="section">
          <SectionLabel accent>特典会参加メンバー</SectionLabel>
          <div className="member-grid">
            {memberList.map((member) => (
              <div
                key={member.name}
                className={`member-card ${member.inactive ? "inactive" : ""}`}
                style={{ "--col": member.color } as React.CSSProperties}
                onClick={() => {
                  setSelectedMember(member);
                  setPhotoType('official');
                }}
                onMouseEnter={() => !member.inactive && setHoveredPrefId(member.prefectureId)}
                onMouseLeave={() => setHoveredPrefId("")}
              >
                <div className="member-card-img-wrap">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  {member.inactive && <span className="inactive-badge">休養中</span>}
                  <span className="member-card-pref" style={{ backgroundColor: `${member.color}cc` }}>
                    {member.birthplace}
                  </span>
                </div>
                <div className="member-card-info">
                  <span className="member-card-name" style={{ color: member.color }}>{member.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="rule" />

        {/* ── 都道府県別 応援カウンター ── */}
        <section className="section cheer-section-wrap">
          <SectionLabel accent>都道府県別 応援カウンター</SectionLabel>
          <p className="cheer-desc">あなたの住んでいる都道府県からメンバーへエールを送りましょう！日本地図をクリックして都道府県を選択できます。</p>
          
          {/* 全国合計応援数表示ボード */}
          <div className="total-cheers-board">
            <span className="total-cheers-title">🔥 全国合計応援数 🔥</span>
            <h1 className="total-cheers-counter" key={totalCheers}>
              {totalCheers.toLocaleString()} <span className="cheers-unit">Cheers</span>
            </h1>
            <p className="total-cheers-sub">みんなのエールがリアルタイムに集計中！</p>
          </div>

          {/* 日本地図ヒートマップ */}
          <div className="map-display-container">
            <JapanMap 
              cheerData={allPrefectureCheers} 
              selectedPrefId={selectedPrefId} 
              onSelectPrefecture={(id) => setSelectedPrefId(id)} 
              hoveredPrefId={hoveredPrefId}
              selectedMemberPrefId={selectedMemberPrefId}
              selectedMemberColor={selectedMemberColor}
            />
          </div>

          <div className="cheer-select-container">
            <select 
              className="cheer-select"
              value={selectedPrefId} 
              onChange={(e) => setSelectedPrefId(e.target.value)}
            >
              <option value="">都道府県を選択（または地図をクリック）</option>
              {prefectureList.map((pref) => {
                const members = memberList.filter(m => m.prefectureId === pref.id);
                const memberNames = members.map(m => m.name).join(", ");
                const label = memberNames ? `${pref.name} (${memberNames} 出身)` : pref.name;
                return (
                  <option key={pref.id} value={pref.id}>
                    {label}
                  </option>
                );
              })}
            </select>
          </div>

          {selectedPrefId && (
            <div className="cheer-active-container">
              {(() => {
                const prefName = prefectureList.find(p => p.id === selectedPrefId)?.name;
                const members = memberList.filter(m => m.birthplace === prefName);
                if (members.length > 0) {
                  return (
                    <div className="pref-member-notice" style={{ "--pref-col": members[0].color } as React.CSSProperties}>
                      <span className="notice-icon">🎉</span>
                      <span className="notice-text">
                        {members.map(m => m.name).join(" & ")} の出身地です！応援しましょう！
                      </span>
                      <span className="notice-icon">🎉</span>
                    </div>
                  );
                }
                return null;
              })()}

              <div className="current-cheers-box">
                <span className="current-cheers-label">
                  {prefectureList.find(p => p.id === selectedPrefId)?.name} の現在の応援数
                </span>
                {isFetching && prefectureCheers === null ? (
                  <span className="current-cheers-value loading">Loading...</span>
                ) : (
                  <span className="current-cheers-value" key={prefectureCheers ?? 0}>
                    {prefectureCheers !== null ? prefectureCheers.toLocaleString() : 0} <span className="unit">Cheers</span>
                  </span>
                )}
              </div>

              <CheerButton 
                prefectureId={selectedPrefId} 
                onSendSuccess={handleSendSuccess} 
                key={selectedPrefId}
              />
            </div>
          )}
        </section>

        <hr className="rule" />

        {/* ── 対象商品 ── */}
        <section className="section">
          <SectionLabel accent>対象商品</SectionLabel>
          <div className="product-card">
            <div className="product-left">
              <p className="product-name">ランダム生写真【8th衣装】</p>
              <p className="product-note">
                各5枚1セット・特典券1枚付き・当日商品・交換不可
              </p>
            </div>
            <div className="product-price">¥1,650</div>
          </div>
          <div className="product-card">
            <div className="product-left">
              <p className="product-name">ランダム生写真【花柄】</p>
              <p className="product-note">
                各5枚1セット・特典券1枚付き・当日商品・交換不可
              </p>
            </div>
            <div className="product-price">¥1,650</div>
          </div>
        </section>

        <hr className="rule" />

        {/* ── 特典会内容 ── */}
        <section className="section">
          <SectionLabel accent>特典会内容</SectionLabel>
          <div className="tokuten-grid">
            {tokutenItems.map((item) => (
              <div key={item.title} className="tokuten-card">
                {item.ticket && (
                  <span className="tokuten-ticket">{item.ticket}</span>
                )}
                <p className="tokuten-title">{item.title}</p>
                <p className="tokuten-body">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="rule" />

        {/* ── お支払い方法 ── */}
        <section className="section">
          <SectionLabel accent>お支払い方法</SectionLabel>
          <div className="payment-row">
            {payments.map((p) => (
              <span key={p} className="payment-chip">
                {p}
              </span>
            ))}
          </div>
          <p className="payment-note">
            ※ QR決済はPayPayのみ対応&emsp;※
            当日の電波状況等によりキャッシュレス不可の場合あり
          </p>
        </section>

        <hr className="rule" />

        {/* ── 注意事項 ── */}
        <section className="section">
          <SectionLabel accent>注意事項</SectionLabel>
          <ul className="notes-list">
            {notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>

        <hr className="rule" />

        {/* ── 参考リンク ── */}
        <section className="section">
          <SectionLabel accent>公式お知らせ</SectionLabel>
          <div className="ref-links">
            <a
              href="https://whitescorpion.jp/news/2026/04/23/9831/"
              target="_blank"
              rel="noreferrer"
              className="ref-link"
            >
              <span className="ref-link-date">2026.04.23</span>
              <span className="ref-link-label">イベント概要・特典会詳細</span>
              <span className="ref-link-arrow">詳しくはこちら →</span>
            </a>
            <a
              href="https://whitescorpion.jp/news/2026/05/12/10094/"
              target="_blank"
              rel="noreferrer"
              className="ref-link"
            >
              <span className="ref-link-date">2026.05.12</span>
              <span className="ref-link-label">追加・変更情報</span>
              <span className="ref-link-arrow">詳しくはこちら →</span>
            </a>
          </div>
        </section>

        <hr className="rule" />

        {/* ── お問い合わせ ── */}
        <section className="section contact-section">
          <SectionLabel accent>お問い合わせ</SectionLabel>
          <a
            href="https://whitescorpion.jp"
            target="_blank"
            rel="noreferrer"
            className="contact-url"
          >
            whitescorpion.jp
          </a>
          <p className="contact-note">
            公式サイトのお問い合わせフォームからのみ受付（電話対応なし）
          </p>
          <p className="contact-note">
            土日祝・夜間のお問い合わせは翌営業日以降の返信
          </p>
        </section>
      </main>

      {/* ════════════════════════════════
          FOOTER
      ════════════════════════════════ */}
      <footer className="footer">
        <p className="footer-logo">I.W.S.P.</p>
        <p className="footer-copy">© IKEBUKURO WHITE SCORPION PROJECT / MMM</p>
      </footer>

      {/* ── プロフィールモーダル ── */}
      {selectedMember && (
        <div className="profile-modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="profile-modal-close" onClick={() => setSelectedMember(null)}>✕</button>
            <div className="profile-modal-body">
              <div className="profile-modal-image-wrap">
                <img
                  src={photoType === 'official' ? selectedMember.image : selectedMember.specialImage}
                  alt={selectedMember.name}
                  className="modal-profile-img"
                />
                {selectedMember.inactive && <span className="modal-inactive-badge">休養中</span>}
                
                <div className="photo-switcher">
                  <button
                    className={`switcher-btn ${photoType === 'official' ? 'active' : ''}`}
                    onClick={() => setPhotoType('official')}
                    style={{ '--col': selectedMember.color } as React.CSSProperties}
                  >
                    7秒のレジスタンス
                  </button>
                  <button
                    className={`switcher-btn ${photoType === 'special' ? 'active' : ''}`}
                    onClick={() => setPhotoType('special')}
                    style={{ '--col': selectedMember.color } as React.CSSProperties}
                  >
                    Corner of my heart
                  </button>
                </div>
              </div>
              <div className="profile-modal-info">
                <h3 className="profile-modal-name" style={{ color: selectedMember.color }}>
                  {selectedMember.name}
                </h3>
                <div className="profile-modal-meta">
                  <div className="meta-item">
                    <span className="meta-label">誕生日</span>
                    <span className="meta-value">{selectedMember.birthday}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">出身地</span>
                    <span className="meta-value pref-badge" style={{ backgroundColor: `${selectedMember.color}22`, color: selectedMember.color, borderColor: selectedMember.color }}>
                      📍 {selectedMember.birthplace}
                    </span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">メンバーカラー</span>
                    <span className="meta-value" style={{ color: selectedMember.color }}>
                      {selectedMember.colorName}
                    </span>
                  </div>
                </div>
                <div className="profile-modal-message-box">
                  <span className="message-title">MESSAGE</span>
                  <p className="profile-modal-message">{selectedMember.message}</p>
                </div>
                <div className="profile-modal-sns">
                  {selectedMember.sns.x && (
                    <a href={selectedMember.sns.x} target="_blank" rel="noopener noreferrer" className="sns-btn x">
                      X
                    </a>
                  )}
                  {selectedMember.sns.instagram && (
                    <a href={selectedMember.sns.instagram} target="_blank" rel="noopener noreferrer" className="sns-btn instagram">
                      Instagram
                    </a>
                  )}
                  {selectedMember.sns.tiktok && (
                    <a href={selectedMember.sns.tiktok} target="_blank" rel="noopener noreferrer" className="sns-btn tiktok">
                      TikTok
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
