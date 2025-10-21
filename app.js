document.getElementById("year").textContent = new Date().getFullYear();

let ALL_ITEMS = [];

function renderGrid(){
  const g = document.getElementById("worksGrid");
  g.innerHTML = "";
  ALL_ITEMS.sort((a,b)=> (b.priority||0)-(a.priority||0)).forEach(it=>{
    const card = document.createElement("a");
    card.className = "card large";
    card.href = it.link || "#";
    card.innerHTML = `
      <img src="/${it.image}?v=5" alt="${it.title}">
      <div class="meta">
        <h3>${it.title}</h3>
        <p>${it.year}・${it.medium}${it.edition?`・ED ${it.edition}`:""}</p>
      </div>`;
    g.appendChild(card);
  });
}

fetch("/works.json?v=5",{cache:"no-store"})
  .then(r=>r.json())
  .then(items=>{ ALL_ITEMS = items; renderGrid(); })
  .catch(()=>{ document.getElementById("worksGrid").innerHTML = "<p>読み込み失敗</p>"; });
