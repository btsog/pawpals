import Link from "next/link";
import { SERVICES } from "@/lib/services";
import ServiceCard from "@/components/ServiceCard";

// Homepage.
export default function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <section className="rounded-2xl bg-brand-light px-6 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Trusted caretakers for the pets you love 🐾
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-gray-700">
          Pawpals connects you with caring local pet sitters, dog walkers, and
          groomers — so your furry friend is always in good hands.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/caretakers"
            className="rounded-md bg-brand px-5 py-2.5 font-medium text-white hover:bg-brand-dark"
          >
            Find a caretaker
          </Link>
          <Link
            href="/signup"
            className="rounded-md border border-brand px-5 py-2.5 font-medium text-brand hover:bg-white"
          >
            Become a caretaker
          </Link>
        </div>
      </section>

      {/* Services grid */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-900">Our services</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
