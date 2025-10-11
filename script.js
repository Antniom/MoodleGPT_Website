const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString();
}

// Intersection observer for scroll animations
const animatedNodes = document.querySelectorAll('.animate');
if (animatedNodes.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px'
  });

  animatedNodes.forEach((node, index) => {
    node.style.transitionDelay = `${Math.min(index * 70, 500)}ms`;
    observer.observe(node);
  });
}

// Assistant console typing loop
const consoleLines = [
  'Alt+C pressed - question detected...',
  'Local pack match found - confidence: 0.92',
  'Answer queued - clearing in 4s...',
  'Sending to Google Sheets endpoint...',
  'Overlay hidden - Alt+X acknowledged'
];

const consoleEl = document.getElementById('assistantConsole');
if (consoleEl) {
  let cursor = 0;
  let consoleTimers = [];
  
  const renderLine = () => {
    const line = consoleLines[cursor % consoleLines.length];
    const row = document.createElement('div');
    row.className = 'console-line reveal';
    consoleEl.appendChild(row);

    const chars = [...line];
    row.textContent = '';
    chars.forEach((char, idx) => {
      const timer = setTimeout(() => {
        row.textContent += char;
      }, idx * 30);
      consoleTimers.push(timer);
    });

    if (consoleEl.children.length > 4) {
      consoleEl.removeChild(consoleEl.firstElementChild);
    }

    cursor += 1;
    const nextTimer = setTimeout(renderLine, Math.max(chars.length * 30 + 1400, 2600));
    consoleTimers.push(nextTimer);
  };

  const initialTimer = setTimeout(renderLine, 1200);
  consoleTimers.push(initialTimer);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    consoleTimers.forEach(timer => clearTimeout(timer));
    consoleTimers = [];
  });
}

// Keep assistant contact alive with eye tracking and idle motions
const assistantEntries = Array.from(document.querySelectorAll('[data-assistant]')).map((orb) => ({
  orb,
  pupils: Array.from(orb.querySelectorAll('.pupil'))
}));

const heroSection = document.querySelector('.hero');
const tipBody = document.getElementById('assistantTip');
const tipNode = document.querySelector('.assistant-tip');

if (tipNode) {
  tipNode.setAttribute('aria-hidden', 'true');
}

