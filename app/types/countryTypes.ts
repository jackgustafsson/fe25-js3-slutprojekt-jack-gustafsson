export type Country = {
    name: string;
    alpha3Code: string;
    region: string;
    capital: string;
    flags: Flag;
};

export type DetailedCountry = {
    name: string;
    flags: Flag;
    latlng: number[];
    region: string;
    capital: string;
    languages: Langugage[];
    subregion: string;
    alpha2Code: string;
    alpha3Code: string;
    currencies: Currency[];
    nativeName: string;
    population: number;
}

type Flag = {
    png: string;
    svg: string;
}

type Langugage = {
    name: string;
    nativeName: string;
}

type Currency = {
    code: string;
    name: string;
    symbol: string;
}