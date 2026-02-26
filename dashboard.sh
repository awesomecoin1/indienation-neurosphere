#!/bin/bash
# NEUROSPHERE OPERATIONAL DASHBOARD - FIXED
# Managed by INDIE-Founder & AI Guard

clear
echo "=============================================================="
echo "          NEUROSPHERE ECONOMIC SOVEREIGNTY DASHBOARD          "
echo "=============================================================="
echo " Date: $(date)          Founder: INDIE-Founder "
echo "--------------------------------------------------------------"

# 1. Status Aset & TM Gas Tank
echo "[ ASSET STATUS ]"
echo " ENPE Reserve   : 100 Trillion (Locked)"
echo " Ops Allocation : 10% (Active)"
echo " TM Gas Tank    : [||||||||||] 100% (Powered by ENPE/TM)"
echo " Otoritas Valuasi   : 27,000 ENPE <=> 0.5 BNB"
echo "--------------------------------------------------------------"

# 2. Status NeuroBridge (Cross-Chain)
echo "[ NEUROBRIDGE MONITOR ]"
if [ -f "./bridge-status.sh" ]; then
    BNB_BAL=$(./bridge-status.sh | grep "Available for Ops" | head -1 | awk '{print $4}')
    echo " BNB Chain Balance : $BNB_BAL BNB"
    echo " Ethereum Balance  : 0.00 ETH (Syncing...)"
else
    echo " Status: bridge-status.sh not found."
fi
echo "--------------------------------------------------------------"

# 3. Audit Trail
echo "[ RECENT AUDIT LOGS ]"
if [ -f "ops-transaction.log" ]; then
    tail -n 5 ops-transaction.log
else
    echo " No transaction logs found."
fi
echo "--------------------------------------------------------------"

# 4. Physical Assets Summary
echo "[ PHYSICAL ASSETS ]"
if [ -f "./inventory-check.sh" ]; then
    ./inventory-check.sh | grep "Total Physical Assets"
else
    echo " Inventory script not found."
fi
echo "=============================================================="
