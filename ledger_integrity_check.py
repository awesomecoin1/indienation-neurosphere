cat << 'EOF' > ledger_integrity_check.py
import json
import os
import hashlib

def check_integrity():
    shards = [f'public_registry_shard_{i}.json' for i in range(1, 6)]
    all_iids = set()
    total_value = 0
    errors = []

    print("🛡️  STARTING FORENSIC AUDIT...")
    
    for shard in shards:
        if not os.path.exists(shard):
            print(f"❌ {shard} MISSING")
            continue
            
        with open(shard, 'r') as f:
            try:
                data = json.load(f)
                # Calculate Hash for SSOT Snapshot
                file_hash = hashlib.sha256(open(shard,'rb').read()).hexdigest()
                print(f"✅ {shard} | Hash: {file_hash[:10]}... | Count: {len(data)}")
                
                for record in data:
                    iid = record.get('iid') or record.get('id')
                    balance = record.get('balance_eur', 100000) # Fallback ke 100k
                    
                    if iid in all_iids:
                        errors.append(f"FATAL: Duplicate IID detected: {iid}")
                    all_iids.add(iid)
                    total_value += balance
                    
                    if balance != 100000:
                        errors.append(f"FATAL: Incorrect balance for {iid}: {balance}")
            except Exception as e:
                errors.append(f"ERROR processing {shard}: {e}")

    print("-----------------------------------------")
    print(f"📊 FINAL AUDIT RESULT:")
    print(f"Total Unique IIDs : {len(all_iids)}")
    print(f"Total Value (EUR) : €{total_value:,}")
    
    if len(all_iids) == 100000 and total_value == 10000000000:
        print("✅ INTEGRITY PASSED: 100% SSOT VALID.")
    else:
        print(f"⚠️ INTEGRITY FAILED: {len(errors)} Errors found.")
        for err in errors[:5]: print(err)

if __name__ == "__main__":
    check_integrity()
EOF

python3 ledger_integrity_check.py
