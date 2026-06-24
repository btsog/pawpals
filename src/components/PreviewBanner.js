import { isSupabaseConfigured } from "@/lib/supabase/config";

// Shows a small notice at the top while the app runs without a database.
// It disappears automatically once you add your Supabase keys to .env.local.
export default function PreviewBanner() {
  if (isSupabaseConfigured) {
    return null;
  }

  return (
    <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-800">
      🐾 <strong>Preview mode</strong> — Supabase isn&apos;t connected yet, so
      accounts and data are disabled. Add your keys to <code>.env.local</code> to
      go live.
    </div>
  );
}
