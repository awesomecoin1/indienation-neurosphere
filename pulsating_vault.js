let KURS_IDR = 19950;

async function fetchRealRate() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await res.json();
        KURS_IDR = data.rates.IDR;
        console.log("✅ Kurs Real-Time Updated: " + KURS_IDR);
    } catch (e) {
        console.log("⚠️ Gagal ambil kurs, pakai fallback.");
    }
}

function updateUI() {
    const eurBalance = 100000; // Saldo Anchor
    const pulse = Math.sin(Date.now() / 500) * 0.5; // Denyut halus
    const currentEur = eurBalance + pulse;
    const currentIdr = currentEur * KURS_IDR;

    document.getElementById('eur-display').innerText = '€' + currentEur.toLocaleString('de-DE', {minimumFractionDigits: 2});
    document.getElementById('idr-display').innerText = 'Rp ' + currentIdr.toLocaleString('id-ID');
    document.getElementById('kurs-display').innerText = 'Kurs Live: 1 EUR = Rp ' + KURS_IDR.toLocaleString('id-ID');
}

fetchRealRate();
setInterval(fetchRealRate, 60000); // Update kurs tiap menit
setInterval(updateUI, 100); // Update denyut tiap 100ms
