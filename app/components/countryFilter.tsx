"use client";

export type Region = "All" | "Africa" | "America" | "Asia" | "Europe" | "Oceania";

type CountryFilterProps = {
    selectedRegion: Region;
    onRegionChange: (region: Region) => void;
};

const regions: Region[] = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

function CountryFilter({ selectedRegion, onRegionChange }: CountryFilterProps) {
    return (
        <section aria-label="Filtrera länder efter region" className="px-6 pt-6">
            <section className="flex flex-wrap justify-center gap-2">
                {regions.map((region) => {
                    const isSelected = selectedRegion === region;

                    return (
                        <button key={region} type="button" aria-pressed={isSelected} onClick={() => onRegionChange(region)}
                            className={`rounded-lg border px-4 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSelected
                                ? "border-blue-700 bg-blue-700 text-white"
                                : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                                }`}
                        >
                            {region}
                        </button>
                    );
                })}
            </section>
        </section>
    );
}

export default CountryFilter;