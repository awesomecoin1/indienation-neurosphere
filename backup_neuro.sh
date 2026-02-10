#!/bin/bash
# NeuroSphere System Monitor & Backup
# Founder: INDIE-Founder

# Konfigurasi Folder
REPO_DIR="$HOME/indienation-neurosphere"
BACKUP_DIR="$REPO_DIR/backups"
mkdir -p $BACKUP_DIR

# 1. Backup File Aura
TIMESTAMP=$(date +%Y%m%d_%H%M)
cp $REPO_DIR/distribution_logic.aura $BACKUP_DIR/logic_backup_$TIMESTAMP.aura

# 2. Cek Penggunaan Storage (Batas 10GB)
STORAGE_USAGE=$(du -sm $REPO_DIR | cut -f1)
echo "--- Health Check ---"
echo "Storage Terpakai: $STORAGE_USAGE MB / 10240 MB"

# 3. Cek Sesi Data (Batas 100MB)
# (Estimasi berdasarkan ukuran log telemetri terbaru)
LOG_SIZE=$(stat -c%s "$REPO_DIR/telemetry.log" 2>/dev/null || echo 0)
LOG_MB=$((LOG_SIZE / 1048576))

if [ $LOG_MB -gt 90 ]; then
    echo "PERINGATAN: Sesi data hampir mencapai 100MB!"
else
    echo "Sesi Data Aman: $LOG_MB MB"
fi

echo "Backup selesai disimpan di folder /backups"
