import { useState } from "react";
import flyerImg from "./assets/flyer.jpg";
import artistImg from "./assets/artist.jpg";
import charImg from "./assets/char.png";
import "./App.css";

// Type & Static Data Imports
import { type Member, memberList, payments, tokutenItems, notes } from "./data/eventData";

// Component Imports
import SectionLabel from "./components/SectionLabel";
import CountdownTimer from "./components/CountdownTimer";
import SiteHeader from "./components/SiteHeader";

function App() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [photoType, setPhotoType] = useState<'official' | 'special'>('official');

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
              >
                <div className="member-card-img-wrap">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  {member.inactive && <span className="inactive-badge">休養中</span>}
                </div>
                <div className="member-card-info">
                  <span className="member-card-name" style={{ color: member.color }}>{member.name}</span>
                </div>
              </div>
            ))}
          </div>
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
                    <span className="meta-value">{selectedMember.birthplace}</span>
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