if (assistantEntries.length) {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const setPupilPosition = (entry, normX, normY) => {
    const rect = entry.orb.getBoundingClientRect();
    const offsetX = normX * rect.width * 0.09;
    const offsetY = normY * rect.height * 0.07;
    entry.pupils.forEach((pupil) => {
      pupil.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
    });
  };

  const centerAllPupils = () => {
    assistantEntries.forEach((entry) => {
      entry.pupils.forEach((pupil) => {
        pupil.style.transform = 'translate(-50%, -50%)';
      });
    });
  };

  const triggerBoop = () => {
    const entry = assistantEntries[Math.floor(Math.random() * assistantEntries.length)];
    if (!entry) {
      return;
    }
    entry.orb.classList.remove('boop');
    void entry.orb.offsetWidth;
    entry.orb.classList.add('boop');
    window.setTimeout(() => entry.orb.classList.remove('boop'), 1400);
  };

  let idleTimer;
  let idleInterval;

  const startIdleLoop = () => {
    if (idleInterval) {
      window.clearInterval(idleInterval);
    }
    idleInterval = window.setInterval(() => {
      assistantEntries.forEach((entry) => {
        const driftX = (Math.random() * 2 - 1) * 0.35;
        const driftY = (Math.random() * 2 - 1) * 0.28;
        setPupilPosition(entry, driftX, driftY);
      });
    }, 2800);
    triggerBoop();
  };

  const stopIdleLoop = () => {
    if (idleInterval) {
      window.clearInterval(idleInterval);
      idleInterval = undefined;
    }
  };

  const scheduleIdle = () => {
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      startIdleLoop();
    }, 3200);
  };

  const handlePointerMove = (event) => {
    stopIdleLoop();
    const x = event.clientX;
    const y = event.clientY;
    assistantEntries.forEach((entry) => {
      const rect = entry.orb.getBoundingClientRect();
      const normX = clamp(((x - rect.left) / rect.width) - 0.5, -0.6, 0.6);
      const normY = clamp(((y - rect.top) / rect.height) - 0.5, -0.6, 0.6);
      setPupilPosition(entry, normX, normY);
    });
    scheduleIdle();
  };

  window.addEventListener('pointerleave', () => {
    stopIdleLoop();
    centerAllPupils();
    scheduleIdle();
  });

  window.addEventListener('blur', () => {
    stopIdleLoop();
    centerAllPupils();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopIdleLoop();
      centerAllPupils();
    } else {
      scheduleIdle();
    }
  });

  scheduleIdle();

  const boopInterval = window.setInterval(triggerBoop, 9800);

  // Cleanup intervals on page unload
  window.addEventListener('beforeunload', () => {
    stopIdleLoop();
    if (boopInterval) {
      window.clearInterval(boopInterval);
    }
    if (idleTimer) {
      window.clearTimeout(idleTimer);
    }
  });

  if (heroSection) {
    let dockFrame = null;
    let isDocked = document.body.classList.contains('assistant-docked');
    let transitionActive = false;

    const primaryEntry = assistantEntries[0];

    const animateDockToggle = (shouldDock) => {
      if (!primaryEntry || shouldDock === isDocked) {
        document.body.classList.toggle('assistant-docked', shouldDock);
        if (tipNode) {
          tipNode.setAttribute('aria-hidden', shouldDock ? 'false' : 'true');
        }
        isDocked = shouldDock;
        return;
      }

      const { orb } = primaryEntry;
      if (!orb) {
        return;
      }

      transitionActive = true;
      stopIdleLoop();
      centerAllPupils();

      const startRect = orb.getBoundingClientRect();
      const tipStartRect = tipNode ? tipNode.getBoundingClientRect() : null;

      document.body.classList.toggle('assistant-docked', shouldDock);
      if (tipNode) {
        tipNode.setAttribute('aria-hidden', shouldDock ? 'false' : 'true');
      }
      document.body.classList.add(shouldDock ? 'assistant-docking' : 'assistant-undocking');

      const endRect = orb.getBoundingClientRect();
      const deltaX = startRect.left - endRect.left;
      const deltaY = startRect.top - endRect.top;
      const scaleX = startRect.width / endRect.width;
      const scaleY = startRect.height / endRect.height;

      orb.classList.add('transitioning', 'walking');
      orb.style.transition = 'none';
      orb.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;

      if (tipNode && tipStartRect) {
        const tipEndRect = tipNode.getBoundingClientRect();
        const tipDX = tipStartRect.left - tipEndRect.left;
        const tipDY = tipStartRect.top - tipEndRect.top;
        tipNode.classList.add('transitioning');
        tipNode.style.transition = 'none';
        tipNode.style.transform = `translate(${tipDX}px, ${tipDY}px)`;
      }

      requestAnimationFrame(() => {
        orb.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        orb.style.transform = '';

        let cleanupTimer;
        const onOrbTransitionEnd = (event) => {
          if (event.propertyName !== 'transform') {
            return;
          }
          window.clearTimeout(cleanupTimer);
          orb.classList.remove('transitioning', 'walking');
          orb.style.transition = '';
          orb.removeEventListener('transitionend', onOrbTransitionEnd);
          document.body.classList.remove('assistant-docking', 'assistant-undocking');
          transitionActive = false;
          scheduleIdle();
        };

        orb.addEventListener('transitionend', onOrbTransitionEnd);
        cleanupTimer = window.setTimeout(() => {
          onOrbTransitionEnd({ propertyName: 'transform' });
        }, 1300);

        if (tipNode && tipStartRect) {
          let tipCleanupTimer;
          const onTipTransitionEnd = (event) => {
            if (event.propertyName !== 'transform') {
              return;
            }
            window.clearTimeout(tipCleanupTimer);
            tipNode.classList.remove('transitioning');
            tipNode.style.transition = '';
            tipNode.removeEventListener('transitionend', onTipTransitionEnd);
          };

          tipNode.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
          tipNode.style.transform = '';
          tipNode.addEventListener('transitionend', onTipTransitionEnd);
          tipCleanupTimer = window.setTimeout(() => {
            onTipTransitionEnd({ propertyName: 'transform' });
          }, 1300);
        }
      });

      isDocked = shouldDock;
    };

    const evaluateDock = () => {
      dockFrame = null;
      if (!heroSection) {
        return;
      }
      const rect = heroSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const shouldDock = rect.bottom < viewportHeight * 0.65;
      animateDockToggle(shouldDock);
    };

    const requestDockUpdate = () => {
      if (dockFrame !== null) {
        return;
      }
      dockFrame = window.requestAnimationFrame(evaluateDock);
    };

    const guardedPointerMove = (event) => {
      if (transitionActive) {
        return;
      }
      handlePointerMove(event);
    };

    window.addEventListener('pointermove', guardedPointerMove, { passive: true });

    window.addEventListener('scroll', requestDockUpdate, { passive: true });
    window.addEventListener('resize', requestDockUpdate);
    requestDockUpdate();
  } else {
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
  }
}

