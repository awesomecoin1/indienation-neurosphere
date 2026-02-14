// 🛡️ NEUROSPHERE LIVE ENGINE v2.1 (ANTI-CACHE)
let INITIAL_ANCHOR = 100000.0000;
let KURS_IDR = 19980; // Standar pasar jika API delay

async function fetchKurs() {
    try {
        // Menggunakan API alternatif yang lebih cepat
        const res = await fetch('https://open.er-api.com/v6/latest/EUR');
        const data = await res.json();
        if(data && data.rates && data.rates.IDR) {
            KURS_IDR = data.rates.IDR;
            console.log("✅ Kurs Berhasil Diperbarui: " + KURS_IDR);
        }
    } catch(e) {
        console.log("⚠️ Koneksi API Terganggu, Menggunakan Fallback.");
    }
}

function processTransfer(amount) {
    INITIAL_ANCHOR -= parseFloat(amount);
    // Efek alert untuk konfirmasi visual
    alert("TRANSAKSI BERHASIL!\nSaldo Berkurang: €" + amount + "\nSisa Saldo: €" + INITIAL_ANCHOR.toFixed(4));
    updateUI();
}

function updateUI() {
    // Denyut halus agar angka terasa "hidup"
    const pulse = Math.sin(Date.now() / 800) * 0.0002;
    const currentEur = INITIAL_ANCHOR + pulse;
    const currentIdr = currentEur * KURS_IDR;

    const eurEl = document.getElementById('eur-display');
    const idrEl = document.getElementById('idr-display');
    const kursEl = document.getElementById('kurs-display');

    if(eurEl) eurEl.innerText = '€' + currentEur.toLocaleString('de-DE', {minimumFractionDigits: 4, maximumFractionDigits: 4});
    if(idrEl) idrEl.innerText = 'Rp ' + currentIdr.toLocaleString('id-ID', {maximumFractionDigits: 0});
    if(kursEl) kursEl.innerText = '📡 LIVE KURS: 1 EUR = Rp ' + KURS_IDR.toLocaleString('id-ID');
}

// Inisialisasi
fetchKurs();
setInterval(updateUI, 50); // Kecepatan tinggi untuk efek denyut
setInterval(fetchKurs, 30000); // Cek kurs tiap 30 detik
window.processTransfer = processTransfer;
