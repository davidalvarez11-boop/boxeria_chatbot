/**
 * Orquestador principal — espera .env y arranca módulos.
 */
(function () {
  async function boot() {
    try {
      if (window.envReady) await window.envReady;
    } catch (e) {
      console.warn("[app] envReady", e);
    }

    if (typeof initCourses === "function") initCourses();
    if (typeof initInstructors === "function") initInstructors();
    if (typeof initAbout === "function") initAbout();
    if (typeof initContact === "function") initContact();
    if (typeof initChatbot === "function") initChatbot();
    if (typeof enableChatbotUi === "function") enableChatbotUi();
    if (typeof initUi === "function") initUi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
