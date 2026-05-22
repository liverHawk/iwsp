import { useState, useEffect } from "react";
import flyerImg from "./assets/flyer.jpg";
import artistImg from "./assets/artist.jpg";
import charImg from "./assets/char.png";
import "./App.css";

interface Member {
  name: string;
  color: string;
  colorName: string;
  birthday: string;
  birthplace: string;
  image: string;
  specialImage: string;
  message: string;
  sns: {
    x?: string;
    instagram?: string;
    tiktok?: string;
  };
  inactive?: boolean;
}

const memberList: Member[] = [
  {
    name: "ACE",
    color: "#5DC9FF",
    colorName: "ライトブルー",
    birthday: "11月6日",
    birthplace: "福岡県",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_ACE_-–-1.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_ace.jpg",
    message: "えーすです🐹すちゃんって呼んでね~ 2006.11.6 福岡県出身 ライトブルー担当🩵 ラーメンとハムスターとアイドルが好きです♡ 私のファンの方は『はむちゃんず』と呼んでいます♡あなたもぜひはむちゃんずになってね♡",
    sns: {
      x: "https://twitter.com/ACE_whsp",
      instagram: "https://instagram.com/ACE_whsp_IG",
      tiktok: "https://www.tiktok.com/@su.___.uu"
    }
  },
  {
    name: "ACO",
    color: "#FF9400",
    colorName: "オレンジ",
    birthday: "5月30日",
    birthplace: "岡山県",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_ACO_-–-2.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_aco.jpg",
    message: "岡山県出身21歳あこだよー！ ファンネームはア国民✨ 見た目はクールだけど実はよく喋るしニコニコ(^-^) よく転ぶ抜けてる面もあるけど、パフォーマンスでは可愛さとかっこよさを使い分けてます！ 乃木坂46さん、ドラえもん、アーニャ、ラーメンが好き♡ あこのことよろしくね〜",
    sns: {
      x: "https://twitter.com/ACO_whsp",
      instagram: "https://instagram.com/ACO_whsp_IG",
      tiktok: "https://www.tiktok.com/@aco_530"
    }
  },
  {
    name: "ALLY",
    color: "#0051D8",
    colorName: "ブルー",
    birthday: "4月17日",
    birthplace: "京都府",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_ALLY_-–-3.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_ally.jpg",
    message: "ALLYです🦂 京都府出身でメンバーカラーはブルーです！最年長のお姉さん担当でお洋服が好きです👗 ホワスピはライブではクールな印象ですが、話すと明るい子ばかりです！ 楽しませる自信があるので是非1度会いに来ませんか？🤍",
    sns: {
      x: "https://x.com/ALLY_whsp_",
      instagram: "https://instagram.com/ALLY_whsp_IG",
      tiktok: "https://www.tiktok.com/@ally_whsp"
    }
  },
  {
    name: "AOI",
    color: "#06B05F",
    colorName: "グリーン",
    birthday: "10月13日",
    birthplace: "東京都",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_AOI_-–-4.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_aoi.jpg",
    message: "AOIです！2004年10月13日生まれ of B型。 たれ目・声・えくぼがチャームポイント。 趣味は舞台観劇やアニメ映画、空を見ること。 特技は爪楊枝まつ毛乗せと「叩いて被ってじゃんけんぽん」。 歌も踊りも大好きです！ わたしのこと覚えてくれたら嬉しいです！",
    sns: {
      x: "https://twitter.com/AOI_whsp",
      instagram: "https://instagram.com/AOI_whsp_IG",
      tiktok: "https://www.tiktok.com/@___aoi_s2"
    }
  },
  {
    name: "CHOCO",
    color: "#FFADE6",
    colorName: "ライトピンク",
    birthday: "12月27日",
    birthplace: "東京都",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_CHOCO_-–-5.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_choco.jpg",
    message: "東京都出身北海道育ち！18歳！ライトピンク担当！ CHOCOです🍫🎀 アニメやゲームなど2次元が大好きで、コスプレをしたり、痛バや自作PCも組んでるよ～ 食べる事も大好き🍚 可愛いモード of ホワイトチョコも、毒舌モード of ダークチョコも愛してね♡",
    sns: {
      x: "https://twitter.com/CHOCO_whsp",
      instagram: "https://instagram.com/CHOCO_whsp_IG",
      tiktok: "https://www.tiktok.com/@choco._.nyan"
    }
  },
  {
    name: "COCO",
    color: "#DED300",
    colorName: "イエロー",
    birthday: "3月18日",
    birthplace: "北海道",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_COCO_-–-6.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_coco.jpg",
    message: "WHITE SCORPION の北海道出身19歳COCOです。 シルバニアファミリー集めとパン屋さん巡りが大好きです。 ステージ場で1番小さいのがわたしなので見つけてみてください〜！！ ホワスピのこと大好きになってくれたら嬉しいです。",
    sns: {
      x: "https://twitter.com/COCO_whsp",
      instagram: "https://instagram.com/COCO_whsp_IG",
      tiktok: "https://www.tiktok.com/@ohayo_cocodayo"
    }
  },
  {
    name: "HANNA",
    color: "#E50104",
    colorName: "レッド",
    birthday: "12月17日",
    birthplace: "兵庫県",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_HANNA_-–-7.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_hanna.jpg",
    message: "おハンナ！最年少16歳、最高身長167cmのHANNAです🐰 兵庫県出身でゲーム大好き、いちご、グミが大好きです🍓 パフォーマンスと日常のギャップを見て欲しいです！ ハンナがみんなの妹になります！沢山見ててね👀♡",
    sns: {
      x: "https://twitter.com/HANNA_whsp",
      instagram: "https://instagram.com/HANNA_whsp_IG",
      tiktok: "https://www.tiktok.com/@usagi._.93"
    }
  },
  {
    name: "MOMO",
    color: "#AFE311",
    colorName: "ライトグリーン",
    birthday: "12月7日",
    birthplace: "東京都",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_MOMO_-–-8.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_momo.jpg",
    message: "東京都出身19歳のMOMOです🍑 ♡ホワスピのほわほわ感担当 ♡アイドル大好き ♡ちょっぴり世間知らず ♡特技はフィギュアスケートとアクション もものこと好きになって欲しいの🎀",
    sns: {
      x: "https://twitter.com/MOMO_whsp",
      instagram: "https://instagram.com/MOMO_whsp_IG",
      tiktok: "https://www.tiktok.com/@momo_whsp_"
    }
  },
  {
    name: "NATSU",
    color: "#AF43C9",
    colorName: "パープル",
    birthday: "7月16日",
    birthplace: "神奈川県",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_NATSU_-–-9.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_natsu.jpg",
    message: "神奈川県出身21歳のNATSUです！ ホワスピのメロい担当。 低音イケメンボイスであなたのハートを射抜くこと間違いなし！ 感性豊かでメンバー一の泣き虫。ブログが道徳の教科書の様。 たまにネジが外れて親父ギャグを連発する。",
    sns: {
      x: "https://twitter.com/NATSU_whsp",
      instagram: "https://instagram.com/NATSU_whsp_IG",
      tiktok: "https://www.tiktok.com/@imnatsuwhsp"
    }
  },
  {
    name: "NAVI",
    color: "#502793",
    colorName: "バイオレット",
    birthday: "3月20日",
    birthplace: "岡山県",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_NAVI_-–-10.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_navi.jpg",
    message: "初めましてNAVIです！岡山県出身22歳♡ パフォーマンスピカイチで担当カラーはバイオレット💜 韓国語もペラペラです！趣味はセルフネイルやファッションなどたくさん✨ 今見てくれてるあなたにはNAVI・ホワスピを選んで欲しいなっ！会いに来てね🤍",
    sns: {
      x: "https://twitter.com/NAVI_whsp",
      instagram: "https://instagram.com/NAVI_whsp_IG",
      tiktok: "https://www.tiktok.com/@your_naviiii"
    }
  },
  {
    name: "NICO",
    color: "#FF4292",
    colorName: "ピンク",
    birthday: "5月23日",
    birthplace: "富山県",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_NICO_-–-11.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_nico.jpg",
    message: "ホワスピのNICOです❤ 富山県/21歳です✩ よく笑うのでニコです(*^^*) 海！山！川！自然大好き！ いつか私の運転でメンバーとピクニックへ行きたい！ またすぐに会えるかな？☺ 会える日を願って今日よりもレベルアップするね！❤",
    sns: {
      x: "https://twitter.com/NICO_whsp",
      instagram: "https://instagram.com/NICO_whsp_IG",
      tiktok: "https://www.tiktok.com/@smile_.nico"
    }
  }
];
const payments = [
  "現金",
  "VISA",
  "Mastercard",
  "JCB",
  "交通系IC",
  "iD",
  "QUICPay",
  "nanaco",
];

