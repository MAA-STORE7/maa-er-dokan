// ================= SUPABASE CLIENT INITIALIZATION =================
// Vercel Environment variables or Direct Keys Fallback
const SUPABASE_URL = window.ENV_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = window.ENV_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: Get or Create Customer ID (Auto Handles Duplicate Customer Names)
async function getOrCreateCustomer(name) {
  const cleanName = name.trim();
  
  // 1. Existing Customer Check
  let { data: existing } = await supabaseClient
    .from('customers')
    .select('id, name')
    .ilike('name', cleanName)
    .maybeSingle();

  if (existing) {
    return existing.id;
  }

  // 2. Insert New Customer
  let { data: newCust, error } = await supabaseClient
    .from('customers')
    .insert([{ name: cleanName }])
    .select('id')
    .single();

  if (error) throw error;
  return newCust.id;
}
