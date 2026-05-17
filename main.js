(function () {
  'use strict';

  // TAB SYSTEM
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

  // MOBILE MENU
  hamburger.addEventListener('click', () => {
    const isOpen = navTabsContainer.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // THEME TOGGLE
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('dreamscape-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const next =
      html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem('dreamscape-theme', next);
  });

  // REVEAL ANIMATIONS
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
      {
        threshold: 0.15,
      }
    );

    reveals.forEach((el) => {
      el.classList.remove('visible');
      observer.observe(el);
    });
  }

  // QUIZ
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
        {
          label: 'A blanket of endless calm',
          scores: { serenity: 2, wonder: 1 },
        },
        {
          label: 'A storm waiting to break',
          scores: { melancholy: 2, longing: 1 },
        },
        {
          label: 'A canvas of burning gold',
          scores: { euphoria: 2, courage: 1 },
        },
      ],
    },
    {
      text: 'Your heart whispers…',
      options: [
        {
          label: 'I need silence',
          scores: { serenity: 2 },
        },
        {
          label: 'I miss someone',
          scores: { longing: 2 },
        },
        {
          label: 'I am infinite',
          scores: { wonder: 2 },
        },
      ],
    },
  ];

  const emotionResults = {
    serenity: {
      name: 'Serene Dreamer',
      quote:
        'Your soul rests in still waters — calm and peaceful.',
      aura: 'Lavender Mist',
      auraColor: 'hsla(260, 50%, 60%, 0.6)',
      vibe: 'Moonlight and calm music',
    },

    longing: {
      name: 'Eternal Longing',
      quote:
        'You carry deep emotions and beautiful memories.',
      aura: 'Twilight Violet',
      auraColor: 'hsla(280, 45%, 50%, 0.6)',
      vibe: 'Rainy evenings and soft songs',
    },

    wonder: {
      name: 'Stardust Wanderer',
      quote:
        'You find magic in ordinary moments.',
      aura: 'Celestial Teal',
      auraColor: 'hsla(180, 50%, 50%, 0.6)',
      vibe: 'Stars and midnight thoughts',
    },
  };

  let currentQuestion = 0;

  let scores = {
    serenity: 0,
    longing: 0,
    wonder: 0,
  };

  function resetQuiz() {
    currentQuestion = 0;

    scores = {
      serenity: 0,
      longing: 0,
      wonder: 0,
    };

    quizIntro.classList.remove('hidden');
    quizQuestion.classList.add('hidden');
    quizResult.classList.add('hidden');
  }

  function showQuestion() {
    const q = quizQuestions[currentQuestion];

    quizQText.textContent = q.text;

    quizProgressBar.style.width =
      ((currentQuestion + 1) / quizQuestions.length) * 100 + '%';

    quizProgressText.textContent =
      `${currentQuestion + 1} / ${quizQuestions.length}`;

    quizOptions.innerHTML = '';

    q.options.forEach((opt) => {
      const btn = document.createElement('button');

      btn.className = 'quiz-option';
      btn.textContent = opt.label;

      btn.addEventListener('click', () => {
        selectAnswer(opt.scores);
      });

      quizOptions.appendChild(btn);
    });
  }

  function selectAnswer(optionScores) {
    Object.entries(optionScores).forEach(([key, value]) => {
      scores[key] += value;
    });

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    quizQuestion.classList.add('hidden');
    quizResult.classList.remove('hidden');

    const winner = Object.entries(scores).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

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

  // MUSIC SECTION
  const musicGrid =
    document.getElementById('music-grid');

  const musicCats =
    document.querySelectorAll('.music-cat');

  const musicData = {
    'late-night': [
      {
        title: 'Slow Dancing in the Dark',
        artist: 'Joji',
      },

      {
        title: '505',
        artist: 'Arctic Monkeys',
      },

      {
        title: 'Starboy',
        artist: 'The Weeknd',
      },

      {
        title: 'Young and Beautiful',
        artist: 'Lana Del Rey',
      },

      {
        title: 'Blinding Lights',
        artist: 'The Weeknd',
      },
    ],

    rainy: [
      {
        title: 'Do I Wanna Know?',
        artist: 'Arctic Monkeys',
      },

      {
        title: 'Apocalypse',
        artist: 'Cigarettes After Sex',
      },

      {
        title: 'Hotel California',
        artist: 'Eagles',
      },

      {
        title: 'The Night We Met',
        artist: 'Lord Huron',
      },
    ],

    overthinking: [
      {
        title: 'Fix You',
        artist: 'Coldplay',
      },

      {
        title: 'Breathe Me',
        artist: 'Sia',
      },

      {
        title: 'Who Says',
        artist: 'Selena Gomez',
      },

      {
        title: 'Beautiful Boy',
        artist: 'John Lennon',
      },
    ],

    healing: [
      {
        title: 'Sparks',
        artist: 'Coldplay',
      },

      {
        title: 'Vienna',
        artist: 'Billy Joel',
      },

      {
        title: 'Matilda',
        artist: 'Harry Styles',
      },

      {
        title: 'My Way',
        artist: 'Frank Sinatra',
      },
    ],

    romantic: [
      {
        title: 'Too Sweet',
        artist: 'Hozier',
      },

      {
        title: 'Lover',
        artist: 'Taylor Swift',
      },

      {
        title: 'I Wanna Be Yours',
        artist: 'Arctic Monkeys',
      },

      {
        title: 'Forever',
        artist: 'The Little Dippers',
      },
    ],
  };

  function renderMusic(category) {
    const songs =
      musicData[category] ||
      musicData['late-night'];

    musicGrid.innerHTML = songs
      .map(
        (song) => `
        <div class="music-card reveal">
          <h3>${song.title}</h3>
          <p>${song.artist}</p>
        </div>
      `
      )
      .join('');

    initRevealAnimations();
  }

  musicCats.forEach((cat) => {
    cat.addEventListener('click', () => {
      musicCats.forEach((c) =>
        c.classList.remove('active')
      );

      cat.classList.add('active');

      renderMusic(cat.dataset.category);
    });
  });

  renderMusic('late-night');

  // JOURNAL
  const journalInput = document.getElementById('journal-input');
  const journalTitle = document.getElementById('journal-title');

  const journalSave = document.getElementById('journal-save');
  const journalClear = document.getElementById('journal-clear');

  const entriesList = document.getElementById('entries-list');

  function getEntries() {
    return JSON.parse(
      localStorage.getItem('dreamscape-journal') || '[]'
    );
  }

  function saveEntries(entries) {
    localStorage.setItem(
      'dreamscape-journal',
      JSON.stringify(entries)
    );
  }

  function renderEntries() {
    const entries = getEntries();

    entriesList.innerHTML = '';

    entries.forEach((entry, index) => {
      const div = document.createElement('div');

      div.className = 'journal-entry';

      div.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.text}</p>
        <button data-index="${index}" class="delete-btn">
          Delete
        </button>
      `;

      entriesList.appendChild(div);
    });

    document.querySelectorAll('.delete-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const entries = getEntries();

        entries.splice(btn.dataset.index, 1);

        saveEntries(entries);

        renderEntries();
      });
    });
  }

  journalSave.addEventListener('click', () => {
    const title = journalTitle.value.trim();
    const text = journalInput.value.trim();

    if (!text) return;

    const entries = getEntries();

    entries.unshift({
      title,
      text,
    });

    saveEntries(entries);

    journalTitle.value = '';
    journalInput.value = '';

    renderEntries();
  });

  journalClear.addEventListener('click', () => {
    localStorage.removeItem('dreamscape-journal');

    renderEntries();
  });

  renderEntries();
  // =========================
// BREATHING SECTION
// =========================

const breathingCircle =
  document.getElementById('breathing-circle');

const breathingLabel =
  document.getElementById('breathing-label');

const breathingStart =
  document.getElementById('breathing-start');

const breathingInstruction =
  document.getElementById('breathing-instruction');

let breathingActive = false;

let breathingTimer = null;

breathingStart.addEventListener('click', () => {

  if (breathingActive) {

    breathingActive = false;

    clearTimeout(breathingTimer);

    breathingCircle.classList.remove(
      'inhale',
      'exhale'
    );

    breathingLabel.textContent = 'Ready';

    breathingStart.textContent =
      'Start Breathing';

    breathingInstruction.textContent =
      'Press start and follow the rhythm';

    return;
  }

  breathingActive = true;

  breathingStart.textContent = 'Stop';

  breathingInstruction.textContent =
    'Follow the circle and breathe slowly';

  runBreathCycle();
});

function runBreathCycle() {

  if (!breathingActive) return;

  // INHALE

  breathingCircle.classList.remove('exhale');

  breathingCircle.classList.add('inhale');

  breathingLabel.textContent = 'Inhale';

  breathingTimer = setTimeout(() => {

    if (!breathingActive) return;

    // HOLD

    breathingLabel.textContent = 'Hold';

    breathingTimer = setTimeout(() => {

      if (!breathingActive) return;

      // EXHALE

      breathingCircle.classList.remove('inhale');

      breathingCircle.classList.add('exhale');

      breathingLabel.textContent = 'Exhale';

      breathingTimer = setTimeout(() => {

        if (!breathingActive) return;

        breathingCircle.classList.remove('exhale');

        breathingLabel.textContent = 'Rest';

        breathingTimer = setTimeout(
          runBreathCycle,
          1500
        );

      }, 4000);

    }, 2000);

  }, 4000);
}

})();
