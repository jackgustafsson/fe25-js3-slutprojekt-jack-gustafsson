import { RestCountriesResponse, Country } from "../types/countryTypes";
import { fetchData } from "../utils/fetchData";
import CountryPagination from "./countryPagination";

async function CountryList() {
    const accessKey = process.env.REST_COUNTRIRES_KEY;
    const countriesError = "Kunde inte hämta länder";

    const options = {
        headers: {
            'Authorization': `Bearer ${accessKey}`
        }
    }

    const countries: Country[] = [];
    let offset = 0;
    let more = true;

    while (more) {
        const countriesUrl = `https://api.restcountries.com/countries/v5?response_fields=names,codes,region,capitals,flag,population,area&limit=100&offset=${offset}`;
        const response = await fetchData<RestCountriesResponse>(countriesUrl, countriesError, options);
        countries.push(...response.data.objects);

        more = response.data.meta.more;
        offset += 100;
    }

    return <CountryPagination countries={countries} />
}

export default CountryList