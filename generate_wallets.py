import os
import hashlib

def generate_wallet_signature(iid):
    # Menciptakan Signature unik berdasarkan IID dan Anchor Value €100.000
    secret_salt = "NEUROSPHERE_2026_SOVEREIGN"
    raw_data = f"{iid}_{secret_salt}_100000"
    return hashlib.sha256(raw_data.encode()).hexdigest()

cert_dir = "certificates"
for filename in os.listdir(cert_dir):
    if filename.endswith(".txt"):
        iid = filename.replace("CERTIFICATE_", "").replace(".txt", "")
        signature = generate_wallet_signature(iid)
        
        with open(os.path.join(cert_dir, filename), "a") as f:
            f.write("\n\n--- WALKING WALLET METADATA ---")
            f.write(f"\nTM-IDENTITY-HASH: {signature}")
            f.write(f"\nANCHOR-VALUE: EUR 100,000")
            f.write(f"\nSTATUS: INITIALIZED 01-02-2026")
            f.write(f"\nVERIFY: https://indienation-tm.web.app/verify.html?id={iid}&hash={signature[:12]}")
            f.write("\n-------------------------------")

print("Walking Wallet Metadata successfully injected into all certificates.")