const tokutenItems = [
  {
    title: "全員ハイタッチ会",
    body: "友だち招待キャンペーンの参加券のみで参加可（通常特典券では参加不可）",
    ticket: null,
  },
  {
    title: "撮影可能ハイタッチ会",
    body: "片手でハイタッチしながらもう片手で自分のスマホ純正カメラアプリで動画撮影可能。画面録画機能OFF必須",
    ticket: "特典券 1枚",
  },
  {
    title: "2ショット撮影会",
    body: "希望メンバー1名との2ショット。自分のスマホでスタッフが撮影",
    ticket: "特典券 2枚",
  },
  {
    title: "ペア握手会",
    body: "指定ペア握手レーンのいずれかに1回参加可",
    ticket: "特典券 1枚",
  },
];

const notes = [
  "会場は屋外。雨具（カッパ等）は自己持参。観覧中の傘（日傘含む）使用禁止",
  "ジャンプ・サークルモッシュ・ダイブなど危険行為禁止",
  "サイリウム・タオルの大きな振り回し禁止",
  "飲酒状態での参加、入り待ち・出待ち、荷物による場所取り、深夜・早朝の待機すべて禁止",
  "会場内にロッカー・クロークなし。大きな荷物は駅などのコインロッカーを利用",
  "特典券の転売・第三者譲渡禁止",
  "小学生以下は20歳以上の保護者同伴必須",
];

