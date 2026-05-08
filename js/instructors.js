/**
 * Tarjetas de instructores con avatar SVG (iniciales).
 */
(function () {
  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function avatarSvg(initials, accent) {
    var a = accent || "#00ff88";
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 88" role="img" aria-hidden="true">' +
      '<defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" style="stop-color:' +
      a +
      ';stop-opacity:0.35"/>' +
      '<stop offset="100%" style="stop-color:#0a0a0f;stop-opacity:1"/>' +
      "</linearGradient></defs>" +
      '<rect width="88" height="88" fill="url(#g)"/>' +
      '<text x="50%" y="54%" text-anchor="middle" fill="' +
      escapeHtml(a) +
      '" font-family="Orbitron, sans-serif" font-size="28" font-weight="700">' +
      escapeHtml(initials) +
      "</text></svg>"
    );
  }

  function initInstructors() {
    var grid = document.getElementById("instructors-grid");
    if (!grid || typeof KNOWLEDGE_BASE === "undefined") return;

    var list = KNOWLEDGE_BASE.instructors || [];
    grid.innerHTML = list
      .map(function (ins) {
        var tags = (ins.tags || [])
          .map(function (t) {
            return "<span>" + escapeHtml(t) + "</span>";
          })
          .join("");

        return (
          '<article class="instructor-card reveal" role="listitem">' +
          '<div class="instructor-avatar">' +
          avatarSvg(ins.initials || "?", ins.accent) +
          "</div>" +
          '<h3 class="instructor-name">' +
          escapeHtml(ins.name) +
          "</h3>" +
          '<p class="instructor-role">' +
          escapeHtml(ins.role) +
          "</p>" +
          '<p class="instructor-bio">' +
          escapeHtml(ins.bio || "") +
          "</p>" +
          '<div class="instructor-tags">' +
          tags +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  window.initInstructors = initInstructors;
})();