if (tipBody) {
  const messages = [
  'Press Alt+C in a Moodle quiz to surface matches from the offline answer pack instantly.',
  'Toggle automation with Alt+A to let MoodleGPT 3 pace answers with human delays.',
  'Set your Gemini API key once in settings to enable fallback only when the answer pack has no match.',
    'Adjust automation delays between 1 and 300 seconds in settings to mimic natural pacing.',
    'Export a debug bundle from the help center before emailing moodlegpt.help@gmail.com for faster support.'
  ];

  let tipIndex = 0;

  const swapTip = () => {
    tipBody.classList.add('fade-out');
    window.setTimeout(() => {
      tipIndex = (tipIndex + 1) % messages.length;
      tipBody.textContent = messages[tipIndex];
      tipBody.classList.remove('fade-out');
    }, 220);
  };

  tipBody.textContent = messages[0];

  if (messages.length > 1) {
    let tipTimer;

    const scheduleNextTip = () => {
      if (tipTimer) {
        window.clearTimeout(tipTimer);
      }
      tipTimer = window.setTimeout(() => {
        swapTip();
        scheduleNextTip();
      }, 10500);
    };

    scheduleNextTip();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (tipTimer) {
          window.clearTimeout(tipTimer);
          tipTimer = undefined;
        }
        tipBody.classList.remove('fade-out');
      } else if (!tipTimer) {
        scheduleNextTip();
      }
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      if (tipTimer) {
        window.clearTimeout(tipTimer);
      }
    });
  }
}

// Feature card parallax
const featureCards = document.querySelectorAll('.feature-card');
if (featureCards.length) {
  featureCards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rX = ((y / rect.height) - 0.5) * 6;
      const rY = ((x / rect.width) - 0.5) * -6;
      card.style.transform = `perspective(600px) rotateX(${rX}deg) rotateY(${rY}deg)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });

    // Add touch support for mobile devices
    card.addEventListener('touchstart', (event) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        const rect = card.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const rX = ((y / rect.height) - 0.5) * 6;
        const rY = ((x / rect.width) - 0.5) * -6;
        card.style.transform = `perspective(600px) rotateX(${rX}deg) rotateY(${rY}deg)`;
      }
    }, { passive: true });

    card.addEventListener('touchend', () => {
      card.style.transform = '';
    }, { passive: true });
  });
}

// Answer replay button
const replayButton = document.getElementById('replayAnswer');
const answerNode = document.getElementById('sampleAnswer');
if (replayButton && answerNode) {
  const replayAnimation = () => {
    answerNode.classList.remove('answer-highlight');
    void answerNode.offsetWidth; // force reflow
    answerNode.classList.add('answer-highlight');
  };

  replayButton.addEventListener('click', replayAnimation);
  
  // Add keyboard support
  replayButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      replayAnimation();
    }
  });
}
