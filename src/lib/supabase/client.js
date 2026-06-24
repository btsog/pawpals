// Supabase client for use in BROWSER components ("use client" files).
// Import this when you need to read/write data from a component the user
// interacts with (forms, buttons, etc.).

import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "./config";
import { createMockClient } from "./mockClient";

export function createClient() {
  // Preview mode: no Supabase keys yet -> use the fake client so the app runs.
  if (!isSupabaseConfigured) {
    return createMockClient();
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
