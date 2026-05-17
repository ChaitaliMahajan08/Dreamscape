<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Dreamscape</title>

  <meta name="description" content="An interactive website based on emotions, music and relaxation.">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/styles.css">
</head>

<body>

  <!-- Navbar -->
  <header class="navbar" id="navbar">

    <div class="nav-brand">
      <span class="nav-logo">🌙</span>
      <span class="nav-title">Dreamscape</span>
    </div>

    <nav class="nav-tabs">

      <button class="nav-tab active" data-tab="home">Home</button>

      <button class="nav-tab" data-tab="quiz">Mood Quiz</button>

      <button class="nav-tab" data-tab="music">Music</button>

      <button class="nav-tab" data-tab="journal">Journal</button>

      <button class="nav-tab" data-tab="sanctuary">Sanctuary</button>

    </nav>

    <div class="nav-actions">

      <button class="theme-toggle" id="theme-toggle">
        <span class="theme-icon theme-icon-sun">☀</span>
        <span class="theme-icon theme-icon-moon">☽</span>
      </button>

      <button class="nav-hamburger" id="nav-hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>

  </header>

  <main class="main-content">

    <!-- HOME -->
    <section class="tab-panel active" id="tab-home" data-panel="home">

      <div class="hero">

        <canvas id="particle-canvas" class="particle-canvas"></canvas>

        <div class="hero-blobs">
          <div class="blob blob-1"></div>
          <div class="blob blob-2"></div>
          <div class="blob blob-3"></div>
        </div>

        <div class="hero-content reveal">

          <p class="hero-eyebrow">
            Interactive Emotion Website
          </p>

          <h1 class="hero-heading">
            Welcome to
            <span class="gradient-text">Dreamscape</span>
          </h1>

          <p class="hero-sub">
            Explore emotions, music and relaxing activities through an interactive experience.
          </p>

          <button class="btn-primary hero-cta" data-goto="quiz">
            Discover Your Mood
          </button>

        </div>

      </div>

      <!-- Emotion Cards -->
      <div class="emotion-gallery">

        <div class="section-header reveal">
          <h2>Emotions in Motion</h2>
          <p>Explore different emotional vibes</p>
        </div>

        <div class="emotion-track" id="emotion-track">

          <article class="emotion-card" data-emotion="serenity">
            <div class="emotion-card-bg" style="--card-hue: 220"></div>
            <span class="emotion-label">Serenity</span>

            <blockquote>
              "In stillness, the universe whispers its secrets."
            </blockquote>
          </article>

          <article class="emotion-card" data-emotion="longing">
            <div class="emotion-card-bg" style="--card-hue: 280"></div>
            <span class="emotion-label">Longing</span>

            <blockquote>
              "We are all haunted by the ghosts of what could have been."
            </blockquote>
          </article>

          <article class="emotion-card" data-emotion="euphoria">
            <div class="emotion-card-bg" style="--card-hue: 45"></div>
            <span class="emotion-label">Euphoria</span>

            <blockquote>
              "Joy is the light that leaks through ordinary days."
            </blockquote>
          </article>

          <article class="emotion-card" data-emotion="melancholy">
            <div class="emotion-card-bg" style="--card-hue: 260"></div>
            <span class="emotion-label">Melancholy</span>

            <blockquote>
              "Sadness is just love with nowhere to go."
            </blockquote>
          </article>

          <article class="emotion-card" data-emotion="wonder">
            <div class="emotion-card-bg" style="--card-hue: 180"></div>
            <span class="emotion-label">Wonder</span>

            <blockquote>
              "Look up — you are made of the same dust as the stars."
            </blockquote>
          </article>

          <article class="emotion-card" data-emotion="courage">
            <div class="emotion-card-bg" style="--card-hue: 15"></div>
            <span class="emotion-label">Courage</span>

            <blockquote>
              "The brave heart beats loudest in quiet moments."
            </blockquote>
          </article>

        </div>

      </div>

    </section>

    <!-- QUIZ -->
    <section class="tab-panel" id="tab-quiz" data-panel="quiz" hidden>

      <div class="quiz-container">

        <div class="quiz-intro reveal" id="quiz-intro">

          <span class="section-tag">
            Mood Quiz
          </span>

          <h2>
            What emotion matches your mood tonight?
          </h2>

          <p>
            Answer a few questions and discover your emotional vibe.
          </p>

          <button class="btn-primary" id="quiz-start">
            Start Quiz
          </button>

        </div>

        <div class="quiz-question hidden" id="quiz-question">

          <div class="quiz-progress">
            <div class="quiz-progress-bar" id="quiz-progress-bar"></div>

            <span class="quiz-progress-text" id="quiz-progress-text">
              1 / 5
            </span>
          </div>

          <h3 class="quiz-q-text" id="quiz-q-text"></h3>

          <div class="quiz-options" id="quiz-options"></div>

        </div>

        <div class="quiz-result hidden" id="quiz-result">

          <div class="result-card">

            <div class="result-aura" id="result-aura"></div>

            <span class="result-badge">
              Your Result
            </span>

            <h3 class="result-emotion" id="result-emotion"></h3>

            <p class="result-quote" id="result-quote"></p>

            <div class="result-meta">

              <div class="result-meta-item">
                <span class="meta-label">Aura</span>
                <span class="meta-value" id="result-aura-text"></span>
              </div>

              <div class="result-meta-item">
                <span class="meta-label">Vibe</span>
                <span class="meta-value" id="result-vibe"></span>
              </div>

            </div>

            <button class="btn-secondary" id="quiz-retry">
              Retry
            </button>

          </div>

        </div>

      </div>

    </section>

    <!-- MUSIC -->
    <section class="tab-panel" id="tab-music" data-panel="music" hidden>

      <div class="music-page">

        <div class="section-header reveal">

          <span class="section-tag">
            Music Zone
          </span>

          <h2>
            Music for Every Mood
          </h2>

          <p>
            Songs that match your emotions and vibe.
          </p>

        </div>

        <div class="music-categories">

          <button class="music-cat active" data-category="late-night">
            Late Night
          </button>

          <button class="music-cat" data-category="rainy">
            Rainy Day
          </button>

          <button class="music-cat" data-category="overthinking">
            Overthinking
          </button>

          <button class="music-cat" data-category="healing">
            Healing
          </button>

        </div>

        <div class="music-grid" id="music-grid"></div>

      </div>

    </section>

    <!-- JOURNAL -->
    <section class="tab-panel" id="tab-journal" data-panel="journal" hidden>

      <div class="journal-page">

        <div class="section-header reveal">

          <span class="section-tag">
            Journal Space
          </span>

          <h2>
            Emotional Journal
          </h2>

          <p>
            Write your thoughts and save your feelings.
          </p>

        </div>

        <div class="journal-layout reveal">

          <div class="journal-editor glass-card">

            <div class="journal-mood-picker">

              <span class="picker-label">
                How are you feeling?
              </span>

              <div class="mood-chips" id="mood-chips">

                <button class="mood-chip" data-mood="calm">🌊</button>
                <button class="mood-chip" data-mood="happy">✨</button>
                <button class="mood-chip" data-mood="sad">🌧</button>
                <button class="mood-chip" data-mood="anxious">🌀</button>

              </div>

            </div>

            <textarea
              id="journal-input"
              class="journal-textarea"
              placeholder="Write your thoughts..."
            ></textarea>

            <div class="journal-actions">

              <input
                type="text"
                id="journal-title"
                class="journal-title-input"
                placeholder="Entry title"
              >

              <button class="btn-primary" id="journal-save">
                Save Entry
              </button>

            </div>

          </div>

          <div class="journal-entries glass-card">

            <h3 class="entries-heading">
              Saved Entries
            </h3>

            <div class="entries-list" id="entries-list">

              <p class="entries-empty" id="entries-empty">
                No entries yet.
              </p>

            </div>

            <button class="btn-ghost" id="journal-clear">
              Clear All
            </button>

          </div>

        </div>

      </div>

    </section>

    <!-- SANCTUARY -->
    <section class="tab-panel" id="tab-sanctuary" data-panel="sanctuary" hidden>

      <div class="sanctuary-page">

        <div class="sanctuary-bg">

          <div class="sanctuary-orb orb-1"></div>
          <div class="sanctuary-orb orb-2"></div>
          <div class="sanctuary-orb orb-3"></div>

        </div>

        <div class="section-header reveal">

          <span class="section-tag">
            Relax Zone
          </span>

          <h2>
            Sanctuary
          </h2>

          <p>
            Relax, breathe and slow down.
          </p>

        </div>

        <div class="sanctuary-content reveal">

          <div class="breathing-card glass-card">

            <h3>Breathing Circle</h3>

            <p class="breathing-instruction" id="breathing-instruction">
              Press start and follow the rhythm
            </p>

            <div class="breathing-circle-wrap">

              <div class="breathing-circle" id="breathing-circle">
                <span id="breathing-label">Ready</span>
              </div>

            </div>

            <button class="btn-primary" id="breathing-start">
              Start Breathing
            </button>

          </div>

        </div>

      </div>

    </section>

  </main>

  <!-- Footer -->
  <footer class="footer">

    <div class="footer-inner">

      <div class="footer-brand">
        <span>🌙 Dreamscape</span>
        <p>Interactive Emotion Website</p>
      </div>

      <p class="footer-copy">
        © 2026 Dreamscape
      </p>

    </div>

  </footer>

  <script src="js/main.js"></script>

</body>
</html>
