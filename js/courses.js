/**
 * Renderiza el catálogo de cursos desde KNOWLEDGE_BASE.
 */
(function () {
  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function initCourses() {
    var grid = document.getElementById("courses-grid");
    if (!grid || typeof KNOWLEDGE_BASE === "undefined") return;

    var courses = KNOWLEDGE_BASE.courses || [];
    grid.innerHTML = courses
      .map(function (c) {
        var modules = (c.modules || [])
          .map(function (m) {
            return "<li>" + escapeHtml(m) + "</li>";
          })
          .join("");

        return (
          '<article class="course-card reveal" role="listitem">' +
          '<div class="course-meta">' +
          '<span>' +
          escapeHtml(c.level) +
          "</span>" +
          "<span>" +
          c.hours +
          " h</span>" +
          "</div>" +
          "<h3 class=\"course-title\">" +
          escapeHtml(c.title) +
          "</h3>" +
          '<p class="course-price">' +
          escapeHtml(c.priceLabel) +
          " COP</p>" +
          '<p class="course-modules-title">Módulos</p>' +
          '<ul class="course-modules">' +
          modules +
          "</ul>" +
          "</article>"
        );
      })
      .join("");
  }

  window.initCourses = initCourses;
})();
