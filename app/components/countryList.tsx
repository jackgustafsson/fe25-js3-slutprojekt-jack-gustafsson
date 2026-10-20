import { Country } from "../types/countryTypes";
import Link from "next/link";

async function CountryList(){

    const res = await fetch("https://countries.dev/countries?fields=name,alpha3Code,region,capital,flags");

    if(!res.ok){
        throw new Error("Kunde inte hämta länder");
    }

    const countries:Country[] = await res.json();

    return (
        <ol className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
                <li key={country.alpha3Code} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex h-40 items-center justify-center bg-gray-100 p-4">
                        <img src={country.flags.svg} alt={`Flaggan för ${country.name}`} className="max-h-full max-w-full object-contain"/>  
                    </div>
                    <div className="space-y-3 p-5">
                        <h2 className="border-b border-gray-200 pb-2 text-xl font-bold text-gray-800">{country.name}</h2>
                        <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Region:</span>{" "} {country.region || "Okänd"}</p>
                        <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Huvudstad:</span>{" "}  {country.capital || "Okänd"}</p>
                        <Link href={`/detailPage/${country.alpha3Code}`} className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Mer info</Link>  
                    </div>
                </li>
            ))}
        </ol>
    )
}

export default CountryList
