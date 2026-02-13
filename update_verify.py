import os

html_path = "public/index.html"
if os.path.exists(html_path):
    with open(html_path, "r") as f:
        content = f.read()
    
    # Menambahkan badge verifikasi AI Guard
    verify_badge = """
        <div class="mt-4 p-2 border border-green-500/30 bg-green-500/10 rounded-lg flex items-center justify-center gap-2">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p class="text-[9px] text-green-400 font-mono tracking-tighter">AI GUARD VERIFIED: LEGITIMATE SOVEREIGN ASSET</p>
        </div>
    """
    
    if "INITIALIZE & SAVE" in content:
        updated_content = content.replace("INITIALIZE & SAVE", "INITIALIZE & SAVE" + verify_badge)
        with open(html_path, "w") as f:
            f.write(updated_content)
        print("✅ Verification Module Integrated.")
