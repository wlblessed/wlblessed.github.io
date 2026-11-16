// Catálogo WRBLESSED — lista de interesse, filtros e galeria.
// Dados estáticos: nenhum backend, nenhuma dependência.

const STORAGE_KEY = "wrblessed-list-v1";
// Lista vira mensagem pronta no WhatsApp da loja.
const WHATSAPP_NUMBER = "5531972014470";

const PRODUCTS = [
  {
    id: "regata-dri-fit",
    name: "Regata Dri Fit",
    category: "regatas",
    desc: "Malha dri fit lisa, alças finas.",
    sizes: ["M", "G", "GG"],
    art: "assets/produtos/regata-dri-fit-1.jpg",
    gallery: [
      "assets/produtos/regata-dri-fit-1.jpg",
      "assets/produtos/regata-dri-fit-2.jpg",
      "assets/produtos/regata-dri-fit-3.jpg",
      "assets/produtos/regata-dri-fit-4.jpg",
    ],
  },
  {
    id: "regata-canelada",
    name: "Regata Canelada",
    category: "regatas",
    desc: "Canelada, modelagem ajustada ao corpo.",
    sizes: ["P", "M", "G", "GG"],
    art: "assets/produtos/regata-canelada-1.jpg",
    gallery: [
      "assets/produtos/regata-canelada-1.jpg",
      "assets/produtos/regata-canelada-2.jpg",
      "assets/produtos/regata-canelada-3.jpg",
      "assets/produtos/regata-canelada-4.jpg",
    ],
  },
  {
    id: "camiseta-pima",
    name: "Camiseta Pima",
    category: "camisetas",
    desc: "Malha fio 40.1 com elastano, estampa bordada.",
    sizes: ["M", "G", "GG"],
    art: "assets/produtos/camiseta-pima-1.jpg",
    gallery: [
      "assets/produtos/camiseta-pima-1.jpg",
      "assets/produtos/camiseta-pima-2.jpg",
      "assets/produtos/camiseta-pima-3.jpg",
      "assets/produtos/camiseta-pima-4.jpg",
    ],
  },
  {
    id: "camisa-30-1",
    name: "Camisa Malha 30.1",
    category: "camisetas",
    desc: "Malha 30.1, estampas variadas.",
    sizes: ["M", "G", "GG"],
    art: "assets/produtos/camisa-30-1-1.jpg",
    gallery: [
      "assets/produtos/camisa-30-1-1.jpg",
      "assets/produtos/camisa-30-1-2.jpg",
      "assets/produtos/camisa-30-1-3.jpg",
      "assets/produtos/camisa-30-1-4.jpg",
      "assets/produtos/camisa-30-1-5.jpg",
      "assets/produtos/camisa-30-1-6.jpg",
    ],
  },
  {
    id: "camisa-tailandesa",
    name: "Camisa Tailandesa",
    category: "camisetas",
    desc: "Padrão tailandesa 1.1, tecido leve.",
    sizes: ["P", "M", "G", "GG", "G1"],
    art: "assets/produtos/camisa-tailandesa-1.jpg",
    gallery: [
      "assets/produtos/camisa-tailandesa-1.jpg",
      "assets/produtos/camisa-tailandesa-2.jpg",
    ],
  },
  {
    id: "camisa-lacoste-pima",
    name: "Camisa Lacoste Pima",
    category: "camisetas",
    desc: "Malha pima, com etiqueta e sacola.",
    sizes: ["M", "G", "GG"],
    art: "assets/produtos/camisa-lacoste-pima-1.jpg",
    gallery: [
      "assets/produtos/camisa-lacoste-pima-1.jpg",
      "assets/produtos/camisa-lacoste-pima-2.jpg",
      "assets/produtos/camisa-lacoste-pima-3.jpg",
      "assets/produtos/camisa-lacoste-pima-4.jpg",
      "assets/produtos/camisa-lacoste-pima-5.jpg",
      "assets/produtos/camisa-lacoste-pima-6.jpg",
    ],
  },
  {
    id: "polo-pique",
    name: "Polo Piquê",
    category: "polos",
    desc: "Piquê duplo com 3% de elastano.",
    sizes: ["G", "GG"],
    art: "assets/produtos/polo-pique-1.jpg",
    gallery: [
      "assets/produtos/polo-pique-1.jpg",
      "assets/produtos/polo-pique-2.jpg",
      "assets/produtos/polo-pique-3.jpg",
      "assets/produtos/polo-pique-4.jpg",
    ],
  },
  {
    id: "bermudao-elastano",
    name: "Bermudão Elastano",
    category: "bermudas",
    desc: "Bolso lateral e cordinha na cintura.",
    sizes: ["M", "G", "GG", "EXG"],
    art: "assets/produtos/bermudao-elastano-1.jpg",
    gallery: [
      "assets/produtos/bermudao-elastano-1.jpg",
      "assets/produtos/bermudao-elastano-2.jpg",
      "assets/produtos/bermudao-elastano-3.jpg",
      "assets/produtos/bermudao-elastano-4.jpg",
      "assets/produtos/bermudao-elastano-5.jpg",
      "assets/produtos/bermudao-elastano-6.jpg",
    ],
  },
  {
    id: "bermuda-elastano",
    name: "Bermuda Elastano",
    category: "bermudas",
    desc: "Bolso lateral, cordinha e símbolo emborrachado.",
    sizes: ["M", "G", "GG"],
    art: "assets/produtos/bermuda-elastano-1.jpg",
    gallery: [
      "assets/produtos/bermuda-elastano-1.jpg",
      "assets/produtos/bermuda-elastano-2.jpg",
      "assets/produtos/bermuda-elastano-3.jpg",
      "assets/produtos/bermuda-elastano-4.jpg",
      "assets/produtos/bermuda-elastano-5.jpg",
      "assets/produtos/bermuda-elastano-6.jpg",
    ],
  },
  {
    id: "short-praia",
    name: "Short Praia",
    category: "bermudas",
    desc: "Tactel, cordinha e bolso lateral.",
    sizes: ["M", "G", "GG"],
    art: "assets/produtos/short-praia-1.jpg",
    gallery: [
      "assets/produtos/short-praia-1.jpg",
      "assets/produtos/short-praia-2.jpg",
      "assets/produtos/short-praia-3.jpg",
      "assets/produtos/short-praia-4.jpg",
      "assets/produtos/short-praia-5.jpg",
      "assets/produtos/short-praia-6.jpg",
    ],
  },
  {
    id: "calca-jeans",
    name: "Calça Jeans",
    category: "calcas",
    desc: "Modelo jogador, lavagens variadas.",
    sizes: ["38", "40", "42", "44", "46", "48"],
    art: "assets/produtos/calca-jeans-1.jpg",
    gallery: [
      "assets/produtos/calca-jeans-1.jpg",
      "assets/produtos/calca-jeans-2.jpg",
      "assets/produtos/calca-jeans-3.jpg",
      "assets/produtos/calca-jeans-4.jpg",
      "assets/produtos/calca-jeans-5.jpg",
      "assets/produtos/calca-jeans-6.jpg",
    ],
  },
  {
    id: "conjunto-dry-fit",
    name: "Conjunto Dry Fit",
    category: "conjuntos",
    desc: "Camiseta e bermuda em dry fit.",
    sizes: ["P", "M", "G", "GG"],
    art: "assets/produtos/conjunto-dry-fit-1.jpg",
    gallery: [
      "assets/produtos/conjunto-dry-fit-1.jpg",
      "assets/produtos/conjunto-dry-fit-2.jpg",
      "assets/produtos/conjunto-dry-fit-3.jpg",
      "assets/produtos/conjunto-dry-fit-4.jpg",
      "assets/produtos/conjunto-dry-fit-5.jpg",
      "assets/produtos/conjunto-dry-fit-6.jpg",
    ],
  },
  {
    id: "corta-vento",
    name: "Corta Vento",
    category: "jaquetas",
    desc: "Símbolo refletivo e bolso lateral.",
    sizes: ["M", "G", "GG"],
    art: "assets/produtos/corta-vento-1.jpg",
    gallery: [
      "assets/produtos/corta-vento-1.jpg",
      "assets/produtos/corta-vento-2.jpg",
      "assets/produtos/corta-vento-3.jpg",
    ],
  },
];

