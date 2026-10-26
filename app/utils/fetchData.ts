export async function fetchData<T>(
    url: string,
    errorMessage: string,
    options?: RequestInit & {
        next?: {
            revalidate?: number | false;
        }
    }): Promise<T> {

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error(errorMessage);
        }

        return (await res.json()) as T;
    } catch {
        throw new Error(errorMessage);
    }
}