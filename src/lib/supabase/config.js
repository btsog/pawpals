// Tells the rest of the app whether a real Supabase connection is set up.
//
// It returns true ONLY when both keys exist in .env.local AND they aren't the
// placeholder values from .env.local.example. Until then, the app runs in a
// "preview mode" using a fake (mock) client so you can see the site without a
// database. Add your real keys to .env.local and this flips on automatically.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  !!url &&
  !!key &&
  url.startsWith("http") &&
  !url.includes("your-project-id") &&
  key !== "your-anon-key-here";
