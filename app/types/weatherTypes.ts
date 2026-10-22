export type Weather = {
    current: {
        time: string;
        temperature_2m: number;
        weather_code: number;
        wind_speed_10m: number;
    }
}

export type Capital = {
    results: Results[];
}

type Results = {
    latitude: number;
    longitude: number;
}