// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Works load + filter
let ALL_ITEMS = [];
let ACTIVE_SERIES = "All";

function renderFilters(series){
  const box = document.getElementById("filters");
  const set = ["All", ...series];
  box.innerHTML = "";
  set.forEach(s => {
    const a = document.createElement("button");
    a.className = "btn" + (s === ACTIVE_SERIES ? " primary" : "");
    a.textContent = s;
    a.onclick = ()=>{ ACTIVE_SERIES = s; renderGrid(); renderFilters(series); };
    box.appendChild(a);
  });
}

function renderGrid(){
  const g = document.getElementById("worksGrid");
  g.innerHTML = "";
  const items = ALL_ITEMS
    .filter(it => ACTIVE_SERIES === "All" ? true : it.series === ACTIVE_SERIES)
    .sort((a,b)=> (b.priority||0)-(a.priority||0));
  items.forEach(it=>{
    const card = document.createElement("article");
    card.className = "card" + ((it.priority||0)>=90 ? " large" : "");
    card.innerHTML = `
      <img src="${it.image}" alt="${it.title}">
      <div class="meta">
        <h3>${it.title}</h3>
        <p>${it.year}・${it.medium}${it.edition?`・ED ${it.edition}`:""}${it.tags?`・${it.tags.join(", ")}`:""}</p>
        ${it.link?`<p><a href="${it.link}" target="_blank" rel="noopener">View</a></p>`:""}
      </div>`;
    g.appendChild(card);
  });
}

async function loadWorks(){
  try{
    const res = await fetch("works.json",{cache:"no-store"});
    const items = await res.json();
    ALL_ITEMS = items;
    const series = Array.from(new Set(items.map(i=>i.series))).filter(Boolean);
    renderFilters(series);
    renderGrid();
  }catch(e){
    console.error(e);
    document.getElementById("worksGrid").innerHTML = "<p>作品データを読み込めませんでした。</p>";
  }
}
loadWorks();
