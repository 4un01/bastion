(function () {
  "use strict";

  // --- Solutions accordion ---------------------------------------------
  var accordion = document.getElementById("accordion");
  if (accordion) {
    var panels = accordion.querySelectorAll(".accordion__panel");
    panels.forEach(function (panel) {
      panel.addEventListener("click", function () {
        if (panel.classList.contains("is-open")) return;
        panels.forEach(function (p) { p.classList.remove("is-open"); });
        panel.classList.add("is-open");
      });
    });
  }

  // --- Reviews marquee ----------------------------------------------------
  var reviews = [
    { quote: "We had a difficult, sloping plot and three architects tell us what couldn't be done. Quarry told us what could.", name: "Michael Ó Ruairc · Alder House, Málaga" },
    { quote: "They spent two days on site before drawing anything. That told us everything about how they work.", name: "Helen Prasad · Private residence, Hathersage" },
    { quote: "The detailing is what stays with you. Two years in and every junction still looks intentional.", name: "Sarah Whitlock · Ridgeline, Leedsh" },
    { quote: "They pushed back on us more than once, and they were right both times.", name: "David Ferreira · Private residence, Sheffield" },
    { quote: "Quiet, precise, and completely on top of the technical side. The engineers had almost nothing to correct.", name: "Anneke Vos · Cultural centre, Utrecht" },
    { quote: "Budget was tight and they never once used it as an excuse for a worse building.", name: "Priya Raman · Extension, Nottinghamhh" },
    { quote: "They listened properly. Half the brief ended up being things we hadn't thought to ask for.", name: "James Corrigan · Private residence, Derbyshire" },
    { quote: "Working with them felt slow at the time. Looking at the house now, I understand why.", name: "Elsa Lindqvist · Lakeside house, Dalarna" },
    { quote: "The best thing I can say is that the building feels like it was always meant to be there.", name: "Rachel Ntuli · Studio conversion, Manchester" }
  ];

  var STAR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.32 6.94.66-5.24 4.7 1.55 6.82L12 17.77 5.85 21l1.55-6.82-5.24-4.7 6.94-.66L12 2.5z"/></svg>';

  function buildCard(rev, hidden) {
    var card = document.createElement("div");
    card.className = "review-card";
    if (hidden) card.setAttribute("aria-hidden", "true");

    var quote = document.createElement("span");
    quote.className = "review-card__quote";
    quote.textContent = rev.quote;

    var name = document.createElement("span");
    name.className = "review-card__name";
    name.textContent = rev.name;

    var stars = document.createElement("span");
    stars.className = "review-card__stars";
    stars.innerHTML = STAR_SVG.repeat(5);

    card.appendChild(quote);
    card.appendChild(name);
    card.appendChild(stars);
    return card;
  }

  var track = document.getElementById("marqueeTrack");
  if (track) {
    var groupA = document.createElement("div");
    groupA.className = "marquee__group";
    groupA.style.display = "flex";
    groupA.style.flexDirection = "row";
    groupA.style.gap = "10px";
    groupA.style.paddingRight = "10px";

    var groupB = groupA.cloneNode(false);
    groupB.setAttribute("aria-hidden", "true");

    reviews.forEach(function (rev) {
      groupA.appendChild(buildCard(rev, false));
      groupB.appendChild(buildCard(rev, true));
    });

    track.appendChild(groupA);
    track.appendChild(groupB);
  }

  // --- Scroll reveal --------------------------------------------------
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function wrapWords(el) {
    var text = el.textContent;
    el.textContent = "";
    var parts = text.split(/(\s+)/);
    var wordIndex = 0;
    parts.forEach(function (chunk) {
      if (chunk === "") return;
      if (/^\s+$/.test(chunk)) {
        el.appendChild(document.createTextNode(chunk));
        return;
      }
      var mask = document.createElement("span");
      mask.className = "word-mask";
      var word = document.createElement("span");
      word.className = "word";
      word.textContent = chunk;
      word.style.transitionDelay = (wordIndex * 45) + "ms";
      wordIndex++;
      mask.appendChild(word);
      el.appendChild(mask);
    });
  }

  var wordRevealEls = document.querySelectorAll("[data-reveal-words]");
  wordRevealEls.forEach(wrapWords);

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll("[data-reveal], [data-reveal-words]");
    revealEls.forEach(function (el) {
      var delay = el.getAttribute("data-reveal-delay");
      if (delay) el.style.transitionDelay = delay + "ms";
    });

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    document.querySelectorAll("[data-reveal], [data-reveal-words]").forEach(function (el) {
      el.classList.add("is-in");
    });
  }
})();
