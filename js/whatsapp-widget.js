// WhatsApp Widget JS
(() => {
  // Configuración
  const WHATSAPP_NUMBER = "+526182582819";
  const MESSAGE = encodeURIComponent("¡Hola! Vi tu portafolio y me gustaría contactarte.");
  const LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`;
  const BTN_TEXT = "WhatsApp";

  // Crear botón
  const btn = document.createElement("button");
  btn.className = "wa-contact-btn";
  btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"/></svg>`;
  btn.title = "Contáctame por WhatsApp";
  btn.onclick = () => {
    window.open(LINK, "_blank");
  };
  document.body.appendChild(btn);

  // Crear etiqueta flotante
  const label = document.createElement("div");

  label.className = "wa-contact-label";
  // Mensajes bilingües
  const labelMessages = [
    "¿Prefieres WhatsApp? ¡Contáctame directo!",
    "Prefer WhatsApp? Contact me directly!"
  ];
  let labelIndex = 0;
  let labelCycles = 0;
  const maxCycles = 5;
  label.innerText = labelMessages[labelIndex];

  // Botón de cerrar
  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.cssText = "position:absolute;top:8px;right:12px;cursor:pointer;font-size:1.2em;font-weight:bold;opacity:0.7;z-index:2;";
  closeBtn.title = "Cerrar";
  closeBtn.onclick = () => {
    label.style.display = "none";
    clearInterval(labelInterval);
  };
  label.style.position = "fixed";
  label.style.paddingRight = "32px";
  label.appendChild(closeBtn);
  document.body.appendChild(label);

  // Alternar mensajes con límite de ciclos
  function switchLabelText() {
    label.style.opacity = "0";
    setTimeout(() => {
      labelIndex = (labelIndex + 1) % labelMessages.length;
      label.innerText = labelMessages[labelIndex];
      label.appendChild(closeBtn);
      if (labelCycles < maxCycles * labelMessages.length - 1) {
        if (label.style.display !== "none") label.style.opacity = "1";
      }
    }, 400);
    labelCycles++;
    if (labelCycles >= maxCycles * labelMessages.length) {
      clearInterval(labelInterval);
    }
  }
  const labelInterval = setInterval(switchLabelText, 3500);

  // Mostrar/ocultar etiqueta
  function showLabel() {
    if (label.style.display !== "none") {
      label.style.opacity = "1";
      label.style.pointerEvents = "auto";
    }
  }
  function hideLabel() {
    if (label.style.display !== "none") {
      label.style.opacity = "0";
      label.style.pointerEvents = "none";
    }
  }
  btn.addEventListener("mouseenter", hideLabel);
  btn.addEventListener("mouseleave", showLabel);
  btn.addEventListener("focus", hideLabel);
  btn.addEventListener("blur", showLabel);

  // Posicionar botón y etiqueta
  function positionElements() {
    btn.style.position = "fixed";
    btn.style.right = "20px";
    btn.style.top = "20px";
    btn.style.zIndex = 9998;
    btn.style.background = "#25D366";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "50%";
    btn.style.width = "60px";
    btn.style.height = "60px";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    btn.style.cursor = "pointer";
    btn.style.transition = "background 0.2s";
    label.style.position = "fixed";
    label.style.right = "90px";
    label.style.top = "30px";
    label.style.background = "#075e54";
    label.style.color = "#fff";
    label.style.padding = "12px 20px";
    label.style.paddingRight = "32px";
    label.style.borderRadius = "16px";
    label.style.fontSize = "1rem";
    label.style.fontWeight = "500";
    label.style.boxShadow = "0 2px 12px rgba(0,0,0,0.18)";
    label.style.opacity = "1";
    label.style.pointerEvents = "auto";
    label.style.zIndex = 9999;
    label.style.maxWidth = "260px";
    label.style.textAlign = "left";
    label.style.lineHeight = "1.4";
    label.style.transition = "opacity 0.3s";
  }
  positionElements();
  window.addEventListener("resize", positionElements);
  showLabel();
})();
