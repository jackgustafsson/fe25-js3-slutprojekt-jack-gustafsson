# Reseapp
## Om applikationen
Denna applikation presenterar länder från hela världen och tillhörande information. På startsidan visas en paginerad lista med länder där användaren kan söka efter ett land, filtrera efter region och sortera efter namn, befolkning och yta.

När användaren klickar på ett land kommer hen till landets detaljsida. Där presenteras mer information om landet, väderinformation för huvudstaden, en faktabeskrivning från Wikipedia samt ett bildgalleri med bilder från Unsplash.

## Köra projektet lokalt
### 1. Klona projektet
Klona projektet från GitHub och gå in i projektmappen:
```
git clone https://github.com/jackgustafsson/fe25-js3-slutprojekt-jack-gustafsson.git
cd fe25-js3-slutprojekt-jack-gustafsson
```
### 2. Install dependencies
Installera projektets beroenden med följande kommando:
```
npm install
```

### 3. Konfigurera miljövariabler
Skapa en fil med namnet .env i projektets rotmapp. Lägg in de API-nycklar som projektet använder:
```
REST_COUNTRIRES_KEY=din_rest_countries_api_nyckel
UNSPLASH_ACCESS_KEY=din_unsplash_access_key
```
Ersätt platshållarna med dina egna API-nycklar. API-nycklar kan behöva hämtas från respektive tjänst. Kontrollera även att variabelnamnen överensstämmer exakt med dem som används i koden.

Filen .env ska inte laddas upp till GitHub eftersom den innehåller hemliga uppgifter.

### 4. Starta applikationen
Starta utvecklingsservern med:
```
npm run dev
```
Öppna sedan http://localhost:3000 i webbläsaren.

## Val av ramverk
Jag valde Next.js av flera anledningar:
1. **Filbaserad routing:** Next.js har ett inbyggt routingsystem där mappar och filer används för att skapa sidor. Det innebär att jag inte behöver installera och konfigurera ett separat bibliotek, exempelvis React Router.
2. **Server Components och API-nycklar:** Next.js gör det möjligt att hämta data i serverkomponenter. Det innebär att jag kan använda API-nycklar på servern utan att exponera dem i webbläsaren, förutsatt att de inte skickas vidare till klienten.
3. **Inbyggd laddnings- och felhantering:** Next.js har stöd för bland annat loading.tsx, error.tsx och not-found.tsx. Dessa funktioner underlättar hanteringen av laddningstillstånd, fel och sidor som inte finns.

## Fördjupningar
Som fördjupning valde jag att utveckla sorteringsfunktionen på startsidan och att hämta samt presentera bilder från Unsplash API.
* **Sortering:** Användaren kan sortera länder efter namn, befolkning och yta samt välja sorteringsriktning.
* **Unsplash API:** På varje detaljsida hämtas och visas bilder med alternativtexter och information om fotograferna.

## Deployment
Applikationen är publicerad på Netlify:

https://superb-baklava-798029.netlify.app/

## AI-redovisning
### ChatGPT
Jag har använt ChatGPT främst för att förstå kod från andras projekt och få förklaringar av programmeringskoncept.

Exempel på frågor jag ställt:
* "Förklara vad den här koden gör", exempelvis TypeScript-typer, funktioner och props.
* "Vad är useSearchParams till för?"

### Github Copilot
Jag har även använt den inbyggda AI-funktionen i Visual Studio Code, GitHub Copilot, för felsökning och hjälp med kod. Det har bland annat handlat om att hitta saknade nyckelord eller möjliga fel i samband med asynkrona API-anrop, exempelvis när await behövs.

## Reflektion
Det som gick bra var jag använde Next.js istället för att göra projektet i React med Vite då projektet blev mer organiserat och jag fick med fler funktionaliteter. Det svåraste var att byta API från countries.dev till Rest Countries, eftersom jag behövde anpassa datahämtningen och hanteringen av svaret för att kunna visa alla länder på startsidan i stället för ett begränsat antal. Under projektet har jag framför allt använt Next.js funktioner för routing och URL-parametrar, såsom usePathname, useRouter och useSearchParams. Om jag gjorde om projektet skulle jag undersöka möjligheterna att använda fler custom hooks för att återanvända logik och eventuellt useState för tillstånd som inte behöver sparas i URL.
