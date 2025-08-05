const COURSES = [
  { id: "py-101", title: "Python for Absolute Beginners", level: "Beginner", hours: 14, lessons: 48, instructor: "Ananya Mehta", priceINR: 1499, tags: ["Python","Programming"], thumb: "https://picsum.photos/seed/python/640/360", blurb: "Start from zero: variables, loops, functions, and mini projects." },
  { id: "js-core", title: "Modern JavaScript Essentials", level: "Beginner", hours: 12, lessons: 40, instructor: "Rohan Shah", priceINR: 1399, tags: ["JavaScript","Web"], thumb: "https://picsum.photos/seed/js/640/360", blurb: "DOM, fetch, modules, ES6+ patterns to build interactive sites." },
  { id: "html-css", title: "Responsive HTML & CSS", level: "Beginner", hours: 10, lessons: 36, instructor: "Sana Kapoor", priceINR: 1299, tags: ["HTML","CSS","Web"], thumb: "https://picsum.photos/seed/css/640/360", blurb: "Layouts, grids, flexbox, and accessibility for beautiful websites." },
  { id: "excel-pro", title: "Excel to Pro: Formulas to Dashboards", level: "Intermediate", hours: 9, lessons: 28, instructor: "Dev Patel", priceINR: 1199, tags: ["Excel","Data"], thumb: "https://picsum.photos/seed/excel/640/360", blurb: "Master XLOOKUP, PivotTables, cleaning data and dashboards." },
  { id: "git-github", title: "Git & GitHub for Developers", level: "Beginner", hours: 6, lessons: 20, instructor: "Aisha Khan", priceINR: 899, tags: ["Git","GitHub","Tools"], thumb: "https://picsum.photos/seed/git/640/360", blurb: "Version control, branching, PRs, and collaboration workflows." },
  { id: "py-data", title: "Python Data Analysis (Pandas + NumPy)", level: "Intermediate", hours: 16, lessons: 52, instructor: "Kabir Roy", priceINR: 1799, tags: ["Python","Data"], thumb: "https://picsum.photos/seed/pandas/640/360", blurb: "Clean, analyze, and visualize real datasets with Pandas + NumPy." },
  { id: "sql-boot", title: "SQL Bootcamp: Query to Insights", level: "Beginner", hours: 8, lessons: 30, instructor: "Meera Iyer", priceINR: 1099, tags: ["SQL","Data"], thumb: "https://picsum.photos/seed/sql/640/360", blurb: "Core SELECT to JOINs, CTEs, window functions, and case studies." },
  { id: "wp-starter", title: "WordPress Website in a Weekend", level: "Beginner", hours: 7, lessons: 24, instructor: "Nikhil Verma", priceINR: 999, tags: ["WordPress","Web"], thumb: "https://picsum.photos/seed/wp/640/360", blurb: "Hosting, themes, plugins, and security basics. No code required." },
  { id: "canva-brand", title: "Canva for Personal Branding", level: "Beginner", hours: 5, lessons: 18, instructor: "Aarohi Jain", priceINR: 799, tags: ["Design","Branding"], thumb: "https://picsum.photos/seed/canva/640/360", blurb: "Logos, thumbnails, and social posts that look professional." },
  { id: "ai-tools", title: "AI Tools for Productivity (ChatGPT + Co.)", level: "Intermediate", hours: 6, lessons: 22, instructor: "Vikram Nanda", priceINR: 1299, tags: ["AI","Productivity"], thumb: "https://picsum.photos/seed/ai/640/360", blurb: "Prompts, workflows, and automations to save hours weekly." },
  { id: "react-core", title: "React Fundamentals", level: "Intermediate", hours: 14, lessons: 42, instructor: "Ritika Bose", priceINR: 1899, tags: ["React","Web"], thumb: "https://picsum.photos/seed/react/640/360", blurb: "Components, hooks, state management, and API-driven UIs." },
  { id: "cyber-basics", title: "Cybersecurity Basics for Everyone", level: "Beginner", hours: 5, lessons: 16, instructor: "Arun Menon", priceINR: 999, tags: ["Security","IT"], thumb: "https://picsum.photos/seed/cyber/640/360", blurb: "Protect accounts, devices, and data with simple best practices." }
];

const grid = document.getElementById("courseGrid");
const searchInput = document.getElementById("searchInput");
const levelFilter = document.getElementById("levelFilter");
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

function formatINR(n) { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n); }

function courseCard(c) {
  const tags = c.tags.map(t => `<span class="tag">${t}</span>`).join("");
  return `
    <article class="course" data-title="${c.title.toLowerCase()}" data-level="${c.level.toLowerCase()}" data-tags="${c.tags.join(",").toLowerCase()}">
      <img src="${c.thumb}" alt="${c.title} thumbnail" loading="lazy" />
      <div class="body">
        <h3>${c.title}</h3>
        <div class="tags">${tags}</div>
        <p class="meta">${c.level} • ${c.hours}h • ${c.lessons} lessons • by ${c.instructor}</p>
        <p>${c.blurb}</p>
        <div class="price">${formatINR(c.priceINR)}</div>
        <div class="actions">
          <button class="btn" data-enroll="${c.id}">Enroll</button>
          <a class="btn secondary" href="#contact">Ask</a>
        </div>
      </div>
    </article>
  `;
}

function renderCourses(list) {
  grid.innerHTML = list.map(courseCard).join("");
}

function applyFilters() {
  const q = (searchInput.value || "").toLowerCase();
  const lvl = (levelFilter.value || "").toLowerCase();
  const filtered = COURSES.filter(c => {
    const inText = (c.title + " " + c.tags.join(" ") + " " + c.blurb).toLowerCase().includes(q);
    const inLevel = lvl ? c.level.toLowerCase() === lvl : true;
    return inText && inLevel;
  });
  renderCourses(filtered);
  attachEnrollHandlers();
}

function attachEnrollHandlers() {
  document.querySelectorAll("[data-enroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-enroll");
      const course = COURSES.find(c => c.id === id);
      openEnroll(course);
    });
  });
}

searchInput && searchInput.addEventListener("input", applyFilters);
levelFilter && levelFilter.addEventListener("change", applyFilters);

renderCourses(COURSES);
attachEnrollHandlers();

// Contact form (demo only)
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactStatus.textContent = "Thanks! We'll get back to you within 24 hours.";
    contactForm.reset();
  });
}

// Enroll modal
const modal = document.getElementById("enrollModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const enrollForm = document.getElementById("enrollForm");
const enrollStatus = document.getElementById("enrollStatus");

function openEnroll(course) {
  modalTitle.textContent = `Enroll in ${course.title}`;
  modalSubtitle.textContent = `${course.level} • ${course.hours}h • ${course.lessons} lessons • Instructor: ${course.instructor}`;
  modal.classList.remove("hidden");
}

closeModalBtn && closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal && modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

if (enrollForm) {
  enrollForm.addEventListener("submit", (e) => {
    e.preventDefault();
    enrollStatus.textContent = "Enrollment request sent! Check your email for next steps.";
    setTimeout(() => { enrollStatus.textContent = ""; modal.classList.add("hidden"); }, 2000);
    enrollForm.reset();
  });
}
