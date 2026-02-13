#!/bin/bash
echo "========================================="
echo "📢 NEUROSPHERE SOVEREIGN PROMO - 2026"
echo "========================================="

# 1. Tarik update terbaru dari GitHub
echo "Tarik data dari GitHub..."
git pull origin main

# 2. Update SOP_TIM_36.md (9 orang x 4 komunitas)
cat << 'SOP_EOF' > SOP_TIM_36.md
# Panduan Tim 36 NeuroSphere
Distribusi €1.000 per IID telah diaktivasi untuk 36 pioneer di 4 komunitas:
- NTT Community (9 IID)
- Royal Community (9 IID)
- Wongso Community (9 IID)
- Kebaikan Community (9 IID)

Setiap transaksi tercatat di Ledger dengan Hash NeuroSphere-Aura.
SOP_EOF

# 3. Push Bukti Kedaulatan
git add SOP_TIM_36.md
git commit -m "promo: update distribution for 36 pioneer IIDs and 4 communities"
git push origin main

echo "-----------------------------------------"
echo "✅ PROMO & DATA 36 IID TELAH LIVE DI GITHUB"
echo "========================================="
