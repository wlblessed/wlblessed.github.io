// Catálogo WRBLESSED — estado da loja, filtros e sacola.
// Dados estáticos: nenhum backend, nenhuma dependência.

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const money = (n) => BRL.format(n);
const STORAGE_KEY = "wrblessed-cart-v1";
const FREE_SHIPPING = 299;
// Pedido vira mensagem pronta no WhatsApp da loja.
const WHATSAPP_NUMBER = "5531972014470";
// Chave Pix da loja (formato telefone). Trocar aqui quando a loja definir outra.
const PIX_KEY = "31972014470";
const MAX_INSTALLMENTS = 3;

/** @type {{id:string,name:string,category:string,price:number,oldPrice?:number,art:string,desc:string,sizes:string[],tag?:string}[]} */
const PRODUCTS = [
  {
    id: "camiseta-adidas-azul",
    name: "Camiseta Adidas Trefoil Azul",
    category: "camisetas",
    price: 149,
    art: "assets/produtos/camiseta-adidas-azul.jpg",
    desc: "Algodão macio, gola redonda e trefoil bordado no peito.",
    sizes: ["P", "M", "G", "GG"],
    tag: "Novo",
  },
  {
    id: "camiseta-ax-bege",
    name: "Camiseta AX Off-White",
    category: "camisetas",
    price: 159,
    art: "assets/produtos/camiseta-ax-bege.jpg",
    desc: "Estampa AX frontal em tom grafite, caimento reto.",
    sizes: ["P", "M", "G", "GG"],
  },
  {
    id: "camiseta-lacoste-preta",
    name: "Camiseta Lacoste Preta",
    category: "camisetas",
    price: 169,
    art: "assets/produtos/camiseta-lacoste-preta.jpg",
    desc: "Preta com logo crocodilo em silk, clássica e versátil.",
    sizes: ["P", "M", "G", "GG"],
  },
  {
    id: "kit-lacoste-tres-cores",
    name: "Kit Lacoste French Sportswear",
    category: "camisetas",
    price: 399,
    oldPrice: 447,
    art: "assets/produtos/kit-lacoste-tres-cores.jpg",
    desc: "Três camisetas: azul claro, marinho e off-white. Com etiqueta.",
    sizes: ["M", "G", "GG"],
    tag: "-11%",
  },
  {
    id: "polo-nautica-marinho",
    name: "Polo Náutica Marinho",
    category: "polos",
    price: 189,
    art: "assets/produtos/polo-nautica-marinho.jpg",
    desc: "Piquet marinho com faixa vermelha na manga e bordado no peito.",
    sizes: ["P", "M", "G", "GG"],
  },
  {
    id: "polo-lacoste-bege",
    name: "Polo Lacoste Beige",
    category: "polos",
    price: 219,
    art: "assets/produtos/polo-lacoste-bege.jpg",
    desc: "Bicolor bege e off-white, gola estruturada e crocodilo bordado.",
    sizes: ["P", "M", "G", "GG"],
    tag: "Novo",
  },
  {
    id: "polo-lacoste-azul",
    name: "Polo Lacoste Azul Croco",
    category: "polos",
    price: 229,
    art: "assets/produtos/polo-lacoste-azul.jpg",
    desc: "Azul claro com crocodilo grande aplicado na lateral.",
    sizes: ["P", "M", "G", "GG"],
  },
  {
    id: "conjunto-streetwear",
    name: "Conjunto Streetwear Estampado",
    category: "conjuntos",
    price: 259,
    art: "assets/produtos/conjunto-streetwear.jpg",
    desc: "Conjunto de camiseta e short em malha leve: xadrez, monograma ou floral.",
    sizes: ["P", "M", "G"],
  },
];

const CATEGORIES = [
  ["tudo", "Tudo"],
  ["camisetas", "Camisetas"],
  ["polos", "Polos"],
  ["conjuntos", "Conjuntos"],
];

const state = {
  category: "tudo",
  query: "",
  /** @type {{id:string,size:string,qty:number}[]} */
  cart: loadCart(),
  payment: "pix",
  installments: 1,
};

const el = (sel) => document.querySelector(sel);
const grid = el("#grid");
const filters = el("#filters");
const emptyMsg = el("#empty");
const resultCount = el("#resultCount");
const cartCount = el("#cartCount");
const cartItems = el("#cartItems");
const subtotalEl = el("#subtotal");
const shipNote = el("#shipNote");
const drawer = el("#drawer");
const backdrop = el("#backdrop");
const toastEl = el("#toast");
const payField = el("#pay");
const payExtra = el("#payExtra");

