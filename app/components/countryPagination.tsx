"use client";

import { useState } from "react";
import { Country } from "../types/countryTypes";
import CountryFilter from "./countryFilter";
import CountrySort from "./countrySort";
import type { Region } from "./countryFilter";
import type { SortBy, SortDirection } from "./countrySort";
import Link from "next/link";

function CountryPagination({ countries }: { countries: Country[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRegion, setSelectedRegion] = useState<Region>("All");
    const [sortBy, setSortBy] = useState<SortBy>("name");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    const countriesPerPage = 24;

    const filteredCountries = countries.filter((country) => {
        if (selectedRegion === "All") {
            return true;
        }

        const region = country.region === "Americas" ? "America" : country.region;

        return region === selectedRegion;
    });

    const sortedCountries = [...filteredCountries].sort((a, b) => {
        let comparison = 0;

        if (sortBy === "name") {
            comparison = a.name.localeCompare(b.name);
        } else if (sortBy === "population") {
            comparison = (a.population ?? 0) - (b.population ?? 0);
        } else if (sortBy === "area") {
            comparison = (a.area ?? 0) - (b.area ?? 0);
        }

        return sortDirection === "asc" ? comparison : -comparison;
    });

    const totalPages = Math.ceil(sortedCountries.length / countriesPerPage);
    const startIndex = (currentPage - 1) * countriesPerPage;
    const currentCountries = sortedCountries.slice(startIndex, startIndex + countriesPerPage);

    return (
        <>
            <CountryFilter selectedRegion={selectedRegion} onRegionChange={(region) => {
                setSelectedRegion(region);
                setCurrentPage(1);
            }}
            />
            <CountrySort sortBy={sortBy} sortDirection={sortDirection} onSortByChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
            }}
                onSortDirectionChange={(value) => {
                    setSortDirection(value);
                    setCurrentPage(1);
                }}
            />
            <ol className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
                {currentCountries.map((country) => (
                    <li key={country.alpha3Code} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                        <section className="flex h-40 items-center justify-center bg-gray-100 p-4">
                            <img src={country.flags.svg} alt={`Flaggan för ${country.name}`} className="max-h-full max-w-full object-contain" />
                        </section>
                        <section className="space-y-3 p-5">
                            <h2 className="border-b border-gray-200 pb-2 text-xl font-bold text-gray-800">{country.name}</h2>
                            <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Region:</span>{" "} {country.region || "Okänd"}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Huvudstad:</span>{" "}  {country.capital || "Okänd"}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Befolkning:</span>{" "} {country.population != null ? country.population.toLocaleString("sv-SE") : "Okänd"}</p>
                            <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Yta:</span>{" "}  {country.area != null ? country.area.toLocaleString("sv-SE") : "Okänd"}</p>
                            <Link href={`/detailPage/${country.alpha3Code}`} className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Mer info</Link>
                        </section>
                    </li>
                ))}
            </ol>

            {totalPages > 0 && (
                <nav className="flex flex-wrap items-center justify-center gap-4 px-6 pb-8">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600">Föregående</button>

                    <p className="text-sm font-medium text-gray-700">Sida {currentPage} av {totalPages}</p>

                    <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600">Nästa</button>
                </nav>
            )}
        </>
    );
}

export default CountryPagination;
