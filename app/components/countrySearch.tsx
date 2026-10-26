"use client";

type CountrySearchProps = {
    searchTerm: string;
    onSearchChange: (value: string) => void;
};

function CountrySearch({ searchTerm, onSearchChange }: CountrySearchProps) {
    return (
        <section className="mx-auto flex w-full max-w-md flex-col px-6 pt-6">
            <label htmlFor="countrySearch" className="mb-2 text-left font-semibold text-gray-800">Sök efter land</label>

            <input
                id="countrySearch"
                type="search"
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Skriv ett landsnamn, t.ex. Finland"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:max-w-md"
            />
        </section>
    );
}

export default CountrySearch;