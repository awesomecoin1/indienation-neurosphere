import os
import re

cert_dir = "certificates"

def pulse_aura():
    for filename in os.listdir(cert_dir):
        if filename.endswith(".txt"):
            path = os.path.join(cert_dir, filename)
            with open(path, "r") as f:
                content = f.read()
            
            # Logika: Jika belum ada level Aura, set ke 1.0. Jika ada, naikkan 0.01 (Daily Growth)
            if "AURA-LEVEL:" not in content:
                new_content = content + "\nAURA-LEVEL: 1.0\n"
            else:
                current_level = float(re.search(r"AURA-LEVEL: ([\d.]+)", content).group(1))
                new_level = round(current_level + 0.01, 2)
                new_content = re.sub(r"AURA-LEVEL: [\d.]+", f"AURA-LEVEL: {new_level}", content)
            
            with open(path, "w") as f:
                f.write(new_content)

if __name__ == "__main__":
    pulse_aura()
    print("Aura Pulse Complete: 20 Identities have evolved.")
