#!/bin/bash
REGISTRY="BINDING_REGISTRY.json"

echo "Sealing slots IID-2026-0000011 to 0000046..."

for i in {11..46}; do
    iid=$(printf "IID-2026-%07d" $i)
    
    # Cek jika IID sudah ada agar tidak duplikat
    if ! grep -q "$iid" "$REGISTRY"; then
        echo "✅ Sealing Pioneer Slot: $iid"
        sed -i "/\"mappings\": \[/a \    {\n      \"iid\": \"$iid\",\n      \"alias\": \"Pioneer-$i\",\n      \"role\": \"Citizen-Pioneer\",\n      \"status\": \"SSOT_ACTIVE\"\n    }," "$REGISTRY"
    fi
done

# Merapikan JSON
sed -i 's/}, \]/} \]/g' "$REGISTRY"
echo "Done. All 36 slots are now officially part of the SSOT."
