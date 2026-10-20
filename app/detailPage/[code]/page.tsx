import { DetailedCountry } from "@/app/types/countryTypes";
import CountryFacts from "../components/countryFacts";

async function DetailedPage({params}: {params: Promise<{code: string}>}) {
    const {code} = await params;
    const res = await fetch(`https://countries.dev/alpha/${code}?fields=name,flags,latlng,region,capital,languages,subregion,alpha3Code,currencies,nativeName,population`)
    
    if(!res.ok){
      throw new Error("Kunde inte hämta landet");
    }

    const country:DetailedCountry = await res.json();
    
    return (
      <>
        <CountryFacts country={country}/>
      </>
    )
    
    
}

export default DetailedPage