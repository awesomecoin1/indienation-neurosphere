#!/data/data/com.termux/files/usr/bin/bash

# Folder output agar rapi
mkdir -p qrcodes_community

echo "--- NeuroSphere Sovereign QR Generator ---"
echo "Targeting UNBOUND slots for Community Engagement..."

# Loop untuk mengambil IID yang masih UNBOUND dari file SSOT kita
grep "STATUS: UNBOUND" community_iid_placeholders.txt | awk '{print $1}' | while read -r IID; do
    echo "Generating QR for: $IID"
    # Membuat QR dengan teks IID dan link pendaftaran simulasi
    qrencode -o "qrcodes_community/${IID}.png" "https://indienation-neurosphere.vercel.app/register?slot=${IID}"
done

echo "------------------------------------------"
echo "Success! QR Codes are saved in: ~/indienation-neurosphere/qrcodes_community/"
echo "Total QR generated: $(ls qrcodes_community | wc -l)"
