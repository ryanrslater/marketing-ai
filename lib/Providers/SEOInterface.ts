import { SEOPageTypes, SEOPageKeywords, SEOPageLocations } from "@prisma/client";

export interface SEOInterface {
    create(arg0: { data: { seoPages: { create: { type: { connectOrCreate: { where: { name: string; }; create: { name: string; display: string; }; }; }; }; }; }; }): unknown;
    getHTML(url: string): Promise<string>;
    createAudit(url: string, pageType: SEOPageTypes, keywords: SEOPageKeywords[], locations: SEOPageLocations[]): Promise<string>;
    createBlogPost(keywords: SEOPageKeywords[], locations: SEOPageLocations[]): Promise<string>;
}