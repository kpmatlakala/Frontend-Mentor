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

    const resultDisplays = {
        wpm: document.getElementById('result-wpm'),
        accuracy: document.getElementById('result-accuracy'),
        correct: document.getElementById('result-correct'),
        incorrect: document.getElementById('result-incorrect')
    };

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

    const pills = {
        difficulty: {
            group: document.getElementById('difficulty-pills'),
            options: document.querySelectorAll('#difficulty-pills .pill-option')
        },
        mode: {
            group: document.getElementById('mode-pills'),
            options: document.querySelectorAll('#mode-pills .pill-option')
        }
    };

    const typingTextDisplay = document.getElementById('typing-text');
    const wpmDisplays = {
        home: document.getElementById('wpm-home'),
        typing: document.getElementById('wpm-typing'),
        results: document.getElementById('pb-display-results')
    };
    const accuracyDisplays = {
        home: document.getElementById('accuracy-home'),
        typing: document.getElementById('accuracy-typing'),
        // results might need one if added to HTML
    };
    const timeDisplays = {
        home: document.getElementById('time-home'),
        typing: document.getElementById('time-typing')
    };
    
    // State
    let state = {
        screen: 'home', // 'home', 'typing', 'results'
        difficulty: 'Hard',
        mode: 'Timed (60s)',
        wpm: 0,
        accuracy: 100,
        timeLeft: 60,
        isPlaying: false,
        timer: null,
        charIndex: 0,
        mistakes: 0,
        totalTyped: 0
    };

    // Hidden Input for Typing
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.style.opacity = '0';
    inputField.style.position = 'absolute';
    inputField.style.zIndex = '-1';
    document.body.appendChild(inputField);

    // Navigation Functions
    function switchScreen(screenName) {
        // Hide all screens
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        if (screens[screenName]) {
            screens[screenName].classList.add('active');
            state.screen = screenName;
        }

        if (screenName === 'typing') {
            inputField.value = '';
            inputField.focus();
            // Ensure focus stays
            document.addEventListener('click', focusInput);
        } else {
            document.removeEventListener('click', focusInput);
            inputField.blur();
        }
    }

    function focusInput(e) {
        // Prevent focusing if clicking buttons
        if (e.target.closest('button') || e.target.closest('.dropdown')) return;
        if (state.screen === 'typing') {
            inputField.focus();
        }
    }

    // State Management Functions
    function updateSetting(key, value) {
        state[key] = value;
        
        // Update Dropdown UI
        const dropdown = dropdowns[key];
        dropdown.selected.textContent = value;
        dropdown.items.forEach(i => {
            if (i.getAttribute('data-value') === value) {
                i.classList.add('active');
            } else {
                i.classList.remove('active');
            }
        });

        // Update Pill UI
        const pillGroup = pills[key];
        pillGroup.options.forEach(opt => {
            if (opt.getAttribute('data-value') === value) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    // Dropdown Functions
    function setupDropdown(dropdownKey) {
        const dropdown = dropdowns[dropdownKey];
        
        dropdown.button.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other dropdowns
            Object.keys(dropdowns).forEach(key => {
                if (key !== dropdownKey) {
                    dropdowns[key].container.classList.remove('open');
                }
            });
            dropdown.container.classList.toggle('open');
        });

        dropdown.items.forEach(item => {
            item.addEventListener('click', () => {
                const value = item.getAttribute('data-value');
                updateSetting(dropdownKey, value);
                dropdown.container.classList.remove('open');
            });
        });
    }

    // Pill Functions
    function setupPills(pillKey) {
        const pillGroup = pills[pillKey];
        pillGroup.options.forEach(option => {
            option.addEventListener('click', () => {
                const value = option.getAttribute('data-value');
                updateSetting(pillKey, value);
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

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        Object.values(dropdowns).forEach(dropdown => {
            if (!dropdown.container.contains(e.target)) {
                dropdown.container.classList.remove('open');
            }
        });
    });

    // Initialize
    setupDropdown('difficulty');
    setupDropdown('mode');
    setupPills('difficulty');
    setupPills('mode');

    // Test Logic
    function startTimer() {
        if (state.timer) return;
        state.timer = setInterval(() => {
            if (state.timeLeft > 0) {
                state.timeLeft--;
                updateTimerDisplay();
                updateStats(); // Update WPM in real-time
            } else {
                endTest();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const timeStr = `0:${state.timeLeft.toString().padStart(2, '0')}`;
        timeDisplays.typing.textContent = timeStr;
    }

    function endTest() {
        clearInterval(state.timer);
        state.timer = null;
        state.isPlaying = false;
        inputField.blur();
        
        // Show results
        switchScreen('results');
        wpmDisplays.results.textContent = state.wpm;
        
        if (resultDisplays.wpm) resultDisplays.wpm.textContent = state.wpm;
        if (resultDisplays.accuracy) resultDisplays.accuracy.textContent = `${state.accuracy}%`;
        if (resultDisplays.correct) resultDisplays.correct.textContent = state.charIndex - state.mistakes;
        if (resultDisplays.incorrect) resultDisplays.incorrect.textContent = state.mistakes;
        
        // Update Personal Best (Local Storage could be used here)
        // For now just update if higher
        const currentPB = parseInt(document.getElementById('pb-display').textContent) || 0;
        if (state.wpm > currentPB) {
            document.querySelectorAll('.pb-value span').forEach(el => el.textContent = state.wpm);
        }
    }

    function resetTest() {
        clearInterval(state.timer);
        state.timer = null;
        state.isPlaying = false;
        state.timeLeft = 60; // Reset based on mode if implemented
        state.charIndex = 0;
        state.mistakes = 0;
        state.totalTyped = 0;
        state.wpm = 0;
        state.accuracy = 100;
        inputField.value = '';
        
        updateTimerDisplay();
        wpmDisplays.typing.textContent = '0';
        accuracyDisplays.typing.textContent = '100%';
    }

    function loadText() {
        // Sample text
        const text = "The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic—all discovered in a single Mycenaean tomb—suggested commercial connections far more extensive than previously hypothesized.";
        
        typingTextDisplay.innerHTML = "";
        text.split("").forEach(char => {
            let span = document.createElement("span");
            span.innerText = char;
            typingTextDisplay.appendChild(span);
        });
        
        // Activate first character
        typingTextDisplay.querySelector("span").classList.add("active");
    }

    function updateStats() {
        // Calculate WPM
        // Standard WPM = (all typed / 5) / (time elapsed in minutes)
        // But here we might want (correct chars / 5) / (time elapsed)
        // Or (total chars - mistakes) / 5 / time
        
        const timeElapsed = 60 - state.timeLeft;
        if (timeElapsed > 0) {
            // WPM = (Total characters typed / 5) / (Time in minutes)
            // Frontend Mentor usually counts correct words or characters?
            // Let's use (Correct Chars / 5) / Time
            const correctChars = state.charIndex - state.mistakes;
            const wpm = Math.round(((correctChars / 5) / timeElapsed) * 60);
            state.wpm = wpm < 0 || !isFinite(wpm) ? 0 : wpm;
            
            // Accuracy
            // (Correct / Total Typed) * 100
            // Total typed is charIndex (attempts)
            const accuracy = state.charIndex > 0 
                ? Math.round(((state.charIndex - state.mistakes) / state.charIndex) * 100) 
                : 100;
            state.accuracy = accuracy;
        }

        wpmDisplays.typing.textContent = state.wpm;
        accuracyDisplays.typing.textContent = `${state.accuracy}%`;
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

        // If user deleted everything (unlikely but possible)
        if (typedValue.length < state.charIndex) {
            // Backspace handled implicitly by iterating up to new length
            // We need to clear classes for characters beyond new length
            for (let i = typedValue.length; i < state.charIndex; i++) {
                if (i < characters.length) {
                    characters[i].className = ''; // Reset class
                }
            }
            state.charIndex = typedValue.length;
            // Recalculate mistakes
            let currentMistakes = 0;
            for (let i = 0; i < state.charIndex; i++) {
                 if (characters[i].classList.contains('incorrect')) currentMistakes++;
            }
            state.mistakes = currentMistakes;
        }

        state.charIndex = typedValue.length;

        if (state.charIndex > characters.length) {
            // End of text
            endTest();
            return;
        }

        // Check current character
        // We only need to check the last character typed if it's an addition
        // But full iteration is safer for copy-paste or fast typing
        
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

});
