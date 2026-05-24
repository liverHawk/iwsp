import { db } from "./index";
import { cheers } from "./schema";

const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

async function main() {
  console.log("🌱 データベースのシード処理を開始します...");

  const data = prefectures.map((pref, index) => {
    const id = String(index + 1).padStart(2, "0"); // JISコードのID (01〜47)
    return {
      id,
      prefecture: pref,
      count: 0,
      updatedAt: new Date()
    };
  });

  try {
    // 既存のIDと競合した場合は何もしない（データを上書きしない）ようにする
    await db.insert(cheers).values(data).onConflictDoNothing();
    console.log("✅ 都道府県データのシード処理が正常に完了しました！ (計 47件)");
  } catch (error) {
    console.error("❌ シード処理中にエラーが発生しました:", error);
    process.exit(1);
  }
}

main();
