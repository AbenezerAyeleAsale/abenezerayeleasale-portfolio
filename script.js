(() => {
  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");
  const progress = document.querySelector(".scroll-progress");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  // Theme preference
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") body.classList.add("dark");
  updateThemeIcon();

  function updateThemeIcon() {
    const icon = themeToggle?.querySelector(".theme-icon");
    if (icon) icon.textContent = body.classList.contains("dark") ? "☀" : "☾";
    themeToggle?.setAttribute("aria-label", body.classList.contains("dark") ? "Switch to light mode" : "Switch to dark mode");
  }

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("portfolio-theme", body.classList.contains("dark") ? "dark" : "light");
    updateThemeIcon();
  });

  // Mobile navigation
  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Scroll progress + back-to-top
  function onScroll() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
    backToTop.classList.toggle("show", scrollTop > 550);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Reveal-on-scroll
  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(el => revealObserver.observe(el));

  // Animated skill bars when visible
  const bars = document.querySelectorAll(".bar span");
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.dataset.level || 0;
        entry.target.style.width = `${level}%`;
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(bar => barObserver.observe(bar));

  // Certification filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const certCards = document.querySelectorAll(".cert-card");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      certCards.forEach(card => {
        card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
      });
    });
  });

  // Frontend-only contact form: opens user's email application.
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(`Professional inquiry from ${name}`);
    const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:abenezerayeleasale@gmail.com?subject=${subject}&body=${bodyText}`;
    formStatus.textContent = "Opening your email application…";
  });
})();
