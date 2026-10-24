import { DetailedCountry } from "@/app/types/countryTypes";
import CountryFacts from "../components/countryFacts";
import CountryWeather from "../components/countryWeather";
import CountryWiki from "../components/countryWiki";
import CountryGallery from "../components/countryGallery";
import { notFound } from "next/navigation";

async function DetailedPage({ params }: { params: Promise<{ code: string }> }) {

  // Använder inte fetchData här eftersom 404-svar måste hanteras separat med notFound() för att visa den anpassade 404-sidan.
  const { code } = await params;
  const res = await fetch(`https://countries.dev/alpha/${code}?fields=name,flags,latlng,region,capital,languages,subregion,alpha2Code,alpha3Code,currencies,nativeName,population`)

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Kunde inte hämta landet");
  }

  const country: DetailedCountry = await res.json();

  return (
    <section className="mx-auto max-w-5xl space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
      <CountryFacts country={country} />
      <CountryWeather country={country} />
      <CountryWiki country={country} />
      <CountryGallery country={country} />
    </section>
  )


}

export default DetailedPage