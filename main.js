// Saudação animada
const greetings = ["👋", "🙋‍♀️", "✨", "😊"];
let greetIndex = 0;
setInterval(() => {
  document.getElementById("greeting").textContent = greetings[greetIndex];
  greetIndex = (greetIndex + 1) % greetings.length;
}, 1200);



// Navegação suave
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Formulário
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const msg = document.getElementById("form-msg");
  msg.textContent = "Mensagem enviada com sucesso! Obrigada pelo contato. 🥰";
  this.reset();
  setTimeout(() => {
    msg.textContent = "";
  }, 4000);
});

// Tabs Skills (removido, agora usamos filtro por categoria)

// Filtro de projetos
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".projeto-card");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      if (filter === "all") {
        card.style.display = "flex";
      } else {
        const techs = card.dataset.tech.toLowerCase();
        if (techs.includes(filter.toLowerCase())) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      }
    });
  });
});

// NOVO: Skills dinâmicas com filtro, animação e tooltips
const skillsData = [
  {
    name: "HTML5",
    icon: "https://cdn.simpleicons.org/html5/ff5722/fff",
    level: 95,
    type: "frontend",
    desc: "Estruturação semântica, SEO, acessibilidade."
  },
  {
    name: "CSS3",
    icon: "https://cdn.simpleicons.org/css3/2965f1/fff",
    level: 92,
    type: "frontend",
    desc: "Flexbox, Grid, animações, responsividade."
  },
  {
    name: "JavaScript",
    icon: "https://cdn.simpleicons.org/javascript/f7df1e/232946",
    level: 80,
    type: "frontend",
    desc: "ES6+, DOM, APIs, SPA."
  },
 
 
 
  {
    name: "Git",
    icon: "https://cdn.simpleicons.org/git/F05032/fff",
    level: 85,
    type: "outros",
    desc: "Versionamento, branches, merge, colaboração."
  },
 
];

function renderSkills(filter = "all") {
  const ul = document.getElementById("skills-list");
  ul.innerHTML = "";
  skillsData
    .filter(skill => filter === "all" || skill.type === filter)
    .forEach(skill => {
      const li = document.createElement("li");
      li.setAttribute("tabindex", "0");
      li.innerHTML = `
        <img src="${skill.icon}" alt="Ícone ${skill.name}" class="skill-icon-img" />
        <span class="skill-name">${skill.name}</span>
        <div class="skill-bar" aria-label="Proficiência em ${skill.name}">
          <div class="skill-level" style="--width:${skill.level}%"></div>
          <span class="skill-percent">${skill.level}%</span>
        </div>
        <span class="skill-tooltip">${skill.desc}</span>
      `;
      // Animação da barra ao inserir
      setTimeout(() => {
        li.querySelector('.skill-level').style.width = skill.level + "%";
      }, 100);
      // Tooltips: acessível ao foco/hover
      li.addEventListener("focus", () => {
        li.querySelector(".skill-tooltip").style.display = "block";
      });
      li.addEventListener("blur", () => {
        li.querySelector(".skill-tooltip").style.display = "none";
      });
      ul.appendChild(li);
    });
}
renderSkills();

document.querySelectorAll(".skills-filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".skills-filter-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    renderSkills(btn.dataset.filter);
  });
});
