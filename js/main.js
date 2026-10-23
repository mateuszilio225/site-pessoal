"use strict";

(function () {
  var LANG_KEY = "sp:lang";

  function readLang() {
    try {
      var stored = localStorage.getItem(LANG_KEY);
      if (stored === "pt" || stored === "en") {
        return stored;
      }
    } catch (e) {
      /* localStorage indisponível */
    }
    return "pt";
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* localStorage indisponível */
    }
  }

  function dictionary(lang) {
    return (window.I18N && window.I18N[lang]) || (window.I18N && window.I18N.pt) || {};
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyLang(lang) {
    var dict = dictionary(lang);

    document.querySelectorAll("[data-i18n]").forEach(function (node) {
      var key = node.getAttribute("data-i18n");
      if (dict[key] != null) {
        node.textContent = dict[key];
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (node) {
      node.getAttribute("data-i18n-attr").split(",").forEach(function (pair) {
        var separator = pair.indexOf(":");
        if (separator < 0) {
          return;
        }
        var attribute = pair.slice(0, separator).trim();
        var key = pair.slice(separator + 1).trim();
        if (dict[key] != null) {
          node.setAttribute(attribute, dict[key]);
        }
      });
    });

    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    window.currentLang = lang;

    var langLabel = document.getElementById("lang-label");
    if (langLabel) {
      langLabel.textContent = lang === "pt" ? "EN" : "PT";
    }

    var langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
      var shortLabel = lang === "pt" ? "EN" : "PT";
      langToggle.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
      langToggle.setAttribute(
        "aria-label",
        shortLabel + " — " + (lang === "pt" ? dict["lang.to_en"] : dict["lang.to_pt"])
      );
    }

    var themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        currentTheme() === "dark" ? dict["theme.to_light"] : dict["theme.to_dark"]
      );
    }

    if (typeof window.renderProjects === "function") {
      window.renderProjects(lang);
    }

    if (typeof window.initScrollReveal === "function") {
      window.initScrollReveal();
    }
  }

  function bindPhotoFallback() {
    var photo = document.getElementById("hero-photo");
    var initials = document.getElementById("hero-initials");
    if (!photo || !initials) {
      return;
    }

    function showInitials() {
      photo.hidden = true;
      initials.hidden = false;
    }

    function showPhoto() {
      photo.hidden = false;
      initials.hidden = true;
    }

    photo.addEventListener("error", showInitials);
    photo.addEventListener("load", showPhoto);
    if (photo.complete) {
      if (photo.naturalWidth > 0) {
        showPhoto();
      } else {
        showInitials();
      }
    }
  }

  function init() {
    var lang = readLang();
    applyLang(lang);

    if (window.SiteTheme) {
      window.SiteTheme.apply(currentTheme());
    }

    var themeToggle = document.getElementById("theme-toggle");
    if (themeToggle && window.SiteTheme) {
      themeToggle.addEventListener("click", function () {
        window.SiteTheme.toggle();
      });
    }

    var langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
      langToggle.addEventListener("click", function () {
        var next = window.currentLang === "en" ? "pt" : "en";
        saveLang(next);
        applyLang(next);
      });
    }

    var year = document.getElementById("year");
    if (year) {
      year.textContent = String(new Date().getFullYear());
    }

    bindPhotoFallback();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
