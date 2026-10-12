/**
 * Portfolio interactions
 * Author: Trần Duy Trường
 */

const CONTACT_EMAIL = 'truong311203@gmail.com';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTerminal();
  initProjectFilters();
  initCopyEmail();
  initContactForm();
  initCounterAnimation();
});

const prefersReducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------------------------------------------------
 * 1. Navbar: background on scroll + scrollspy
 * ------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!navbar) return;

  let ticking = false;

  const update = () => {
    ticking = false;
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let current = '';
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top && window.scrollY < top + section.offsetHeight) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
}

/* -------------------------------------------------------------
 * 2. Mobile menu
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  };

  btn.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
}

/* -------------------------------------------------------------
 * 3. Terminal
 *    Output strings are static, trusted HTML; user input is only
 *    ever echoed through textContent.
 * ------------------------------------------------------------- */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  const body = document.querySelector('.terminal-body');
  if (!input || !output) return;

  const history = [];
  let historyIndex = -1;

  const cmdName = (name) => `<span style="color:#f8fafc">${name}</span>`;
  const link = (href, text) =>
    `<a class="terminal-link" href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  const GH = 'https://github.com/tranduytruong12';

  const commands = {
    help: () => `
<p class="accent-text">Available commands:</p>
<p>  ${cmdName('about')}      who I am and what I do</p>
<p>  ${cmdName('projects')}   the work I'm happiest to be judged on</p>
<p>  ${cmdName('skills')}     tools I use, grouped by area</p>
<p>  ${cmdName('education')}  degree, program, publication</p>
<p>  ${cmdName('experience')} internships</p>
<p>  ${cmdName('github')}     both GitHub accounts</p>
<p>  ${cmdName('contact')}    how to reach me</p>
<p>  ${cmdName('neofetch')}   system summary</p>
<p>  ${cmdName('arise')}      easter egg</p>
<p>  ${cmdName('clear')}      clear the screen</p>`,

    about: () => `
<p><strong>Trần Duy Trường</strong> — AI/ML engineer, Hanoi (UTC+7)</p>
<p>CS graduate (HCMUT, 2025). I build grounded RAG systems, evaluate them with golden benchmarks, and co-authored a MIWAI 2025 paper on EEG classification.</p>
<p>Currently AI Engineer Intern at VinSmart Future. Looking for an AI/ML Engineer role.</p>`,

    projects: () => `
<p>1. <strong>GPTResident</strong> — grounded multi-tenant RAG, 201-case golden benchmark
   ${link('https://cudan.me/', '[live]')}</p>
<p>2. <strong>FA-GPNet</strong> — motor-imagery EEG classification, MIWAI 2025 (Springer LNAI)</p>
<p>3. <strong>Multi-Agent RAG Customer Support</strong> — LangGraph, LlamaIndex, ChromaDB
   ${link(`${GH}/RAG-multi-agents-system`, '[repo]')}</p>
<p>4. <strong>Qwen3.5-4B Coding &amp; Reasoning Fine-tune</strong> — Unsloth, QLoRA
   ${link(`${GH}/Qwen3.5-4B-Coding`, '[repo]')}</p>`,

    skills: () => `
<p><span class="accent-text">[Languages]</span> Python, C++, SQL, JavaScript</p>
<p><span class="accent-text">[LLMs &amp; agents]</span> LangGraph, LangChain, LlamaIndex, OpenAI API, LLM-as-judge</p>
<p><span class="accent-text">[RAG]</span> pgvector, PostgreSQL FTS, ChromaDB, weighted RRF, HyDE, MinerU OCR</p>
<p><span class="accent-text">[ML]</span> PyTorch, Scikit-learn, OpenCV, SFT, LoRA/QLoRA, quantization</p>
<p><span class="accent-text">[Backend]</span> FastAPI, Node.js/Express, PostgreSQL, MySQL, React, Next.js</p>
<p><span class="accent-text">[Platform]</span> Docker, GitHub CI/CD, Ruff, Mypy (+ Terraform, lakehouse in labs)</p>`,

    education: () => `
<p>• <strong>B.Sc. Computer Science</strong>, HCMUT (VNU-HCM) — GPA 3.3/4.0, 11/2025</p>
<p>• Thesis: Motor Imagery Classification from EEG Signals (97.5/100)</p>
<p>• <strong>Vingroup AI Talent Training Program</strong>, Cohort 3 — Track 2: AI &amp; Data Infrastructure (VinUniversity)</p>
<p>• Publication: co-author, MIWAI 2025 proceedings (Springer LNAI) · TOEIC 840/990</p>`,

    experience: () => `
<p>• <strong>AI Engineer Intern</strong> — VinSmart Future (Vingroup), GSM division · 08/2026 – 10/2026</p>
<p>• <strong>Software Engineer Intern</strong> — Xuan Cuong Technology Trading &amp; Services · 02/2025 – 05/2025</p>`,

    github: () => `
