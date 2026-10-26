import Link from "next/link";

export default function NotFound() {
    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center p-6 text-center">
            <h1 className="mb-4 text-5xl font-bold text-gray-900">404</h1>

            <h2 className="mb-3 text-2xl font-semibold text-gray-800">Sidan hittades inte</h2>

            <p className="mb-6 text-gray-600">Landet du söker finns inte eller så har adressen blivit fel.</p>

            <Link href="/" className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700">Tillbaka till startsidan</Link>
        </section>
    );
}