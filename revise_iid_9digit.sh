#!/bin/bash
# Mengubah format IID-2026-0000001 menjadi IID-2026-000000001
sed -i 's/IID-2026-\([0-9]\{7\}\)/IID-2026-00\1/g' BINDING_REGISTRY.json
sed -i 's/IID-2026-\([0-9]\{7\}\)/IID-2026-00\1/g' GENESIS_LEDGER.md
echo "✅ Revisi format 9 digit selesai di registry lokal."
