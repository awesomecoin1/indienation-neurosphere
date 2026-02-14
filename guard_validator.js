const fs = require('fs');

function validateTransaction(senderIID, amount) {
    const UNLOCK_DATE_FOUNDER = new Date('2029-02-14');
    const now = new Date();

    if (senderIID === 'IID-2026-0000001' && now < UNLOCK_DATE_FOUNDER) {
        console.error("❌ ERROR: FOUNDER_LOCKED_3_YEARS");
        return false;
    }
    
    if (amount > 100000000000000) { // 100T Limit
        console.error("❌ ERROR: SUPPLY_CAP_BREACH");
        return false;
    }

    console.log("✅ TRANSACTION_VALIDATED_BY_GUARD");
    return true;
}

// Simulasi Cek
validateTransaction('IID-2026-0000001', 1000);
