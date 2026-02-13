const VAULT = {
    init() {
        this.load();
        this.startStaking();
    },
    load() {
        const bal = localStorage.getItem('ns_balance') || "1540.00";
        document.getElementById('balance').innerText = `€${parseFloat(bal).toLocaleString('de-DE', {minimumFractionDigits: 2})}`;
    },
    startStaking() {
        setInterval(() => {
            let current = parseFloat(localStorage.getItem('ns_balance') || "1540.00");
            current += 0.85; // Simulasi staking ENPE ke Stable
            localStorage.setItem('ns_balance', current.toFixed(2));
            this.load();
        }, 10000); // Update tiap 10 detik
    }
};
window.onload = () => VAULT.init();
import { syncToCloud } from './supabase_bridge.js';
setInterval(() => syncToCloud('IID-M30LX5ED2', localStorage.getItem('ns_balance')), 60000);
