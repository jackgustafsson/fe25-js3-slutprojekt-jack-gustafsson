export type Wiki = {
    title: string;
    thumbnail: {
        source: string;
        width: number;
        height: number;
    };
    extract: string;
    content_urls: {
        desktop: {
            page: string;
        }
    };
}