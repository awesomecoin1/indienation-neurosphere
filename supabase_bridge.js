import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://wfnywtgctkbatnngkvmr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indmbnl3dGdjdGtiYXRubmdrdm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MjE0MjcsImV4cCI6MjA4NTI5NzQyN30.ghQ1bveGBVzapZMdYvZoGnd3isOsGHLLcR3PsMJSVZI')

export async function syncToCloud(iid, balance) {
    const { data, error } = await supabase
        .from('wallets')
        .upsert({ iid: iid, stable_balance: balance, last_sync: new Date() })
    
    if (error) console.error("AI Guard Sync Error:", error)
    else console.log("Ledger Synced Successfully");
}
