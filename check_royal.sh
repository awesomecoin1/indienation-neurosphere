#!/bin/bash
echo "------------------------------------------"
echo " NEUROSPHERE CONTROL ROOM - ROYAL SINERGI "
echo "------------------------------------------"
grep "IID-ROYAL" community_iid_placeholders.txt | grep "STATUS: BOUND"
COUNT=$(grep "IID-ROYAL" community_iid_placeholders.txt | grep -c "STATUS: BOUND")
echo "------------------------------------------"
echo "KONSENSUS: $COUNT / 9"
if [ "$COUNT" -eq 9 ]; then
    echo "✅ ROYAL SINERGI MANDIRI TERCAPAI!"
else
    echo "⏳ Menunggu partisipasi warga Royal Sinergi..."
fi
echo "------------------------------------------"
