import base64

SECRET_SALT = "NEURO_2026_FOUNDER"
print("\n" + "="*50)
print("🛡️ SECURE KEYS OF KINDNESS (READY TO DISTRIBUTE) 🛡️")
print("="*50 + "\n")

for i in range(11, 47):
    iid = f"IID-2026-{str(i).zfill(7)}"
    key = base64.b64encode((iid + SECRET_SALT).encode()).decode()[:8]
    link = f"https://neurosphere-v2.vercel.app/?activate={iid}&key={key}"
    
    print(f"PIONEER #{i-10}")
    print(f"ID: {iid}")
    print(f"LINK: {link}")
    print("-" * 30)