<p>• projects: ${link(GH, 'github.com/tranduytruong12')}</p>
<p>• AI20K labs: ${link('https://github.com/truong311203-arch', 'github.com/truong311203-arch')}</p>`,

    contact: () => `
<p>• Email: <a class="terminal-link" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
<p>• GitHub: ${link(GH, 'tranduytruong12')} · ${link('https://github.com/truong311203-arch', 'truong311203-arch')}</p>`,

    neofetch: () => `
<pre class="terminal-pre">
   .---.       NAME: Trần Duy Trường
  /     \\      ROLE: AI/ML engineer (intern, VSF)
 | () () |     FOCUS: grounded RAG · LLM evaluation
  \\  _  /      DEGREE: BSc CS, HCMUT (2025)
   \`---\`       OS: Windows 11
               LOCATION: Hanoi, Vietnam (UTC+7)
</pre>`,

    whoami: () => '<p>guest — a visitor. Welcome!</p>',

    arise: () => `
<p style="color:#a855f7; font-weight:bold;">⚔️ [ SYSTEM: SHADOW EXTRACTION INITIATED ]</p>
<p><em>"Only those who continuously grind become Monarchs."</em></p>
<p style="color:#38bdf8">(The GitHub profile README runs on a Solo Leveling theme — this is its nod.)</p>`,

    clear: () => {
      output.innerHTML = '';
      return '';
    },
  };

  const append = (el) => {
    output.appendChild(el);
    if (body) body.scrollTop = body.scrollHeight;
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const raw = input.value.trim();
      if (!raw) return;

      history.push(raw);
      historyIndex = history.length;

      const promptLine = document.createElement('div');
      const prompt = document.createElement('span');
      prompt.className = 'terminal-prompt';
      prompt.textContent = 'guest@truong311203:~$';
      const typed = document.createElement('span');
      typed.textContent = ` ${raw}`;
      promptLine.append(prompt, typed);
      append(promptLine);

      const handler = Object.prototype.hasOwnProperty.call(commands, raw.toLowerCase())
        ? commands[raw.toLowerCase()]
        : null;

      const result = document.createElement('div');
      if (handler) {
        const html = handler();
        if (html) {
          result.innerHTML = html;
          append(result);
        }
      } else {
        const err = document.createElement('span');
        err.style.color = '#f87171';
        err.textContent = `Command not found: "${raw}". Type 'help' for available commands.`;
        result.appendChild(err);
        append(result);
      }

      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        input.value = '';
      }
    }
  });
}

/* -------------------------------------------------------------
 * 4. Project filter tabs
 * ------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;

      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
        if (show && !prefersReducedMotion()) {
          card.animate(
            [{ opacity: 0, transform: 'translateY(15px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 300, easing: 'ease-out' }
          );
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 5. Copy email + toast
 * ------------------------------------------------------------- */
function initCopyEmail() {
  const toast = document.getElementById('toast');
  let toastTimer;

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = `✓ ${message}`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  document.querySelectorAll('.copy-email-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const copy = navigator.clipboard
        ? navigator.clipboard.writeText(CONTACT_EMAIL)
        : Promise.reject(new Error('Clipboard API unavailable'));
      copy
        .then(() => showToast(`Copied ${CONTACT_EMAIL}`))
        .catch(() => showToast(`Email: ${CONTACT_EMAIL}`));
    });
  });
}

/* -------------------------------------------------------------
 * 6. Contact form → pre-filled mailto: draft
 *    There is no backend, so the form never claims to "send".
 * ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (!form) return;

  const defaultNote = note ? note.textContent : '';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      if (note) {
        note.textContent = 'Please fill in every field with a valid email address.';
        note.classList.add('error');
      }
      return;
    }

    const data = new FormData(form);
    const subject = String(data.get('subject')).trim();
    const body = [
      String(data.get('message')).trim(),
      '',
      `— ${String(data.get('name')).trim()} <${String(data.get('email')).trim()}>`,
    ].join('\n');

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (note) {
      note.classList.remove('error');
      note.textContent = `If nothing opened, email me directly at ${CONTACT_EMAIL}.`;
      setTimeout(() => { note.textContent = defaultNote; }, 8000);
    }
  });
}

/* -------------------------------------------------------------
 * 7. Metric counters
 * ------------------------------------------------------------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.metric-value');
  const section = document.querySelector('.metrics-section');
  if (!counters.length || !section) return;

  // The HTML already holds the real numbers (no-JS / reduced-motion fallback);
  // only reset to 0 when we are actually going to animate.
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
  counters.forEach((c) => { c.textContent = '0'; });

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();

    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      counters.forEach((c) => {
        c.textContent = Math.round(Number(c.dataset.target) * eased) + (c.dataset.suffix || '');
      });
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.3 });

  observer.observe(section);
}
