import { DetailedCountry } from "@/app/types/countryTypes"
import { Weather } from "@/app/types/weatherTypes";
import RetryMessage from "@/app/components/retryMessage";
import { fetchData } from "@/app/utils/fetchData";

async function CountryWeather({ country }: { country: DetailedCountry }) {

    try {
        const capital = country.capitals?.[0];

        if (!capital?.coordinates) {
            return (
                <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
                    <h2 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
                        Väder
                    </h2>
                    <p className="text-gray-600">
                        Det finns inga tillgängliga koordinater för huvudstaden,
                        så vädret kan inte hämtas.
                    </p>
                </section>
            );
        }

        const latitude = capital.coordinates.lat;
        const longitude = capital.coordinates.lng;

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&forecast_days=1`;
        const weatherError = "Kunde inte hämta vädret";

        const weather = await fetchData<Weather>(weatherUrl, weatherError);
        const code = weather.current.weather_code;

        let weatherInfo;

        if (code === 0) {
            weatherInfo = { description: "Klart", icon: "☀️" };
        } else if (code >= 1 && code <= 3) {
            weatherInfo = { description: "Molnigt", icon: "☁️" };
        } else if (code >= 51 && code <= 57) {
            weatherInfo = { description: "Duggregn", icon: "🌦️" };
        } else if (code >= 61 && code <= 67) {
            weatherInfo = { description: "Regn", icon: "🌧️" };
        } else if (code >= 71 && code <= 77) {
            weatherInfo = { description: "Snöfall", icon: "🌨️" };
        } else if (code >= 95 && code <= 99) {
            weatherInfo = { description: "Åska", icon: "⛈️" };
        } else {
            weatherInfo = { description: "Okänt väder", icon: "❓" };
        }

        return (
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
                <h2 className="mb-5 border-b border-gray-200 pb-3 text-xl font-bold text-gray-900 sm:text-2xl">Vädret i {capital.name}</h2>

                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <section className="rounded-xl bg-blue-50 p-4">
                        <p className="text-sm font-medium text-gray-600">Temperatur</p>
                        <p className="mt-1 text-2xl font-bold text-blue-700 sm:text-3xl">{weather.current.temperature_2m} °C</p>
                    </section>

                    <section className="rounded-xl bg-gray-50 p-4">
                        <p className="text-sm font-medium text-gray-600">Vindhastighet</p>
                        <p className="mt-1 text-2xl font-bold text-gray-800">{weather.current.wind_speed_10m} km/h</p>
                    </section>

                    <section className="rounded-xl bg-gray-50 p-4 sm:col-span-2 lg:col-span-1">
                        <p className="text-sm font-medium text-gray-600">Väder</p>
                        <p className="mt-1 text-xl font-semibold text-gray-800">{weatherInfo.icon} {weatherInfo.description}</p>
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

export default CountryWeather