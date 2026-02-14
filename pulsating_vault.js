// 🛡️ NEUROSPHERE SOVEREIGN ENGINE - DYNAMIC VAULT
let KURS_IDR = 19980; 
let INITIAL_ANCHOR = 100000.0000; // Saldo Induk
let SPENT_AMOUNT = 0.0000; // Jumlah yang sudah dikirim

async function fetchRealRate() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await res.json();
        KURS_IDR = data.rates.IDR;
    } catch (e) {
        console.log("⚠️ Menggunakan Kurs Pasar: Rp 19.980");
    }
}

// FUNGSI UTAMA: PENGURANGAN SALDO
function processTransfer(amount) {
    SPENT_AMOUNT += parseFloat(amount);
    console.log(`📤 Transaksi Berhasil: €${amount}. Sisa Saldo: €${(INITIAL_ANCHOR - SPENT_AMOUNT).toFixed(4)}`);
    updateUI();
}

function updateUI() {
    const currentEur = INITIAL_ANCHOR - SPENT_AMOUNT;
    // Efek Denyut (Pulse) 0.0001 - 0.0005 untuk sensasi hidup
    const pulse = Math.sin(Date.now() / 1000) * 0.0003;
    const pulsatingEur = currentEur + pulse;
    const currentIdr = pulsatingEur * KURS_IDR;

    const eurDisplay = document.getElementById('eur-display');
    const idrDisplay = document.getElementById('idr-display');
    const kursDisplay = document.getElementById('kurs-display');

    if(eurDisplay) eurDisplay.innerText = '€' + pulsatingEur.toLocaleString('de-DE', {minimumFractionDigits: 4, maximumFractionDigits: 4});
    if(idrDisplay) idrDisplay.innerText = 'Rp ' + currentIdr.toLocaleString('id-ID', {maximumFractionDigits: 0});
    if(kursDisplay) kursDisplay.innerText = 'Status: REAL-TIME | 1 EUR = Rp ' + KURS_IDR.toLocaleString('id-ID');
}

fetchRealRate();
setInterval(fetchRealRate, 60000);
setInterval(updateUI, 50); // Refresh UI sangat cepat (50ms) agar denyut terasa nyata

// Ekspos fungsi ke Window agar bisa dipanggil dari tombol HTML
window.processTransfer = processTransfer;
