import { DetailedCountry } from "@/app/types/countryTypes";
import CountryFacts from "../components/countryFacts";
import CountryWeather from "../components/countryWeather";
import CountryWiki from "../components/countryWiki";

async function DetailedPage({params}: {params: Promise<{code: string}>}) {
    const {code} = await params;
    const res = await fetch(`https://countries.dev/alpha/${code}?fields=name,flags,latlng,region,capital,languages,subregion,alpha2Code,alpha3Code,currencies,nativeName,population`)
    
    if(!res.ok){
      throw new Error("Kunde inte hämta landet");
    }

    const country:DetailedCountry = await res.json();
    
    return (
      <main className="mx-auto max-w-5xl space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
          <CountryFacts country={country} />
          <CountryWeather country={country} />
          <CountryWiki country={country} />
      </main>
    )
    
    
}

export default DetailedPage