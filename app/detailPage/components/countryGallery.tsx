import RetryMessage from "@/app/components/retryMessage";
import { DetailedCountry } from "@/app/types/countryTypes";
import { UnsplashResponse } from "@/app/types/galleryTypes";
import { fetchData } from "@/app/utils/fetchData";

async function CountryGallery({ country }: { country: DetailedCountry }) {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    const url = `https://api.unsplash.com/search/photos?query=${country.names.common}&per_page=3&orientation=landscape`;
    const photosError = "Unsplash kunde inte hämta bilderna.";
    const options = {
        headers: {
            Authorization: `Client-ID ${accessKey}`
        }
    }

    try {
        const data = await fetchData<UnsplashResponse>(url, photosError, options);
        const photos = data.results.slice(0, 3);

        if (photos.length === 0) {
            return (
                <p>Det finns inga bilder att visa för det här landet.</p>
            );
        }

        return (
            <section className="space-y-4">
                <h2 className="text-2xl font-bold">Bilder från {country.names.common}</h2>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {photos.map((photo) => {
                        const altText = photo.alt_description ?? photo.description ?? `Bild från ${country.names.common}`;
                        const photographerUrl = `${photo.user.links.html}?utm_source=country_project&utm_medium=referral`;
                        const photoUrl = `${photo.links.html}?utm_source=country_project&utm_medium=referral`;

                        return (
                            <article key={photo.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <img src={photo.urls.regular} alt={altText} className="h-56 w-full object-cover" />

                                <section className="space-y-1 p-3 text-sm">
                                    <p>Foto:{" "}<a href={photographerUrl} target="_blank" rel="noreferrer" className="underline">{photo.user.name}</a></p>
                                    <p><a href={photoUrl} target="_blank" rel="noreferrer" className="underline">Visa bild på Unsplash</a></p>
                                </section>
                            </article>
                        );
                    })}
                </section>

                <p className="text-sm text-gray-600">Bilder från{" "}
                    <a href="https://unsplash.com/?utm_source=country_project&utm_medium=referral" target="_blank" rel="noreferrer" className="underline">Unsplash</a>
                </p>
            </section>
        );
    } catch (error) {

        return (
            <RetryMessage message={error instanceof Error ? error.message : "Ett okänt fel uppstod."} />
        );
    }
}

export default CountryGallery;