function SectionLabel({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <p className={`section-label ${accent ? "accent" : ""}`}>{children}</p>
  );
}

function useCountdown() {
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

  return timeLeft;
}

function CountdownBanner() {
  const timeLeft = useCountdown();
  const pad = (num: number) => String(num).padStart(2, "0");

  if (timeLeft.isOver) {
    return (
      <div className="countdown-banner ended">
        <span className="countdown-banner-pulse" />
        <span className="countdown-banner-text">RELEASE EVENT STARTED!</span>
      </div>
    );
  }

  return (
    <div className="countdown-banner">
      <span className="countdown-banner-label">5.30 RELEASE EVENT</span>
      <div className="countdown-banner-timer">
        <span className="countdown-banner-num">{pad(timeLeft.days)}</span>
        <span className="countdown-banner-unit">d</span>
        <span className="countdown-banner-sep">:</span>
        <span className="countdown-banner-num">{pad(timeLeft.hours)}</span>
        <span className="countdown-banner-unit">h</span>
        <span className="countdown-banner-sep">:</span>
        <span className="countdown-banner-num">{pad(timeLeft.minutes)}</span>
        <span className="countdown-banner-unit">m</span>
        <span className="countdown-banner-sep">:</span>
        <span className="countdown-banner-num">{pad(timeLeft.seconds)}</span>
        <span className="countdown-banner-unit">s</span>
      </div>
    </div>
  );
}

function CountdownTimer() {
  const timeLeft = useCountdown();

  if (timeLeft.isOver) {
    return (
      <div className="countdown-container ended">
        <span className="countdown-ended-text">RELEASE EVENT STARTED!</span>
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

function App() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [photoType, setPhotoType] = useState<'official' | 'special'>('official');

  return (
    <div className="page">
      <CountdownBanner />

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
