#!/bin/bash
# Menghasilkan sidik jari digital untuk seluruh database setiap kali dijalankan
DATE=$(date +%Y-%m-%d)
HASH=$(sha256sum BINDING_REGISTRY.json GENESIS_LEDGER.md | sha256sum | awk '{print $1}')
echo "[$DATE] ANCHOR_HASH: $HASH" >> master_anchor.log
echo "✅ Hash Anchor Created: $HASH"
