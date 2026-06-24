import Link from "next/link";

// A single service tile shown on the homepage.
export default function ServiceCard({ service }) {
  return (
    <Link
      href={`/caretakers?service=${service.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 transition hover:border-brand hover:shadow-md"
    >
      <div className="text-3xl">{service.emoji}</div>
      <h3 className="mt-3 font-semibold text-gray-900">{service.name}</h3>
      <p className="mt-1 text-sm text-gray-600">{service.description}</p>
    </Link>
  );
}
