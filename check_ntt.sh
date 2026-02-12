#!/bin/bash
echo "------------------------------------------"
echo " NEUROSPHERE CONTROL ROOM - NTT VAULT "
echo "------------------------------------------"
# Menampilkan hanya yang benar-benar BOUND
grep "IID-NTT" community_iid_placeholders.txt | grep "STATUS: BOUND"
BOUND_COUNT=$(grep "IID-NTT" community_iid_placeholders.txt | grep -c "STATUS: BOUND")
echo "------------------------------------------"
echo "KONSENSUS NYATA: $BOUND_COUNT / 9"

if [ "$BOUND_COUNT" -eq 9 ]; then
    echo "✅ STATUS: TERVERIFIKASI. OTORITAS DISERAHKAN KE NTT."
else
    echo "⏳ STATUS: MENUNGGU $((9 - BOUND_COUNT)) SLOT LAGI."
fi
echo "------------------------------------------"
