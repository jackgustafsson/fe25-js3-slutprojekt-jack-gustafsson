"use client";

export type SortBy = "name" | "population" | "area";
export type SortDirection = "asc" | "desc";

type CountrySortProps = {
    sortBy: SortBy;
    sortDirection: SortDirection;
    onSortByChange: (value: SortBy) => void;
    onSortDirectionChange: (value: SortDirection) => void;
};

function CountrySort({ sortBy, sortDirection, onSortByChange, onSortDirectionChange }: CountrySortProps) {
    return (
        <section aria-label="Sortera länder" className="flex flex-wrap items-center justify-center gap-3 px-6 pt-6">
            <label htmlFor="sortBy" className="font-semibold">Sortera efter:</label>

            <select id="sortBy" value={sortBy}
                onChange={(event) =>
                    onSortByChange(event.target.value as SortBy)
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-2"
            >
                <option value="name">Namn</option>
                <option value="population">Befolkning</option>
                <option value="area">Yta</option>
            </select>

            <label htmlFor="sortDirection" className="font-semibold">Ordning:</label>

            <select id="sortDirection" value={sortDirection}
                onChange={(event) =>
                    onSortDirectionChange(
                        event.target.value as SortDirection
                    )
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-2"
            >
                <option value="asc">Stigande</option>
                <option value="desc">Fallande</option>
            </select>
        </section>
    );
}

export default CountrySort;
