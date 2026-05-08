/**
 * Base de conocimiento privada — Boxer Moto AI Academy
 * El chatbot debe limitarse a este contexto institucional.
 */
(function () {
  var KNOWLEDGE_BASE = {
    institution: {
      name: "Boxer Moto AI Academy",
      tagline: "Impulsa tu futuro con Inteligencia Artificial al estilo Boxer Moto.",
      mission:
        "Democratizar el aprendizaje de IA con cursos profesionales, instructores expertos y una experiencia visual futurista.",
      website: "https://boxermotoai.academy",
      email: "contacto@boxermotoai.academy",
      whatsapp: "+57 300 000 0000",
      enrollment:
        "Los interesados completan el formulario de contacto en la web o escriben por WhatsApp. Se envía plan de pago, acceso al campus virtual y calendario de sesiones en vivo.",
      certification: "Certificado digital al aprobar módulos y proyecto final.",
      campus: "Campus virtual con materiales, foros y entregas de proyectos.",
    },
    aiHistory: {
      summary:
        "La IA evoluciona desde el test de Turing (1950) y el taller de Dartmouth (1956), pasando por sistemas expertos, victoria de Deep Blue (1997), deep learning con AlexNet (2012), arquitectura Transformer (2017), modelos conversacionales masivos como ChatGPT (2022) y hacia agentes autónomos y regulación en 2025+.",
      milestones: [
        { year: "1950", title: "Test de Turing", detail: "Criterio para evaluar inteligencia de máquinas." },
        { year: "1956", title: "Dartmouth", detail: "Se acuña el término Inteligencia Artificial." },
        { year: "1997", title: "Deep Blue", detail: "IA supera al campeón mundial de ajedrez." },
        { year: "2012", title: "AlexNet", detail: "Deep learning redefine visión por computador." },
        { year: "2017", title: "Transformers", detail: "Atención como núcleo del NLP moderno." },
        { year: "2022", title: "ChatGPT", detail: "LLM accesible para millones de usuarios." },
        { year: "2025+", title: "Proyección", detail: "Agentes, multimodalidad y marcos éticos." },
      ],
    },
    founder: {
      name: "Tu Nombre Completo",
      title: "Fundador & Lead Instructor — Boxer Moto AI Academy",
      bio:
        "Actualiza esta biografía con tu trayectoria real en tecnología, IA y educación. Esta academia fusiona rigor técnico con la energía de la cultura Boxer Moto: velocidad de aprendizaje, disciplina y futuro digital.",
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
    },
    instructors: [
      {
        id: "1",
        name: "Dra. Valentina Ríos",
        role: "Machine Learning & optimización",
        bio: "PhD en ciencias de la computación; ex-líder de ML en fintech.",
        tags: ["Scikit-learn", "XGBoost", "MLOps"],
        initials: "VR",
        accent: "#00ff88",
      },
      {
        id: "2",
        name: "Carlos \"Turbo\" Méndez",
        role: "Deep Learning & visión por computador",
        bio: "Ingeniero de aplicaciones con PyTorch en producción.",
        tags: ["PyTorch", "CNN", "Edge AI"],
        initials: "CM",
        accent: "#00ccff",
      },
      {
        id: "3",
        name: "Ana Lucía Ortega",
        role: "IA generativa & LLMs",
        bio: "Diseña prompts, RAG y evaluación de modelos para empresas.",
        tags: ["Gemini", "RAG", "Evaluación"],
        initials: "AO",
        accent: "#00ff88",
      },
      {
        id: "4",
        name: "Diego Salazar",
        role: "Ética de datos & gobernanza",
        bio: "Especialista en privacidad, fairness y despliegue responsable.",
        tags: ["Ética", "Privacidad", "Compliance"],
        initials: "DS",
        accent: "#00ccff",
      },
    ],
    courses: [
      {
        id: 1,
        title: "Fundamentos de Inteligencia Artificial",
        level: "Básico",
        hours: 40,
        priceCOP: 320000,
        priceLabel: "$320.000",
        modules: [
          "Historia y panorama de la IA",
          "Búsqueda, representación del conocimiento y lógica",
          "Aprendizaje supervisado vs no supervisado",
          "Introducción práctica a Python para IA",
          "Proyecto: agente simple con reglas y datos",
        ],
      },
      {
        id: 2,
        title: "Introducción a Machine Learning",
        level: "Básico-Intermedio",
        hours: 50,
        priceCOP: 480000,
        priceLabel: "$480.000",
        modules: [
          "Estadística y visualización para ML",
          "Regresión y clasificación",
          "Validación cruzada y métricas",
          "Árboles, bosques y boosting",
          "Proyecto: pipeline completo con dataset real",
        ],
      },
      {
        id: 3,
        title: "Machine Learning y Algoritmos Genéticos",
        level: "Intermedio",
        hours: 60,
        priceCOP: 650000,
        priceLabel: "$650.000",
        modules: [
          "Optimización y funciones objetivo",
          "Algoritmos genéticos y poblaciones",
          "Programación evolutiva",
          "Hiperparámetros con búsqueda evolutiva",
          "Proyecto: optimización combinatoria aplicada",
        ],
      },
      {
        id: 4,
        title: "Fundamentos de Deep Learning",
        level: "Intermedio-Avanzado",
        hours: 70,
        priceCOP: 820000,
        priceLabel: "$820.000",
        modules: [
          "Redes neuronales y retropropagación",
          "CNN para imagen",
          "RNN/LSTM y secuencias",
          "Regularización y batch norm",
          "Proyecto: modelo de clasificación con PyTorch",
        ],
      },
      {
        id: 5,
        title: "Aplicaciones de Deep Learning",
        level: "Avanzado",
        hours: 80,
        priceCOP: 980000,
        priceLabel: "$980.000",
        modules: [
          "Transfer learning y fine-tuning",
          "Detección y segmentación",
          "Introducción a Transformers",
          "Despliegue y optimización en inferencia",
          "Proyecto capstone con entregables profesionales",
        ],
      },
    ],
    faq: [
      { q: "¿Necesito experiencia previa en programación?", a: "Para el curso 1 basta con nociones básicas; reforzamos Python en los primeros módulos." },
      { q: "¿Los cursos son en vivo?", a: "Combinamos sesiones en vivo grabadas, campus asíncrono y oficinas de consulta." },
      { q: "¿Incluye certificado?", a: "Sí, certificado digital al completar módulos y proyecto final aprobado." },
      { q: "¿Puedo pagar en cuotas?", a: "Ofrecemos planes de pago; coordina opciones vía WhatsApp o formulario de contacto." },
      { q: "¿Qué stack usamos?", a: "Python, Jupyter, scikit-learn, PyTorch y herramientas cloud según el curso." },
      { q: "¿El chatbot reemplaza al instructor?", a: "No; el asistente responde sobre la academia y los cursos. Dudas técnicas profundas van al equipo docente." },
      { q: "¿Hay acceso de por vida?", a: "Acceso extendido al campus y actualizaciones menores según el plan contratado." },
      { q: "¿Dónde veo los precios?", a: "En la sección Cursos de esta web y en el catálogo que el chatbot puede resumir." },
    ],
    philosophy: {
      pillars: ["Velocidad de aprendizaje", "Disciplina técnica", "Comunidad Boxer Moto", "Futuro digital responsable"],
      quote: "La velocidad no es solo para las motos — también es para aprender.",
    },
  };

  var RULES =
    "Eres el asistente oficial de Boxer Moto AI Academy. " +
    "SOLO debes responder sobre: información institucional de la academia, historia de la IA en el contexto educativo de la academia, cursos (contenido, precios en COP, niveles, duración, certificación), fundador, instructores, FAQ, inscripción y contacto. " +
    "Si el usuario pregunta algo fuera de ese ámbito, declina con cortesía y redirige a los temas anteriores. " +
    "Responde en español, tono profesional y motivador alineado con la marca Boxer Moto. " +
    "No inventes precios ni políticas: usa exactamente los datos de la base de conocimiento. " +
    "Si no tienes un dato, indica que pueden escribir a contacto@boxermotoai.academy o WhatsApp oficial.";

  window.KNOWLEDGE_BASE = KNOWLEDGE_BASE;
  window.KNOWLEDGE_BASE_CONTEXT =
    RULES +
    "\n\n--- BASE DE CONOCIMIENTO (JSON) ---\n" +
    JSON.stringify(KNOWLEDGE_BASE, null, 0);
})();
