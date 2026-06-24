import "./globals.css";
import Navbar from "@/components/Navbar";
import PreviewBanner from "@/components/PreviewBanner";

export const metadata = {
  title: "Pawpals — Find trusted caretakers for your pets",
  description:
    "Drop-in visits, dog walking, overnight pet sitting, pet taxi, and basic grooming.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <PreviewBanner />
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mt-16 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
          🐾 Pawpals — built with care for pets and their people.
        </footer>
      </body>
    </html>
  );
}
