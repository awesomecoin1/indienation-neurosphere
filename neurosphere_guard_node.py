from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)

# --- KONFIGURASI CORE NEUROSPHERE ---
# Menambahkan gateway_btc ke whitelist identitas
AUTHORIZED_SENDERS = ["INDIE-Founder", "gateway_btc", "neurosphere_core"]
TOTAL_ENPE_SUPPLY = 100_000_000_000_000  # 100 Triliun
DONATION_POOL_PERCENT = 0.15  # Alokasi 15% untuk bencana

# State sederhana (Dalam produksi, ini terhubung ke database Auralang)
stats = {
    "total_distributed": 0,
    "donation_pool": 0,
    "active_citizens": 0
}

@app.route("/")
def root():
    return jsonify({
        "status": "ONLINE",
        "entity": "NeuroSphere Guard Node",
        "founder": "INDIE-Founder",
        "version": "1.0.0-Auralang-Integrated"
    })

@app.route("/transfer", methods=["POST"])
def transfer():
    payload = request.get_json()
    
    if not payload:
        return jsonify({"status": "FAILED", "reason": "No payload"}), 400

    sender = payload.get("sender")
    amount = payload.get("amount", 0)

    # 1. Validasi Identitas Pengirim
    if sender not in AUTHORIZED_SENDERS:
        return jsonify({
            "status": "FAILED", 
            "reason": f"Sender {sender} not recognized.",
            "action": "Identity must be registered in NeuroSphere whitelist"
        }), 403

    # 2. Logika Alokasi 15% Donasi Bencana
    donation_amount = amount * DONATION_POOL_PERCENT
    net_distribution = amount - donation_amount
    
    # 3. Update State (Simulasi Teknologi Money / TM)
    stats["total_distributed"] += net_distribution
    stats["donation_pool"] += donation_amount
    stats["active_citizens"] += 1

    return jsonify({
        "status": "SUCCESS",
        "transaction_id": payload.get("id"),
        "analysis": {
            "sender": sender,
            "gross_amount": amount,
            "donation_allocated_15pct": donation_amount,
            "net_to_citizen": net_distribution,
            "tm_identity": "Living Value Identity"
        },
        "timestamp": datetime.datetime.now().isoformat()
    })

@app.route("/stats")
def get_stats():
    # Menampilkan data untuk Monitor Dashboard
    return jsonify(stats)

if __name__ == "__main__":
    # Menjalankan di port 5000 sesuai konfigurasi Termux
    app.run(host="127.0.0.1", port=5000, debug=False)

