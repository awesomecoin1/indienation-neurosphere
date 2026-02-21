#!/bin/bash
# NEUROSPHERE SOVEREIGN MASTER RUNNER v2.1
# Fully Integrated: Pulse -> Integrity -> API -> Deploy -> Archive
set -euo pipefail

# --- 1. CONCURRENCY GUARD ---
LOCKFILE="$HOME/neuro_auto_sync.lock"
if [ -f "$LOCKFILE" ]; then
  echo "[$(date)] ERR: Process locked. Another instance is running."
  exit 1
fi
trap 'rm -f "$LOCKFILE"' EXIT
touch "$LOCKFILE"

echo "[$(date)] >>> INITIALIZING PULSE CYCLE <<<"
cd ~/indienation-neurosphere || exit 1

# --- 2. METABOLIC UPDATE (Aura Pulse) ---
# Menambah Aura +0.01 & Update Timestamp
python3 aura_pulse.py
echo "[$(date)] STEP 1: Aura Metabolism Updated."

# --- 3. CRYPTOGRAPHIC INTEGRITY (Wallet Gen) ---
# Meregenerasi Signature & Link berdasarkan Aura terbaru
python3 generate_wallets.py
echo "[$(date)] STEP 2: Wallet Signature Re-synced."

# --- 4. PUBLIC STATUS API GENERATION ---
# Membuat snapshot kesehatan sistem untuk Dashboard
echo "{
  \"status\": \"OK\",
  \"last_pulse\": \"$(date +'%Y-%m-%d %H:%M:%S')\",
  \"total_iid\": $(ls certificates/CERTIFICATE_IID_*.txt 2>/dev/null | wc -l),
  \"founder\": \"INDIE-Founder\",
  \"network\": \"NeuroSphere Sovereign\",
  \"security\": \"Hardened\"
}" > system_status.json
echo "[$(date)] STEP 3: System Status API Created."

# --- 5. ATOMIC DEPLOYMENT ---
# Publikasi ke https://indienation-tm.web.app
firebase deploy --only hosting --non-interactive
echo "[$(date)] STEP 4: Firebase Deployment Success."

# --- 6. HISTORICAL ARCHIVING (Git) ---
# Menyimpan bukti evolusi harian
if ! git diff --quiet; then
  git add .
  git commit -m "AUTOPULSE: $(date +'%Y-%m-%d') - Sovereign Evolution Synced"
  git push origin main
  echo "[$(date)] STEP 5: Git Archive Pushed."
else
  echo "[$(date)] STEP 5: No data change detected. Skipping Git."
fi

echo "[$(date)] >>> PULSE CYCLE COMPLETED SUCCESSFULLY <<<"
