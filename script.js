// --- 🐣 設定 ---
// 同じフォルダに compliments.json がある場合（相対パス）
const COMPLIMENTS_URL = "./compliments.json";

// --- 🧠 変数 ---
let compliments = [];

// --- 🌐 JSONファイルを読み込む ---
async function loadCompliments() {
  try {
    const response = await fetch(COMPLIMENTS_URL + "?t=" + new Date().getTime()); // キャッシュ回避
    compliments = await response.json();
    console.log("🐣 褒めリスト読み込み成功", compliments.length, "件");
  } catch (err) {
    console.error("🐣 褒めリスト読み込み失敗:", err);
    compliments = [
      "今日もよくやってるね☀️",
      "You did great today, really!",
      "ちゃんとここまで来たね🐣✨",
      "You’re doing amazing, keep going!",
      "深呼吸して、ひと休みしよう☕"
    ];
  }
}

// --- 🐥 ランダム褒めメッセージを取得 ---
function getRandomCompliment() {
  if (compliments.length === 0) return "🐣 Loading...";
  const randomIndex = Math.floor(Math.random() * compliments.length);
  return compliments[randomIndex];
}

// --- 🐣 クリックイベント ---
function handleClick() {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = getRandomCompliment();
  dropChick();
}

// --- 🌧️ ひよこをランダムに降らせる ---
function dropChick() {
  const chick = document.createElement("div");
  chick.textContent = "🐣";

  // 画面の横幅内でランダム位置に出現
  const x = Math.random() * window.innerWidth;
  chick.classList.add("chick");
  chick.style.left = `${x}px`;

  // アニメーション時間をランダムに
  const duration = 3 + Math.random() * 3; // 3〜6秒
  chick.style.animationDuration = `${duration}s`;

  document.body.appendChild(chick);

  // 落下後に削除
  setTimeout(() => chick.remove(), duration * 1000);
}

// --- 🚀 初期化 ---
window.addEventListener("DOMContentLoaded", async () => {
  await loadCompliments();

  const button = document.getElementById("clickButton");
  button.addEventListener("click", handleClick);
});
