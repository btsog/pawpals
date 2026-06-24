import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";

// Top navigation bar. It's a Server Component so it can check whether the
// user is logged in and show the right links.
export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-brand">
          🐾 Pawpals
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/caretakers" className="text-gray-700 hover:text-brand">
            Find a caretaker
          </Link>

          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-brand">
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-brand">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-brand px-3 py-1.5 font-medium text-white hover:bg-brand-dark"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
