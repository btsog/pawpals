import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// STARTER PAGE — browse caretakers.
// This shows the basic pattern for reading data from Supabase on the server.
// Build on top of it: add filtering by service, city search, ratings, etc.
export default async function CaretakersPage() {
  const supabase = createClient();

  // Read caretakers: profiles with role = 'caretaker', joined with their
  // caretaker_profiles details. Adjust the select as you add features.
  const { data: caretakers, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      city,
      caretaker_profiles!inner ( headline, bio, rating_average, rating_count, is_active )
    `
    )
    .eq("role", "caretaker");

  return (
    <div>
      <h1 className="text-2xl font-bold">Find a caretaker</h1>
      <p className="mt-1 text-gray-600">
        Browse caretakers near you. (This is a starter page — add search and
        filters here.)
      </p>

      {error && (
        <p className="mt-4 text-sm text-red-600">
          Couldn&apos;t load caretakers: {error.message}
        </p>
      )}

      {(!caretakers || caretakers.length === 0) && !error && (
        <p className="mt-6 text-gray-500">
          No caretakers yet. Sign up as a caretaker to be the first!
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {caretakers?.map((c) => (
          <Link
            key={c.id}
            href={`/caretakers/${c.id}`}
            className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-brand hover:shadow-md"
          >
            <h3 className="font-semibold">{c.full_name || "Caretaker"}</h3>
            <p className="text-sm text-gray-500">{c.city}</p>
            <p className="mt-2 text-sm text-gray-700">
              {c.caretaker_profiles?.headline}
            </p>
            <p className="mt-2 text-sm text-amber-600">
              ⭐ {c.caretaker_profiles?.rating_average} (
              {c.caretaker_profiles?.rating_count})
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
