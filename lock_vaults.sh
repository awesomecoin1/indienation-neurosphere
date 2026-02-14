#!/bin/bash
REGISTRY="BINDING_REGISTRY.json"

# Data 10 Wallet Utama
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

for vault in "${vaults[@]}"; do
    IFS='|' read -r iid alias role status <<< "$vault"
    if ! grep -q "$iid" "$REGISTRY"; then
        echo "✅ Locking Vault $iid ($alias)"
        sed -i "/\"mappings\": \[/a \    {\n      \"iid\": \"$iid\",\n      \"alias\": \"$alias\",\n      \"role\": \"$role\",\n      \"status\": \"$status\"\n    }," "$REGISTRY"
    fi
done