/* ---------------- persistência ---------------- */

function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw)
      ? raw.filter((it) => it && PRODUCTS.some((p) => p.id === it.id) && it.qty > 0)
      : [];
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
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
  const tag = p.tag
    ? `<span class="tag ${p.tag.startsWith("-") ? "sale" : ""}">${p.tag}</span>`
    : "";
  const old = p.oldPrice ? `<span class="old">${money(p.oldPrice)}</span>` : "";
  const sizes = p.sizes
    .map(
      (s, i) =>
        `<button class="size" type="button" data-size="${s}" aria-pressed="${i === 0}">${s}</button>`
    )
    .join("");
  return `
    <article class="card" data-id="${p.id}">
      <div class="card-media">
        <img src="${p.art}" alt="${p.name}" loading="lazy" width="400" height="480" />
        ${tag}
      </div>
      <div class="card-body">
        <p class="card-cat">${CATEGORIES.find(([id]) => id === p.category)?.[1] ?? p.category}</p>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="price-row"><span class="price">${money(p.price)}</span>${old}</div>
        <div class="sizes">${sizes}</div>
        <button class="btn primary" type="button" data-add="${p.id}">Adicionar</button>
      </div>
    </article>`;
}

function renderGrid() {
  const list = visibleProducts();
  grid.innerHTML = list.map(cardHTML).join("");
  emptyMsg.hidden = list.length > 0;
  resultCount.textContent = `${list.length} ${list.length === 1 ? "peça" : "peças"}${
    state.category === "tudo" ? "" : ` em ${CATEGORIES.find(([id]) => id === state.category)?.[1]}`
  }`;
}

/* ---------------- sacola ---------------- */

function cartTotal() {
  return state.cart.reduce((sum, it) => {
    const p = PRODUCTS.find((x) => x.id === it.id);
    return sum + (p ? p.price * it.qty : 0);
  }, 0);
}

function cartUnits() {
  return state.cart.reduce((n, it) => n + it.qty, 0);
}

function addToCart(id, size) {
  const key = state.cart.find((it) => it.id === id && it.size === size);
  if (key) key.qty += 1;
  else state.cart.push({ id, size, qty: 1 });
  saveCart();
  renderCart();
  const p = PRODUCTS.find((x) => x.id === id);
  toast(`${p.name} · ${size} na sacola`);
}

function setQty(id, size, delta) {
  const it = state.cart.find((x) => x.id === id && x.size === size);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) state.cart = state.cart.filter((x) => x !== it);
  saveCart();
  renderCart();
}

