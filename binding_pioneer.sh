#!/bin/bash

# Data Pioneer (Contoh 3 orang pertama, Abang bisa teruskan hingga 36)
# Format: "Alias|LegacyID"
pioneers=(
  "Purwantoro|NS-USER-7438-X"
  "Pioneer-02|IDNS-002"
  "Pioneer-03|IDNS-003"
)

# File Registry Target
REGISTRY="BINDING_REGISTRY.json"

echo "Binding pioneers to IID slots..."

for i in "${!pioneers[@]}"; do
    # Slot dimulai dari 0000011 (Karena 001-010 adalah Vault/Founder)
    slot_num=$((i + 11))
    iid=$(printf "IID-2026-%07d" $slot_num)
    
    IFS='|' read -r alias legacy <<< "${pioneers[$i]}"
    
    # Cek apakah sudah ada di mapping
    if grep -q "$iid" "$REGISTRY"; then
        echo "⚠️ $iid already bound, skipping..."
    else
        # Inject ke BINDING_REGISTRY.json menggunakan jq atau sed sederhana
        # Disini kita gunakan metode append aman
        echo "✅ Binding $alias ($legacy) to $iid"
        sed -i "/\"mappings\": \[/a \    {\n      \"iid\": \"$iid\",\n      \"alias\": \"$alias\",\n      \"legacy_id\": \"$legacy\",\n      \"role\": \"Citizen-Pioneer\",\n      \"status\": \"SSOT_ACTIVE\"\n    }," "$REGISTRY"
    fi
done

# Perbaiki koma terakhir jika ada (JSON cleanup)
sed -i 's/}, \]/} \]/g' "$REGISTRY"

echo "-------------------------------------------------"
echo "🚀 MIGRATION COMPLETE. SYNCING TO CLOUD..."
