import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// STARTER PAGE — the logged-in user's dashboard.
// It's PROTECTED: if you're not logged in, it sends you to /login.
// Build on top of it: show the user's bookings, pets, and (for caretakers)
// incoming booking requests and service/price management.
export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Load this user's profile (created automatically when they signed up).
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, city")
    .eq("id", user.id)
    .single();

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}! 👋
      </h1>
      <p className="mt-1 text-gray-600">
        You are signed in as a{" "}
        <span className="font-medium">{profile?.role}</span>.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* These are placeholders — build the real content for each. */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold">Your bookings</h2>
          <p className="mt-2 text-sm text-gray-500">
            Read from the &quot;bookings&quot; table and list them here.
          </p>
        </div>

        {profile?.role === "owner" ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="font-semibold">Your pets</h2>
            <p className="mt-2 text-sm text-gray-500">
              Add a form to create rows in the &quot;pets&quot; table.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="font-semibold">Your services &amp; prices</h2>
            <p className="mt-2 text-sm text-gray-500">
              Manage rows in &quot;caretaker_services&quot; here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