function renderCart() {
  const units = cartUnits();
  cartCount.textContent = String(units);
  cartCount.style.display = units ? "" : "none";

  if (!state.cart.length) {
    cartItems.innerHTML = `<p class="cart-empty">Sua sacola está vazia.<br />Escolha uma peça do catálogo.</p>`;
  } else {
    cartItems.innerHTML = state.cart
      .map((it, idx) => {
        const p = PRODUCTS.find((x) => x.id === it.id);
        if (!p) return "";
        return `
        <div class="cart-item" data-idx="${idx}">
          <img src="${p.art}" alt="" width="64" height="76" />
          <div>
            <h4>${p.name}</h4>
            <p class="meta">Tamanho ${it.size}</p>
            <p class="unit">${money(p.price * it.qty)}</p>
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

  const total = cartTotal();
  subtotalEl.textContent = money(total);
  const left = FREE_SHIPPING - total;
  shipNote.textContent = left > 0 ? `Faltam ${money(left)} para frete grátis.` : "Frete grátis liberado.";
  el("#checkout").disabled = state.cart.length === 0;
  renderPayment();
}

/* ---------------- pagamento ---------------- */

function installmentOptions(total) {
  const out = [];
  for (let n = 1; n <= MAX_INSTALLMENTS; n++) {
    const selected = n === state.installments ? "selected" : "";
    const label = total > 0 ? `${n}x de ${money(total / n)} sem juros` : `${n}x`;
    out.push(`<option value="${n}" ${selected}>${label}</option>`);
  }
  return out.join("");
}

function renderPayment() {
  const total = cartTotal();
  payField.querySelectorAll('input[name="pay"]').forEach((r) => {
    r.checked = r.value === state.payment;
  });

  if (state.payment === "pix") {
    payExtra.innerHTML = `
      <div class="pix">
        <p class="pay-label">Chave Pix (telefone)</p>
        <div class="pix-row">
          <code id="pixKey">${PIX_KEY}</code>
          <button class="copy" id="copyPix" type="button">copiar</button>
        </div>
        <p class="hint">Pague e envie o comprovante no WhatsApp.</p>
      </div>`;
  } else {
    payExtra.innerHTML = `
      <label class="inst">
        <span class="pay-label">Parcelas</span>
        <select id="instSel">${installmentOptions(total)}</select>
      </label>
      <p class="hint">A loja envia o link de pagamento no WhatsApp. Os dados do cartão não passam por aqui.</p>`;
  }
}

function openCart() {
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  el("#cartClose").focus();
}

function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  backdrop.hidden = true;
  document.body.style.overflow = "";
}

/* ---------------- pedido no WhatsApp ---------------- */

function buildOrderMessage() {
  const total = cartTotal();
  const items = state.cart.map((it) => {
    const p = PRODUCTS.find((x) => x.id === it.id);
    return `• ${it.qty}x ${p.name} — Tam ${it.size} — ${money(p.price * it.qty)}`;
  });
  const frete = total >= FREE_SHIPPING ? "grátis" : "a combinar";
  const pagamento =
    state.payment === "pix"
      ? "Pix (chave " + PIX_KEY + ")"
      : `Cartão de crédito — ${state.installments}x de ${money(total / state.installments)}`;
  return [
    "Olá! Quero fazer um pedido na WRBLESSED:",
    "",
    ...items,
    "",
    `Subtotal: ${money(total)}`,
    `Frete: ${frete}`,
    `Pagamento: ${pagamento}`,
    "",
    "Pode confirmar a disponibilidade e como sigo com o pagamento?",
  ].join("\n");
}

function buildOrderUrl() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage())}`;
}

function checkoutOnWhatsApp() {
  if (!state.cart.length) {
    toast("Sua sacola está vazia");
    return;
  }
  const url = buildOrderUrl();
  window.open(url, "_blank", "noopener");
  toast("Abrindo o WhatsApp com o pedido");
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
  addToCart(addBtn.dataset.add, chosen.dataset.size);
});

cartItems.addEventListener("click", (e) => {
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  const rem = e.target.closest("[data-remove]");
  if (inc) {
    const it = state.cart[Number(inc.dataset.inc)];
    if (it) setQty(it.id, it.size, +1);
  } else if (dec) {
    const it = state.cart[Number(dec.dataset.dec)];
    if (it) setQty(it.id, it.size, -1);
  } else if (rem) {
    const it = state.cart[Number(rem.dataset.remove)];
    if (it) {
      state.cart = state.cart.filter((x) => x !== it);
      saveCart();
      renderCart();
    }
  }
});

el("#cartOpen").addEventListener("click", openCart);
el("#cartClose").addEventListener("click", closeCart);
payField.addEventListener("change", (e) => {
  if (e.target.name !== "pay") return;
  state.payment = e.target.value;
  state.installments = 1;
  renderPayment();
});
payExtra.addEventListener("change", (e) => {
  if (e.target.id === "instSel") state.installments = Number(e.target.value);
});
payExtra.addEventListener("click", async (e) => {
  if (!e.target.closest("#copyPix")) return;
  try {
    await navigator.clipboard.writeText(PIX_KEY);
    toast("Chave Pix copiada");
  } catch {
    toast(`Chave Pix: ${PIX_KEY}`);
  }
});
el("#checkout").addEventListener("click", checkoutOnWhatsApp);
backdrop.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && drawer.classList.contains("open")) closeCart();
});

/* ---------------- boot ---------------- */

renderFilters();
renderGrid();
renderCart();

// Superfície para teste manual no console / automação.
window.__shop = {
  products: PRODUCTS,
  state,
  addToCart,
  setQty,
  renderGrid,
  renderCart,
  openCart,
  closeCart,
  buildOrderMessage,
  buildOrderUrl,
  checkoutOnWhatsApp,
  renderPayment,
  setPayment(method, installments = 1) {
    state.payment = method;
    state.installments = Math.min(MAX_INSTALLMENTS, Math.max(1, installments));
    renderPayment();
  },
  selectCategory(cat) {
    state.category = cat;
    renderFilters();
    renderGrid();
  },
};
