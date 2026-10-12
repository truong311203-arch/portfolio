/**
 * PORTFOLIO CLIENT INTERACTION ENGINE
 * Author: Trần Duy Trường (truong311203-arch)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initTerminal();
  initProjectFilters();
  initCopyEmail();
  initContactForm();
  initCounterAnimation();
  initMobileMenu();
});

/* -------------------------------------------------------------
 * 1. Navbar Scroll & Active Link Observer
 * ------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.background = 'rgba(8, 11, 17, 0.92)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
    } else {
      navbar.style.background = 'var(--bg-glass)';
      navbar.style.boxShadow = 'none';
    }

    // Scrollspy
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 2. Mobile Menu Toggle
 * ------------------------------------------------------------- */
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!btn || !navLinks) return;

  btn.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    if (isVisible) {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '72px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = '#0e131f';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid var(--border-subtle)';
    }
  });
}

/* -------------------------------------------------------------
 * 3. Interactive Developer CLI Terminal
 * ------------------------------------------------------------- */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');
  if (!input || !output) return;

  const history = [];
  let historyIndex = -1;

  const commands = {
    help: () => `
<span class="accent-text">Available commands:</span>
  • <span style="color:#f8fafc">about</span>       - Brief overview & engineering focus
  • <span style="color:#f8fafc">skills</span>      - Tech stack arsenal & competencies
  • <span style="color:#f8fafc">projects</span>    - Featured production systems
  • <span style="color:#f8fafc">contact</span>     - Guild contact & social links
  • <span style="color:#f8fafc">neofetch</span>    - System architecture & runtime spec
  • <span style="color:#f8fafc">arise</span>       - Solo Leveling Easter Egg
  • <span style="color:#f8fafc">clear</span>       - Clear terminal output
`,
    about: () => `
<p><strong>Trần Duy Trường (truong311203-arch)</strong></p>
<p>Role: AI & Software Engineer</p>
<p>Focus: Autonomous Agent Frameworks, Real-time RAG Pipelines, Distributed Systems, High-performance C++ & Python Backends.</p>
<p>Location: Vietnam (UTC+7) | Continually grinding knowledge & engineering depth.</p>
`,
    skills: () => `
<p><span class="accent-text">[Core Languages]</span> Python, C++, JavaScript/TypeScript, SQL, Shell/Bash</p>
<p><span class="accent-text">[AI Systems]</span> PyTorch, LangChain, Multi-Agent Systems, RAG, Qdrant/Pinecone, HuggingFace</p>
<p><span class="accent-text">[Backends]</span> FastAPI, Node.js, Redis, PostgreSQL, Distributed Task Queues</p>
<p><span class="accent-text">[DevOps]</span> Docker, Linux/Unix, Git, GitHub Actions, Vercel</p>
`,
    projects: () => `
<p>1. <strong>NexusAgent</strong> - Autonomous Multi-Agent Orchestrator (LangGraph, FastAPI)</p>
<p>2. <strong>Aether</strong> - Vector Search & Hybrid RAG Engine (PyTorch, Qdrant)</p>
<p>3. <strong>Kestrel</strong> - High-Throughput Distributed Task Queue (C++, Redis)</p>
<p>4. <strong>Git Profile Awaken</strong> - LitRPG gamification profile engine (Actions, SVG)</p>
`,
    contact: () => `
<p>• Email: <a href="mailto:truong311203@gmail.com" style="color:#38bdf8">truong311203@gmail.com</a></p>
<p>• GitHub: <a href="https://github.com/truong311203-arch" target="_blank" style="color:#38bdf8">github.com/truong311203-arch</a></p>
`,
    neofetch: () => `
<pre style="color:#a5b4fc; font-family:var(--font-mono); font-size:0.8rem; line-height:1.2;">
   .---.       OS: Linux / Arch / Ubuntu LTS
  /     \\      HOST: AI Systems Workstation
 | () () |     ENGINEER: Trần Duy Trường (truong311203-arch)
  \\  _  /      CLASS: AI & Software Engineer
   \`---\`       STATUS: Online & Open for Collaborations
               UPTIME: Leveling up daily
</pre>
`,
    arise: () => `
<p style="color:#a855f7; font-weight:bold;">⚔️ [ SYSTEM: SHADOW EXTRACTION INITIATED ]</p>
<p><em>"Only those who continuously grind become Monarchs."</em></p>
<p style="color:#38bdf8">Hunter truong311203-arch has awakened his shadow army of AI agents!</p>
`,
    whoami: () => `<p>Visitor / Engineer seeking high-impact solutions.</p>`,
    clear: () => {
      output.innerHTML = '';
      return '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawVal = input.value.trim();
      if (!rawVal) return;

      history.push(rawVal);
      historyIndex = history.length;

      const cmd = rawVal.toLowerCase();
      const promptLine = document.createElement('div');
      promptLine.innerHTML = `<span class="terminal-prompt">guest@truong311203:~$</span> <span>${escapeHtml(rawVal)}</span>`;
      output.appendChild(promptLine);

      if (commands[cmd]) {
        const res = commands[cmd]();
        if (res) {
          const resEl = document.createElement('div');
          resEl.innerHTML = res;
          output.appendChild(resEl);
        }
      } else {
        const errorEl = document.createElement('div');
        errorEl.innerHTML = `<span style="color:#f87171">Command not found: "${escapeHtml(rawVal)}". Type 'help' for available commands.</span>`;
        output.appendChild(errorEl);
      }

      input.value = '';
      const terminalBody = document.querySelector('.terminal-body');
      if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0 && historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        input.value = '';
      }
    }
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

/* -------------------------------------------------------------
 * 4. Project Filter Tabs
 * ------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 5. One-Click Copy Email & Toast Feedback
 * ------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');
  const email = 'truong311203@gmail.com';

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  function showToast(message) {
    if (!toast) return;
    toast.textContent = `✓ ${message}`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* -------------------------------------------------------------
 * 6. Contact Form Simulation
 * ------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = 'Sending transmission...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      form.reset();

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }, 900);
  });
}

/* -------------------------------------------------------------
 * 7. Animated Metrics Counter
 * ------------------------------------------------------------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.metric-value');
  let activated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !activated) {
        activated = true;
        counters.forEach((counter) => {
          const target = +counter.getAttribute('data-target');
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1600;
          const step = Math.max(1, Math.floor(target / (duration / 25)));
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = current + suffix;
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}
