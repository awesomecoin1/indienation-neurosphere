#!/bin/bash
REGISTRY="BINDING_REGISTRY.json"

# Reset Mappings ke awal untuk memastikan kebersihan data
echo '{ "mappings": [] }' > $REGISTRY

# 1. BINDING 10 VAULT INTI
vaults=(
  "IID-2026-0000001|INDIE-Founder|Founder-Core|LOCKED_3Y"
  "IID-2026-0000002|LUV Adoption Pool|Ecosystem-Vault|OPEN"
  "IID-2026-0000003|Reserve Fund|Ecosystem-Vault|OPEN"
  "IID-2026-0000004|Daily Operational|Ecosystem-Vault|OPEN"
  "IID-2026-0000005|Disaster Donation|Ecosystem-Vault|OPEN"
  "IID-2026-0000006|Staking Rewards|Ecosystem-Vault|LOCKED_2Y"
  "IID-2026-0000007|Sovereign Wealth|Ecosystem-Vault|LOCKED_2Y"
  "IID-2026-0000008|Team Dev Donation|Ecosystem-Vault|OPEN"
  "IID-2026-0000009|Stable Coin Anchor|Ecosystem-Vault|OPEN"
  "IID-2026-0000010|AI Guard Governance|AI-Control|LOCKED_3Y"
)

# 2. BINDING 36 PIONEER (IID 11 - 46)
# Format: "Alias|LegacyID"
pioneer_data=(
  "Purwantoro|NS-USER-7438-X"
  "Pioneer-02|IDNS-002"
  "Pioneer-03|IDNS-003"
  # Loop ini akan mengenerate sisa pioneer sampai 36 secara otomatis sebagai placeholder
)

echo "Writing to $REGISTRY..."

# Fungsi Helper untuk inject JSON
inject_json() {
    local iid=$1 alias=$2 role=$3 status=$4
    sed -i "/\"mappings\": \[/a \    {\n      \"iid\": \"$iid\",\n      \"alias\": \"$alias\",\n      \"role\": \"$role\",\n      \"status\": \"$status\"\n    }," "$REGISTRY"
}

# Initial JSON structure
echo '{ "mappings": [] }' > $REGISTRY

for vault in "${vaults[@]}"; do
    IFS='|' read -r iid alias role status <<< "$vault"
    inject_json "$iid" "$alias" "$role" "$status"
done

for i in {0..35}; do
    slot_num=$((i + 11))
    iid=$(printf "IID-2026-%07d" $slot_num)
    
    if [ $i -lt ${#pioneer_data[@]} ]; then
        IFS='|' read -r alias legacy <<< "${pioneer_data[$i]}"
    else
        alias="Pioneer-$(printf "%02d" $((i+1)))"
        legacy="IDNS-$(printf "%03d" $((i+1)))"
    fi
    inject_json "$iid" "$alias" "Citizen-Pioneer" "SSOT_ACTIVE"
done

# Cleanup trailing commas
sed -i 's/}, \]/} \]/g' "$REGISTRY"
echo "✅ $REGISTRY is now 100% complete."