const CATEGORIES = [
  ["tudo", "Tudo"],
  ["camisetas", "Camisetas"],
  ["polos", "Polos"],
  ["regatas", "Regatas"],
  ["bermudas", "Bermudas"],
  ["calcas", "Calças"],
  ["conjuntos", "Conjuntos"],
  ["jaquetas", "Jaquetas"],
];

const state = {
  category: "tudo",
  query: "",
  /** @type {{id:string,size:string,qty:number}[]} */
  list: loadList(),
  lightbox: { id: null, index: 0 },
};

const el = (sel) => document.querySelector(sel);
const grid = el("#grid");
const filters = el("#filters");
const emptyMsg = el("#empty");
const resultCount = el("#resultCount");
const listCount = el("#listCount");
const listItems = el("#listItems");
const drawer = el("#drawer");
const backdrop = el("#backdrop");
const toastEl = el("#toast");
const lightbox = el("#lightbox");
const lbImg = el("#lbImg");
const lbName = el("#lbName");
const lbCount = el("#lbCount");
const productById = (id) => PRODUCTS.find((p) => p.id === id);

/* ---------------- persistência ---------------- */

function loadList() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw)
      ? raw.filter((it) => it && productById(it.id) && it.qty > 0)
      : [];
  } catch {
    return [];
  }
}

