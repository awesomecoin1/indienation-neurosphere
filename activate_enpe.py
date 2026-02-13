import os

html_path = "public/index.html"
if os.path.exists(html_path):
    with open(html_path, "r") as f:
        content = f.read()
    
    # Skrip Auralang Logic untuk Staking ENPE
    enpe_logic = """
    <script>
        let enpeBalance = 0;
        function startEnpeStaking() {
            setInterval(() => {
                enpeBalance += 0.85; // Simulasi algoritma 20% staking allocation
                document.getElementById('enpe-display').innerText = enpeBalance.toFixed(2);
            }, 3000);
        }
        window.onload = () => { startEnpeStaking(); };
    </script>
    """
    
    # Menghubungkan ID di UI ke script
    if 'ENPE (NATIVE)' in content:
        content = content.replace('0.00', '<span id="enpe-display">0.00</span>', 1)
        content = content.replace('</body>', enpe_logic + '</body>')
        
    with open(html_path, "w") as f:
        f.write(content)
    print("🚀 ENPE Engine Activated via Auralang.")
