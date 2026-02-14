/**
 * 🛡️ AURALANG API ENFORCER v1.0
 * Logic: Founder Lock Enforcement & Stable Coin Minting Rules
 */

const GUARD_CONFIG = {
    founderIID: "IID-2026-0000001",
    unlockDate: new Date("2029-02-14"),
    individualAnchor: 100000 // €100.000
};

function validateTransaction(senderIID, actionType, amount) {
    const now = new Date();

    // 1. Validasi Lock Founder (LUV)
    if (senderIID === GUARD_CONFIG.founderIID) {
        if (now < GUARD_CONFIG.unlockDate) {
            return {
                status: "REJECTED",
                reason: "FOUNDER_ASSETS_LOCKED_UNTIL_2029",
                protocol: "AURALANG_GUARD_STRICT"
            };
        }
    }

    // 2. Validasi Pencetakan Stable Coin (IND-EUR)
    if (actionType === "MINT_STABLE") {
        if (amount > GUARD_CONFIG.individualAnchor) {
            return {
                status: "REJECTED",
                reason: "EXCEEDS_INDIVIDUAL_BASIC_LIVING_VALUE_ANCHOR"
            };
        }
    }

    return { 
        status: "APPROVED", 
        message: "PROTOCOL_VERIFIED",
        timestamp: now.toISOString()
    };
}

// Simulasi Internal
console.log("🛡️ GUARD CHECK: Founder Transfer...");
console.log(validateTransaction("IID-2026-0000001", "SEND_LUV", 1000));

console.log("\n🛡️ GUARD CHECK: Minting IND-EUR...");
console.log(validateTransaction("SYSTEM", "MINT_STABLE", 5000));

