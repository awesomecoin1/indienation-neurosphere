import os

def sync():
    ssot_path = 'community_iid_placeholders.txt'
    html_path = 'web/explorer/index.html'
    if not os.path.exists(ssot_path): return

    with open(ssot_path, 'r') as f:
        lines = f.readlines()

    # Hitung status per Vault
    def get_vault_data(prefix, start, end):
        bound = 0
        slots_html = ""
        for i in range(start, end + 1):
            sid = f"{prefix}-{i:02d}"
            is_bound = any(f"{sid} | STATUS: BOUND" in line for line in lines)
            if is_bound: bound += 1
            status_class = "slot bound" if is_bound else "slot"
            slots_html += f'<div class="{status_class}">{i:02d}</div>'
        return bound, slots_html

    ntt_bound, ntt_html = get_vault_data("IID-NTT-KEY", 1, 9)
    royal_bound, royal_html = get_vault_data("IID-ROYAL-KEY", 10, 18)
    total_bound = ntt_bound + royal_bound

    # Generate Full HTML
    full_html = f'''<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NeuroSphere Explorer | Audit Publik</title>
    <style>
        :root {{ --primary: #00bcd4; --bg: #0a0a0a; --text: #e0e0e0; --bound: #4caf50; --unbound: #444; }}
        body {{ font-family: sans-serif; background: var(--bg); color: var(--text); padding: 20px; }}
        .container {{ max-width: 800px; margin: auto; }}
        .stat-card {{ background: #1a1a1a; padding: 15px; border-radius: 10px; text-align: center; border: 1px solid #333; }}
        .stats-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }}
        .vault-section {{ background: #1a1a1a; padding: 20px; border-radius: 15px; border: 1px solid #333; margin-bottom: 20px; }}
        .slot-grid {{ display: grid; grid-template-columns: repeat(9, 1fr); gap: 5px; }}
        .slot {{ height: 35px; background: var(--unbound); display: flex; align-items: center; justify-content: center; border-radius: 4px; font-weight: bold; color: #222; }}
        .slot.bound {{ background: var(--bound); color: white; box-shadow: 0 0 10px var(--bound); }}
        h1, h3 {{ color: var(--primary); }}
    </style>
</head>
<body>
    <div class="container">
        <h1>Transparency Explorer</h1>
        <div class="stats-grid">
            <div class="stat-card"><h2>{total_bound}/36</h2><p>Slots Bound</p></div>
            <div class="stat-card"><h2>€4.0M</h2><p>Total Asset</p></div>
            <div class="stat-card"><h2>Active</h2><p>Status</p></div>
        </div>
        <div class="vault-section">
            <h3>NTT_VAULT ({ntt_bound}/9)</h3>
            <div class="slot-grid">{ntt_html}</div>
        </div>
        <div class="vault-section">
            <h3>ROYAL_SINERGI ({royal_bound}/9)</h3>
            <div class="slot-grid">{royal_html}</div>
        </div>
        <p style="text-align: center; font-size: 0.8rem; color: #555;">NeuroSphere SSOT Verified | Founder: INDIE-Founder</p>
    </div>
</body>
</html>'''

    with open(html_path, 'w') as f:
        f.write(full_html)
    print(f"✅ Explorer Updated: Total {total_bound}/36 | NTT {ntt_bound}/9 | ROYAL {royal_bound}/9")

sync()
