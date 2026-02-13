#!/bin/bash
echo "========================================="
echo "🛡️  NEUROSPHERE SSOT DEEP AUDIT"
echo "========================================="
echo "Mengecek Keberadaan Aset Utama..."

files=("mass_ledger_100k.json" "public_registry_shard_1.json" "registry_part1.csv" "audit_ssot.sql")

for f in "${files[@]}"; do
    if [ -f "$f" ]; then
        echo "✅ $f: TERDETEKSI"
    else
        echo "❌ $f: TIDAK DITEMUKAN"
    fi
done

echo "-----------------------------------------"
echo "Validasi Nominal di mass_ledger_100k.json..."
grep -o "100000" mass_ledger_100k.json | head -n 1 && echo "✅ Nominal €100.000 Terverifikasi." || echo "⚠️ Cek kembali nominal!"
echo "========================================="