function saveList() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.list));
  } catch {
    /* modo privado: segue só em memória */
  }
}

/* ---------------- catálogo ---------------- */

function visibleProducts() {
  const q = state.query.trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    const byCat = state.category === "tudo" || p.category === state.category;
    const byQuery = !q || `${p.name} ${p.desc} ${p.category}`.toLowerCase().includes(q);
    return byCat && byQuery;
  });
}

function renderFilters() {
  filters.innerHTML = CATEGORIES.map(
    ([id, label]) =>
      `<button class="chip" role="tab" type="button" data-cat="${id}" aria-selected="${id === state.category}">${label}</button>`
  ).join("");
}

function cardHTML(p) {
  const sizes = p.sizes
    .map(
      (s, i) =>
        `<button class="size" type="button" data-size="${s}" aria-pressed="${i === 0}">${s}</button>`
    )
    .join("");
  return `
    <article class="card" data-id="${p.id}">
      <button class="card-media" type="button" data-open="${p.id}" aria-label="Ver fotos de ${p.name}">
        <img src="${p.art}" alt="${p.name}" loading="lazy" width="400" height="480" />
        <span class="photos">${p.gallery.length} ${p.gallery.length > 1 ? "fotos" : "foto"}</span>
      </button>
      <div class="card-body">
        <p class="card-cat">${CATEGORIES.find(([id]) => id === p.category)?.[1] ?? p.category}</p>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="sizes">${sizes}</div>
        <button class="btn primary" type="button" data-add="${p.id}">Adicionar à lista</button>
      </div>
    </article>`;
}

function renderGrid() {
  const list = visibleProducts();
  grid.innerHTML = list.map(cardHTML).join("");
  emptyMsg.hidden = list.length > 0;
  const activeCat = CATEGORIES.find(([id]) => id === state.category)?.[1];
  const showCount = state.category !== "tudo" && Boolean(activeCat);
  resultCount.hidden = !showCount;
  resultCount.textContent = showCount ? `em ${activeCat}` : "";
}

/* ---------------- galeria ---------------- */

function openLightbox(id, index = 0) {
  const p = productById(id);
  if (!p) return;
  state.lightbox = { id, index };
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  paintLightbox();
  el("#lbClose").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = drawer.classList.contains("open") ? "hidden" : "";
  state.lightbox = { id: null, index: 0 };
}

function stepLightbox(delta) {
  const p = productById(state.lightbox.id);
  if (!p) return;
  const n = p.gallery.length;
  state.lightbox.index = (state.lightbox.index + delta + n) % n;
  paintLightbox();
}

