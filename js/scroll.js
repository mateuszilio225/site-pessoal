"use strict";

(function () {
  function showAll(nodes) {
    nodes.forEach(function (node) {
      node.classList.add("is-visible");
    });
  }

  window.initScrollReveal = function () {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    var reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      showAll(nodes);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    nodes.forEach(function (node) {
      observer.observe(node);
    });
  };
})();
