"use strict";

(function () {
  function text(dict, key) {
    return dict && dict[key] != null ? dict[key] : key;
  }

  function element(tag, className, content) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (content != null) {
      node.textContent = content;
    }
    return node;
  }

  function pick(value, lang) {
    if (!value) {
      return "";
    }
    return value[lang] || value.pt || value.en || "";
  }

  function sortProjects(list) {
    return list.slice().sort(function (a, b) {
      var featuredA = a.featured ? 1 : 0;
      var featuredB = b.featured ? 1 : 0;
      if (featuredA !== featuredB) {
        return featuredB - featuredA;
      }

      var yearA = Number(a.year) || 0;
      var yearB = Number(b.year) || 0;
      if (yearA !== yearB) {
        return yearB - yearA;
      }

      var titleA = (a.title && a.title.pt) || "";
      var titleB = (b.title && b.title.pt) || "";
      return titleA.localeCompare(titleB, "pt-BR");
    });
  }

  function externalLink(href, label) {
    var link = element("a", "card__link", label);
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function buildCard(project, lang, dict) {
    var item = element("li", "card reveal");

    var header = element("div", "card__header");
    header.appendChild(element("h3", "card__title", pick(project.title, lang)));

    if (project.status) {
      header.appendChild(
        element("span", "badge badge--" + project.status, text(dict, "status." + project.status))
      );
    }
    item.appendChild(header);

    if (project.image) {
      var image = document.createElement("img");
      image.className = "card__image";
      image.src = project.image;
      image.alt = pick(project.title, lang) + " — screenshot";
      image.loading = "lazy";
      image.decoding = "async";
      image.width = 640;
      image.height = 400;
      item.appendChild(image);
    }

    item.appendChild(element("p", "card__summary", pick(project.summary, lang)));

    if (project.stack && project.stack.length) {
      var chips = element("ul", "chips");
      project.stack.forEach(function (technology) {
        chips.appendChild(element("li", "chip", technology));
      });
      item.appendChild(chips);
    }

    var meta = element("div", "card__meta");
    meta.appendChild(element("span", "card__year", project.year ? String(project.year) : ""));

    var links = element("div", "card__links");
    if (project.repo) {
      links.appendChild(externalLink(project.repo, text(dict, "projects.code")));
    }
    if (project.demo) {
      links.appendChild(externalLink(project.demo, text(dict, "projects.demo")));
    }
    meta.appendChild(links);
    item.appendChild(meta);

    return item;
  }

  window.renderProjects = function (lang) {
    var list = document.getElementById("projects-list");
    var empty = document.getElementById("projects-empty");
    if (!list) {
      return;
    }

    var dict = (window.I18N && window.I18N[lang]) || {};
    var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

    list.replaceChildren();
    sortProjects(projects).forEach(function (project) {
      list.appendChild(buildCard(project, lang, dict));
    });

    if (empty) {
      empty.hidden = projects.length > 0;
    }
  };
})();
