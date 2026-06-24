// Supabase client for use on the SERVER (Server Components, Route Handlers).
// It reads the logged-in user from cookies so pages can be personalized
// and protected. Import this in files that do NOT have "use client".

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseConfigured } from "./config";
import { createMockClient } from "./mockClient";

export function createClient() {
  // Preview mode: no Supabase keys yet -> use the fake client so the app runs.
  if (!isSupabaseConfigured) {
    return createMockClient();
  }

  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component where cookies can't be set.
            // Safe to ignore — middleware refreshes the session instead.
          }
        },
      },
    }
  );
}
