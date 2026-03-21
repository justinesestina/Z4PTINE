const display = document.getElementById('display');
let currentInput = '';
let hasMessage = false;

const messages = [
    'hi, baby!',
    'I love you so much ♡♡♡',
    'I miss you a lot, baby :<',
    'You mean everything to me ✨',
    'Thinking of you... 🥰'
];

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    const left = Math.random() * 100;
    const size = Math.random() * 0.4 + 0.6; 
    const duration = Math.random() * 2.5 + 2.5; 
    
    heart.style.left = `${left}vw`;
    heart.style.bottom = '-20px';
    heart.style.transform = `rotate(-45deg) scale(${size})`;
    heart.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

function burstHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 80);
    }
}

document.querySelector('.buttons').addEventListener('click', (e) => {
    if (!e.target.classList.contains('button')) return;
    
    const value = e.target.textContent;

    if (hasMessage && value !== '=') {
        display.classList.remove('message-mode');
        hasMessage = false;
    }

    if (value === 'C') {
        currentInput = '';
        display.textContent = '0';
        display.classList.remove('message-mode');
        hasMessage = false;
    } else if (value === '=') {
        display.classList.add('message-mode');
        display.textContent = getRandomMessage();
        hasMessage = true;
        burstHearts();
    } else {
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
        
        if (currentInput.length > 12) {
            display.textContent = currentInput.substring(currentInput.length - 12);
        } else {
            display.textContent = currentInput || '0';
        }
    }
});
