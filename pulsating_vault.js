let INITIAL_ANCHOR = 100000.0000;
let KURS_IDR = 19980;

async function fetchKurs() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
        const data = await res.json();
        KURS_IDR = data.rates.IDR;
    } catch(e) { console.log("Fallback Kurs Aktif"); }
}

function processTransfer(amount) {
    INITIAL_ANCHOR -= amount;
    alert("Berhasil! Saldo berkurang €" + amount);
    updateUI();
}

function updateUI() {
    const pulse = Math.sin(Date.now() / 1000) * 0.0005;
    const currentEur = INITIAL_ANCHOR + pulse;
    const currentIdr = currentEur * KURS_IDR;

    document.getElementById('eur-display').innerText = '€' + currentEur.toLocaleString('de-DE', {minimumFractionDigits: 4});
    document.getElementById('idr-display').innerText = 'Rp ' + currentIdr.toLocaleString('id-ID', {maximumFractionDigits: 0});
    document.getElementById('kurs-display').innerText = 'Kurs Live: 1 EUR = Rp ' + KURS_IDR.toLocaleString('id-ID');
}

fetchKurs();
setInterval(updateUI, 50);
setInterval(fetchKurs, 60000);
window.processTransfer = processTransfer;
