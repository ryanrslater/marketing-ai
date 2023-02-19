import { SEOPageTypes, SEOPageKeywords, SEOPageLocations } from "@prisma/client";

export interface SEOInterface {
    getHTML(url: string): Promise<string>;
    createAudit(url: string, pageType: SEOPageTypes, keywords: SEOPageKeywords[], locations: SEOPageLocations[]): Promise<string>;
    createBlogPost(keywords: SEOPageKeywords[], locations: SEOPageLocations[]): Promise<string>;
}