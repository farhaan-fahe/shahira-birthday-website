/**
 * ===================================================================
 * BIRTHDAY WEBSITE INTERACTIVE ENGINE
 * ===================================================================
 * Complete mobile-first interaction system:
 * - Central config hydration
 * - Candle blow physics & particle celebration
 * - 3D Envelope opening mechanics
 * - Dots & Boxes game engine
 * - Sketchpad doodle engine
 * - Hybrid Audio Player (HTML5 + Web Audio dreamy synth fallback)
 * - Starry Night Van Gogh celestial canvas
 * - Custom desktop cursor & floating petals
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.BIRTHDAY_CONFIG || {};

  // ===================================================================
  // 1. DATA HYDRATION (POPULATE FROM CONFIG)
  // ===================================================================
  function hydrateContent() {
    // Hero & Recipient
    const heroName = document.getElementById('heroName');
    const heroBirthdayHeading = document.getElementById('heroBirthdayHeading');
    const heroBirthdayDate = document.getElementById('heroBirthdayDate');
    const heroWishBadge = document.getElementById('heroWishBadge');
    const blowBtnText = document.getElementById('blowBtnText');

    if (heroName && config.name) heroName.textContent = config.name;
    if (heroBirthdayHeading && config.birthdayHeading) heroBirthdayHeading.textContent = config.birthdayHeading;
    if (heroBirthdayDate && config.birthdayDate) heroBirthdayDate.textContent = config.birthdayDate;
    if (heroWishBadge && config.wishBadge) heroWishBadge.textContent = config.wishBadge;
    if (blowBtnText && config.blowButtonText) blowBtnText.textContent = config.blowButtonText;

    // Wish Section
    const wishHeading = document.getElementById('wishHeading');
    const wishMessageContainer = document.getElementById('wishMessageContainer');
    if (wishHeading && config.wishSectionTitle) wishHeading.textContent = config.wishSectionTitle;
    if (wishMessageContainer && config.wishParagraphs) {
      wishMessageContainer.innerHTML = config.wishParagraphs
        .map(p => `<p>${escapeHtml(p)}</p>`)
        .join('');
    }

    // Envelope
    const envRecipientText = document.getElementById('envRecipientText');
    const envSubtitleText = document.getElementById('envSubtitleText');
    if (envRecipientText && config.envelope?.mainText) envRecipientText.textContent = config.envelope.mainText;
    if (envSubtitleText && config.envelope?.subText) envSubtitleText.textContent = config.envelope.subText;

    // Long Letter
    const letterDate = document.getElementById('letterDate');
    const letterTitle = document.getElementById('letterTitle');
    const longLetterContainer = document.getElementById('longLetterContainer');
    const letterSignOff = document.getElementById('letterSignOff');

    if (letterDate && config.letterDate) letterDate.textContent = config.letterDate;
    if (letterTitle && config.letterSectionTitle) letterTitle.textContent = config.letterSectionTitle;
    if (longLetterContainer && config.letterParagraphs) {
      longLetterContainer.innerHTML = config.letterParagraphs
        .map(p => `<p>${escapeHtml(p)}</p>`)
        .join('');
    }
    if (letterSignOff && config.letterSignOff) letterSignOff.textContent = config.letterSignOff;



    // K-Drama Section
    const kdramaTitle = document.getElementById('kdramaTitle');
    if (kdramaTitle && config.kdrama?.title) kdramaTitle.textContent = config.kdrama.title;

    // Final Ending Section
    const endingHeading = document.getElementById('endingHeading');
    const endingSubheading = document.getElementById('endingSubheading');
    const endingClosingNote = document.getElementById('endingClosingNote');
    const endingKoreanFarewell = document.getElementById('endingKoreanFarewell');

    if (endingHeading && config.finalMessage?.heading) endingHeading.textContent = config.finalMessage.heading;
    if (endingSubheading && config.finalMessage?.subheading) endingSubheading.textContent = config.finalMessage.subheading;
    if (endingClosingNote && config.finalMessage?.closingNote) endingClosingNote.textContent = config.finalMessage.closingNote;
    if (endingKoreanFarewell && config.finalMessage?.koreanFarewell) endingKoreanFarewell.textContent = config.finalMessage.koreanFarewell;

    // Build Music Tracklist
    buildPlaylist();
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ===================================================================
  // 2. AMBIENT FLOATING PARTICLES (PETALS & STARS)
  // ===================================================================
  const ambientCanvas = document.getElementById('ambientCanvas');
  let ambientCtx = ambientCanvas?.getContext('2d');
  let particles = [];

  function resizeAmbientCanvas() {
    if (!ambientCanvas) return;
    ambientCanvas.width = window.innerWidth;
    ambientCanvas.height = window.innerHeight;
  }

  class AmbientParticle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      if (!ambientCanvas) return;
      this.x = Math.random() * ambientCanvas.width;
      this.y = initial ? Math.random() * ambientCanvas.height : ambientCanvas.height + 20;
      this.size = Math.random() * 5 + 2;
      this.speedY = Math.random() * 0.6 + 0.2;
      this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      this.isPetal = Math.random() > 0.4;
      this.color = this.isPetal ? '#fca5a5' : '#eed99e';
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.2;
      this.rotation += this.rotationSpeed;
      if (this.y < -20) this.reset();
    }
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      if (this.isPetal) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 1.6, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function initAmbientParticles() {
    if (!ambientCanvas || !ambientCtx) return;
    resizeAmbientCanvas();
    window.addEventListener('resize', resizeAmbientCanvas);
    const count = window.innerWidth < 600 ? 25 : 45;
    particles = Array.from({ length: count }, () => new AmbientParticle());

    function loop() {
      ambientCtx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
      particles.forEach(p => {
        p.update();
        p.draw(ambientCtx);
      });
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ===================================================================
  function initDotsBoard() {
    // Initialize Dots & Boxes game board (stub implementation)
    const board = document.getElementById('dotsBoard');
    if (!board) return;
    board.innerHTML = '';
    board.style.display = 'grid';
    board.style.gridTemplateColumns = 'repeat(3, 1fr)';
    board.style.gap = '10px';
    for (let i = 0; i < 9; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot-placeholder';
      dot.style.width = '12px';
      dot.style.height = '12px';
      dot.style.borderRadius = '50%';
      dot.style.background = 'var(--color-pink)';
      board.appendChild(dot);
    }
  }
  // ===================================================================
  // 3. DESKTOP CUSTOM CURSOR
  // ===================================================================
  const customCursor = document.getElementById('customCursor');
  if (customCursor && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function renderCursor() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();
  }

  // ===================================================================
  // 4. SCENE 1 & 2: CANDLE BLOW INTERACTION & CONFETTI
  // ===================================================================
  let isCandleLit = true;
  const blowCandleBtn = document.getElementById('blowCandleBtn');
  const cakeWrapper = document.getElementById('cakeWrapper');
  const flame = document.getElementById('flame');
  const flameGlow = document.getElementById('flameGlow');
  const smokePuff = document.getElementById('smokePuff');
  const candleBlowHint = document.getElementById('candleBlowHint');
  const cakeConfettiCanvas = document.getElementById('cakeConfettiCanvas');
  let cakeConfettiCtx = cakeConfettiCanvas?.getContext('2d');
  let cakeConfettiParticles = [];

  function blowOutCandle() {
    if (!isCandleLit) return;
    isCandleLit = false;

    // 1. Flicker & extinguish flame
    flame.classList.add('extinguished');
    flameGlow.classList.add('extinguished');

    // 2. Smoke rising
    smokePuff.classList.add('active');

    // 3. Celebration text
    if (candleBlowHint) {
      candleBlowHint.textContent = "✨ Your wish is sent to the stars! Happiest Birthday! 🌸";
      candleBlowHint.style.color = "var(--color-wine)";
      candleBlowHint.style.fontWeight = "700";
    }
    if (blowCandleBtn) {
      blowCandleBtn.innerHTML = "<span>✨ WISH MADE ♡</span>";
      blowCandleBtn.style.background = "#fff0f3";
    }

    // 4. Burst pastel confetti
    triggerCakeConfetti();

    // 5. Smooth scroll to wish after gentle celebration
    setTimeout(() => {
      const sceneWish = document.getElementById('sceneWish');
      if (sceneWish) {
        sceneWish.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1800);
  }

  function triggerCakeConfetti() {
    if (!cakeConfettiCanvas || !cakeConfettiCtx) return;
    cakeConfettiCanvas.width = cakeConfettiCanvas.offsetWidth;
    cakeConfettiCanvas.height = cakeConfettiCanvas.offsetHeight;

    const colors = ['#e8829c', '#d8587b', '#9d7bb0', '#eed99e', '#fffdf9', '#c24d58'];
    cakeConfettiParticles = Array.from({ length: 60 }, () => ({
      x: cakeConfettiCanvas.width / 2,
      y: 70,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 1.2) * 5,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.1
    }));

    function animateConfetti() {
      cakeConfettiCtx.clearRect(0, 0, cakeConfettiCanvas.width, cakeConfettiCanvas.height);
      let activeCount = 0;
      cakeConfettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.alpha -= 0.012;
        p.rotation += p.vRot;

        if (p.alpha > 0) {
          activeCount++;
          cakeConfettiCtx.save();
          cakeConfettiCtx.translate(p.x, p.y);
          cakeConfettiCtx.rotate(p.rotation);
          cakeConfettiCtx.globalAlpha = p.alpha;
          cakeConfettiCtx.fillStyle = p.color;
          cakeConfettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          cakeConfettiCtx.restore();
        }
      });

      if (activeCount > 0) {
        requestAnimationFrame(animateConfetti);
      }
    }
    animateConfetti();
  }

  if (blowCandleBtn) blowCandleBtn.addEventListener('click', blowOutCandle);
  if (cakeWrapper) cakeWrapper.addEventListener('click', blowOutCandle);

  // ===================================================================
  // 5. SCENE 4 & 5: ENVELOPE OPENING & LETTER REVEAL
  // ===================================================================
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const envelope3D = document.getElementById('envelope3D');
  const envLetterPreview = document.getElementById('envLetterPreview');
  const openLetterBtn = document.getElementById('openLetterBtn');
  let isEnvelopeOpen = false;

  function openEnvelope() {
    if (isEnvelopeOpen) return;
    isEnvelopeOpen = true;
    if (envelope3D) envelope3D.classList.add('opened');

    if (openLetterBtn) {
      openLetterBtn.innerHTML = "<span>📖 READ FULL LETTER ♡</span>";
    }
  }

  function scrollToFullLetter() {
    const sceneLetter = document.getElementById('sceneLetter');
    if (sceneLetter) {
      sceneLetter.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', (e) => {
      if (!isEnvelopeOpen) {
        openEnvelope();
      } else {
        scrollToFullLetter();
      }
    });
  }

  if (envLetterPreview) {
    envLetterPreview.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isEnvelopeOpen) {
        openEnvelope();
      } else {
        scrollToFullLetter();
      }
    });
  }

  if (openLetterBtn) {
    openLetterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!isEnvelopeOpen) {
        openEnvelope();
      } else {
        scrollToFullLetter();
      }
    });
  }

  // ===================================================================
  // 6. SCENE 7: MINI GAMES ENGINE
  // ===================================================================

  // Tab Switcher
  const tabDotsGame = document.getElementById('tabDotsGame');
  const tabDrawGame = document.getElementById('tabDrawGame');
  const gameDotsContainer = document.getElementById('gameDotsContainer');
  const gameDrawContainer = document.getElementById('gameDrawContainer');

  function switchTab(activeTab) {
    if (activeTab === 'dots') {
      tabDotsGame.classList.add('active');
      tabDotsGame.setAttribute('aria-selected', 'true');
      tabDrawGame.classList.remove('active');
      tabDrawGame.setAttribute('aria-selected', 'false');
      gameDotsContainer.classList.add('active');
      gameDotsContainer.hidden = false;
      gameDrawContainer.classList.remove('active');
      gameDrawContainer.hidden = true;
    } else {
      tabDrawGame.classList.add('active');
      tabDrawGame.setAttribute('aria-selected', 'true');
      tabDotsGame.classList.remove('active');
      tabDotsGame.setAttribute('aria-selected', 'false');
      gameDrawContainer.classList.add('active');
      gameDrawContainer.hidden = false;
      gameDotsContainer.classList.remove('active');
      gameDotsContainer.hidden = true;
      initSketchCanvas(); // resize if needed
    }
  }

  if (tabDotsGame) tabDotsGame.addEventListener('click', () => switchTab('dots'));
  if (tabDrawGame) tabDrawGame.addEventListener('click', () => switchTab('draw'));

  // --- GAME 1: DOTS & BOXES ENGINE ---
  const dotsBoard = document.getElementById('dotsBoard');
  const badgeP1 = document.getElementById('badgeP1');
  const badgeP2 = document.getElementById('badgeP2');
  const scoreP1El = document.getElementById('scoreP1');
  const scoreP2El = document.getElementById('scoreP2');
  const resetDotsBtn = document.getElementById('resetDotsBtn');
  const toggleAiBtn = document.getElementById('toggleAiBtn');
  const dotsInstruction = document.getElementById('dotsInstruction');

  const GRID_SIZE = 2; // 2x2 boxes (3x3 dots = 4 boxes)
  let currentPlayer = 1; // 1 or 2
  let p1Score = 0;
  let p2Score = 0;
  let playWithAi = true;
  let hLines = [];
  let vLines = [];
  let boxOwners = [];

  function initDotsBoard() {
    if (!dotsBoard) return;
    dotsBoard.innerHTML = '';
    p1Score = 0;
    p2Score = 0;
    currentPlayer = 1;
    updateDotsUI();

    hLines = Array.from({ length: GRID_SIZE + 1 }, () => Array(GRID_SIZE).fill(0));
    vLines = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE + 1).fill(0));
    boxOwners = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));

    // Template grid: (2*GRID_SIZE + 1) rows and columns
    const totalRows = GRID_SIZE * 2 + 1;
    const totalCols = GRID_SIZE * 2 + 1;

    dotsBoard.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 14px 60px) 14px`;
    dotsBoard.style.gridTemplateRows = `repeat(${GRID_SIZE}, 14px 60px) 14px`;

    for (let r = 0; r < totalRows; r++) {
      for (let c = 0; c < totalCols; c++) {
        const cell = document.createElement('div');

        if (r % 2 === 0 && c % 2 === 0) {
          // Dot
          cell.className = 'dot';
        } else if (r % 2 === 0 && c % 2 === 1) {
          // Horizontal Line
          const rowIdx = r / 2;
          const colIdx = Math.floor(c / 2);
          cell.className = 'line-h';
          cell.dataset.type = 'h';
          cell.dataset.r = rowIdx;
          cell.dataset.c = colIdx;
          cell.addEventListener('click', () => handleLineClick('h', rowIdx, colIdx, cell));
        } else if (r % 2 === 1 && c % 2 === 0) {
          // Vertical Line
          const rowIdx = Math.floor(r / 2);
          const colIdx = c / 2;
          cell.className = 'line-v';
          cell.dataset.type = 'v';
          cell.dataset.r = rowIdx;
          cell.dataset.c = colIdx;
          cell.addEventListener('click', () => handleLineClick('v', rowIdx, colIdx, cell));
        } else {
          // Box Cell
          const rowIdx = Math.floor(r / 2);
          const colIdx = Math.floor(c / 2);
          cell.className = 'box-cell';
          cell.id = `box-${rowIdx}-${colIdx}`;
        }
        dotsBoard.appendChild(cell);
      }
    }
  }

  function initAmbientParticles() {
    // Ambient particles placeholder (no particles needed)
  }
  function handleLineClick(type, r, c, element) {
    if (type === 'h' && hLines[r][c] !== 0) return;
    if (type === 'v' && vLines[r][c] !== 0) return;

    // Mark line
    if (type === 'h') {
      hLines[r][c] = currentPlayer;
      element.classList.add(currentPlayer === 1 ? 'drawn-p1' : 'drawn-p2');
    } else {
      vLines[r][c] = currentPlayer;
      element.classList.add(currentPlayer === 1 ? 'drawn-p1' : 'drawn-p2');
    }

    // Check newly formed boxes
    const boxesMade = checkCompletedBoxes();

    if (boxesMade > 0) {
      if (currentPlayer === 1) p1Score += boxesMade;
      else p2Score += boxesMade;
      updateDotsUI();

      if (p1Score + p2Score === GRID_SIZE * GRID_SIZE) {
        endDotsGame();
        return;
      }
      // Player gets another turn!
    } else {
      // Switch player
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      updateDotsUI();

      if (playWithAi && currentPlayer === 2) {
        setTimeout(makeAiMove, 500);
      }
    }
  }

  function checkCompletedBoxes() {
    let count = 0;
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (boxOwners[r][c] === 0) {
          const top = hLines[r][c] !== 0;
          const bottom = hLines[r + 1][c] !== 0;
          const left = vLines[r][c] !== 0;
          const right = vLines[r][c + 1] !== 0;

          if (top && bottom && left && right) {
            boxOwners[r][c] = currentPlayer;
            count++;
            const boxEl = document.getElementById(`box-${r}-${c}`);
            if (boxEl) {
              boxEl.classList.add(currentPlayer === 1 ? 'claimed-p1' : 'claimed-p2');
              boxEl.textContent = currentPlayer === 1 ? '💖' : '🌸';
            }
          }
        }
      }
    }
    return count;
  }

  function makeAiMove() {
    // Find an open line
    const available = [];
    for (let r = 0; r <= GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (hLines[r][c] === 0) available.push({ type: 'h', r, c });
      }
    }
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c <= GRID_SIZE; c++) {
        if (vLines[r][c] === 0) available.push({ type: 'v', r, c });
      }
    }

    if (available.length === 0) return;
    const move = available[Math.floor(Math.random() * available.length)];
    const selector = move.type === 'h'
      ? `.line-h[data-r="${move.r}"][data-c="${move.c}"]`
      : `.line-v[data-r="${move.r}"][data-c="${move.c}"]`;
    const el = dotsBoard.querySelector(selector);
    if (el) handleLineClick(move.type, move.r, move.c, el);
  }

  function updateDotsUI() {
    if (scoreP1El) scoreP1El.textContent = p1Score;
    if (scoreP2El) scoreP2El.textContent = p2Score;
    if (badgeP1) badgeP1.classList.toggle('active', currentPlayer === 1);
    if (badgeP2) badgeP2.classList.toggle('active', currentPlayer === 2);
  }

  function endDotsGame() {
    if (dotsInstruction) {
      if (p1Score > p2Score) dotsInstruction.textContent = "🎉 You won! All memories cherished! ♡";
      else if (p2Score > p1Score) dotsInstruction.textContent = "🌸 Shahira won! Beautiful game together! ♡";
      else dotsInstruction.textContent = "✨ A perfect tie! Both hearts matched! ♡";
    }
  }

  if (resetDotsBtn) resetDotsBtn.addEventListener('click', initDotsBoard);
  if (toggleAiBtn) {
    toggleAiBtn.addEventListener('click', () => {
      playWithAi = !playWithAi;
      toggleAiBtn.textContent = playWithAi ? "🤖 Play with Memory Bot" : "👥 2-Player Mode";
      initDotsBoard();
    });
  }

  // --- GAME 2: DRAWING TOGETHER SKETCHPAD ENGINE ---
  const sketchCanvas = document.getElementById('sketchCanvas');
  const sketchCtx = sketchCanvas?.getContext('2d');
  const brushSizeInput = document.getElementById('brushSizeInput');
  const stampBtn = document.getElementById('stampBtn');
  const eraserBtn = document.getElementById('eraserBtn');
  const clearCanvasBtn = document.getElementById('clearCanvasBtn');
  const saveDoodleBtn = document.getElementById('saveDoodleBtn');
  const saveFeedback = document.getElementById('saveFeedback');
  const colorBtns = document.querySelectorAll('.color-btn');

  let isDrawing = false;
  let currentColor = '#c24d58';
  let currentBrushSize = 4;
  let currentTool = 'brush'; // 'brush', 'eraser', 'stamp'
  const stamps = ['🌸', '✨', '💖', '⭐', '💌'];
  let currentStampIdx = 0;

  function initSketchCanvas() {
    if (!sketchCanvas || !sketchCtx) return;
    sketchCtx.fillStyle = '#fffdf9';
    sketchCtx.fillRect(0, 0, sketchCanvas.width, sketchCanvas.height);
    sketchCtx.lineCap = 'round';
    sketchCtx.lineJoin = 'round';
  }

  function getCanvasPos(e) {
    const rect = sketchCanvas.getBoundingClientRect();
    const scaleX = sketchCanvas.width / rect.width;
    const scaleY = sketchCanvas.height / rect.height;
    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function startDraw(e) {
    e.preventDefault();
    const pos = getCanvasPos(e);
    if (currentTool === 'stamp') {
      sketchCtx.font = `${currentBrushSize * 6 + 18}px sans-serif`;
      sketchCtx.textAlign = 'center';
      sketchCtx.textBaseline = 'middle';
      sketchCtx.fillText(stamps[currentStampIdx], pos.x, pos.y);
      currentStampIdx = (currentStampIdx + 1) % stamps.length;
      return;
    }
    isDrawing = true;
    sketchCtx.beginPath();
    sketchCtx.moveTo(pos.x, pos.y);
  }

  function drawMove(e) {
    if (!isDrawing || currentTool === 'stamp') return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    sketchCtx.lineWidth = currentBrushSize;
    sketchCtx.strokeStyle = currentTool === 'eraser' ? '#fffdf9' : currentColor;
    sketchCtx.lineTo(pos.x, pos.y);
    sketchCtx.stroke();
  }

  function stopDraw() {
    isDrawing = false;
  }

  if (sketchCanvas) {
    sketchCanvas.addEventListener('mousedown', startDraw);
    sketchCanvas.addEventListener('mousemove', drawMove);
    window.addEventListener('mouseup', stopDraw);
    sketchCanvas.addEventListener('touchstart', startDraw, { passive: false });
    sketchCanvas.addEventListener('touchmove', drawMove, { passive: false });
    window.addEventListener('touchend', stopDraw);
  }

  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentColor = btn.dataset.color;
      currentTool = 'brush';
    });
  });

  if (brushSizeInput) {
    brushSizeInput.addEventListener('input', (e) => {
      currentBrushSize = parseInt(e.target.value, 10);
    });
  }

  if (stampBtn) {
    stampBtn.addEventListener('click', () => {
      currentTool = 'stamp';
      if (saveFeedback) saveFeedback.textContent = "🌸 Tap on canvas to place stamps!";
    });
  }

  if (eraserBtn) {
    eraserBtn.addEventListener('click', () => {
      currentTool = 'eraser';
      if (saveFeedback) saveFeedback.textContent = "🧹 Eraser active";
    });
  }

  if (clearCanvasBtn) {
    clearCanvasBtn.addEventListener('click', () => {
      if (sketchCtx) initSketchCanvas();
      if (saveFeedback) saveFeedback.textContent = "Cleared!";
    });
  }

  if (saveDoodleBtn) {
    saveDoodleBtn.addEventListener('click', () => {
      if (!sketchCanvas) return;
      const link = document.createElement('a');
      link.download = `shahira-birthday-doodle-${Date.now()}.png`;
      link.href = sketchCanvas.toDataURL('image/png');
      link.click();
      if (saveFeedback) saveFeedback.textContent = "✨ Doodle saved to memories!";
    });
  }

  // ===================================================================
  // 7. SCENE 9: SPOTIFY MUSIC ATMOSPHERE ENGINE
  // ===================================================================
  const mainPlayBtn = document.getElementById('mainPlayBtn');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const miniDisc = document.getElementById('miniDisc');
  const soundWave = document.getElementById('soundWave');
  const musicPillTitle = document.getElementById('musicPillTitle');
  const vinylRecord = document.getElementById('vinylRecord');
  const prevTrackBtn = document.getElementById('prevTrackBtn');
  const nextTrackBtn = document.getElementById('nextTrackBtn');
  const trackTitleDisplay = document.getElementById('trackTitleDisplay');
  const trackArtistDisplay = document.getElementById('trackArtistDisplay');
  const trackAlbumDisplay = document.getElementById('trackAlbumDisplay');
  const audioTotalDuration = document.getElementById('audioTotalDuration');
  const playlistSelector = document.getElementById('playlistSelector');
  const spotifyEmbedContainer = document.getElementById('spotifyEmbedContainer');

  let currentTrack = 0;
  let isPlaying = false;
  let tracks = config.music?.tracks || [];

  function buildPlaylist() {
    if (!playlistSelector || tracks.length === 0) return;
    playlistSelector.innerHTML = tracks.map((track, idx) => `
      <div class="playlist-item ${idx === currentTrack ? 'active' : ''}" data-idx="${idx}">
        <div>
          <div class="playlist-item-title">${escapeHtml(track.title)}</div>
          <div class="playlist-item-sub">${escapeHtml(track.artist)}</div>
        </div>
        <a href="${escapeHtml(track.spotifyUrl)}" target="_blank" rel="noopener noreferrer" class="spotify-link-btn" title="Open on Spotify" onclick="event.stopPropagation();">
          <span>💚 Spotify</span>
        </a>
      </div>
    `).join('');

    playlistSelector.querySelectorAll('.playlist-item').forEach(item => {
      item.addEventListener('click', () => {
        currentTrack = parseInt(item.dataset.idx, 10);
        loadTrack(currentTrack);
        openSpotifyTrack(currentTrack);
      });
    });
  }

  function loadTrack(index) {
    if (!tracks[index]) return;
    currentTrack = index;
    const track = tracks[currentTrack];

    if (trackTitleDisplay) trackTitleDisplay.textContent = track.title;
    if (trackArtistDisplay) trackArtistDisplay.textContent = track.artist;
    if (trackAlbumDisplay) trackAlbumDisplay.textContent = track.album || '';
    if (musicPillTitle) musicPillTitle.textContent = track.title;
    if (audioTotalDuration) audioTotalDuration.textContent = track.duration || '3:30';

    document.querySelectorAll('.playlist-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === currentTrack);
    });
    embedSpotifyTrack(currentTrack);
  }

  function embedSpotifyTrack(index) {
    const track = tracks[index];
    if (!track) return;
    const embedUrl = track.spotifyUrl.replace('open.spotify.com/track/', 'open.spotify.com/embed/track/');
    const iframeHtml = `<iframe src="${embedUrl}" width="100%" height="352" frameBorder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style="border-radius:12px;"></iframe>`;
    if (spotifyEmbedContainer) {
      spotifyEmbedContainer.innerHTML = iframeHtml;
    }
    isPlaying = true;
    updatePlayUI(true);
  }

  function togglePlay() {
    if (isPlaying) {
      isPlaying = false;
      updatePlayUI(false);
    } else {
      embedSpotifyTrack(currentTrack);
    }
  }

  function updatePlayUI(playing) {
    if (mainPlayBtn) mainPlayBtn.textContent = playing ? '⏸' : '▶';
    if (miniDisc) miniDisc.classList.toggle('spinning', playing);
    if (soundWave) soundWave.classList.toggle('active', playing);
    if (vinylRecord) vinylRecord.classList.toggle('playing', playing);
  }

  if (mainPlayBtn) mainPlayBtn.addEventListener('click', togglePlay);
  if (musicToggleBtn) musicToggleBtn.addEventListener('click', togglePlay);

  if (prevTrackBtn) {
    prevTrackBtn.addEventListener('click', () => {
      currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
      loadTrack(currentTrack);
      embedSpotifyTrack(currentTrack);
    });
  }

  if (nextTrackBtn) {
    nextTrackBtn.addEventListener('click', () => {
      currentTrack = (currentTrack + 1) % tracks.length;
      loadTrack(currentTrack);
      embedSpotifyTrack(currentTrack);
    });
  }

  // ===================================================================
  // 8. SCENE 10: STARRY CANVASES & ENDING ACTIONS
  // ===================================================================
  const starryNightCanvas = document.getElementById('starryNightCanvas');
  const starryCtx = starryNightCanvas?.getContext('2d');
  let starsArray = [];

  function resizeStarryCanvas() {
    if (!starryNightCanvas) return;
    starryNightCanvas.width = starryNightCanvas.offsetWidth;
    starryNightCanvas.height = starryNightCanvas.offsetHeight;
  }

  function initStarryNight() {
    if (!starryNightCanvas || !starryCtx) return;
    resizeStarryCanvas();
    window.addEventListener('resize', resizeStarryCanvas);

    const starColors = ['#c24d58', '#e8829c', '#9d7bb0', '#eed99e'];
    starsArray = Array.from({ length: 75 }, () => ({
      x: Math.random() * starryNightCanvas.width,
      y: Math.random() * starryNightCanvas.height,
      radius: Math.random() * 2 + 0.6,
      alpha: Math.random() * 0.7 + 0.3,
      speedAlpha: (Math.random() - 0.5) * 0.02,
      color: starColors[Math.floor(Math.random() * starColors.length)]
    }));

    function loopStarry() {
      starryCtx.clearRect(0, 0, starryNightCanvas.width, starryNightCanvas.height);

      // Soft warm ambient glow overlay
      const grad = starryCtx.createRadialGradient(
        starryNightCanvas.width * 0.5, starryNightCanvas.height * 0.3, 10,
        starryNightCanvas.width * 0.5, starryNightCanvas.height * 0.3, starryNightCanvas.width * 0.7
      );
      grad.addColorStop(0, 'rgba(232, 130, 156, 0.15)');
      grad.addColorStop(0.6, 'rgba(247, 232, 238, 0.08)');
      grad.addColorStop(1, 'rgba(251, 247, 240, 0)');
      starryCtx.fillStyle = grad;
      starryCtx.fillRect(0, 0, starryNightCanvas.width, starryNightCanvas.height);

      // Draw Twinkling Warm Stars / Sparkles
      starsArray.forEach(star => {
        star.alpha += star.speedAlpha;
        if (star.alpha <= 0.2 || star.alpha >= 0.9) star.speedAlpha = -star.speedAlpha;

        starryCtx.beginPath();
        starryCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        starryCtx.fillStyle = star.color;
        starryCtx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        starryCtx.shadowBlur = 6;
        starryCtx.shadowColor = star.color;
        starryCtx.fill();
        starryCtx.shadowBlur = 0;
      });

      requestAnimationFrame(loopStarry);
    }
    loopStarry();
  }



  // Replay & Silent Wish Buttons
  const replayExperienceBtn = document.getElementById('replayExperienceBtn');
  const sendWishHeartBtn = document.getElementById('sendWishHeartBtn');
  const wishSentPopup = document.getElementById('wishSentPopup');

  if (replayExperienceBtn) {
    replayExperienceBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (sendWishHeartBtn) {
    sendWishHeartBtn.addEventListener('click', () => {
      if (wishSentPopup) {
        wishSentPopup.classList.add('active');
        sendWishHeartBtn.innerHTML = "<span>✨ WISH SENT TO THE STARS ♡</span>";
      }
    });
  }

  // ===================================================================
  // 8.5. K-DRAMA HANGING POLAROIDS TAP INTERACTION
  // ===================================================================
  const hangingPolaroids = document.querySelectorAll('.hanging-polaroid');
  hangingPolaroids.forEach(p => {
    p.addEventListener('click', (e) => {
      e.stopPropagation();
      const isAlreadyZoomed = p.classList.contains('is-zoomed');
      hangingPolaroids.forEach(other => other.classList.remove('is-zoomed'));
      if (!isAlreadyZoomed) {
        p.classList.add('is-zoomed');
      }
    });
  });
  document.addEventListener('click', () => {
    hangingPolaroids.forEach(p => p.classList.remove('is-zoomed'));
  });

  // ===================================================================
  // 9. SCROLL REVEAL OBSERVER
  // ===================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // ===================================================================
  // INITIALIZATION RUN
  // ===================================================================
  hydrateContent();
  if (typeof initAmbientParticles === 'function') initAmbientParticles();
  if (typeof initDotsBoard === 'function') initDotsBoard();
  if (typeof initSketchCanvas === 'function') initSketchCanvas();
  loadTrack(0);
  if (typeof initStarryNight === 'function') initStarryNight();
});
