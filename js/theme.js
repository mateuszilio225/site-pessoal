"use strict";

(function () {
  var META_COLORS = { light: "#ffffff", dark: "#0e0e13" };

  function currentLang() {
    return window.currentLang === "en" ? "en" : "pt";
  }

  function translate(key) {
    var dict = window.I18N && window.I18N[currentLang()];
    return (dict && dict[key]) || "";
  }

  function current() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    var next = theme === "dark" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", next);

    var meta = document.getElementById("meta-theme-color");
    if (meta) {
      meta.setAttribute("content", META_COLORS[next]);
    }

    var toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      var label = translate(next === "dark" ? "theme.to_light" : "theme.to_dark");
      if (label) {
        toggle.setAttribute("aria-label", label);
      }
    }
  }

  function toggle() {
    var next = current() === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem("sp:theme", next);
    } catch (e) {
      /* localStorage indisponível: segue sem persistir */
    }
  }

  window.SiteTheme = {
    apply: apply,
    toggle: toggle,
    current: current
  };
})();
