import qrcode # Pastikan library ini ada di Termux
import json

pioneers = []
for i in range(11, 47):
    iid = f"IID-2026-{str(i).zfill(7)}"
    # Metadata untuk Auralang Activation
    data = {
        "iid": iid,
        "type": "PIONEER_ACTIVATION",
        "value": "100000_EUR",
        "guard": "AI_GUARD_V1"
    }
    # Simulasi pembuatan QR (Teks sebagai basis QR)
    pioneers.append(data)

with open('pioneer_keys.json', 'w') as f:
    json.dump(pioneers, f, indent=4)

print("✅ 36 Activation Keys generated in pioneer_keys.json")
