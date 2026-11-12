(() => {
  "use strict";

  const MAX_ERRORS = 3;      // the 4th error ends the game
  const WIN_THRESHOLD = 8;   // correct answers needed to win

  const QUESTIONS = [
    {
      q: "¿Desde qué ciudad portuaria japonesa comienza nuestro recorrido y cuál fue su rol histórico frente al continente?",
      options: ["Tokio", "Fukuoka (puerta de entrada histórica para personas e ideas desde Corea y China)", "Kioto"],
      answer: 1,
    },
    {
      q: "¿Qué ruinas emblemáticas visitamos en Japón que sirvieron como base de operaciones para organizar la invasión a Corea en 1592?",
      options: ["El Palacio Gyeongbokgung", "Las ruinas del Castillo de Nagoya en Karatsu", "La Torre de Fukuoka"],
      answer: 1,
    },
    {
      q: "¿Qué medio de transporte internacional utilizamos para cruzar desde Fukuoka (Japón) hasta Busan (Corea del Sur)?",
      options: ["Un tren bala submarino (KTX)", "Un vuelo chárter directo", "Un ferry internacional"],
      answer: 2,
    },
    {
      q: "¿Cuál de estas ciudades surcoreanas elegimos en el circuito por ser escenario de los dos grandes asedios y albergar un importante museo de la guerra?",
      options: ["Jinju (con su histórica fortaleza y museo)", "Incheon", "Seúl"],
      answer: 0,
    },
    {
      q: "¿Cuál es el principal diferencial de “Imjin desde adentro” frente a otros viajes tradicionales a Asia?",
      options: [
        "Que solo se enfoca en la cultura pop y los K-dramas actuales.",
        "Que mantiene un relato neutral y equilibrado, mostrando las dos caras de la misma guerra histórica.",
        "Que dura menos de una semana.",
      ],
      answer: 1,
    },
    {
      q: "¿Qué palacio principal de la dinastía Joseon, ubicado en Seúl, fue destruido durante la guerra de Imjin y posteriormente reconstruido en el siglo XIX?",
      options: ["Palacio Changdeokgung", "Palacio Gyeongbokgung", "Palacio Deoksugung"],
      answer: 1,
    },
    {
      q: "¿Cuántos días dura en total el circuito turístico completo, contando los vuelos de ida y vuelta desde Argentina?",
      options: ["7 días", "14 días", "21 días"],
      answer: 1,
    },
    {
      q: "¿Cómo se llama el santuario ubicado en la zona de Dongnae (Busan) construido en memoria de quienes defendieron la ciudad durante el ataque?",
      options: ["Santuario Chungnyeolsa", "Templo Haedong Yonggungsa", "Templo Tocho-ji"],
      answer: 0,
    },
    {
      q: "Según la clasificación de la cartografía y el diseño de circuitos, ¿cómo se define este recorrido?",
      options: [
        "Regional, circular y general.",
        "Regional, internacional, temático (histórico) y lineal.",
        "Local, de aventura y circular.",
      ],
      answer: 1,
    },
    {
      q: "¿En qué hotel se aloja el grupo durante su estancia en la ciudad de Busan?",
      options: ["Okura Hotel Fukuoka", "Gwan Jang Hotel", "AMID Hotel Seoul"],
      answer: 1,
    },
    {
      q: "¿Cómo se llama el templo budista ubicado sobre el mar en el distrito de Gijang-gun que, según la tradición, fue destruido durante la invasión y reconstruido después?",
      options: ["Templo Tocho-ji", "Templo Haedong Yonggungsa", "Templo Bulguksa"],
      answer: 1,
    },
    {
      q: "¿Cómo se llama la empresa ficticia con sede en Tandil encargada de diseñar y operar el paquete turístico “Imjin desde adentro”?",
      options: ["Global Tours Tandil", "Andes y Asiana", "Tabi Viajes"],
      answer: 2,
    },
  ];

  const LETTERS = ["A", "B", "C", "D"];
  const KANJI_NUMBERS = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
  const PRAISE = ["¡Correcto!", "¡Excelente!", "¡Muy bien!", "¡Sugoi! すごい", "¡Daebak! 대박"];

  const SAKURA_SVG = `
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <g fill="#f08aa4" stroke="#c8102e" stroke-width="1">
        ${[0, 72, 144, 216, 288].map((deg) =>
          `<path transform="rotate(${deg} 20 20)" d="M20 20 C13 14 14 4 18 3 L20 6 L22 3 C26 4 27 14 20 20Z"/>`
        ).join("")}
      </g>
      <circle cx="20" cy="20" r="3.5" fill="#c9a24a"/>
    </svg>`;

  const STICKER_SVG = `
    <svg class="sticker" viewBox="0 0 220 220" role="img" aria-label="Sticker exclusivo Desafío Dos Orillas">
      <defs>
        <clipPath id="sticker-clip"><circle cx="110" cy="110" r="92"/></clipPath>
      </defs>
      <circle cx="110" cy="110" r="106" fill="#fff"/>
      <circle cx="110" cy="110" r="100" fill="#c9a24a"/>
      <g clip-path="url(#sticker-clip)">
        <rect x="0" y="0" width="220" height="220" fill="#f7f1e6"/>
        <circle cx="72" cy="92" r="34" fill="#c8102e"/>
        <g transform="translate(150 92) rotate(-30)">
          <circle r="30" fill="#0047a0"/>
          <path d="M-30 0 A30 30 0 0 1 30 0 A15 15 0 0 1 0 0 A15 15 0 0 0 -30 0Z" fill="#c8102e"/>
        </g>
        <path d="M0 150 Q27 135 55 150 T110 150 T165 150 T220 150 V220 H0Z" fill="#1b2a4a"/>
        <path d="M0 168 Q27 154 55 168 T110 168 T165 168 T220 168" fill="none" stroke="#f7f1e6" stroke-width="3" opacity=".5"/>
        <text x="110" y="188" text-anchor="middle" fill="#f7f1e6" font-family="Shippori Mincho, serif" font-weight="800" font-size="15">両岸 · 양안</text>
        <text x="111" y="140" text-anchor="middle" font-size="30">⛴</text>
      </g>
      <circle cx="110" cy="110" r="92" fill="none" stroke="#1b2a4a" stroke-width="3"/>
    </svg>`;

  // ---------- DOM ----------
  const $ = (id) => document.getElementById(id);
  const screens = { start: $("screen-start"), game: $("screen-game"), result: $("screen-result") };
  const el = {
    count: $("hud-count"),
    score: $("hud-score"),
    wake: $("route-wake"),
    ship: $("route-ship"),
    lives: $("lives"),
    card: $("card"),
    num: $("q-num"),
    text: $("q-text"),
    options: $("options"),
    feedback: $("feedback"),
    next: $("btn-next"),
    resultVisual: $("result-visual"),
    resultTitle: $("result-title"),
    resultScore: $("result-score"),
    resultText: $("result-text"),
  };

  // ---------- State ----------
  let state;

  function resetState() {
    state = { index: 0, correct: 0, errors: 0, answered: false };
  }

  function showScreen(name) {
    Object.entries(screens).forEach(([key, node]) => node.classList.toggle("is-active", key === name));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- Rendering ----------
  function renderLives() {
    el.lives.innerHTML = "";
    for (let i = 0; i < MAX_ERRORS; i++) {
      const life = document.createElement("span");
      life.className = "life" + (i < state.errors ? " is-lost" : "");
      life.innerHTML = SAKURA_SVG;
      el.lives.appendChild(life);
    }
    el.lives.setAttribute("aria-label", `Errores disponibles: ${Math.max(MAX_ERRORS - state.errors, 0)}`);
  }

  function renderProgress(completed) {
    const pct = (completed / QUESTIONS.length) * 100;
    el.wake.style.width = `${pct}%`;
    el.ship.style.left = `${pct}%`;
  }

  function renderHud() {
    el.count.textContent = `Pregunta ${state.index + 1} / ${QUESTIONS.length}`;
    el.score.textContent = `✓ ${state.correct}`;
  }

  function renderQuestion() {
    const item = QUESTIONS[state.index];
    state.answered = false;

    renderHud();
    renderProgress(state.index);

    el.num.textContent = KANJI_NUMBERS[state.index] || state.index + 1;
    el.text.textContent = item.q;
    el.feedback.textContent = "";
    el.feedback.className = "feedback";
    el.next.hidden = true;

    el.options.innerHTML = "";
    item.options.forEach((label, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.dataset.index = String(i);
      btn.innerHTML = `<span class="option__letter">${LETTERS[i]}</span><span class="option__label"></span>`;
      btn.querySelector(".option__label").textContent = label;
      btn.addEventListener("click", () => handleAnswer(i));
      el.options.appendChild(btn);
    });

    // restart entrance animation
    el.card.classList.remove("is-entering");
    void el.card.offsetWidth;
    el.card.classList.add("is-entering");
  }

  // ---------- Game flow ----------
  function handleAnswer(choice) {
    if (state.answered) return;
    state.answered = true;

    const item = QUESTIONS[state.index];
    const isCorrect = choice === item.answer;
    const buttons = [...el.options.querySelectorAll(".option")];

    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === item.answer) btn.classList.add("is-correct");
      else if (i === choice) btn.classList.add("is-wrong");
      else btn.classList.add("is-dim");
    });

    if (isCorrect) {
      state.correct++;
      el.feedback.textContent = PRAISE[Math.floor(Math.random() * PRAISE.length)];
      el.feedback.className = "feedback is-ok";
    } else {
      state.errors++;
      loseLife();
      const left = MAX_ERRORS - state.errors;
      el.feedback.textContent = left >= 0
        ? `Incorrecto. ${left === 0 ? "¡Ya no te quedan errores!" : `Te ${left === 1 ? "queda 1 error" : `quedan ${left} errores`}.`}`
        : "Incorrecto. ¡Se terminó el viaje!";
      el.feedback.className = "feedback is-bad";
    }

    renderHud();
    renderProgress(state.index + 1);

    const gameOver = state.errors > MAX_ERRORS;
    const isLast = state.index === QUESTIONS.length - 1;
    el.next.textContent = gameOver || isLast ? "Ver resultado" : "Siguiente";
    el.next.hidden = false;
    el.next.focus({ preventScroll: true });
    el.next.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function loseLife() {
    const lifeIndex = state.errors - 1;
    const life = el.lives.children[lifeIndex];
    if (life) life.classList.add("is-losing", "is-lost");
    el.lives.setAttribute("aria-label", `Errores disponibles: ${Math.max(MAX_ERRORS - state.errors, 0)}`);
  }

  function next() {
    const gameOver = state.errors > MAX_ERRORS;
    const isLast = state.index === QUESTIONS.length - 1;
    if (gameOver || isLast) {
      showResult(gameOver);
      return;
    }
    state.index++;
    renderQuestion();
  }

  function showResult(endedByErrors) {
    const won = !endedByErrors && state.correct >= WIN_THRESHOLD;
    el.resultScore.textContent = `${state.correct} de ${QUESTIONS.length} respuestas correctas`;

    if (won) {
      el.resultVisual.innerHTML = STICKER_SVG;
      el.resultTitle.textContent = "¡Ganaste!";
      el.resultText.textContent = "おめでとう · 축하해요 — Cruzaste las dos orillas con éxito. Te llevás el sticker exclusivo del Desafío Dos Orillas.";
    } else {
      el.resultVisual.innerHTML = `<div class="lose-mark" aria-hidden="true">再</div>`;
      el.resultTitle.textContent = "Fin del viaje";
      el.resultText.textContent = endedByErrors
        ? "Llegaste al 4.º error. ¡Repasá el recorrido y volvé a intentarlo!"
        : `Necesitabas ${WIN_THRESHOLD} aciertos para ganar el sticker. ¡Intentalo otra vez!`;
    }
    showScreen("result");
  }

  function startGame() {
    resetState();
    renderLives();
    renderQuestion();
    showScreen("game");
  }

  // ---------- Decorative petals ----------
  function spawnPetals() {
    const container = document.querySelector(".petals");
    const count = window.innerWidth < 640 ? 10 : 18;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${9 + Math.random() * 9}s`;
      p.style.animationDelay = `${-Math.random() * 18}s`;
      p.style.setProperty("--drift", `${(Math.random() * 160 - 80).toFixed(0)}px`);
      p.style.transform = `scale(${0.6 + Math.random() * 0.7})`;
      container.appendChild(p);
    }
  }

  // ---------- Exit / back to menu ----------
  const exitDialog = $("exit-dialog");

  function goToMenu() {
    resetState();
    showScreen("start");
    $("btn-play").focus({ preventScroll: true });
  }

  function askExit() {
    if (typeof exitDialog.showModal === "function") {
      exitDialog.showModal();
      $("btn-exit-cancel").focus();
    } else if (window.confirm("¿Cancelar la partida? Se perderá tu progreso.")) {
      goToMenu();
    }
  }

  // ---------- Loader ----------
  const MIN_LOADER_MS = 1200;
  const loaderStart = performance.now();

  function hideLoader() {
    const wait = Math.max(0, MIN_LOADER_MS - (performance.now() - loaderStart));
    setTimeout(() => {
      const loader = $("loader");
      loader.classList.add("is-hidden");
      loader.setAttribute("aria-hidden", "true");
      // timeout instead of transitionend: transitions are disabled under reduced motion
      setTimeout(() => loader.remove(), 600);
    }, wait);
  }

  // ---------- Init ----------
  $("btn-play").addEventListener("click", startGame);
  $("btn-retry").addEventListener("click", startGame);
  $("btn-menu").addEventListener("click", goToMenu);
  $("btn-exit").addEventListener("click", askExit);
  $("btn-exit-cancel").addEventListener("click", () => exitDialog.close());
  $("btn-exit-confirm").addEventListener("click", () => {
    exitDialog.close();
    goToMenu();
  });
  exitDialog.addEventListener("click", (e) => {
    if (e.target === exitDialog) exitDialog.close(); // tap on backdrop
  });
  el.next.addEventListener("click", next);
  spawnPetals();

  if (document.readyState === "complete") hideLoader();
  else window.addEventListener("load", hideLoader, { once: true });
})();
