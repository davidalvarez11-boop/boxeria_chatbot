/**
 * Carga variables desde el archivo .env en la raíz del sitio (servido como estático).
 * Expone window.ENV y una promesa window.envReady.
 */
(function () {
  window.ENV = window.ENV || {};

  function stripQuotes(value) {
    return value.replace(/^['"]|['"]$/g, "");
  }

  async function loadEnv() {
    try {
      const res = await fetch(".env", { cache: "no-store" });
      if (!res.ok) throw new Error("no .env");
      const text = await res.text();
      text.split("\n").forEach(function (line) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const idx = trimmed.indexOf("=");
        if (idx === -1) return;
        const key = trimmed.slice(0, idx).trim();
        const val = stripQuotes(trimmed.slice(idx + 1).trim());
        if (key) window.ENV[key] = val;
      });
    } catch (e) {
      console.warn("[env] No se pudo cargar .env — copia .env.example a .env y define GEMINI_API_KEY.", e);
    }
  }

  window.envReady = loadEnv();
})();
