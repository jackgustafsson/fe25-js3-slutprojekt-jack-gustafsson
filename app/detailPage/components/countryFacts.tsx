import { DetailedCountry } from "@/app/types/countryTypes";
import Link from "next/link";

function CountryFacts({ country }: { country: DetailedCountry }) {
    return (
        <section className="overflow-hidden rounded-2xl bg-white shadow-lg lg:flex">
            <section className="flex items-center justify-center bg-gray-100 p-6 sm:p-8 lg:w-1/2">
                <img src={country.flag.url_svg} alt={`Flaggan för ${country.names.common}`} className="max-h-80 w-full object-contain" />
            </section>

            <section className="space-y-5 p-5 sm:p-8 lg:w-1/2">
                <h2 className="border-b border-gray-200 pb-4 text-xl sm:text-2xl font-bold text-gray-900">{country.names.common} ({country.names.official})</h2>

                <section className="space-y-3 text-gray-600">
                    <p><span className="font-semibold text-gray-900">Region:</span>{" "}{country.region}</p>
                    <p><span className="font-semibold text-gray-900">Subregion:</span>{" "}{country.subregion}</p>
                    <p><span className="font-semibold text-gray-900">Huvudstad:</span>{" "}{country.capitals?.[0]?.name ?? "Okänd"}</p>
                    <p><span className="font-semibold text-gray-900">Befolkning:</span>{" "}{country.population.toLocaleString("sv-SE")}</p>
                    <p><span className="font-semibold text-gray-900">Språk:</span>{" "}{country.languages[0]?.name ?? "Okänt"}</p>
                    <p><span className="font-semibold text-gray-900">Valuta:</span>{" "}{country.currencies[0]?.name ?? "Okänd"}</p>
                </section>

                <Link href="../" className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Tillbaka</Link>
            </section>
        </section>

    );
}

export default CountryFacts;