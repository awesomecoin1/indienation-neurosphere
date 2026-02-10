import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
  global: {
    fetch: (...args) => fetch(...args).catch(err => {
      console.error("⚠️ Koneksi gagal. Pastikan Internet Aktif.");
      throw err;
    })
  }
});
