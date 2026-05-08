/**
 * Chatbot — Google Gemini 2.0 Flash + base de conocimiento.
 */
(function () {
  var DEFAULT_MODEL = "gemini-2.0-flash";
  var FALLBACK_MODELS = ["gemini-2.0-flash", "gemini-2.0-flash-lite", "gemini-1.5-pro"];

  var messagesEl;
  var form;
  var input;
  var sendBtn;
  var typingEl;
  var history = [];
  var maxTurns = 12;

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function appendBubble(text, role, trustedHtml) {
    var div = document.createElement("div");
    div.className = "chat-bubble chat-bubble--" + (role === "user" ? "user" : "bot");
    if (role === "user") {
      div.textContent = text;
    } else if (trustedHtml) {
      div.innerHTML = text;
    } else {
      div.innerHTML = escapeHtml(text).replace(/\n/g, "<br>");
    }
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setTyping(on) {
    if (!typingEl) return;
    typingEl.hidden = !on;
  }

  function getApiKey() {
    return (window.ENV && window.ENV.GEMINI_API_KEY) || "";
  }

  function getModel() {
    return (window.ENV && window.ENV.GEMINI_MODEL) || DEFAULT_MODEL;
  }

  function getApiUrl(model) {
    return "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";
  }

  function normalizeModelName(name) {
    if (!name) return "";
    return String(name).replace(/^models\//, "");
  }

  function getListModelsUrl(key) {
    return "https://generativelanguage.googleapis.com/v1beta/models?key=" + encodeURIComponent(key);
  }

  async function fetchSupportedModels(key) {
    try {
      var res = await fetch(getListModelsUrl(key), { method: "GET" });
      if (!res.ok) return [];
      var data = await res.json().catch(function () {
        return {};
      });
      var models = data.models || [];
      return models
        .filter(function (m) {
          return (
            m &&
            Array.isArray(m.supportedGenerationMethods) &&
            m.supportedGenerationMethods.indexOf("generateContent") !== -1
          );
        })
        .map(function (m) {
          return normalizeModelName(m.name);
        })
        .filter(Boolean);
    } catch (_err) {
      return [];
    }
  }

  function unique(arr) {
    var out = [];
    var seen = {};
    arr.forEach(function (item) {
      if (!item || seen[item]) return;
      seen[item] = true;
      out.push(item);
    });
    return out;
  }

  function trimHistory() {
    while (history.length > maxTurns * 2) {
      history.shift();
    }
  }

  async function sendToGemini() {
    var key = getApiKey();
    var preferred = normalizeModelName(getModel());
    var supported = await fetchSupportedModels(key);
    var candidates = unique([preferred].concat(FALLBACK_MODELS).concat(supported));

    var systemText =
      typeof KNOWLEDGE_BASE_CONTEXT !== "undefined"
        ? KNOWLEDGE_BASE_CONTEXT
        : "Eres el asistente de Boxer Moto AI Academy.";

    var body = {
      systemInstruction: {
        parts: [{ text: systemText }],
      },
      contents: history.slice(),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };

    var lastErr = "";
    for (var i = 0; i < candidates.length; i++) {
      var model = candidates[i];
      var res = await fetch(getApiUrl(model), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": key,
        },
        body: JSON.stringify(body),
      });

      var data = await res.json().catch(function () {
        return {};
      });

      if (!res.ok) {
        var errMsg =
          (data.error && data.error.message) || res.statusText || "Error desconocido al llamar a Gemini.";
        lastErr = errMsg;
        var isModelError =
          /is not found|not supported for generateContent|model/i.test(errMsg) ||
          res.status === 404;
        if (isModelError) {
          continue;
        }
        throw new Error(errMsg);
      }

      var text =
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0] &&
        data.candidates[0].content.parts[0].text;

      if (!text) {
        throw new Error("Respuesta vacía del modelo. Intenta de nuevo.");
      }

      return text;
    }

    throw new Error(lastErr || "No encontré un modelo compatible para generateContent.");
  }

  async function onSubmit(e) {
    e.preventDefault();
    var text = (input.value || "").trim();
    if (!text) return;

    appendBubble(text, "user");
    input.value = "";

    var key = getApiKey();
    if (!key || key === "your_api_key_here") {
      appendBubble(
        "Para activar el asistente, crea un archivo <strong>.env</strong> en la raíz del proyecto con <code>GEMINI_API_KEY=tu_clave</code> (copia desde <code>.env.example</code>) y recarga la página sirviendo el sitio con un servidor local.",
        "bot",
        true
      );
      return;
    }

    history.push({ role: "user", parts: [{ text: text }] });
    trimHistory();

    sendBtn.disabled = true;
    input.disabled = true;
    setTyping(true);

    try {
      var reply = await sendToGemini();
      history.push({ role: "model", parts: [{ text: reply }] });
      trimHistory();
      appendBubble(reply, "bot");
    } catch (err) {
      history.pop();
      appendBubble("No pude obtener respuesta: " + (err.message || String(err)), "bot");
    } finally {
      setTyping(false);
      sendBtn.disabled = false;
      input.disabled = false;
      input.focus();
    }
  }

  function initChatbot() {
    messagesEl = document.getElementById("chat-messages");
    form = document.getElementById("chat-form");
    input = document.getElementById("chat-input");
    sendBtn = document.getElementById("chat-send");
    typingEl = document.getElementById("chat-typing");

    if (!messagesEl || !form || !input || !sendBtn) return;

    appendBubble(
      "¡Hola! Soy el asistente de <strong>Boxer Moto AI Academy</strong>. Pregúntame por cursos, precios en COP, instructores, inscripción o la historia de la IA en nuestro contexto.",
      "bot",
      true
    );

    form.addEventListener("submit", onSubmit);
  }

  function enableChatUi() {
    if (input) input.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    var key = getApiKey();
    if (!key || key === "your_api_key_here") {
      appendBubble(
        "<strong>Modo informativo:</strong> no hay <code>GEMINI_API_KEY</code> válida en <code>.env</code>. Configura la clave para respuestas con Gemini.",
        "bot",
        true
      );
    }
  }

  window.initChatbot = initChatbot;
  window.enableChatbotUi = enableChatUi;
})();
