export interface ISetting {
    storeName: string;
    storeEmail: string;
    storePhone: string;
    storeDescription: string;
    brandColor: string;
    logo: {
        url: string;
    };
    metadata: {
        title: string;
        description: string;
        keywords: string[];
    };
    socialMedia: {
        facebook: string;
        instagram: string;
        twitter: string;
        linkedin: string;
        youtube: string;
        tiktok: string;
        pinterest: string;
    };
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    };
}