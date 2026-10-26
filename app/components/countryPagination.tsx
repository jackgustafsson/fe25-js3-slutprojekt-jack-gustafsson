"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Country } from "../types/countryTypes";
import CountryFilter from "./countryFilter";
import CountrySort from "./countrySort";
import CountrySearch from "./countrySearch";
import type { Region } from "./countryFilter";
import type { SortBy, SortDirection } from "./countrySort";
import Link from "next/link";

function CountryPagination({ countries }: { countries: Country[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
    const selectedRegion = (searchParams.get("region") as Region) || "All";
    const sortBy = (searchParams.get("sortBy") as SortBy) || "name";
    const sortDirection = (searchParams.get("sortDirection") as SortDirection) || "asc";
    const searchTerm = searchParams.get("query") || "";

    const countriesPerPage = 24;

    function updateParams(
        changes: Record<string, string>,
        method: "push" | "replace" = "push"
    ) {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(changes).forEach(([key, value]) => {
            if (value === "" || value === "All") {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });

        const queryString = params.toString();
        const url = queryString ? `${pathname}?${queryString}` : pathname;

        if (method === "replace") {
            router.replace(url, { scroll: false });
        } else {
            router.push(url, { scroll: false });
        }
    }

    const filteredCountries = countries.filter((country) => {
        const matchesRegion = selectedRegion === "All" || (country.region === "Americas" ? "America" : country.region) === selectedRegion;
        const matchesSearch = country.names.common.toLowerCase().includes(searchTerm.trim().toLowerCase());

        return matchesRegion && matchesSearch;
    });

    const sortedCountries = [...filteredCountries].sort((a, b) => {
        let comparison = 0;

        if (sortBy === "name") {
            comparison = a.names.common.localeCompare(b.names.common);
        } else if (sortBy === "population") {
            comparison = (a.population ?? 0) - (b.population ?? 0);
        } else if (sortBy === "area") {
            comparison = (a.area.kilometers ?? 0) - (b.area.kilometers ?? 0);
        }

        return sortDirection === "asc" ? comparison : -comparison;
    });

    const totalPages = Math.ceil(sortedCountries.length / countriesPerPage);
    const startIndex = (currentPage - 1) * countriesPerPage;
    const currentCountries = sortedCountries.slice(startIndex, startIndex + countriesPerPage);

    return (
        <>
            <CountrySearch searchTerm={searchTerm}
                onSearchChange={(value) => {
                    updateParams(
                        { query: value, page: "1" },
                        "replace"
                    );
                }}
            />

            <CountryFilter selectedRegion={selectedRegion}
                onRegionChange={(region) => {
                    updateParams({
                        region,
                        page: "1",
                    });
                }}
            />
            <CountrySort sortBy={sortBy} sortDirection={sortDirection}
                onSortByChange={(value) => {
                    updateParams({
                        sortBy: value,
                        page: "1",
                    });
                }}
                onSortDirectionChange={(value) => {
                    updateParams({
                        sortDirection: value,
                        sortBy,
                        page: "1",
                    });
                }}
            />

            {currentCountries.length > 0 ? (
                <ol className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentCountries.map((country) => (
                        <li key={country.codes.alpha_3 || country.names.common} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                            <section className="flex h-40 items-center justify-center bg-gray-100 p-4">
                                {country.flag.url_svg ? (
                                    <img src={country.flag.url_svg} alt={`Flaggan för ${country.names.common}`} className="max-h-full max-w-full object-contain" />
                                ) : (
                                    <p>Ingen flagga tillgänglig</p>
                                )}
                            </section>
                            <section className="space-y-3 p-5">
                                <h2 className="border-b border-gray-200 pb-2 text-xl font-bold text-gray-800">{country.names.common}</h2>
                                <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Region:</span>{" "} {country.region || "Okänd"}</p>
                                <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Huvudstad:</span>{" "}  {country.capitals?.[0]?.name || "Okänd"}</p>
                                <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Befolkning:</span>{" "} {country.population != null ? country.population.toLocaleString("sv-SE") : "Okänd"}</p>
                                <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Yta:</span>{" "}  {country.area.kilometers != null ? country.area.kilometers.toLocaleString("sv-SE") : "Okänd"}</p>
                                <Link href={`/detailPage/${country.codes.alpha_3}`} className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Mer info</Link>
                            </section>
                        </li>
                    ))}
                </ol>
            ) : (
                <p className="px-6 py-10 text-center text-gray-700">Inga länder matchar dina kriterier.</p>
            )}


            {totalPages > 0 && (
                <nav className="flex flex-wrap items-center justify-center gap-4 px-6 pb-8">
                    <button onClick={() => updateParams({ page: String(currentPage - 1) })} disabled={currentPage <= 1} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600">Föregående</button>

                    <p className="text-sm font-medium text-gray-700">Sida {currentPage} av {totalPages}</p>

                    <button onClick={() => updateParams({ page: String(currentPage + 1) })} disabled={currentPage >= totalPages} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600">Nästa</button>
                </nav>
            )}
        </>
    );
}

export default CountryPagination;