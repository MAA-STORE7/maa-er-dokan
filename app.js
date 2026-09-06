// ================= SUPABASE CLIENT INITIALIZATION =================
// Vercel Environment variables or Direct Keys Fallback
const SUPABASE_URL = window.ENV_SUPABASE_URL || 'https://uihuyajthjhynhlclnah.supabase.co';
const SUPABASE_ANON_KEY = window.ENV_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpaHV5YWp0aGpoeW5obGNsbmFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MTQwNzEsImV4cCI6MjEwNDI5MDA3MX0.oku8fxQrjqnayQvPoeF1BetwHtEtz-A_VMUQuLDFp2g';

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
