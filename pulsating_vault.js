let TOTAL_EUR = 100000.0000;
let CURRENT_KURS = 19980;

async function syncKurs() {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/EUR');
        const data = await res.json();
        if(data.rates.IDR) CURRENT_KURS = data.rates.IDR;
    } catch(e) { console.log("API Kurs Delay"); }
}

function processTransfer(amt) {
    TOTAL_EUR -= amt;
    updateUI();
}

function updateUI() {
    const pulse = Math.sin(Date.now() / 800) * 0.0004;
    const displayEur = TOTAL_EUR + pulse;
    const displayIdr = displayEur * CURRENT_KURS;

    document.getElementById('eur-display').innerText = '€' + displayEur.toLocaleString('de-DE', {minimumFractionDigits: 4, maximumFractionDigits: 4});
    document.getElementById('idr-display').innerText = 'Rp ' + displayIdr.toLocaleString('id-ID', {maximumFractionDigits: 0});
    document.getElementById('kurs-display').innerText = 'Kurs Live: 1 EUR = Rp ' + CURRENT_KURS.toLocaleString('id-ID');
}

syncKurs();
setInterval(updateUI, 50);
setInterval(syncKurs, 60000);
window.processTransfer = processTransfer;
