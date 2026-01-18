document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const screens = {
        home: document.getElementById('home-screen'),
        typing: document.getElementById('typing-screen'),
        results: document.getElementById('results-screen')
    };

    const buttons = {
        start: document.getElementById('start-button'),
        restart: document.getElementById('restart-button'),
        goAgain: document.getElementById('go-again-button')
    };

    const passageDisplay = document.getElementById('passage-home');
    
    const resultDisplays = {
        wpm: document.getElementById('result-wpm'),
        accuracy: document.getElementById('result-accuracy'),
        correct: document.getElementById('result-correct'),
        incorrect: document.getElementById('result-incorrect')
    };

    // Home stat displays
    const wpmHomeDisplay = document.getElementById('wpm-display');
    const accuracyHomeDisplay = document.getElementById('accuracy-display');
    const timeHomeDisplay = document.getElementById('time-display');
    
    // Typing stat displays
    const wpmTypingDisplay = document.getElementById('wpm-typing');
    const accuracyTypingDisplay = document.getElementById('accuracy-typing');
    const timeTypingDisplay = document.getElementById('time-typing');
    
    // Dropdowns (<1060px) - Home Screen
    const dropdowns = {
        difficulty: {
            container: document.getElementById('difficulty-dropdown'),
            button: document.getElementById('difficulty-button'),
            selected: document.getElementById('difficulty-selected'),
            menu: document.getElementById('difficulty-menu'),
            items: document.querySelectorAll('#difficulty-menu .dropdown-item')
        },
        mode: {
            container: document.getElementById('mode-dropdown'),
            button: document.getElementById('mode-button'),
            selected: document.getElementById('mode-selected'),
            menu: document.getElementById('mode-menu'),
            items: document.querySelectorAll('#mode-menu .dropdown-item')
        }
    };

    // Dropdowns - Typing Screen
    const typingDropdowns = {
        difficulty: {
            container: document.getElementById('typing-difficulty-dropdown'),
            button: document.getElementById('typing-difficulty-button'),
            selected: document.getElementById('typing-difficulty-selected'),
            menu: document.getElementById('typing-difficulty-menu'),
            items: document.querySelectorAll('#typing-difficulty-menu .dropdown-item')
        },
        mode: {
            container: document.getElementById('typing-mode-dropdown'),
            button: document.getElementById('typing-mode-button'),
            selected: document.getElementById('typing-mode-selected'),
            menu: document.getElementById('typing-mode-menu'),
            items: document.querySelectorAll('#typing-mode-menu .dropdown-item')
        }
    };

    // Desktop buttons (≥1060px) - Home Screen
    const buttonGroups = {
        difficulty: {
            options: document.querySelectorAll('#difficulty-buttons .button-option')
        },
        mode: {
            options: document.querySelectorAll('#mode-buttons .button-option')
        }
    };

    // Desktop buttons - Typing Screen
    const typingButtonGroups = {
        difficulty: {
            options: document.querySelectorAll('#typing-difficulty-buttons .button-option')
        },
        mode: {
            options: document.querySelectorAll('#typing-mode-buttons .button-option')
        }
    };

    const typingTextDisplay = document.getElementById('typing-text');
    
    // Text data
    const textData = {
        easy: [
            "The sun rose over the quiet town. Birds sang in the trees as people woke up and started their day. It was going to be a warm and sunny morning.",
            "She walked to the store to buy some bread and milk. The shop was busy but she found what she needed quickly.",
            "The dog ran across the park chasing a ball. He was fast and loved to play."
        ],
        medium: [
            "Learning a new skill takes patience and consistent practice. Whether you're studying a language, picking up an instrument, or mastering a sport, the key is to show up every day.",
            "The old lighthouse had stood on the cliff for over a century, guiding sailors safely through treacherous waters.",
            "Coffee culture has evolved dramatically in recent decades. What was once a simple morning ritual has become an art form."
        ],
        hard: [
            "The philosopher's argument hinged on a seemingly paradoxical assertion: that absolute freedom, pursued without constraint, inevitably undermines itself.",
            "Quantum entanglement—Einstein's \"spooky action at a distance\"—continues to perplex physicists and philosophers alike.",
            "The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized."
        ]
    };
    
    // State
    let state = {
        screen: 'home',
        difficulty: 'Hard',
        mode: 'Timed (60s)',
        wpm: 0,
        accuracy: 100,
        timeLeft: 60,
        isPlaying: false,
        timer: null,
        charIndex: 0,
        mistakes: 0,
        totalTyped: 0,
        currentText: ""
    };

    // Load personal best from localStorage
    function loadPersonalBest() {
        const savedPB = localStorage.getItem('typingSpeedPB');
        const pb = savedPB ? parseInt(savedPB) : 0;
        const pbDisplay = document.getElementById('pb-display');
        if (pbDisplay) {
            pbDisplay.textContent = pb;
        }
        return pb;
    }

    // Save personal best to localStorage
    function savePersonalBest(wpm) {
        const currentPB = loadPersonalBest();
        if (wpm > currentPB) {
            localStorage.setItem('typingSpeedPB', wpm.toString());
            const pbDisplay = document.getElementById('pb-display');
            if (pbDisplay) {
                pbDisplay.textContent = wpm;
            }
            return true;
        }
        return false;
    }

    // Check if this is the first test
    function isFirstTest() {
        return !localStorage.getItem('typingSpeedPB');
    }

    // Get random text based on difficulty
    function getRandomText(difficulty) {
        const texts = textData[difficulty.toLowerCase()] || textData.hard;
        return texts[Math.floor(Math.random() * texts.length)];
    }

    // Update passage display on home screen
    function updatePassageDisplay() {
        state.currentText = getRandomText(state.difficulty);
        passageDisplay.textContent = state.currentText;
    }

    // Update all UI elements for a setting
    function updateAllUI(key, value) {
        state[key] = value;
        
        // Update Home Screen Dropdown
        const dropdown = dropdowns[key];
        if (dropdown) {
            dropdown.selected.textContent = value;
            dropdown.items.forEach(i => {
                if (i.getAttribute('data-value') === value) {
                    i.classList.add('active');
                } else {
                    i.classList.remove('active');
                }
            });
        }
        
        // Update Home Screen Buttons
        const btns = buttonGroups[key];
        if (btns) {
            btns.options.forEach(opt => {
                if (opt.getAttribute('data-value') === value) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });
        }

        // Update Typing Screen Dropdown
        const typingDropdown = typingDropdowns[key];
        if (typingDropdown) {
            typingDropdown.selected.textContent = value;
            typingDropdown.items.forEach(i => {
                if (i.getAttribute('data-value') === value) {
                    i.classList.add('active');
                } else {
                    i.classList.remove('active');
                }
            });
        }
        
        // Update Typing Screen Buttons
        const typingBtns = typingButtonGroups[key];
        if (typingBtns) {
            typingBtns.options.forEach(opt => {
                if (opt.getAttribute('data-value') === value) {
                    opt.classList.add('active');
                } else {
                    opt.classList.remove('active');
                }
            });
        }

        if (key === 'difficulty') {
            updatePassageDisplay();
        }
    }

    // Update home stat displays
    function updateHomeStatsDisplay() {
        wpmHomeDisplay.textContent = state.wpm;
        accuracyHomeDisplay.textContent = `${state.accuracy}%`;
        const minutes = Math.floor(state.timeLeft / 60);
        const seconds = state.timeLeft % 60;
        timeHomeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update typing stat displays
    function updateTypingStatsDisplay() {
        wpmTypingDisplay.textContent = state.wpm;
        accuracyTypingDisplay.textContent = `${state.accuracy}%`;
        const minutes = Math.floor(state.timeLeft / 60);
        const seconds = state.timeLeft % 60;
        timeTypingDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Initialize
    loadPersonalBest();
    updatePassageDisplay();

    // Hidden Input for Typing
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.style.opacity = '0';
    inputField.style.position = 'absolute';
    inputField.style.zIndex = '-1';
    document.body.appendChild(inputField);

    // Screen Navigation
    function switchScreen(screenName) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });

        if (screens[screenName]) {
            screens[screenName].classList.add('active');
            state.screen = screenName;
        }

        if (screenName === 'typing') {
            inputField.value = '';
            inputField.focus();
            document.addEventListener('click', focusInput);
        } else {
            document.removeEventListener('click', focusInput);
            inputField.blur();
        }
    }

    function focusInput(e) {
        if (e.target.closest('button') || e.target.closest('.dropdown')) return;
        if (state.screen === 'typing') {
            inputField.focus();
        }
    }

    // Dropdown Setup - Home Screen
    function setupDropdown(dropdownKey) {
        const dropdown = dropdowns[dropdownKey];
        if (!dropdown) return;
        
        dropdown.button.addEventListener('click', (e) => {
            e.stopPropagation();
            Object.keys(dropdowns).forEach(key => {
                if (key !== dropdownKey && dropdowns[key]) {
                    dropdowns[key].container.classList.remove('open');
                }
            });
            dropdown.container.classList.toggle('open');
        });

        dropdown.items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                updateAllUI(dropdownKey, value);
                dropdown.container.classList.remove('open');
            });
        });
    }

    // Dropdown Setup - Typing Screen
    function setupTypingDropdown(dropdownKey) {
        const dropdown = typingDropdowns[dropdownKey];
        if (!dropdown) return;
        
        dropdown.button.addEventListener('click', (e) => {
            e.stopPropagation();
            Object.keys(typingDropdowns).forEach(key => {
                if (key !== dropdownKey && typingDropdowns[key]) {
                    typingDropdowns[key].container.classList.remove('open');
                }
            });
            dropdown.container.classList.toggle('open');
        });

        dropdown.items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                updateAllUI(dropdownKey, value);
                dropdown.container.classList.remove('open');
            });
        });
    }

    // Button Setup - Home Screen
    function setupButtons(buttonKey) {
        const btns = buttonGroups[buttonKey];
        if (!btns) return;
        
        btns.options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.getAttribute('data-value');
                updateAllUI(buttonKey, value);
            });
        });
    }

    // Button Setup - Typing Screen
    function setupTypingButtons(buttonKey) {
        const btns = typingButtonGroups[buttonKey];
        if (!btns) return;
        
        btns.options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.getAttribute('data-value');
                updateAllUI(buttonKey, value);
            });
        });
    }

    // Event Listeners
    buttons.start.addEventListener('click', () => {
        switchScreen('typing');
        resetTest();
        loadText();
    });

    buttons.restart.addEventListener('click', () => {
        switchScreen('home'); 
        resetTest();
    });

    if (buttons.goAgain) {
        buttons.goAgain.addEventListener('click', () => {
            switchScreen('home');
            resetTest();
        });
    }

    // Click on passage to start
    passageDisplay.addEventListener('click', () => {
        if (state.screen === 'home') {
            buttons.start.click();
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        Object.values(dropdowns).forEach(dropdown => {
            if (dropdown && !dropdown.container.contains(e.target)) {
                dropdown.container.classList.remove('open');
            }
        });
        Object.values(typingDropdowns).forEach(dropdown => {
            if (dropdown && !dropdown.container.contains(e.target)) {
                dropdown.container.classList.remove('open');
            }
        });
    });

    // Initialize controls - Home Screen
    setupDropdown('difficulty');
    setupDropdown('mode');
    setupButtons('difficulty');
    setupButtons('mode');

    // Initialize controls - Typing Screen
    setupTypingDropdown('difficulty');
    setupTypingDropdown('mode');
    setupTypingButtons('difficulty');
    setupTypingButtons('mode');

    // Timer
    function startTimer() {
        if (state.timer) return;
        state.timer = setInterval(() => {
            if (state.timeLeft > 0) {
                state.timeLeft--;
                updateTypingStatsDisplay();
                updateStats();
            } else {
                endTest();
            }
        }, 1000);
    }

    // Create confetti effect
    function createConfetti() {
        const container = document.getElementById('confetti-container');
        container.innerHTML = '';
        
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            container.appendChild(confetti);
        }
        
        // Add confetti animation style
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confetti-fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Clear confetti after animation
        setTimeout(() => {
            container.innerHTML = '';
        }, 4000);
    }

    // End Test - Transition to Results Screen
    function endTest() {
        clearInterval(state.timer);
        state.timer = null;
        state.isPlaying = false;
        inputField.blur();
        
        // Switch to results screen
        switchScreen('results');
        
        // Determine result type
        const firstTest = isFirstTest();
        const isNewPB = savePersonalBest(state.wpm);
        
        // Update results display
        if (resultDisplays.wpm) resultDisplays.wpm.textContent = state.wpm;
        if (resultDisplays.accuracy) resultDisplays.accuracy.textContent = `${state.accuracy}%`;
        if (resultDisplays.correct) resultDisplays.correct.textContent = state.charIndex - state.mistakes;
        if (resultDisplays.incorrect) resultDisplays.incorrect.textContent = state.mistakes;
        
        // Update result display based on type
        updateResultDisplay(firstTest, isNewPB);
    }

    function updateResultDisplay(firstTest, isNewPB) {
        const iconInner = document.getElementById('icon-inner');
        const resultTitle = document.getElementById('result-title');
        const resultSubtitle = document.getElementById('result-subtitle');
        const ctaText = document.getElementById('cta-text');
        const resultScreen = document.getElementById('results-screen');
        
        // Reset classes
        resultScreen.classList.remove('new-pb');
        
        // Clear icon
        iconInner.innerHTML = '<img src="./assets/images/icon-completed.svg" alt="Completed" id="result-check-icon">';
        
        if (isNewPB && !firstTest) {
            // New Personal Best
            resultScreen.classList.add('new-pb');
            iconInner.innerHTML = '<img src="./assets/images/icon-new-pb.svg" alt="New Personal Best" id="result-check-icon">';
            resultTitle.textContent = 'New Personal Best!';
            resultSubtitle.textContent = "You're getting faster. That was incredible typing.";
            ctaText.textContent = 'Beat This Score';
            createConfetti();
        } else if (firstTest) {
            // First Test
            iconInner.innerHTML = '<img src="./assets/images/icon-completed.svg" alt="Completed" id="result-check-icon">';
            resultTitle.textContent = 'Test Complete!';
            resultSubtitle.textContent = "You've set the bar. Now the real challenge begins—time to beat it.";
            ctaText.textContent = 'Beat This Score';
        } else {
            // Regular result
            iconInner.innerHTML = '<img src="./assets/images/icon-completed.svg" alt="Completed" id="result-check-icon">';
            resultTitle.textContent = 'Test Complete!';
            resultSubtitle.textContent = "Solid run. Keep pushing to beat your high score.";
            ctaText.textContent = 'Go Again';
        }
    }

    function resetTest() {
        clearInterval(state.timer);
        state.timer = null;
        state.isPlaying = false;
        state.timeLeft = 60;
        state.charIndex = 0;
        state.mistakes = 0;
        state.totalTyped = 0;
        state.wpm = 0;
        state.accuracy = 100;
        inputField.value = '';
        
        updateHomeStatsDisplay();
        updateTypingStatsDisplay();
        updatePassageDisplay();
    }

    function loadText() {
        const text = state.currentText;
        
        typingTextDisplay.innerHTML = "";
        text.split("").forEach(char => {
            let span = document.createElement("span");
            span.innerText = char;
            typingTextDisplay.appendChild(span);
        });
        
        if (typingTextDisplay.firstChild) {
            typingTextDisplay.firstChild.classList.add("active");
        }
    }

    function updateStats() {
        const timeElapsed = 60 - state.timeLeft;
        if (timeElapsed > 0) {
            const correctChars = state.charIndex - state.mistakes;
            const wpm = Math.round(((correctChars / 5) / timeElapsed) * 60);
            state.wpm = wpm < 0 || !isFinite(wpm) ? 0 : wpm;
            
            const accuracy = state.charIndex > 0 
                ? Math.round(((state.charIndex - state.mistakes) / state.charIndex) * 100) 
                : 100;
            state.accuracy = accuracy;
        }

        updateTypingStatsDisplay();
    }

    // Input Handling
    inputField.addEventListener('input', () => {
        if (state.screen !== 'typing') return;
        
        const characters = typingTextDisplay.querySelectorAll('span');
        const typedValue = inputField.value;
        
        if (!state.isPlaying && typedValue.length > 0) {
            state.isPlaying = true;
            startTimer();
        }

        if (typedValue.length < state.charIndex) {
            for (let i = typedValue.length; i < state.charIndex; i++) {
                if (i < characters.length) {
                    characters[i].className = '';
                }
            }
            state.charIndex = typedValue.length;
            let currentMistakes = 0;
            for (let i = 0; i < state.charIndex; i++) {
                if (characters[i] && characters[i].classList.contains('incorrect')) currentMistakes++;
            }
            state.mistakes = currentMistakes;
        }

        state.charIndex = typedValue.length;

        if (state.charIndex >= characters.length) {
            endTest();
            return;
        }

        let currentMistakes = 0;
        characters.forEach((span, index) => {
            if (index < typedValue.length) {
                const char = typedValue[index];
                if (char === span.innerText) {
                    span.classList.add('correct');
                    span.classList.remove('incorrect', 'active');
                } else {
                    span.classList.add('incorrect');
                    span.classList.remove('correct', 'active');
                    currentMistakes++;
                }
            } else if (index === typedValue.length) {
                span.classList.add('active');
                span.classList.remove('correct', 'incorrect');
            } else {
                span.classList.remove('correct', 'incorrect', 'active');
            }
        });
        
        state.mistakes = currentMistakes;
        updateStats();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            Object.values(dropdowns).forEach(dropdown => {
                if (dropdown) dropdown.container.classList.remove('open');
            });
            Object.values(typingDropdowns).forEach(dropdown => {
                if (dropdown) dropdown.container.classList.remove('open');
            });
        }
    });
});

