(function () {
  'use strict';
  const loader = document.getElementById('loader');
  document.body.classList.add('loading');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      initRevealAnimations();
    }, 2200);
  });
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const footerLinks = document.querySelectorAll('.footer-link');
  const navTabsContainer = document.querySelector('.nav-tabs');
  const hamburger = document.getElementById('nav-hamburger');
  function switchTab(tabName) {
    navTabs.forEach((tab) => {
      const isActive = tab.dataset.tab === tabName;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive);
    });
    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === tabName;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
    navTabsContainer.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initRevealAnimations, 100);
    if (tabName === 'home') {
      startParticles();
    }
  }
  navTabs.forEach((tab) => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });
  footerLinks.forEach((link) => {
    link.addEventListener('click', () => switchTab(link.dataset.tab));
  });
  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.goto));
  });
  hamburger.addEventListener('click', () => {
    const isOpen = navTabsContainer.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('dreamscape-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('dreamscape-theme', next);
  });

  // --- SCROLL ANIMATION: elements with class "reveal" fade in when visible ---
  function initRevealAnimations() {
    const reveals = document.querySelectorAll('.tab-panel.active .reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => {
      el.classList.remove('visible');
      observer.observe(el);
    });
  }
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;
  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  function createParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }
  function drawParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const isLight = html.getAttribute('data-theme') === 'light';
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(100, 80, 150, ${p.opacity})`
        : `rgba(200, 180, 255, ${p.opacity})`;
      ctx.fill();
    });
    animationId = requestAnimationFrame(drawParticles);
  }
  function startParticles() {
    if (!canvas) return;
    resizeCanvas();
    createParticles(80);
    if (animationId) cancelAnimationFrame(animationId);
    drawParticles();
  }
  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles(80);
  });
  startParticles();
  document.querySelectorAll('.emotion-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // --- MOOD QUIZ: each answer adds points; highest emotion wins ---
  const quizIntro = document.getElementById('quiz-intro');
  const quizQuestion = document.getElementById('quiz-question');
  const quizResult = document.getElementById('quiz-result');
  const quizStart = document.getElementById('quiz-start');
  const quizRetry = document.getElementById('quiz-retry');
  const quizQText = document.getElementById('quiz-q-text');
  const quizOptions = document.getElementById('quiz-options');
  const quizProgressBar = document.getElementById('quiz-progress-bar');
  const quizProgressText = document.getElementById('quiz-progress-text');
  const resultEmotion = document.getElementById('result-emotion');
  const resultQuote = document.getElementById('result-quote');
  const resultAura = document.getElementById('result-aura');
  const resultAuraText = document.getElementById('result-aura-text');
  const resultVibe = document.getElementById('result-vibe');
  const quizQuestions = [
    {
      text: 'Tonight, the sky feels like…',
      options: [
        { label: 'A blanket of endless calm', scores: { serenity: 2, wonder: 1 } },
        { label: 'A storm waiting to break', scores: { melancholy: 2, longing: 1 } },
        { label: 'A canvas of burning gold', scores: { euphoria: 2, courage: 1 } },
        { label: 'A mirror of my thoughts', scores: { longing: 2, melancholy: 1 } },
      ],
    },
    {
      text: 'Your heart whispers…',
      options: [
        { label: '"I need silence"', scores: { serenity: 2 } },
        { label: '"I miss someone"', scores: { longing: 2, melancholy: 1 } },
        { label: '"I am infinite"', scores: { wonder: 2, euphoria: 1 } },
        { label: '"I will rise again"', scores: { courage: 2, euphoria: 1 } },
      ],
    },
    {
      text: 'Pick a colour that calls to you:',
      options: [
        { label: 'Soft lavender mist', scores: { serenity: 2, wonder: 1 } },
        { label: 'Deep midnight blue', scores: { melancholy: 2, longing: 1 } },
        { label: 'Golden sunrise', scores: { euphoria: 2, courage: 1 } },
        { label: 'Crimson ember', scores: { courage: 2, longing: 1 } },
      ],
    },
    {
      text: 'If your soul were a place, it would be…',
      options: [
        { label: 'A quiet lake at dawn', scores: { serenity: 2 } },
        { label: 'An empty train at 3 AM', scores: { melancholy: 2, longing: 1 } },
        { label: 'A rooftop under stars', scores: { wonder: 2, euphoria: 1 } },
        { label: 'A battlefield turned garden', scores: { courage: 2, healing: 1 } },
      ],
    },
    {
      text: 'What do you crave most right now?',
      options: [
        { label: 'Peace', scores: { serenity: 3 } },
        { label: 'Connection', scores: { longing: 3 } },
        { label: 'Magic', scores: { wonder: 2, euphoria: 1 } },
        { label: 'Freedom', scores: { courage: 2, euphoria: 1 } },
      ],
    },
  ];
  const emotionResults = {
    serenity: {
      name: 'Serene Dreamer',
      quote: 'Your soul rests in still waters — calm, deep, and beautifully untroubled.',
      aura: 'Lavender Mist',
      auraColor: 'hsla(260, 50%, 60%, 0.6)',
      vibe: 'Soft ambient · moonlit walks · herbal tea',
    },
    longing: {
      name: 'Eternal Longing',
      quote: 'You carry the beautiful ache of distances — love that reaches beyond the horizon.',
      aura: 'Twilight Violet',
      auraColor: 'hsla(280, 45%, 50%, 0.6)',
      vibe: 'Slow R&B · rainy windows · handwritten letters',
    },
    euphoria: {
      name: 'Radiant Soul',
      quote: 'Light pours through you — joy is not fleeting, it is your natural state tonight.',
      aura: 'Golden Dawn',
      auraColor: 'hsla(45, 70%, 55%, 0.6)',
      vibe: 'Indie pop · sunrise drives · dancing alone',
    },
    melancholy: {
      name: 'Tender Melancholy',
      quote: 'Your depth is your gift — you feel the world so fully it becomes poetry.',
      aura: 'Midnight Indigo',
      auraColor: 'hsla(240, 40%, 35%, 0.7)',
      vibe: 'Acoustic ballads · candlelight · old photographs',
    },
    wonder: {
      name: 'Stardust Wanderer',
      quote: 'You see magic where others see ordinary — the universe speaks through your eyes.',
      aura: 'Celestial Teal',
      auraColor: 'hsla(180, 50%, 50%, 0.6)',
      vibe: 'Cosmic ambient · stargazing · philosophy at 2 AM',
    },
    courage: {
      name: 'Brave Horizon',
      quote: 'Fire runs quietly through your veins — you are becoming who you were meant to be.',
      aura: 'Ember Rose',
      auraColor: 'hsla(15, 60%, 55%, 0.6)',
      vibe: 'Empowering anthems · open roads · bold decisions',
    },
  };
  let currentQuestion = 0;
  let scores = {};
  function resetQuiz() {
    currentQuestion = 0;
    scores = { serenity: 0, longing: 0, euphoria: 0, melancholy: 0, wonder: 0, courage: 0 };
    quizIntro.classList.remove('hidden');
    quizQuestion.classList.add('hidden');
    quizResult.classList.add('hidden');
  }
  function showQuestion() {
    const q = quizQuestions[currentQuestion];
    quizQText.textContent = q.text;
    quizProgressBar.style.width = ((currentQuestion + 1) / quizQuestions.length) * 100 + '%';
    quizProgressText.textContent = `${currentQuestion + 1} / ${quizQuestions.length}`;
    quizOptions.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = opt.label;
      btn.addEventListener('click', () => selectAnswer(opt.scores, btn));
      btn.style.animationDelay = i * 0.08 + 's';
      quizOptions.appendChild(btn);
    });
  }
  function selectAnswer(optionScores, btn) {
    document.querySelectorAll('.quiz-option').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    Object.entries(optionScores).forEach(([key, val]) => {
      scores[key] = (scores[key] || 0) + val;
    });
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < quizQuestions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 400);
  }
  function showResult() {
    quizQuestion.classList.add('hidden');
    quizResult.classList.remove('hidden');
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const result = emotionResults[winner];
    resultEmotion.textContent = result.name;
    resultQuote.textContent = result.quote;
    resultAuraText.textContent = result.aura;
    resultVibe.textContent = result.vibe;
    resultAura.style.background = result.auraColor;
  }
  quizStart.addEventListener('click', () => {
    resetQuiz();
    quizIntro.classList.add('hidden');
    quizQuestion.classList.remove('hidden');
    showQuestion();
  });
  quizRetry.addEventListener('click', resetQuiz);

  // --- MUSIC: songs stored in musicData; renderMusic() builds HTML cards ---
  const musicGrid = document.getElementById('music-grid');
  const musicCats = document.querySelectorAll('.music-cat');
  const musicData = {
    'late-night': [
      { title: 'Slow Dancing in the Dark', artist: 'Joji', emoji: '🌃', hue: 240, tag: 'R&B' },
      { title: '505', artist: 'Arctic Monkeys', emoji: '🛣', hue: 260, tag: 'Indie' },
      { title: 'Starboy', artist: 'The Weeknd', emoji: '✨', hue: 280, tag: 'Pop' },
      { title: 'Young and Beautiful', artist: 'Lana Del Rey', emoji: '🌙', hue: 220, tag: 'Hollywood' },
      { title: 'Blinding Lights', artist: 'The Weeknd', emoji: '🚗', hue: 45, tag: 'Pop' },
      { title: 'Nightcall', artist: 'Kavinsky', emoji: '🌌', hue: 200, tag: 'Drive OST' },
    ],
    rainy: [
      { title: 'Do I Wanna Know?', artist: 'Arctic Monkeys', emoji: '🌧', hue: 210, tag: 'Indie' },
      { title: 'Apocalypse', artist: 'Cigarettes After Sex', emoji: '☁', hue: 200, tag: 'Dream Pop' },
      { title: 'Hotel California', artist: 'Eagles', emoji: '🏨', hue: 190, tag: 'Classic' },
      { title: 'The Night We Met', artist: 'Lord Huron', emoji: '💧', hue: 220, tag: 'Indie' },
    ],
    overthinking: [
      { title: 'Fix You', artist: 'Coldplay', emoji: '🌀', hue: 270, tag: 'Rock' },
      { title: 'Breathe Me', artist: 'Sia', emoji: '💭', hue: 250, tag: 'Pop' },
      { title: 'Who Says', artist: 'Selena Gomez', emoji: '🌸', hue: 240, tag: 'Pop' },
      { title: 'Beautiful Boy', artist: 'John Lennon', emoji: '🕊', hue: 260, tag: 'Classic' },
    ],
    healing: [
      { title: 'Sparks', artist: 'Coldplay', emoji: '✨', hue: 150, tag: 'Rock' },
      { title: 'Vienna', artist: 'Billy Joel', emoji: '🎹', hue: 160, tag: 'Classic' },
      { title: 'Matilda', artist: 'Harry Styles', emoji: '🌿', hue: 40, tag: 'Pop' },
      { title: 'My Way', artist: 'Frank Sinatra', emoji: '☀️', hue: 45, tag: 'Hollywood' },
    ],
    romantic: [
      { title: 'Too Sweet', artist: 'Hozier', emoji: '🍯', hue: 340, tag: 'Indie' },
      { title: 'Lover', artist: 'Taylor Swift', emoji: '💕', hue: 350, tag: 'Pop' },
      { title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley', emoji: '👑', hue: 15, tag: 'Classic' },
      { title: 'Forever', artist: 'The Little Dippers', emoji: '💫', hue: 25, tag: 'Classic' },
      { title: 'I Wanna Be Yours', artist: 'Arctic Monkeys', emoji: '🌹', hue: 320, tag: 'Indie' },
    ],
  };
  function renderMusic(category) {
    const songs = musicData[category] || musicData['late-night'];
    musicGrid.innerHTML = songs
      .map(
        (song) => `
      <article class="music-card reveal">
        <div class="music-card-art" style="--card-hue: ${song.hue}">${song.emoji}</div>
        <h4>${song.title}</h4>
        <p class="artist">${song.artist}</p>
        <span class="vibe-tag">${song.tag}</span>
        <p class="music-recommend">Recommended for your mood</p>
      </article>
    `
      )
      .join('');
    initRevealAnimations();
  }
  musicCats.forEach((cat) => {
    cat.addEventListener('click', () => {
      musicCats.forEach((c) => c.classList.remove('active'));
      cat.classList.add('active');
      renderMusic(cat.dataset.category);
    });
  });
  renderMusic('late-night');

  // --- JOURNAL: entries saved as JSON in localStorage ---
  const journalInput = document.getElementById('journal-input');
  const journalTitle = document.getElementById('journal-title');
  const journalSave = document.getElementById('journal-save');
  const journalClear = document.getElementById('journal-clear');
  const entriesList = document.getElementById('entries-list');
  const entriesEmpty = document.getElementById('entries-empty');
  const moodChips = document.querySelectorAll('.mood-chip');
  const moodEmojis = {
    calm: '🌊',
    happy: '✨',
    sad: '🌧',
    anxious: '🌀',
    hopeful: '🌅',
    loving: '💫',
  };
  let selectedMood = 'calm';
  moodChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      moodChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      selectedMood = chip.dataset.mood;
    });
  });
  moodChips[0].classList.add('active');
  function getEntries() {
    try {
      return JSON.parse(localStorage.getItem('dreamscape-journal') || '[]');
    } catch {
      return [];
    }
  }
  function saveEntries(entries) {
    localStorage.setItem('dreamscape-journal', JSON.stringify(entries));
  }
  function renderEntries() {
    const entries = getEntries();
    entriesEmpty.style.display = entries.length ? 'none' : 'block';
    const existing = entriesList.querySelectorAll('.journal-entry');
    existing.forEach((el) => el.remove());
    entries.forEach((entry, index) => {
      const div = document.createElement('div');
      div.className = 'journal-entry';
      div.innerHTML = `
        <div class="journal-entry-header">
          <span>
            <span class="journal-entry-mood">${moodEmojis[entry.mood] || '✨'}</span>
            <span class="journal-entry-title">${entry.title || 'Untitled'}</span>
          </span>
          <span class="journal-entry-date">${entry.date}</span>
        </div>
        <p class="journal-entry-text">${escapeHtml(entry.text)}</p>
        <button class="journal-entry-delete" data-index="${index}">Delete</button>
      `;
      entriesList.appendChild(div);
    });
    entriesList.querySelectorAll('.journal-entry-delete').forEach((btn) => {
      btn.addEventListener('click', () => {
        const entries = getEntries();
        entries.splice(Number(btn.dataset.index), 1);
        saveEntries(entries);
        renderEntries();
      });
    });
  }
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  journalSave.addEventListener('click', () => {
    const text = journalInput.value.trim();
    if (!text) return;
    const entries = getEntries();
    entries.unshift({
      title: journalTitle.value.trim() || 'Untitled',
      text,
      mood: selectedMood,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    saveEntries(entries);
    journalInput.value = '';
    journalTitle.value = '';
    renderEntries();
  });
  journalClear.addEventListener('click', () => {
    if (confirm('Clear all journal entries? This cannot be undone.')) {
      saveEntries([]);
      renderEntries();
    }
  });
  renderEntries();

  // --- SANCTUARY: breathing exercise + random affirmations ---
  const breathingCircle = document.getElementById('breathing-circle');
  const breathingLabel = document.getElementById('breathing-label');
  const breathingStart = document.getElementById('breathing-start');
  const breathingInstruction = document.getElementById('breathing-instruction');
  const affirmationText = document.getElementById('affirmation-text');
  const affirmationNew = document.getElementById('affirmation-new');
  const sanctuaryPage = document.querySelector('.sanctuary-page');
  const ambientBtns = document.querySelectorAll('.ambient-btn');
  const affirmations = [
    'You are allowed to take up space. Your feelings are valid.',
    'Healing is not linear — every step forward counts.',
    'You have survived every difficult day so far. That is strength.',
    'Rest is not laziness. It is wisdom.',
    'The moon does not compete with the sun — it simply shines in its own time.',
    'You are becoming, and that is more than enough.',
    'Softness is not weakness. It is courage in a quiet form.',
    'Tonight, let go of what you cannot control. Hold what brings you peace.',
  ];
  function randomAffirmation() {
    const idx = Math.floor(Math.random() * affirmations.length);
    affirmationText.textContent = `"${affirmations[idx]}"`;
  }
  randomAffirmation();
  affirmationNew.addEventListener('click', randomAffirmation);
  let breathingActive = false;
  let breathingTimer = null;
  breathingStart.addEventListener('click', () => {
    if (breathingActive) {
      breathingActive = false;
      clearTimeout(breathingTimer);
      breathingCircle.classList.remove('inhale', 'exhale');
      breathingLabel.textContent = 'Ready';
      breathingStart.textContent = 'Start Breathing';
      breathingInstruction.textContent = 'Press start and follow the rhythm';
      return;
    }
    breathingActive = true;
    breathingStart.textContent = 'Stop';
    breathingInstruction.textContent = 'Follow the circle — breathe with intention';
    runBreathCycle();
  });
  function runBreathCycle() {
    if (!breathingActive) return;
    breathingCircle.classList.remove('exhale');
    breathingCircle.classList.add('inhale');
    breathingLabel.textContent = 'Inhale';
    breathingTimer = setTimeout(() => {
      if (!breathingActive) return;
      breathingLabel.textContent = 'Hold';
      breathingTimer = setTimeout(() => {
        if (!breathingActive) return;
        breathingCircle.classList.remove('inhale');
        breathingCircle.classList.add('exhale');
        breathingLabel.textContent = 'Exhale';
        breathingTimer = setTimeout(() => {
          if (!breathingActive) return;
          breathingCircle.classList.remove('exhale');
          breathingLabel.textContent = 'Rest';
          breathingTimer = setTimeout(runBreathCycle, 1500);
        }, 4000);
      }, 2000);
    }, 4000);
  }
  ambientBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      ambientBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      sanctuaryPage.setAttribute('data-ambient', btn.dataset.ambient);
    });
  });
})();
