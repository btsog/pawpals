// The 5 services Pawpals offers. These match the rows seeded in
// supabase/schema.sql (same "slug" values). Used to render the homepage
// and service cards without needing a database call.

export const SERVICES = [
  {
    slug: "drop-in-visit",
    name: "Drop-In Visits",
    emoji: "🏠",
    description: "A short visit to feed, play with, and check on your pet at home.",
  },
  {
    slug: "dog-walking",
    name: "Dog Walking",
    emoji: "🦮",
    description: "A walk around the neighborhood to keep your dog happy and active.",
  },
  {
    slug: "overnight-sitting",
    name: "Overnight Pet Sitting",
    emoji: "🌙",
    description: "A caretaker stays overnight to look after your pet in your home.",
  },
  {
    slug: "pet-taxi",
    name: "Pet Taxi",
    emoji: "🚗",
    description: "Transport for your pet to the vet, groomer, or anywhere they need to go.",
  },
  {
    slug: "basic-grooming",
    name: "Basic Grooming",
    emoji: "🛁",
    description: "Bathing, brushing, and basic tidy-ups to keep your pet clean.",
  },
];
