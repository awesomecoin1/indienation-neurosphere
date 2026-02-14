/**
 * 🛡️ AURALANG API ENFORCER v1.0
 * Tujuan: Mengunci transaksi Founder & Mengatur Suplai Stable Coin
 */

const GUARD_CONFIG = {
    founderIID: "IID-2026-0000001",
    unlockDate: new Date("2029-02-14"),
    stableAnchor: 100000 // €100.000
};

function validateAction(senderIID, actionType, amount) {
    const now = new Date();

    // 1. Validasi Lock Founder (LUV)
    if (senderIID === GUARD_CONFIG.founderIID && actionType === "SEND_LUV") {
        if (now < GUARD_CONFIG.unlockDate) {
            return {
                status: "REJECTED",
                reason: "FOUNDER_ASSETS_LOCKED_UNTIL_2029"
            };
        }
    }

    // 2. Validasi Distribusi Stable Coin (IND-EUR)
    if (actionType === "MINT_STABLE") {
        if (amount > GUARD_CONFIG.stableAnchor) {
            return {
                status: "REJECTED",
                reason: "EXCEEDS_INDIVIDUAL_ANCHOR_LIMIT"
            };
        }
    }

    return { status: "APPROVED", message: "ACTION_VALIDATED_BY_AI_GUARD" };
}

// Contoh Testing Logis
console.log("--- Test Founder Send LUV ---");
console.log(validateAction("IID-2026-0000001", "SEND_LUV", 1000000));

console.log("\n--- Test Minting Stable Coin ---");
console.log(validateAction("SYSTEM", "MINT_STABLE", 5000)); // Masih dalam batas
