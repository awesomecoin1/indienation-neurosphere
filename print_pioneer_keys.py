import json

# Load data yang tadi sudah dibuat
try:
    with open('pioneer_keys.json', 'r') as f:
        keys = json.load(f)
except:
    print("Error: Jalankan generator JSON dulu.")
    exit()

print("\n" + "="*50)
print("🛡️ NEUROSPHERE PIONEER ACTIVATION KEYS 🛡️")
print("="*50 + "\n")

for item in keys:
    # Membuat format pesan teks untuk dibagikan
    msg = f"--- KEY OF KINDNESS ---\n"
    msg += f"IID: {item['iid']}\n"
    msg += f"TYPE: {item['type']}\n"
    msg += f"VALUE: {item['value']}\n"
    msg += f"GUARD: {item['guard']}\n"
    msg += f"STATUS: [READY FOR BINDING]\n"
    msg += f"LINK: https://neurosphere-v2.vercel.app\n"
    msg += "------------------------\n"
    
    print(msg)

