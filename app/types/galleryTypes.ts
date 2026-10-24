type UnsplashPhoto = {
    id: string;
    alt_description: string | null;
    description: string | null;
    urls: {
        regular: string;
    };
    links: {
        html: string;
    };
    user: {
        name: string;
        links: {
            html: string;
        };
    };
};

export type UnsplashResponse = {
    results: UnsplashPhoto[];
};