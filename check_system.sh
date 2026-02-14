#!/bin/bash
echo "╔═══════════════════════════════════════════════════════╗"
echo "║  🏛️ NEUROSPHERE SOVEREIGN SYSTEM - HEALTH CHECK     ║"
echo "╚═══════════════════════════════════════════════════════╝"

# Check Shards
TOTAL_IID=$(grep -c "IID-2026-" public_registry_shard_*.json | awk -F: '{s+=$2} END {print s}')
echo "📊 REGISTRY: $TOTAL_IID / 100.000 IIDs"

# Check Vaults
VAULT_COUNT=$(grep -c "Ecosystem-Vault" BINDING_REGISTRY.json)
echo "🏦 VAULTS: $VAULT_COUNT / 10 Active"

# Check Pioneers
PIONEER_COUNT=$(grep -c "Citizen-Pioneer" BINDING_REGISTRY.json)
echo "👥 PIONEERS: $PIONEER_COUNT / 36 Bound"

# Check Files
[ -f "CONSTITUTION.md" ] && echo "📜 CONSTITUTION: ✅ LOADED"
[ -f "master_anchor.log" ] && echo "⚓ HASH ANCHOR: ✅ ANCHORED"

echo "---------------------------------------------------------"
if [ $TOTAL_IID -eq 100000 ] && [ $PIONEER_COUNT -ge 36 ]; then
    echo "🚀 STATUS: 100% PERFECT & SOVEREIGN-GRADE"
else
    echo "⚠️ STATUS: NEEDS ATTENTION"
fi
