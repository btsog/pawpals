import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

// STARTER PAGE — a single caretaker's public profile.
// Extend this with: list of services + prices, reviews, and a "Book" button
// that creates a row in the "bookings" table.
export default async function CaretakerProfilePage({ params }) {
  const supabase = createClient();

  const { data: caretaker } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      city,
      caretaker_profiles!inner ( headline, bio, years_experience, rating_average, rating_count )
    `
    )
    .eq("id", params.id)
    .eq("role", "caretaker")
    .single();

  if (!caretaker) {
    notFound();
  }

  const cp = caretaker.caretaker_profiles;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold">{caretaker.full_name}</h1>
      <p className="text-gray-500">{caretaker.city}</p>
      <p className="mt-1 text-amber-600">
        ⭐ {cp?.rating_average} ({cp?.rating_count} reviews)
      </p>

      <p className="mt-4 font-medium">{cp?.headline}</p>
      <p className="mt-2 text-gray-700">{cp?.bio}</p>
      <p className="mt-2 text-sm text-gray-500">
        {cp?.years_experience} years of experience
      </p>

      {/* TODO (build this yourself):
          - Show this caretaker's services + prices from "caretaker_services"
          - Add a booking form that inserts into "bookings" */}
      <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
        Booking form goes here — you&apos;ll build this part. 🛠️
      </div>
    </div>
  );
}
