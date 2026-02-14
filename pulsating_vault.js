// 🛡️ NEUROSPHERE PULSATING VAULT ENGINE
const KURS_IDR = 19950; // Kita kunci di angka pasar atau ambil via API

function updateDisplay(eurBalance) {
    // 1. Hitung Konversi Rupiah
    const idrBalance = eurBalance * KURS_IDR;
    
    // 2. Format Mata Uang
    const formattedEUR = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(eurBalance);
    const formattedIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(idrBalance);

    // 3. Efek Berdenyut (Logika)
    // Angka akan berdenyut +- 0.01% untuk sensasi "hidup"
    const pulse = Math.sin(Date.now() / 1000) * 0.0001;
    const pulsatingEUR = eurBalance * (1 + pulse);

    console.log(`💶 ${formattedEUR} | 🇮🇩 ${formattedIDR}`);
    return { pulsatingEUR, formattedIDR };
}

// 4. Timer 3 Hari (72 Jam)
const startTime = new Date("2026-02-14T15:00:00").getTime();
const endTime = startTime + (3 * 24 * 60 * 60 * 1000);

function checkLockStatus() {
    const now = new Date().getTime();
    if (now > endTime) {
        return "LOCKED_BY_GUARD"; // Tombol akan otomatis mati
    }
    return "ACTIVE";
}

setInterval(() => {
    const status = checkLockStatus();
    if (status === "ACTIVE") {
        updateDisplay(100000); // Demo €100k
    } else {
        console.log("🛑 3-DAY PERIOD ENDED. BUTTONS DISABLED.");
    }
}, 1000);
