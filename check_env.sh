#!/bin/bash
echo "--- NeuroSphere Environment Health Check ---"
echo "Founder: INDIE-Founder"
echo "Repository: indienation-neurosphere"

# 1. Cek Storage (Maksimal 10GB)
USED_STORAGE=$(du -sm ~/indienation-neurosphere | cut -f1)
echo "Storage Terpakai: $USED_STORAGE MB / 10240 MB"

# 2. Cek Koneksi ke Google Cloud OTLP
nc -zv otlp.googleapis.com 443 2>&1 | grep -q "succeeded" && echo "Telemetri: ONLINE" || echo "Telemetri: OFFLINE"

# 3. Peringatan jika melebihi batas
if [ $USED_STORAGE -gt 9000 ]; then
    echo "PERINGATAN: Storage hampir penuh (Di atas 9GB)!"
fi
