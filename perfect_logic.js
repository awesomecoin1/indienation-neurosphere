// NeuroSphere Secure Logic v1.0
const SECRET_SALT = "NEURO_2026_FOUNDER";

async function syncNeuroSphere() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await res.json();
        const kurs = data.rates.IDR || 16500;
        const eur = 99999.9997 + (Math.sin(Date.now() / 1000) * 0.0003); // Pulsating Real
        const idr = eur * kurs;
        
        if(document.querySelector('.idr-display')) {
            document.querySelector('.idr-display').innerText = `Rp ${idr.toLocaleString('id-ID')}`;
            document.querySelector('.eur-display').innerText = `€${eur.toFixed(4).replace('.', ',')}`;
        }
    } catch (e) { console.log("Sync Error"); }
}

function handleKirim() {
    if (new Date() < new Date('2029-02-14')) {
        showToast("🛡️ AI GUARD: Wallet LOCKED s/d 14 Feb 2029", "error");
    }
}

function showToast(msg, type) {
    const toast = document.createElement('div');
    toast.style = "position:fixed; top:20px; right:20px; background:#001a0f; color:#00ff88; border:1px solid #00ff88; padding:15px; z-index:10000; font-family:monospace; box-shadow:0 0 10px #00ff88;";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function checkSecureActivation() {
    const params = new URLSearchParams(window.location.search);
    const iid = params.get('activate');
    const key = params.get('key');
    
    if (iid && key) {
        // Simple Hash Verification (Client Side for Simulation)
        const validKey = btoa(iid + SECRET_SALT).substring(0, 8);
        if (key === validKey) {
            localStorage.setItem('NEURO_IID', iid);
            localStorage.setItem('NEURO_STATUS', 'ACTIVE');
            showToast("✅ KEDAULATAN DIAKTIFKAN: " + iid, "success");
            setTimeout(() => window.location.href = "/", 2000);
        } else {
            showToast("❌ INVALID ACTIVATION KEY", "error");
        }
    }
}

setInterval(syncNeuroSphere, 1000);
window.onload = checkSecureActivation;

// Force Sync untuk Identitas Founder Utama
if (localStorage.getItem('NEURO_IID') === 'IID-M30LX5ED2' || !localStorage.getItem('NEURO_IID')) {
    localStorage.setItem('NEURO_IID', 'IID-GAG08430G'); // IID Founder sesuai kesepakatan
    localStorage.setItem('NEURO_STATUS', 'FOUNDER_LOCKED');
}

// Force Sync untuk Identitas Founder Utama
if (localStorage.getItem('NEURO_IID') === 'IID-M30LX5ED2' || !localStorage.getItem('NEURO_IID')) {
    localStorage.setItem('NEURO_IID', 'IID-GAG08430G'); // IID Founder sesuai kesepakatan
    localStorage.setItem('NEURO_STATUS', 'FOUNDER_LOCKED');
}
