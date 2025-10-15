(() => {
  // 🔧 CONFIGURACIÓN
  const BOT_ID = "webdev"; // Cambia esto según el bot que uses
  const BACKEND_URL = "https://bots-ai-websites.onrender.com"; // Cambia a tu URL de producción
  const ENDPOINT = `${BACKEND_URL}/api/webchat/${BOT_ID}/message`;
  const BOT_NAME = "Personal AI Agent"; // Cambia según el bot

  // UserId persistente por visitante
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random()*16|0, v = c=='x'?r:(r&0x3|0x8);
      return v.toString(16);
    });
  }
  let userId = localStorage.getItem(`${BOT_ID}_user_id`);
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem(`${BOT_ID}_user_id`, userId);
  }


  // Crear botón
  const btn = document.createElement("button");
  btn.className = "angel-chat-btn";
  btn.innerHTML = "💬";
  btn.title = `Chat con ${BOT_NAME}`;
  document.body.appendChild(btn);

  // Crear etiqueta flotante
  const label = document.createElement("div");
  label.className = "angel-chat-label";
  // Bilingual label messages
  const labelMessages = [
    "¡Prueba mi agente de IA personal! Pregunta sobre mí, mi experiencia o mis proyectos.",
    "Try my personal AI agent! Ask about me, my experience, or my projects."
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
        if (!chatOpen && label.style.display !== "none") label.style.opacity = "1";
      }
    }, 400);
    labelCycles++;
    if (labelCycles >= maxCycles * labelMessages.length) {
      clearInterval(labelInterval);
    }
  }
  const labelInterval = setInterval(switchLabelText, 3500);

  // Mostrar/ocultar etiqueta según el estado del chat
  let chatOpen = false;
  function showLabel() {
    if (!chatOpen) {
      label.style.opacity = "1";
      label.style.pointerEvents = "auto";
    }
  }
  function hideLabel() {
    label.style.opacity = "0";
    label.style.pointerEvents = "none";
  }
  btn.addEventListener("mouseenter", () => { if (!chatOpen) hideLabel(); });
  btn.addEventListener("mouseleave", () => { if (!chatOpen) showLabel(); });
  btn.addEventListener("focus", () => { if (!chatOpen) hideLabel(); });
  btn.addEventListener("blur", () => { if (!chatOpen) showLabel(); });

  // Ocultar la etiqueta al abrir el chat

  // Crear ventana
  const win = document.createElement("div");
  win.className = "angel-chat-window";
  win.innerHTML = `
    <div class="angel-chat-header">
      <span>${BOT_NAME}</span>
    </div>
    <div class="angel-chat-messages" id="angel-messages"></div>
    <div class="angel-chat-input">
      <textarea id="angel-input" rows="1" placeholder="Escribe un mensaje..."></textarea>
      <button class="angel-send" id="angel-send">➤</button>
    </div>
  `;
  document.body.appendChild(win);

  const messagesEl = win.querySelector("#angel-messages");
  const inputEl = win.querySelector("#angel-input");
  const sendBtn = win.querySelector("#angel-send");

  // Botón de cerrar (X) para el chat
  const closeChatBtn = document.createElement("span");
  closeChatBtn.innerHTML = "&times;";
  closeChatBtn.title = "Cerrar chat";
  closeChatBtn.style.cssText = "position:absolute;right:18px;font-size:2rem;cursor:pointer;z-index:10;color:#fff;opacity:0.7;transition:opacity 0.2s;";
  closeChatBtn.addEventListener("mouseenter",()=>closeChatBtn.style.opacity="1");
  closeChatBtn.addEventListener("mouseleave",()=>closeChatBtn.style.opacity="0.7");
  closeChatBtn.addEventListener("click",()=>{
    win.classList.remove("angel-chat-open");
    setTimeout(()=>{
      win.style.display = "none";
      chatOpen = false;
      showLabel();
    }, 350);
  });
  win.appendChild(closeChatBtn);

  // Toggle ventana (sin focus automático en móvil)
  function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  }
  btn.addEventListener("click", () => {
    const opening = win.style.display === "none";
    if (opening) {
      win.style.display = "flex";
      setTimeout(()=>win.classList.add("angel-chat-open"), 10);
      chatOpen = true;
      hideLabel();
      // Solo focus automático en desktop
      if (!isMobile()) {
        inputEl.focus();
      }
    } else {
      win.classList.remove("angel-chat-open");
      setTimeout(()=>{
        win.style.display = "none";
        chatOpen = false;
        showLabel();
      }, 350);
    }
  });
  // Ajustar alto del chat dinámicamente en móvil cuando aparece el teclado
  if (isMobile()) {
    let initialVH = window.innerHeight;
    function adjustChatHeight() {
      // Cuando el teclado aparece, window.innerHeight disminuye
      const vh = window.innerHeight;
      win.style.height = Math.min(550, vh - 40) + "px";
    }
    window.addEventListener("resize", adjustChatHeight);
    // Restaurar alto al cerrar el teclado
    inputEl.addEventListener("blur", () => {
      win.style.height = "550px";
    });
  }

  // Posicionar la etiqueta cerca del botón
  function positionLabel() {
    const btnRect = btn.getBoundingClientRect();
    label.style.position = "fixed";
    label.style.right = (window.innerWidth - btnRect.right + 70) + "px";
    label.style.bottom = (window.innerHeight - btnRect.top - 10) + "px";
  }
  positionLabel();
  window.addEventListener("resize", positionLabel);

  // Mostrar la etiqueta por defecto
  showLabel();

  // Mensaje inicial de bienvenida y explicación
  function addWelcomeMessages() {
    const welcomeES =
      "\nEste es un agente IA que implementé para mi portafolio. " +
      "\nPuede responder preguntas sobre mí, mis experiencias y mis proyectos. " +
      "\nPuedes escribir en español o inglés, pero trata de mantener el mismo idioma durante la conversación. " +
      "\nEl Agente solo funciona dentro de esta página.";
    const welcomeEN =
      "\nThis is an AI agent I built for my portfolio. " +
      "\nIt can answer questions about me, my experience, and my projects. " +
      "\nYou can write in English or Spanish, but try to keep the same language during the conversation. " +
      "\nIf the Agent answers in Spanish just ask it to speak in english specifically before your first message" +
      "\nThe agent only works within this page.";
    addMessage(welcomeES, "bot");
    addMessage(welcomeEN, "bot");
  }
  // Agregar mensajes de bienvenida al cargar el chat
  addWelcomeMessages();

  // Helpers UI
  // Convierte Markdown simple (*, **) a HTML

  function markdownToHtml(text) {
    // Enlaces: [texto](url)
    let html = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
    // Listas con asterisco o guion al inicio de línea
    html = html.replace(/(^|\n)[\*\-] (.*?)(?=\n|$)/g, '$1<li>$2</li>');
    // Si hay <li>, envolver en <ul>
    if (/<li>/.test(html)) {
      html = html.replace(/((<li>.*?<\/li>\s*)+)/gs, '<ul>$1</ul>');
    }
    // Negrita **texto**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Cursiva *texto*
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Saltos de línea
    html = html.replace(/\n/g, '<br>');
    return html;
  }

  function addMessage(text, who = "bot") {
    const msg = document.createElement("div");
    msg.className = `angel-msg ${who}`;
    const bubble = document.createElement("div");
    bubble.className = `bubble ${who}`;
    bubble.innerHTML = markdownToHtml(text);
    msg.appendChild(bubble);
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function addTyping() {
    const t = document.createElement("div");
    t.className = "angel-msg bot angel-typing";
    t.id = "angel-typing";
    t.innerHTML = `<div class="bubble bot">Escribiendo...</div>`;
    messagesEl.appendChild(t);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function removeTyping() {
    const t = document.getElementById("angel-typing");
    if (t) t.remove();
  }

  // Enviar mensaje
  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = "";
    addMessage(text, "user");
    addTyping();

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message: text })
      });
      const data = await res.json();
      removeTyping();
      if (data.reply) {
        addMessage(data.reply, "bot");
      } else {
        addMessage("Error al procesar la respuesta.", "bot");
      }
    } catch (err) {
      console.error(err);
      removeTyping();
      addMessage("Error de conexión con el servidor.", "bot");
    }
  }

  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

})();
