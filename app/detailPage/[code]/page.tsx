import { DetailedCountryResponse } from "@/app/types/countryTypes";
import CountryFacts from "../components/countryFacts";
import CountryWeather from "../components/countryWeather";
import CountryWiki from "../components/countryWiki";
import CountryGallery from "../components/countryGallery";
import { notFound } from "next/navigation";

// Använder inte fetchData här eftersom 404-svar måste hanteras separat med notFound() för att visa den anpassade 404-sidan.
async function DetailedPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const accessKey = process.env.REST_COUNTRIRES_KEY;
  const options = {
    headers: {
      'Authorization': `Bearer ${accessKey}`
    }
  }
  const res = await fetch(`https://api.restcountries.com/countries/v5/codes.alpha_3/${code}?response_fields=names,flag,capitals,region,languages,subregion,codes,currencies,population`, options);

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error("Kunde inte hämta landet");
  }

  const response: DetailedCountryResponse = await res.json();
  const country = response.data.objects[0];

  if (!country) {
    notFound();
  }

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