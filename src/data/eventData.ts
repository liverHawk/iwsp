export interface Member {
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

export const memberList: Member[] = [
  {
    name: "ACE",
    color: "#5DC9FF",
    colorName: "ライトブルー",
    birthday: "11月6日",
    birthplace: "福岡県",
    image: "https://whitescorpion.jp/wp-content/uploads/2024/08/20260324_ACE_-–-1.jpg",
    specialImage: "https://whitescorpion.jp/special202509/images/ws_member_ace.jpg",
    message: "えーすです🐹すちゃんって呼ね~ 2006.11.6 福岡県出身 ライトブルー担当🩵 ラーンとハムスターとアイドルが好きです♡ 私のファンの方は『はむちゃんず』と呼んでいます♡あなたもぜひはむちゃんずになってね♡",
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

export const payments = [
  "現金",
  "VISA",
  "Mastercard",
  "JCB",
  "交通系IC",
  "iD",
  "QUICPay",
  "nanaco",
];

export const tokutenItems = [
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

export const notes = [
  "会場は屋外。雨具（カッパ等）は自己持参。観覧中の傘（日傘含む）使用禁止",
  "ジャンプ・サークルモッシュ・ダイブなど危険行為禁止",
  "サイリウム・タオルの大きな振り回し禁止",
  "飲酒状態での参加、入り待ち・出待ち、荷物による場所取り、深夜・早朝の待機すべて禁止",
  "会場内にロッカー・クロークなし。大きな荷物は駅などのコインロッカーを利用",
  "特典券の転売・第三者譲渡禁止",
  "小学生以下は20歳以上の保護者同伴必須",
];
