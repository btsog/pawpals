// A fake "Supabase" client used in PREVIEW MODE (when no database is connected).
//
// It mimics just enough of the real Supabase API so pages render without errors:
//   - there's no logged-in user
//   - database reads return empty lists
//   - sign up / log in show a friendly "connect Supabase first" message
//
// You never import this directly — client.js and server.js use it automatically
// when isSupabaseConfigured is false.

const NOT_CONNECTED = {
  message:
    "Pawpals is in preview mode. Add your Supabase keys to .env.local to enable accounts and data.",
};

// A chainable query builder where every method returns itself, and awaiting it
// resolves to an empty result. This lets calls like
//   supabase.from("x").select("*").eq("a", 1)
// work without a real database.
function makeQuery() {
  const result = { data: [], error: null };

  const builder = {
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    upsert: () => builder,
    eq: () => builder,
    neq: () => builder,
    order: () => builder,
    limit: () => builder,
    range: () => builder,
    single: () => Promise.resolve({ data: null, error: null }),
    maybeSingle: () => Promise.resolve({ data: null, error: null }),
    // Makes `await builder` resolve to the empty result.
    then: (resolve) => resolve(result),
  };

  return builder;
}

export function createMockClient() {
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: NOT_CONNECTED }),
      signUp: async () => ({ data: { user: null, session: null }, error: NOT_CONNECTED }),
      signOut: async () => ({ error: null }),
    },
    from: () => makeQuery(),
  };
}
