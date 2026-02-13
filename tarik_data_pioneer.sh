#!/bin/bash
echo "================================================="
echo "📥 NEUROSPHERE PIONEER DATA SYNC (TIM 36)"
echo "================================================="

# Menarik detail terbaru dari GitHub
git pull origin main

echo "-------------------------------------------------"
echo "📜 DETAIL 10 WALLET AWAL BERHASIL DIAMBIL:"
cat DETAIL_10_WALLET_AWAL.md | grep "|" | head -n 15

echo "-------------------------------------------------"
echo "👥 STATUS TIM 36 (4 KOMUNITAS):"
cat SOP_TIM_36.md

echo "================================================="
echo "✅ DATA SINKRON. SIAP UNTUK BINDING IID."
