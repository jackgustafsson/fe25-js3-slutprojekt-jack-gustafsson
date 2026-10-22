export type Wiki = {
    title: string;
    thumbnail: Thumbnail;
    extract: string;
    content_urls: Content_Url;
}

type Thumbnail = {
    source: string;
    width: number;
    height: number;
}

type Content_Url = {
    desktop: {
        page: string;
    }

    mobile: {
        page: string;
    }
}