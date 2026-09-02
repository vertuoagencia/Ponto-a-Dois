/* ============================================================
   Entre Nós — Lógica do jogo
   JavaScript puro. Sem frameworks.
   Estrutura de dados em arrays/objetos para fácil edição.
   ============================================================ */

(function () {
  "use strict";

  /* ============================================================
     1. DADOS — Categorias, intensidades, cartas e posições
     Para adicionar conteúdo, basta inserir novos itens nos
     arrays abaixo. Cada carta: { cat, int, icon, text }.
     ============================================================ */


const CATEGORIES = [
  {
    id: "beijos",
    name: "Beijos",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    `
  },

  {
    id: "intimidade",
    name: "Intimidade",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>
      </svg>
    `
  },

  {
    id: "desafios",
    name: "Desafios",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
      </svg>
    `
  },

  {
    id: "posicoes",
    name: "Posições",
    icon: `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="2"
           stroke-linecap="round"
           stroke-linejoin="round">
        <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
        <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/>
        <path d="M12 4v6"/>
        <path d="M2 18h20"/>
      </svg>
    `
  }
];

  


  const INTENSITIES = [
    {
      id: "leve",
      name: "Leve"
    },
  
    {
      id: "picante",
      name: "Picante"
    },
  
    {
      id: "intenso",
      name: "Intenso"
    }
  ];

  // Helper para criar cartas
  const card = (cat, int, icon, text) => ({ cat, int, icon, text });

  const CARDS = [
  // ---- BEIJOS / Leve ----
  card("beijos", "leve", "beijos", "Dê um beijo demorado e molhado no seu parceiro, usando a língua."),
  card("beijos", "leve", "beijos", "Beije e sugue o pescoço do seu parceiro, deixando uma marca."),
  card("beijos", "leve", "beijos", "Beije a boca do seu parceiro passando a língua nos lábios dele(a)."),
  card("beijos", "leve", "beijos", "Beije e morda o lábio inferior do seu parceiro com vontade."),

  // ---- BEIJOS / Picante ----
  card("beijos", "picante", "beijos", "Faça um beijo grego: língua contra língua, profundo e molhado, por 1 minuto."),
  card("beijos", "picante", "beijos", "Beije todo o corpo do seu parceiro, da boca até a região íntima, descendo devagar."),
  card("beijos", "picante", "beijos", "Beije e lamba os mamilos do seu parceiro enquanto se beijam."),
  card("beijos", "picante", "beijos", "Troque beijos quentes e profundos enquanto se tocam por baixo da roupa."),

  // ---- BEIJOS / Intenso ----
  card("beijos", "intenso", "beijos", "Faça um beijo grego intenso enquanto toca a intimidade do seu parceiro com a mão."),
  card("beijos", "intenso", "beijos", "Beije a boca do seu parceiro enquanto faz sexo oral nele(a)."),
  card("beijos", "intenso", "beijos", "Beijem-se com língua e saliva, sem parar, enquanto fazem amor."),

  // ---- INTIMIDADE / Leve ----
  card("intimidade", "leve", "intimidade", "Sussurre no ouvido do seu parceiro o que você quer fazer com ele(a) esta noite."),
  card("intimidade", "leve", "intimidade", "Diga três coisas que você adora no corpo do seu parceiro."),
  card("intimidade", "leve", "intimidade", "Descreva em detalhes a primeira vez que sentiu desejo pelo seu parceiro."),
  card("intimidade", "leve", "intimidade", "Olhe nos olhos e diga o que você sente quando ele(a) goza."),

  // ... restante das cartas
];

  // ---- Posições de casal (descrição textual, sem nudez) ----
  // Cada: { name, desc, difficulty (1-3), intimacy (1-3), shape (id da silhueta) }
  const POSITIONS = [
    { name: "Conchinha", desc: "Deitados de lado, um atrás do outro, encaixados como colheres. Permite penetração vaginal ou anal com intimidade e aconchego.", difficulty: 1, intimacy: 3, shape: "spoon" },
    { name: "Olhos nos Olhos", desc: "Um de frente para o outro, deitados de lado. Permite beijos profundos, carícias e conexão visual durante a penetração.", difficulty: 1, intimacy: 3, shape: "face" },
    { name: "Missão Serena", desc: "Um por cima do outro, frente a frente. Clássica, permite penetração profunda, beijos e contato total dos corpos.", difficulty: 2, intimacy: 3, shape: "missionary" },
    { name: "Cavaleira", desc: "Um sentado, o outro no colo de frente. Quem está por cima controla o ritmo e a profundidade da penetração.", difficulty: 2, intimacy: 3, shape: "lap" },
    { name: "Encontro Sentado", desc: "Sentados frente a frente, pernas entrelaçadas. Ritmo lento, penetração profunda e muito contato visual.", difficulty: 2, intimacy: 3, shape: "seated" },
    { name: "Costas com Carinho", desc: "Um de quatro, o outro por trás. Permite penetração vaginal ou anal com controle total do ritmo.", difficulty: 2, intimacy: 2, shape: "back" },
    { name: "Equilíbrio Profundo", desc: "Um deitado na borda da cama, o outro em pé. Profundidade máxima na penetração, com apoio e intensidade.", difficulty: 3, intimacy: 2, shape: "edge" },
    { name: "Abraço em Pé", desc: "Em pé, um sustenta o outro contra a parede. Paixão, força e penetração intensa e espontânea.", difficulty: 3, intimacy: 3, shape: "wall" },
    { name: "Sessenta e Nove", desc: "Deitados de lado, um de cabeça para os pés do outro. Sexo oral simultâneo, com prazer mútuo.", difficulty: 2, intimacy: 3, shape: "seated" },
    { name: "Cavalgada Reversa", desc: "Um deitado, o outro por cima de costas. Visão diferente e controle total do ritmo para quem está por cima.", difficulty: 2, intimacy: 2, shape: "lap" },
  ];

  /* ============================================================
     2. SILHUETAS — SVGs abstratos e estilizados (sem nudez)
     ============================================================ */
  const SILHOUETTES = {
    spoon: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20 28c8 0 12 6 12 14s-4 14-12 14"/><path d="M40 28c8 0 12 6 12 14s-4 14-12 14"/><circle cx="22" cy="22" r="5"/><circle cx="42" cy="22" r="5"/></svg>',
    face: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="28" cy="26" r="6"/><circle cx="52" cy="26" r="6"/><path d="M28 36c0 14 0 22 0 26"/><path d="M52 36c0 14 0 22 0 26"/><path d="M28 50c4 4 16 4 24 0"/></svg>',
    missionary: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="40" cy="18" r="6"/><path d="M40 26c0 12 0 20 0 28"/><path d="M22 40c10 4 26 4 36 0"/><path d="M22 54c10 2 26 2 36 0"/></svg>',
    lap: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="40" cy="16" r="5"/><path d="M40 22c0 10 0 18 0 24"/><path d="M24 30c8 6 24 6 32 0"/><path d="M24 46h32"/></svg>',
    seated: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="24" cy="24" r="5"/><circle cx="56" cy="24" r="5"/><path d="M24 30c0 14 0 22 0 28"/><path d="M56 30c0 14 0 22 0 28"/><path d="M24 44c8 6 16 6 32 0"/></svg>',
    back: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="28" cy="22" r="5"/><circle cx="52" cy="22" r="5"/><path d="M28 28c0 12 0 20 0 28"/><path d="M52 28c0 12 0 20 0 28"/><path d="M28 40c8 2 16 2 24 0"/></svg>',
    edge: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="30" cy="18" r="5"/><path d="M30 24c0 10 0 18 0 26"/><path d="M14 50h52"/><path d="M14 50c0 6 0 12 0 16"/><path d="M66 50c0 6 0 12 0 16"/></svg>',
    wall: '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M14 10v60"/><circle cx="40" cy="20" r="5"/><path d="M40 26c0 10 0 18 0 26"/><path d="M40 36c-10 0-20 0-26 0"/><path d="M40 52c-10 0-20 0-26 0"/></svg>',
  };

  /* ============================================================
     3. ESTADO + localStorage
     ============================================================ */
  const STORAGE_KEY = "entre-nos-settings-v1";

  const defaultSettings = {
    categories: ["beijos", "intimidade", "desafios", "posicoes"],
    intensity: "picante",
    player1: "",
    player2: "",
  };

  let state = {
    settings: loadSettings(),
    // jogo
    deck: [],        // baralho filtrado atual
    drawIndex: 0,    // próxima posição do deck embaralhado
    round: 1,
    cardNum: 0,
    score: 0,
    turn: 1,         // 1 ou 2
    currentCard: null,
  };

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultSettings };
      const parsed = JSON.parse(raw);
      const merged = { ...defaultSettings, ...parsed };
      // Migração: categorias antigas "romance", "picante" e "surpresa" foram removidas
      if (Array.isArray(merged.categories)) {
        const removed = ["romance", "picante", "surpresa"];
        const hasOld = merged.categories.some((c) => removed.includes(c));
        if (hasOld) {
          merged.categories = merged.categories.filter((c) => !removed.includes(c));
          if (!merged.categories.includes("intimidade")) merged.categories.push("intimidade");
        }
      }
      return merged;
    } catch {
      return { ...defaultSettings };
    }
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings));
    } catch { /* ignore */ }
  }

  /* ============================================================
     4. UTILITÁRIOS
     ============================================================ */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function catById(id) { return CATEGORIES.find((c) => c.id === id); }
  function intById(id) { return INTENSITIES.find((i) => i.id === id); }

  function showToast(msg, ms = 2200) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => t.classList.remove("is-show"), ms);
  }

  /* ============================================================
     5. NAVEGAÇÃO ENTRE TELAS
     ============================================================ */
  function goTo(screenName) {
    $$(".screen").forEach((s) => s.classList.remove("is-active"));
    const target = $(`.screen[data-screen="${screenName}"]`);
    if (target) target.classList.add("is-active");

    if (screenName === "game") startGame();
    if (screenName === "positions") renderPositions();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openModal(name) {
    const m = $(`.modal[data-modal="${name}"]`);
    if (m) m.classList.add("is-open");
  }
  function closeModal() {
    $$(".modal.is-open").forEach((m) => m.classList.remove("is-open"));
  }

  /* ============================================================
     6. TELA DE CONFIGURAÇÃO — render e interação
     ============================================================ */
  function renderSetup() {
    // Categorias
    const catWrap = $("#categoryChips");
    catWrap.innerHTML = "";
    CATEGORIES.forEach((cat) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (state.settings.categories.includes(cat.id) ? " is-selected" : "");
      chip.dataset.cat = cat.id;
      chip.innerHTML = `<span class="chip-icon">${cat.icon}</span>
      <span class="chip-name">${cat.name}</span>
      `;
      chip.addEventListener("click", () => toggleCategory(cat.id));
      catWrap.appendChild(chip);
    });

    // Intensidade
    const intWrap = $("#intensityGrid");
    intWrap.innerHTML = "";
    INTENSITIES.forEach((it) => {
    const opt = document.createElement("button");
    opt.type = "button";
    opt.className =
      "int-opt" +
      (state.settings.intensity === it.id ? " is-selected" : "");
    opt.dataset.int = it.id;
    opt.innerHTML = `
      <span class="int-checkbox"></span>
      <span class="int-name">${it.name}</span>
    `;
    opt.addEventListener("click", () => setIntensity(it.id));
    intWrap.appendChild(opt);
  });

    // Nomes
    $("#player1Name").value = state.settings.player1;
    $("#player2Name").value = state.settings.player2;
  }

  function toggleCategory(id) {
    const list = state.settings.categories;
    const idx = list.indexOf(id);
    if (idx >= 0) {
      if (list.length <= 1) { showToast("Escolha ao menos uma categoria."); return; }
      list.splice(idx, 1);
    } else {
      list.push(id);
    }
    saveSettings();
    renderSetup();
  }

  function setIntensity(id) {
    state.settings.intensity = id;
    saveSettings();
    renderSetup();
  }

  function bindPlayerInputs() {
    $("#player1Name").addEventListener("input", (e) => {
      state.settings.player1 = e.target.value.trim();
      saveSettings();
    });
    $("#player2Name").addEventListener("input", (e) => {
      state.settings.player2 = e.target.value.trim();
      saveSettings();
    });
  }

  /* ============================================================
     7. JOGO — baralho, sorteio, ações
     ============================================================ */
  function buildDeck() {
    const cats = state.settings.categories;
    const intId = state.settings.intensity;
    // Permite todas as intensidades até o nível escolhido (crescente)
    const intOrder = ["leve", "picante", "intenso"];
    const maxIdx = intOrder.indexOf(intId);
    const allowedInts = intOrder.slice(0, maxIdx + 1);

    const filtered = CARDS.filter(
      (c) => cats.includes(c.cat) && allowedInts.includes(c.int)
    );
    return shuffle(filtered);
  }

  function startGame() {
    state.deck = buildDeck();
    if (state.deck.length === 0) {
      showToast("Nenhuma carta para essas escolhas. Ajuste as categorias.");
      goTo("setup");
      return;
    }
    state.drawIndex = 0;
    state.round = 1;
    state.cardNum = 0;
    state.score = 0;
    state.turn = 1;
    drawCard(true);
  }

  function drawCard(noAnim) {
    // Reembaralha se acabou
    if (state.drawIndex >= state.deck.length) {
      state.deck = shuffle(state.deck);
      state.drawIndex = 0;
    }
    const c = state.deck[state.drawIndex];
    state.drawIndex++;
    state.currentCard = c;
    state.cardNum++;
    renderCard(c, noAnim);
    updateHUD();
    updateTurn();
  }
  
  function getCategoryTotal(categoryId) {
    return state.deck.filter(card => card.cat === categoryId).length;
  }
  
 function renderCard(c, noAnim) {
  const el = $("#gameCard");
  const cat = catById(c.cat);
  const int = intById(c.int);
  const apply = () => {
    /* =========================================
       CATEGORIA
       ========================================= */
    $("#cardCategoryName").textContent =
      cat ? cat.name : c.cat;
    $("#cardCategoryIcon").innerHTML =
      cat ? cat.icon : "";
    /* =========================================
       INTENSIDADE
       ========================================= */
    $("#cardIntensity").textContent =
      int ? int.name : c.int;
    /* =========================================
       ÍCONE / IMAGEM CENTRAL
       ========================================= */
    const iconEl = $("#cardIcon");
    /*
     * Posições usam imagem.
     * As outras categorias usam o ícone da categoria.
     */
    if (c.cat === "posicoes") {
      if (c.positionImage) {
        iconEl.innerHTML = `
          <img
            src="${c.positionImage}"
            alt="${c.positionName || "Posição"}"
            class="card-position-image"
          >
        `;
      } else {
        iconEl.innerHTML = `
          <div class="card-position-placeholder">
            Posição
          </div>
        `;
      }
    } else {
      iconEl.innerHTML = cat ? cat.icon : "";
    }
    /* =========================================
       TEXTO
       ========================================= */
    $("#cardText").textContent = c.text;
    /* =========================================
       CONTADOR
       ========================================= */
    $("#cardIndex").textContent = state.cardNum;
    $("#cardTotal").textContent =
      getCategoryTotal(c.cat);
  };
  if (noAnim) {
    apply();
    el.classList.remove(
      "is-flip-in",
      "is-flip-out"
    );
    return;
  }
  el.classList.remove("is-flip-in");
  el.classList.add("is-flip-out");
  setTimeout(() => {
    apply();
    el.classList.remove("is-flip-out");
    el.classList.add("is-flip-in");
  }, 280);
}

  function updateHUD() {
    $("#roundCount").textContent = state.round;
    $("#scoreCount").textContent = state.score;
  }

  function updateTurn() {
    const isPlayer1 = state.turn === 1;
  
    const name = isPlayer1
      ? state.settings.player1 || "Jogador 1"
      : state.settings.player2 || "Jogador 2";
  
    const el = $("#turnName");
    const avatar = $("#turnAvatar");
  
    // Atualiza o nome
    el.textContent = name;
  
    // Atualiza a cor do nome
    el.classList.toggle("p1", isPlayer1);
    el.classList.toggle("p2", !isPlayer1);
  
    // Atualiza a cor do ícone
    avatar.classList.toggle("p1", isPlayer1);
    avatar.classList.toggle("p2", !isPlayer1);
  }

  function nextTurn() {
    state.turn = state.turn === 1 ? 2 : 1;
    state.round++;
  }

  // ---- Ações ----
  function actionNext() {
    nextTurn();
    drawCard();
  }

  function actionAnother() {
    state.cardNum--; // não conta como jogada nova no índice
    drawCard();
    showToast("Nova carta sorteada.");
  }

  function actionSkip() {
    nextTurn();
    drawCard();
    showToast("Carta pulada.");
  }

  function actionScore() {
    state.score += 10;
    updateHUD();
    showToast("Desafio concluído! +10 pontos");
    burstParticles();
  }

  function actionRestart() {
    state.round = 1;
    state.cardNum = 0;
    state.score = 0;
    state.turn = 1;
    state.deck = buildDeck();
    state.drawIndex = 0;
    drawCard(true);
    showToast("Jogo reiniciado.");
  }

  /* ============================================================
     8. POSIÇÕES — render
     ============================================================ */
  function renderPositions() {
    const grid = $("#positionsGrid");
    grid.innerHTML = "";
    POSITIONS.forEach((p) => {
      const cardEl = document.createElement("article");
      cardEl.className = "pos-card glass";

      const diffDots = dots(p.difficulty);
      const intDots = dots(p.intimacy);

      cardEl.innerHTML = `
        <div class="pos-silhouette" style="color: var(--red-300)">${SILHOUETTES[p.shape] || ""}</div>
        <h3 class="pos-name">${p.name}</h3>
        <p class="pos-desc">${p.desc}</p>
        <div class="pos-meta">
          <div class="pos-meta-item">
            <span class="pos-meta-label">Dificuldade</span>
            <span class="pos-dots">${diffDots}</span>
          </div>
          <div class="pos-meta-item">
            <span class="pos-meta-label">Intimidade</span>
            <span class="pos-dots">${intDots}</span>
          </div>
        </div>
      `;
      grid.appendChild(cardEl);
    });
  }

  function dots(n) {
    let out = "";
    for (let i = 0; i < 3; i++) {
      out += `<span class="pos-dot${i < n ? " on" : ""}"></span>`;
    }
    return out;
  }

  /* ============================================================
     9. PARTÍCULAS / CONFETES
     ============================================================ */
  const canvas = $("#particles");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function burstParticles() {
    const colors = ["#e91e63", "#9c27b0", "#ff6b9d", "#c084fc", "#fff5f8"];
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: 3 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.012 + Math.random() * 0.01,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2,
      });
    }
  }

  function tickParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08; // gravidade
      p.vx *= 0.99;
      p.life -= p.decay;
      p.rot += p.vr;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      ctx.restore();
    }
    requestAnimationFrame(tickParticles);
  }
  tickParticles();

  /* ============================================================
     10. BIND DE EVENTOS
     ============================================================ */
  function bindEvents() {
    // Navegação por data-goto
    $$("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => goTo(btn.dataset.goto));
    });
    // Modais
    $$("[data-open-modal]").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.dataset.openModal));
    });
    $$("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", closeModal);
    });
    // Ações do jogo
    $("#nextBtn").addEventListener("click", actionNext);
    $("#anotherBtn").addEventListener("click", actionAnother);
    $("#skipBtn").addEventListener("click", actionSkip);
    $("#scoreBtn").addEventListener("click", actionScore);
    $("#restartBtn").addEventListener("click", actionRestart);

    // Tecla ESC fecha modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ============================================================
     11. INIT
     ============================================================ */
  function init() {
    renderSetup();
    bindPlayerInputs();
    bindEvents();
    // Garante tela inicial ativa
    $$(".screen").forEach((s) => s.classList.remove("is-active"));
    $(".screen--home").classList.add("is-active");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
