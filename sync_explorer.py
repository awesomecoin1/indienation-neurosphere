import os

def sync():
    ssot_path = 'community_iid_placeholders.txt'
    html_path = 'web/explorer/index.html'
    
    if not os.path.exists(ssot_path):
        print("SSOT file not found!")
        return

    with open(ssot_path, 'r') as f:
        lines = f.readlines()

    # Hitung slot yang BOUND
    total_slots = 36
    bound_count = sum(1 for line in lines if "STATUS: BOUND" in line)
    
    # Ambil status per slot (hanya contoh untuk NTT_VAULT)
    ntt_status = []
    for i in range(1, 10):
        slot_id = f"IID-NTT-KEY-0{i}"
        is_bound = any(f"{slot_id} | STATUS: BOUND" in line for line in lines)
        ntt_status.append(is_bound)

    # Update HTML sederhana menggunakan replacement (atau rewrite)
    # Catatan: Untuk sistem yang lebih kompleks, kita bisa gunakan template engine
    print(f"Syncing... Found {bound_count}/{total_slots} bound slots.")
    
    # Logic update HTML bisa dikembangkan lebih lanjut di sini
    # Untuk demo, kita pastikan data SSOT konsisten dengan angka di Explorer.
    
sync()
