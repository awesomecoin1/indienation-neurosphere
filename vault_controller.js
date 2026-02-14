// NEUROSPHERE SOVEREIGN ENGINE V2.0
const VAULT_DATA = {
    iid: "IID-GAG08430G",
    holder: "INDIE-FOUNDER",
    balance: 99999.9997,
    currency: "EUR"
};

function handleAction(type) {
    if(type === 'KIRIM') {
        let target = prompt("Masukkan IID Tujuan:");
        let amt = prompt("Jumlah €:");
        if(target && amt) alert(`AI Guard: Memproses pengiriman €${amt} ke ${target}...`);
    } else if(type === 'DEPOSIT') {
        alert("Pilih sumber deposit: [1] ENPE Staking [2] LUV Conversion");
    } else if(type === 'EXCHANGE') {
        alert("Kurs saat ini: 1 EUR = Rp 19.961. Menuju Gateway Exchange...");
    }
}
