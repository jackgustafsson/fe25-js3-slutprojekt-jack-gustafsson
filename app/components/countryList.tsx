import { Country } from "../types/countryTypes";
import Link from "next/link";
import { fetchData } from "../utils/fetchData";
import CountryPagination from "./countryPagination";

async function CountryList() {

    const countriesUrl = "https://countries.dev/countries?fields=name,alpha3Code,region,capital,flags,population,area";
    const countriesError = "Kunde inte hämta länder";

    const countries = await fetchData<Country[]>(countriesUrl, countriesError);

    return <CountryPagination countries={countries} />
}

export default CountryList
