import { DetailedCountry } from "@/app/types/countryTypes"
import { Wiki } from "@/app/types/wikiTypes";
import RetryMessage from "@/app/components/retryMessage";
import { fetchData } from "@/app/utils/fetchData";

async function CountryWiki({ country }: { country: DetailedCountry }) {
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(country.name)}`;
    const wikiError = "Kunde inte hämta Wiki-information";

    try {
        const wiki = await fetchData<Wiki>(wikiUrl, wikiError);

        return (
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <h2 className="border-b border-gray-200 p-5 text-xl font-bold text-gray-900 sm:p-6 sm:text-2xl lg:p-8">Om {wiki.title}</h2>

                <section className="sm:p-6 lg:flex lg:gap-8 lg:p-8">
                    <section className="bg-gray-100 p-4 sm:rounded-xl lg:w-2/5 lg:shrink-0">
                        <img src={wiki.thumbnail.source} alt={`Bild på ${wiki.title}`} width={wiki.thumbnail.width} height={wiki.thumbnail.height} className="mx-auto max-h-80 w-full rounded-lg object-contain" />
                    </section>

                    <section className="space-y-5 p-5 sm:px-0 sm:pb-0 lg:flex-1 lg:pt-0">
                        <p className="leading-7 text-gray-700">{wiki.extract}</p>
                        <p className="text-sm text-gray-600">Källa:{" "}
                            <a href={wiki.content_urls.desktop.page} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-800">Wikipedia - {wiki.title}</a>
                        </p>
                    </section>
                </section>
            </section>
        )
    } catch (error) {
        return (
            <RetryMessage message={error instanceof Error ? error.message : "Ett okänt fel uppstod."} />
        );
    }
}

export default CountryWiki
