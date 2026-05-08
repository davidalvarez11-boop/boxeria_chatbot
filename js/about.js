/**
 * Sección Sobre Mí — datos del fundador.
 * Edita KNOWLEDGE_BASE.founder en knowledge-base.js para contenido real y coherencia con el chatbot.
 */
(function () {
  var FOUNDER_DATA = {
    name: "Tu Nombre Completo",
    title: "Fundador & Lead Instructor — Boxer Moto AI Academy",
    bio:
      "Actualiza esta biografía con tu trayectoria real en tecnología, IA y educación. Esta academia fusiona rigor técnico con la energía de la cultura Boxer Moto.",
    timeline: [
      { year: "2018", text: "Inicio en ingeniería de datos y pipelines de ML." },
      { year: "2020", text: "Primera cohorte de talleres de IA aplicada a negocio." },
      { year: "2023", text: "Publicación de contenido técnico y mentorías 1:1." },
      { year: "2026", text: "Lanzamiento de Boxer Moto AI Academy en formato premium." },
    ],
    stats: [
      { value: "+500", label: "Horas de enseñanza" },
      { value: "10+", label: "Años en tecnología" },
      { value: "5", label: "Rutas de certificación" },
      { value: "100%", label: "Enfoque práctico" },
    ],
    social: {
      linkedin: "https://linkedin.com/",
      github: "https://github.com/",
      twitter: "https://twitter.com/",
    },
    initials: "TN",
  };

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function avatarSvg(initials) {
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Avatar">' +
      "<title>Avatar " +
      escapeHtml(initials) +
      "</title>" +
      '<defs><linearGradient id="gf" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" style="stop-color:#00ff88;stop-opacity:0.4"/>' +
      '<stop offset="100%" style="stop-color:#00ccff;stop-opacity:0.25"/>' +
      "</linearGradient></defs>" +
      '<circle cx="48" cy="48" r="46" fill="#12121a" stroke="#00ccff" stroke-width="2"/>' +
      '<circle cx="48" cy="48" r="44" fill="url(#gf)"/>' +
      '<text x="50%" y="56%" text-anchor="middle" fill="#00ff88" font-family="Orbitron, sans-serif" font-size="32" font-weight="700">' +
      escapeHtml(initials) +
      "</text></svg>"
    );
  }

  function socialLinks(social) {
    if (!social) return "";
    var parts = [];
    if (social.linkedin) {
      parts.push(
        '<a href="' +
          escapeHtml(social.linkedin) +
          '" rel="noopener noreferrer" target="_blank">LinkedIn</a>'
      );
    }
    if (social.github) {
      parts.push(
        '<a href="' +
          escapeHtml(social.github) +
          '" rel="noopener noreferrer" target="_blank">GitHub</a>'
      );
    }
    if (social.twitter) {
      parts.push(
        '<a href="' +
          escapeHtml(social.twitter) +
          '" rel="noopener noreferrer" target="_blank">X / Twitter</a>'
      );
    }
    if (!parts.length) return "";
    return '<div class="about-social">' + parts.join("") + "</div>";
  }

  function initAbout() {
    var root = document.getElementById("about-root");
    if (!root) return;

    var f =
      typeof KNOWLEDGE_BASE !== "undefined" && KNOWLEDGE_BASE.founder
        ? KNOWLEDGE_BASE.founder
        : FOUNDER_DATA;

    var initials = f.initials || (f.name ? f.name.split(" ").map(function (p) { return p[0]; }).join("").slice(0, 2).toUpperCase() : "?");

    var timeline = (f.timeline || [])
      .map(function (item) {
        return (
          '<div class="about-timeline-item">' +
          '<span class="about-timeline-year">' +
          escapeHtml(item.year) +
          "</span>" +
          "<div><p>" +
          escapeHtml(item.text) +
          "</p></div></div>"
        );
      })
      .join("");

    var stats = (f.stats || [])
      .map(function (s) {
        return (
          '<div class="stat-pill"><strong>' +
          escapeHtml(s.value) +
          "</strong><span>" +
          escapeHtml(s.label) +
          "</span></div>"
        );
      })
      .join("");

    root.innerHTML =
      '<div class="about-card reveal">' +
      '<div class="about-header">' +
      '<div class="about-avatar">' +
      avatarSvg(initials) +
      "</div>" +
      "<div>" +
      '<h3 class="about-name">' +
      escapeHtml(f.name) +
      "</h3>" +
      '<p class="about-role">' +
      escapeHtml(f.title) +
      "</p></div></div>" +
      '<p class="about-bio">' +
      escapeHtml(f.bio) +
      "</p>" +
      '<div class="about-stats">' +
      stats +
      "</div>" +
      '<h4 class="about-timeline-title">Trayectoria</h4>' +
      '<div class="about-timeline">' +
      timeline +
      "</div>" +
      socialLinks(f.social) +
      "</div>";
  }

  window.initAbout = initAbout;
  window.FOUNDER_DATA = FOUNDER_DATA;
})();