function paintLightbox() {
  const p = productById(state.lightbox.id);
  if (!p) return;
  const i = state.lightbox.index;
  lbImg.src = p.gallery[i];
  lbImg.alt = `${p.name} — foto ${i + 1}`;
  lbName.textContent = p.name;
  lbCount.textContent = `${i + 1} / ${p.gallery.length}`;
  const multi = p.gallery.length > 1;
  lightbox.querySelectorAll("[data-lb-prev], [data-lb-next]").forEach((b) => {
    b.hidden = !multi;
  });
  lightbox.querySelectorAll("[data-lb-dot]").forEach((b) => {
    b.setAttribute("aria-current", String(Number(b.dataset.lbDot) === i));
  });
}

/* ---------------- lista de interesse ---------------- */

function listUnits() {
  return state.list.reduce((n, it) => n + it.qty, 0);
}

function addToList(id, size) {
  const key = state.list.find((it) => it.id === id && it.size === size);
  if (key) key.qty += 1;
  else state.list.push({ id, size, qty: 1 });
  saveList();
  renderList();
  const p = productById(id);
  toast(`${p.name} · ${size} na lista`);
}

function setQty(id, size, delta) {
  const it = state.list.find((x) => x.id === id && x.size === size);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) state.list = state.list.filter((x) => x !== it);
  saveList();
  renderList();
}

function renderList() {
  const units = listUnits();
  listCount.textContent = String(units);
  listCount.style.display = units ? "" : "none";

  if (!state.list.length) {
    listItems.innerHTML = `<p class="cart-empty">Sua lista está vazia.<br />Escolha as peças do catálogo.</p>`;
  } else {
    listItems.innerHTML = state.list
      .map((it, idx) => {
        const p = productById(it.id);
        if (!p) return "";
        return `
        <div class="cart-item" data-idx="${idx}">
          <img src="${p.art}" alt="" width="64" height="76" />
          <div>
            <h4>${p.name}</h4>
            <p class="meta">Tamanho ${it.size}</p>
            <div class="qty">
              <button type="button" data-dec="${idx}" aria-label="Diminuir quantidade">−</button>
              <span>${it.qty}</span>
              <button type="button" data-inc="${idx}" aria-label="Aumentar quantidade">+</button>
            </div>
          </div>
          <button class="remove" type="button" data-remove="${idx}">remover</button>
        </div>`;
      })
      .join("");
  }

  el("#checkout").disabled = state.list.length === 0;
}

function openList() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  el("#cartClose").focus();
}

function closeList() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.hidden = true;
  if (lightbox.hidden) document.body.style.overflow = "";
}

/* ---------------- pedido no WhatsApp ---------------- */

function buildOrderMessage() {
  const items = state.list.map((it) => {
    const p = productById(it.id);
    return `• ${it.qty}x ${p.name} — Tam ${it.size}`;
  });
  return [
    "Olá! Vi o catálogo da WRBLESSED e quero estas peças:",
    "",
    ...items,
    "",
    "Pode me confirmar disponibilidade, valores e como sigo?",
  ].join("\n");
}

function buildOrderUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage())}`;
}

function checkoutOnWhatsApp() {
  if (!state.list.length) {
    toast("Sua lista está vazia");
    return;
  }
  window.open(buildOrderUrl(), "_blank", "noopener");
  toast("Abrindo o WhatsApp com a lista");
}

/* ---------------- toast ---------------- */

let toastTimer = 0;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
}

/* ---------------- eventos ---------------- */

filters.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-cat]");
  if (!btn) return;
  state.category = btn.dataset.cat;
  filters.querySelectorAll(".chip").forEach((c) => {
    c.setAttribute("aria-selected", String(c === btn));
  });
  renderGrid();
});

document.querySelectorAll(".topnav a[data-cat]").forEach((a) => {
  a.addEventListener("click", () => {
    state.category = a.dataset.cat;
    state.query = "";
    el("#search").value = "";
    renderFilters();
    renderGrid();
  });
});

el("#search").addEventListener("input", (e) => {
  state.query = e.target.value;
  renderGrid();
});

grid.addEventListener("click", (e) => {
  const media = e.target.closest("[data-open]");
  if (media) {
    openLightbox(media.dataset.open, 0);
    return;
  }
  const sizeBtn = e.target.closest(".size");
  if (sizeBtn) {
    const card = sizeBtn.closest(".card");
    card.querySelector(".sizes").classList.remove("hint");
    card.querySelectorAll(".size").forEach((b) => {
      b.setAttribute("aria-pressed", String(b === sizeBtn));
    });
    return;
  }
  const addBtn = e.target.closest("[data-add]");
  if (!addBtn) return;
  const card = addBtn.closest(".card");
  const chosen = card.querySelector('.size[aria-pressed="true"]');
  if (!chosen) {
    card.querySelector(".sizes").classList.add("hint");
    toast("Escolha um tamanho primeiro");
    return;
  }
  addToList(addBtn.dataset.add, chosen.dataset.size);
});

lightbox.addEventListener("click", (e) => {
  if (e.target.closest("[data-lb-close]")) {
    closeLightbox();
    return;
  }
  if (e.target.closest("[data-lb-prev]")) {
    stepLightbox(-1);
    return;
  }
  if (e.target.closest("[data-lb-next]")) {
    stepLightbox(1);
    return;
  }
  const dot = e.target.closest("[data-lb-dot]");
  if (dot) {
    state.lightbox.index = Number(dot.dataset.lbDot);
    paintLightbox();
  }
});

listItems.addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const rem = e.target.closest("[data-remove]");
  if (inc) {
    const it = state.list[Number(inc.dataset.inc)];
    if (it) setQty(it.id, it.size, +1);
  } else if (dec) {
    const it = state.list[Number(dec.dataset.dec)];
    if (it) setQty(it.id, it.size, -1);
  } else if (rem) {
    const it = state.list[Number(rem.dataset.remove)];
    if (it) {
      state.list = state.list.filter((x) => x !== it);
      saveList();
      renderList();
    }
  }
});

el("#cartOpen").addEventListener("click", openList);
el("#cartClose").addEventListener("click", closeList);
el("#checkout").addEventListener("click", checkoutOnWhatsApp);
backdrop.addEventListener("click", closeList);

document.addEventListener("keydown", (e) => {
  if (!lightbox.hidden) {
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") stepLightbox(-1);
    else if (e.key === "ArrowRight") stepLightbox(1);
    return;
  }
  if (e.key === "Escape" && drawer.classList.contains("open")) closeList();
});

/* ---------------- boot ---------------- */

// Hero: troca entre as capas do catálogo, com fade suave.
const HERO_ARTS = [...new Set(PRODUCTS.map((p) => p.art))];
const HERO_INTERVAL_MS = 4500;
const HERO_FADE_MS = 280;

function rotateHero() {
  const img = document.getElementById("heroArt");
  if (!img || HERO_ARTS.length < 2) return;
  // Pré-carrega as capas para a troca não piscar vazio.
  HERO_ARTS.forEach((src) => {
    const pre = new Image();
    pre.src = src;
  });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let current = img.getAttribute("src");
  setInterval(() => {
    const pool = HERO_ARTS.filter((src) => src !== current);
    const next = pool[Math.floor(Math.random() * pool.length)];
    current = next;
    // sai em fade, troca o src no escuro, volta em fade
    img.classList.add("is-out");
    setTimeout(() => {
      img.src = next;
      const reveal = () => setTimeout(() => img.classList.remove("is-out"), 20);
      if (img.complete) reveal();
      else img.onload = reveal;
    }, HERO_FADE_MS);
  }, HERO_INTERVAL_MS);
}

rotateHero();

renderFilters();
renderGrid();
renderList();

// Superfície para teste manual no console / automação.
window.__shop = {
  products: PRODUCTS,
  state,
  addToList,
  setQty,
  renderGrid,
  renderList,
  openList,
  closeList,
  openLightbox,
  closeLightbox,
  stepLightbox,
  buildOrderMessage,
  buildOrderUrl,
  checkoutOnWhatsApp,
  selectCategory(cat) {
    state.category = cat;
    renderFilters();
    renderGrid();
  },
};
