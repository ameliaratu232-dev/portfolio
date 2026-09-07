(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("motion-ready");

  const revealItems = [...document.querySelectorAll(".reveal")];
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const tabs = [...document.querySelectorAll("[data-experience]")];
  const panels = [...document.querySelectorAll("[data-panel]")];
  const currentLabel = document.querySelector("#experience-current");
  const progressBar = document.querySelector("#experience-progress-bar");
  const stage = document.querySelector(".experience-stage");
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let activeIndex = 0;

  function activateExperience(nextIndex, moveFocus = false) {
    if (nextIndex < 0 || nextIndex >= tabs.length) return;
    activeIndex = nextIndex;

    tabs.forEach((tab, index) => {
      const selected = index === activeIndex;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && moveFocus) tab.focus({ preventScroll: true });
    });

    panels.forEach((panel, index) => {
      const selected = index === activeIndex;
      panel.classList.toggle("is-active", selected);
      panel.setAttribute("aria-hidden", String(!selected));
    });

    if (currentLabel) {
      currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
    }
    if (progressBar) {
      progressBar.style.width = ((activeIndex + 1) / tabs.length) * 100 + "%";
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateExperience(index));
    tab.addEventListener("focus", () => activateExperience(index));

    if (supportsHover) {
      tab.addEventListener("mouseenter", () => activateExperience(index));
    }

    tab.addEventListener("keydown", (event) => {
      let nextIndex = activeIndex;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        nextIndex = (activeIndex + 1) % tabs.length;
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }
      event.preventDefault();
      activateExperience(nextIndex, true);
    });
  });

  if (stage && !reduceMotion && supportsHover) {
    stage.addEventListener("pointermove", (event) => {
      const bounds = stage.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * -10;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
      stage.style.setProperty("--image-x", x + "px");
      stage.style.setProperty("--image-y", y + "px");
    });

    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--image-x", "0px");
      stage.style.setProperty("--image-y", "0px");
    });
  }

  const deferredImages = panels
    .slice(1)
    .map((panel) => panel.querySelector("img"))
    .filter(Boolean);

  const preload = () => {
    deferredImages.forEach((image) => {
      const preloadImage = new Image();
      preloadImage.src = image.currentSrc || image.src;
    });
  };

  let lastScroll = 0;
  const header = document.querySelector(".site-header");
  const projectsSection = document.querySelector("#expertise");

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    const projectsPosition = projectsSection.offsetTop;

    if (currentScroll > lastScroll && currentScroll > projectsPosition) {
      // scrolling down
      header.classList.add("hide");
    } else {
      // scrolling up
      header.classList.remove("hide");
    }

    lastScroll = currentScroll;
  });

  const upButton = document.querySelector(".up-to-button");

  window.addEventListener("scroll", () => {

    const projectsPosition = projectsSection.offsetTop;
    const scrollPosition = window.scrollY;


    if (scrollPosition >= projectsPosition) {
      // reached projects section
      upButton.classList.add("show");
    } else {
      // back to first section
      upButton.classList.remove("show");
    }

  });

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");


  menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
  });


  // Close sidebar when clicking nav item
  navLinks.forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

    });

  });

  // smooth scroll to top
  document.querySelector(".up-to-button a")
  .addEventListener("click", (e) => {

    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preload, { timeout: 2000 });
  } else {
    window.setTimeout(preload, 900);
  }

  activateExperience(0);
})();
