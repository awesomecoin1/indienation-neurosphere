import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('URL_SUPABASE_ABANG', 'KEY_ANON_ABANG')

export async function syncToCloud(iid, balance) {
    const { data, error } = await supabase
        .from('wallets')
        .upsert({ iid: iid, stable_balance: balance, last_sync: new Date() })
    
    if (error) console.error("AI Guard Sync Error:", error)
    else console.log("Ledger Synced Successfully");
}
