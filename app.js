// 年
document.getElementById("year").textContent = new Date().getFullYear();

// Wallet 表示（差し替え可）
const WALLET = "0x17d5fc83b6900858617928808b356b7eec78deb2";
document.getElementById("addr").textContent = WALLET;
document.getElementById("addr").href = `https://polygonscan.com/address/${WALLET}`;

// 次回ドロップ情報（必要に応じて編集）
const drop = {
  title: "TOUGH DOG — Polygonal Grief",
  desc: "ポリゴン調の質感で感情を最小単位に分解するシリーズ。",
  dateJST: "2025-11-15 21:00 JST",
  chain: "Polygon",
  supply: 100,
  price: "0.02 ETH",
  image: "assets/hero.jpg",
  mintUrl: "",        // 開始時にURLを入れる
  marketUrl: ""       // 二次流通先
};
function setDrop(d){
  document.getElementById("dropTitle").textContent = d.title;
  document.getElementById("dropDesc").textContent  = d.desc;
  document.getElementById("dropDate").textContent  = d.dateJST;
  document.getElementById("dropChain").textContent = d.chain;
  document.getElementById("dropSupply").textContent= d.supply;
  document.getElementById("dropPrice").textContent = d.price;
  document.getElementById("dropImage").src        = d.image;
  const mint = document.getElementById("mintLink");
  const mkt  = document.getElementById("marketLink");
  if(d.mintUrl){ mint.href = d.mintUrl; mint.removeAttribute("aria-disabled"); }
  if(d.marketUrl){ mkt.href = d.marketUrl; mkt.removeAttribute("aria-disabled"); }
}
setDrop(drop);

// 作品ロード
async function loadWorks(){
  try{
    const res = await fetch("works.json",{cache:"no-store"});
    const items = await res.json();
    const g = document.getElementById("worksGrid");
    g.innerHTML = "";
    items.forEach(it=>{
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <img src="${it.image}" alt="${it.title}">
        <div class="meta">
          <h3>${it.title}</h3>
          <p>${it.year}・${it.medium}${it.edition?`・ED ${it.edition}`:""}</p>
          ${it.link?`<p><a href="${it.link}" target="_blank" rel="noopener">View</a></p>`:""}
        </div>`;
      g.appendChild(card);
    });
  }catch(e){
    console.error(e);
    document.getElementById("worksGrid").innerHTML = "<p>作品データを読み込めませんでした。</p>";
  }
}
loadWorks();
