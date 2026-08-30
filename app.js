(function () {
  "use strict";

  /* ---------- Header scroll state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 20);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var hamburger = document.querySelector(".hamburger");
  var mainNav = document.querySelector(".main-nav");
  var scrim = document.querySelector(".nav-scrim");
  var menuClose = document.querySelector(".menu-close");

  function openNav() {
    mainNav.classList.add("is-open");
    hamburger.classList.add("is-active");
    scrim.classList.add("is-visible");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    mainNav.classList.remove("is-open");
    hamburger.classList.remove("is-active");
    scrim.classList.remove("is-visible");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      mainNav.classList.contains("is-open") ? closeNav() : openNav();
    });
  }
  if (scrim) scrim.addEventListener("click", closeNav);
  if (menuClose) menuClose.addEventListener("click", closeNav);
  mainNav && mainNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      if (window.innerWidth <= 960) closeNav();
    });
  });

  var navParent = document.querySelector(".nav-has-children");
  if (navParent) {
    var navToggle = navParent.querySelector(".naviLeft") || navParent.querySelector("a");
    navToggle && navToggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        navParent.classList.toggle("is-expanded");
      }
    });
  }

  /* ---------- Active link on scroll ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".main-nav a[href*='#']");
  if (sections.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          navLinks.forEach(function (a) {
            var match = a.getAttribute("href").indexOf("#" + id) !== -1;
            a.classList.toggle("active", match);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Department opening hours (real posted hours) ---------- */
  // Index 0 = Monday ... 6 = Sunday. null = closed. close <= open means the
  // shift crosses midnight into the next calendar day.
  var HOURS = {
    holmestrand: [null, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "03:30" }, { open: "11:00", close: "03:30" }, { open: "11:00", close: "21:00" }],
    "drammen-bragernes": [null, null, null, null, { open: "22:00", close: "04:00" }, { open: "22:00", close: "04:00" }, null],
    "drammen-cc": [null, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }],
    sandefjord: [{ open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "03:30" }, { open: "11:00", close: "03:30" }, { open: "11:00", close: "21:00" }],
    moss: [null, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }],
    horten: [null, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }],
    larvik: [null, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }],
    tonsberg: [null, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }],
    lillehammer: [{ open: "11:00", close: "20:00" }, { open: "11:00", close: "20:00" }, { open: "11:00", close: "20:00" }, { open: "11:00", close: "20:00" }, { open: "11:00", close: "20:00" }, { open: "11:00", close: "20:00" }, { open: "11:00", close: "20:00" }],
    tollerud: [{ open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "22:00" }, { open: "11:00", close: "22:00" }, { open: "11:00", close: "22:00" }],
    hamar: [{ open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "21:00" }, { open: "11:00", close: "03:30" }, { open: "11:00", close: "03:30" }, { open: "11:00", close: "21:00" }]
  };

  function toMinutes(hhmm) {
    var parts = hhmm.split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  function isOpenNow(weekHours) {
    var now = new Date();
    var jsDay = now.getDay(); // 0=Sun..6=Sat
    var todayIdx = jsDay === 0 ? 6 : jsDay - 1; // 0=Mon..6=Sun
    var yesterdayIdx = todayIdx === 0 ? 6 : todayIdx - 1;
    var minutesNow = now.getHours() * 60 + now.getMinutes();

    var today = weekHours[todayIdx];
    if (today) {
      var open = toMinutes(today.open);
      var close = toMinutes(today.close);
      if (close <= open) {
        if (minutesNow >= open) return true;
      } else if (minutesNow >= open && minutesNow < close) {
        return true;
      }
    }
    var prev = weekHours[yesterdayIdx];
    if (prev) {
      var pOpen = toMinutes(prev.open);
      var pClose = toMinutes(prev.close);
      if (pClose <= pOpen && minutesNow < pClose) return true;
    }
    return false;
  }

  document.querySelectorAll("[data-dept]").forEach(function (pill) {
    var key = pill.getAttribute("data-dept");
    var weekHours = HOURS[key];
    if (!weekHours) return;
    var open = isOpenNow(weekHours);
    pill.classList.add(open ? "is-open" : "is-closed");
    pill.innerHTML = '<span class="dot"></span>' + (open ? "Åpent nå" : "Stengt nå");
  });

  var jsToday = new Date().getDay();
  var isoToday = String(jsToday === 0 ? 7 : jsToday);
  document.querySelectorAll(".hour-row[data-day]").forEach(function (row) {
    var days = row.getAttribute("data-day").split(",");
    if (days.indexOf(isoToday) !== -1) {
      row.classList.add("today");
    }
  });

  /* ---------- Cookie consent (Cookiebot-equivalent) ----------
     Live Potetbua domains keep using their real, already-registered
     Cookiebot instance. Any other domain (this demo, a future new
     domain) gets an equivalent self-built banner with no third-party
     dependency, so it never shows a domain-mismatch error. */
  var LIVE_DOMAINS = ["potet-bua.no", "www.potet-bua.no"];

  if (LIVE_DOMAINS.indexOf(window.location.hostname) !== -1) {
    var cb = document.createElement("script");
    cb.id = "Cookiebot";
    cb.src = "https://consent.cookiebot.com/uc.js";
    cb.setAttribute("data-cbid", "5b94dcec-3020-4d5f-bcdf-26d534274faf");
    cb.setAttribute("data-blockingmode", "auto");
    cb.setAttribute("data-culture", "nb");
    cb.async = true;
    document.head.appendChild(cb);
  } else {
    initCookieBanner();
  }

  function initCookieBanner() {
    var STORAGE_KEY = "potetbua_consent";
    var overlay = document.getElementById("cookieOverlay");
    var revisitBtn = document.getElementById("cookieRevisit");
    if (!overlay) return;

    var toggles = {
      preferences: document.getElementById("consentPreferences"),
      statistics: document.getElementById("consentStatistics"),
      marketing: document.getElementById("consentMarketing")
    };

    function saveConsent(state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    function loadConsent() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
      } catch (e) {
        return null;
      }
    }
    function applyToggleState(state) {
      toggles.preferences.checked = !!state.preferences;
      toggles.statistics.checked = !!state.statistics;
      toggles.marketing.checked = !!state.marketing;
    }
    function currentToggleState() {
      return {
        necessary: true,
        preferences: toggles.preferences.checked,
        statistics: toggles.statistics.checked,
        marketing: toggles.marketing.checked
      };
    }
    function show() {
      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
    }
    function hide() {
      overlay.classList.remove("is-visible");
      overlay.setAttribute("aria-hidden", "true");
      if (revisitBtn) revisitBtn.classList.add("is-visible");
    }

    var existing = loadConsent();
    if (existing) {
      applyToggleState(existing);
    } else {
      show();
    }

    document.querySelectorAll(".cookie-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".cookie-tab").forEach(function (t) { t.classList.remove("active"); });
        document.querySelectorAll(".cookie-panel").forEach(function (p) { p.classList.remove("active"); });
        tab.classList.add("active");
        document.getElementById(tab.getAttribute("data-panel")).classList.add("active");
      });
    });

    var rejectBtn = document.getElementById("cookieReject");
    var selectedBtn = document.getElementById("cookieSelected");
    var customizeBtn = document.getElementById("cookieCustomize");
    var allBtn = document.getElementById("cookieAll");

    rejectBtn && rejectBtn.addEventListener("click", function () {
      applyToggleState({ preferences: false, statistics: false, marketing: false });
      saveConsent(currentToggleState());
      hide();
    });
    selectedBtn && selectedBtn.addEventListener("click", function () {
      saveConsent(currentToggleState());
      hide();
    });
    customizeBtn && customizeBtn.addEventListener("click", function () {
      document.querySelector('.cookie-tab[data-panel="cookiePanelDetails"]').click();
    });
    allBtn && allBtn.addEventListener("click", function () {
      applyToggleState({ preferences: true, statistics: true, marketing: true });
      saveConsent(currentToggleState());
      hide();
    });
    revisitBtn && revisitBtn.addEventListener("click", show);
  }
})();
