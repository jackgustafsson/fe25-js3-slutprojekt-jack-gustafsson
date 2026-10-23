"use client";

export default function Error({ error, reset }: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-xl p-6 text-center">
      <h1 className="mb-4 text-2xl font-bold text-red-700">Något gick fel</h1>
      <p className="mb-6 text-gray-700">{error.message || "Det gick inte att hämta informationen."}</p>

      <button onClick={() => reset()} className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700">Försök igen</button>
    </section>
  );
}
