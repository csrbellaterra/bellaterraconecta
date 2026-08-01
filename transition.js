// ============================================
// BELLATERRA CONECTA — motor de transición "zoom a la puerta"
// Funciona en cualquier navegador moderno (CSS transform + clip-path,
// sin depender de la View Transitions API nativa, que Safari no
// soporta todavía). No necesita librerías externas.
//
// Simétrico en los dos sentidos:
//   home -> puerta:  zoomInto()      (dispara en el home)
//                     revealOnLoad() (recibe en la página de puerta)
//   puerta -> home:   zoomOutBack()  (dispara en la página de puerta)
//                     revealHomeOnLoad() (recibe en el home)
// ============================================

(function () {
  const OVERLAY_ID = "bc-zoom-overlay";
  const DURATION = 520; // ms, coincide con las transiciones CSS de abajo

  function ensureOverlay() {
    let el = document.getElementById(OVERLAY_ID);
    if (el) return el;
    el = document.createElement("div");
    el.id = OVERLAY_ID;
    el.innerHTML = `
      <div class="bc-zoom-color"></div>
      <img class="bc-zoom-img" alt="" />
    `;
    document.body.appendChild(el);
    return el;
  }

  // ---------- HOME -> PUERTA ----------

  function zoomInto({ x, y, color, image, href }) {
    const overlay = ensureOverlay();
    const colorEl = overlay.querySelector(".bc-zoom-color");
    const imgEl = overlay.querySelector(".bc-zoom-img");

    const maxDist = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const finalRadius = maxDist * 1.15;

    colorEl.style.background = color;
    colorEl.style.filter = "blur(0px)";
    colorEl.style.opacity = "1";
    colorEl.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    imgEl.style.opacity = "0";
    imgEl.style.filter = "blur(6px)";
    imgEl.src = image;

    overlay.classList.add("activo");
    overlay.offsetHeight; // forzar reflow

    colorEl.style.transition = `clip-path ${DURATION}ms cubic-bezier(.4,0,.2,1)`;
    colorEl.style.clipPath = `circle(${finalRadius}px at ${x}px ${y}px)`;

    imgEl.style.transition = `opacity ${DURATION * 0.7}ms ease ${DURATION * 0.25}ms, filter ${DURATION * 0.7}ms ease ${DURATION * 0.25}ms`;
    requestAnimationFrame(() => {
      imgEl.style.opacity = "1";
      imgEl.style.filter = "blur(0px)";
    });

    sessionStorage.setItem("bc-arrive-forward", "1");
    setTimeout(() => { window.location.href = href; }, DURATION + 60);
  }

  // Se llama al cargar la página de una puerta. Si se llegó desde el
  // home, arranca mostrando el overlay ya "abierto" y lo retira con
  // fundido para revelar la página real debajo.
  function revealOnLoad({ color, image }) {
    const came = sessionStorage.getItem("bc-arrive-forward");
    sessionStorage.removeItem("bc-arrive-forward");
    if (!came) return;

    const overlay = ensureOverlay();
    const colorEl = overlay.querySelector(".bc-zoom-color");
    const imgEl = overlay.querySelector(".bc-zoom-img");
    overlay.classList.add("activo");
    colorEl.style.background = color;
    colorEl.style.filter = "blur(0px)";
    colorEl.style.clipPath = "circle(150% at 50% 50%)";
    imgEl.src = image;
    imgEl.style.opacity = "1";
    imgEl.style.filter = "blur(0px)";

    requestAnimationFrame(() => {
      colorEl.style.transition = `opacity ${DURATION}ms ease`;
      imgEl.style.transition = `opacity ${DURATION}ms ease`;
      colorEl.style.opacity = "0";
      imgEl.style.opacity = "0";
      setTimeout(() => overlay.classList.remove("activo"), DURATION + 40);
    });
  }

  // ---------- PUERTA -> HOME ----------

  // Botón "volver": estallido con desenfoque creciente desde el botón,
  // y navega de vuelta al home guardando qué puerta hay que "cerrar".
  function zoomOutBack({ x, y, color, doorId, href }) {
    const overlay = ensureOverlay();
    const colorEl = overlay.querySelector(".bc-zoom-color");
    const imgEl = overlay.querySelector(".bc-zoom-img");
    imgEl.style.opacity = "0";
    colorEl.style.background = color;
    colorEl.style.opacity = "1";
    colorEl.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    colorEl.style.filter = "blur(0px)";
    overlay.classList.add("activo");
    overlay.offsetHeight;

    const maxDist = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    colorEl.style.transition = `clip-path ${DURATION}ms cubic-bezier(.4,0,.2,1), filter ${DURATION}ms ease`;
    colorEl.style.clipPath = `circle(${maxDist * 1.15}px at ${x}px ${y}px)`;
    colorEl.style.filter = "blur(10px)";

    sessionStorage.setItem("bc-arrive-back-door", doorId || "");
    sessionStorage.setItem("bc-arrive-back-color", color || "#1c2e22");
    setTimeout(() => { window.location.href = href; }, DURATION + 60);
  }

  // Se llama al cargar el home. Si se volvió desde una puerta, arranca
  // con el overlay a pantalla completa (desenfocado, color de esa
  // puerta) y lo encoge hasta el punto exacto de esa puerta en el
  // mapa, revelando el home debajo — el mismo viaje que a la ida, pero
  // al revés.
  function revealHomeOnLoad() {
    const doorId = sessionStorage.getItem("bc-arrive-back-door");
    const color = sessionStorage.getItem("bc-arrive-back-color") || "#1c2e22";
    sessionStorage.removeItem("bc-arrive-back-door");
    sessionStorage.removeItem("bc-arrive-back-color");
    if (!doorId) return;

    const overlay = ensureOverlay();
    const colorEl = overlay.querySelector(".bc-zoom-color");
    const imgEl = overlay.querySelector(".bc-zoom-img");
    imgEl.style.opacity = "0";
    colorEl.style.background = color;
    colorEl.style.opacity = "1";
    colorEl.style.filter = "blur(10px)";
    colorEl.style.clipPath = "circle(150% at 50% 50%)";
    overlay.classList.add("activo");
    overlay.offsetHeight;

    // Espera a que el home haya pintado sus 5 puntos antes de apuntar
    // el encogimiento al lugar exacto.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.querySelector(`[data-door-id="${doorId}"].door-dot`);
        const rect = target ? target.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        colorEl.style.transition = `clip-path ${DURATION}ms cubic-bezier(.4,0,.2,1), filter ${DURATION}ms ease`;
        colorEl.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        colorEl.style.filter = "blur(0px)";
        setTimeout(() => overlay.classList.remove("activo"), DURATION + 60);
      });
    });
  }

  // El bug del botón "atrás" del navegador (no el nuestro): cuando el
  // usuario navega con los controles nativos del navegador, Chrome/
  // Safari suelen restaurar la página desde bfcache (memoria) tal cual
  // quedó justo antes de salir — es decir, a mitad de nuestra propia
  // animación, con el overlay a pantalla completa y sin que el resto
  // de scripts se vuelvan a ejecutar. Eso es lo que se veía como una
  // "página intermedia sin salida". pageshow con persisted=true nos
  // avisa de esa restauración y limpiamos el overlay al instante.
  window.addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    const overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) return;
    overlay.classList.remove("activo");
    const colorEl = overlay.querySelector(".bc-zoom-color");
    const imgEl = overlay.querySelector(".bc-zoom-img");
    [colorEl, imgEl].forEach((el) => {
      if (!el) return;
      el.style.transition = "none";
      el.style.clipPath = "";
      el.style.opacity = "";
      el.style.filter = "";
    });
  });

  window.BCTransition = { zoomInto, revealOnLoad, zoomOutBack, revealHomeOnLoad };
})();
