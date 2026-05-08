/**
 * Formulario de contacto — validación y envío simulado.
 */
(function () {
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRe = /^[\d\s+().-]{7,20}$/;

  function initContact() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var name = document.getElementById("contact-name");
    var email = document.getElementById("contact-email");
    var phone = document.getElementById("contact-phone");
    var message = document.getElementById("contact-message");
    var status = document.getElementById("form-status");
    var submit = document.getElementById("contact-submit");

    var errName = document.getElementById("error-name");
    var errEmail = document.getElementById("error-email");
    var errPhone = document.getElementById("error-phone");
    var errMessage = document.getElementById("error-message");

    function clearErrors() {
      [errName, errEmail, errPhone, errMessage].forEach(function (el) {
        if (el) el.textContent = "";
      });
      [name, email, phone, message].forEach(function (el) {
        if (el) el.classList.remove("invalid");
      });
    }

    function validate() {
      clearErrors();
      var ok = true;

      if (!name.value.trim() || name.value.trim().length < 2) {
        errName.textContent = "Ingresa tu nombre (mínimo 2 caracteres).";
        name.classList.add("invalid");
        ok = false;
      }

      if (!emailRe.test(email.value.trim())) {
        errEmail.textContent = "Ingresa un email válido.";
        email.classList.add("invalid");
        ok = false;
      }

      if (phone.value.trim() && !phoneRe.test(phone.value.trim())) {
        errPhone.textContent = "Teléfono inválido (solo dígitos y símbolos permitidos).";
        phone.classList.add("invalid");
        ok = false;
      }

      if (!message.value.trim() || message.value.trim().length < 10) {
        errMessage.textContent = "El mensaje debe tener al menos 10 caracteres.";
        message.classList.add("invalid");
        ok = false;
      }

      return ok;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      if (!validate()) {
        status.textContent = "Revisa los campos marcados.";
        return;
      }

      submit.disabled = true;
      status.textContent = "Enviando…";

      window.setTimeout(function () {
        status.textContent =
          "¡Gracias! Hemos recibido tu solicitud. Te contactaremos pronto por email o WhatsApp.";
        form.reset();
        submit.disabled = false;
      }, 900);
    });
  }

  window.initContact = initContact;
})();
