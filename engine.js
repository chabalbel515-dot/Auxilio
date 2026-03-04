// engine.js - Lógica de Segurança e Sensibilidade
const CONFIG = {
    KEY: "123", // Sua senha
    MAX_PIXEL_LOCK: 50
};

let lastPosX = 0;
let engineActive = { aim: false, lag: false, boost: false, fps: false };

function checkKey() {
    const input = document.getElementById('access-key').value;
    if (input === CONFIG.KEY) {
        const login = document.getElementById('login-screen');
        const panel = document.getElementById('main-panel');
        
        login.style.opacity = '0';
        setTimeout(() => {
            login.style.display = 'none';
            panel.style.display = 'block';
            setTimeout(() => {
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            }, 50);
            startTouchEngine();
        }, 500);
    } else {
        alert("Chave Inválida!");
    }
}

function startTouchEngine() {
    // Vincula os switches aos estados da engine
    document.getElementById('aim-lock').onchange = (e) => engineActive.aim = e.target.checked;
    document.getElementById('reduce-lag').onchange = (e) => engineActive.lag = e.target.checked;
    document.getElementById('boost-2x').onchange = (e) => engineActive.boost = e.target.checked;
    document.getElementById('max-fps').onchange = (e) => engineActive.fps = e.target.checked;

    console.log("Sielzada Engine iniciada...");
}

// Lógica de processamento de toque com filtro de ruído e Bézier
window.addEventListener('touchmove', (e) => {
    if (!engineActive.aim) return;
    
    const touch = e.touches[0];
    let rawDeltaX = touch.clientX - lastPosX;
    
    // 1. Filtro de Ruído (Samsung Tech Analysis)
    let alpha = engineActive.lag ? 0.8 : 0.4;
    let filteredX = rawDeltaX * alpha;

    // 2. Trava de Pixels e Curva de Sensibilidade
    if (Math.abs(filteredX) > CONFIG.MAX_PIXEL_LOCK) {
        filteredX = filteredX > 0 ? CONFIG.MAX_PIXEL_LOCK : -CONFIG.MAX_PIXEL_LOCK;
    }

    // 3. Aplicação do Boost 2x
    if (engineActive.boost) filteredX *= 2;

    lastPosX = touch.clientX;
}, { passive: false });
