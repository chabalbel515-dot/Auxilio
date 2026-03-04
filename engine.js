const CONFIG = { KEY: "123" };
let lastPosX = 0, lastPosY = 0;
let engineActive = { aim: false, lag: false, boost: false, fps: false };

function checkKey() {
    if (document.getElementById('access-key').value === CONFIG.KEY) {
        document.getElementById('login-screen').style.display = 'none';
        const panel = document.getElementById('main-panel');
        panel.style.display = 'block';
        setTimeout(() => panel.style.opacity = '1', 50);
        initEngine();
    } else { alert("Key Errada!"); }
}

function initEngine() {
    // Escuta os Switches
    document.getElementById('aim-lock').onclick = (e) => engineActive.aim = e.target.checked;
    document.getElementById('reduce-lag').onclick = (e) => engineActive.lag = e.target.checked;
    document.getElementById('boost-2x').onclick = (e) => engineActive.boost = e.target.checked;
    document.getElementById('max-fps').onclick = (e) => engineActive.fps = e.target.checked;

    window.addEventListener('touchmove', (e) => {
        if (!engineActive.aim) return;
        e.preventDefault();
        
        let touch = e.touches[0];
        let deltaX = touch.clientX - lastPosX;
        
        // Simulação da curva de Bezier e Filtro Samsung
        let processedX = applySensiLogic(deltaX);
        
        console.log("Movimento Otimizado: ", processedX);
        lastPosX = touch.clientX;
    }, { passive: false });
}

function applySensiLogic(delta) {
    let alpha = engineActive.lag ? 0.85 : 0.6; // Filtro de Ruído
    let move = delta * alpha;
    
    // Trava de Pixels (Magnetismo)
    if (Math.abs(move) > 50) move = move > 0 ? 50 : -50;
    
    // Multiplicador 2x
    return engineActive.boost ? move * 2 : move;
}
