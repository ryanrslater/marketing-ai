import { PrismaClient, SEOPageKeywords, SEOPageLocations, SEOPageTypes } from "@prisma/client";
import { OpenAIApi, Configuration } from "openai";
import { SEOInterface } from "./SEOInterface";

class SEO extends OpenAIApi implements SEOInterface {
    constructor() {
        super(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
    }

    async getHTML(url: string) {
        const { data } = await this.axios.get(url);
        return data;
    }

    async createAudit(url: string, pageType: SEOPageTypes, keywords: SEOPageKeywords[], locations: SEOPageLocations[]): Promise<string> {
        const html = await this.getHTML(url);
        let prompt = `Can you create a SEO audit on this page: ${html} for a ${pageType.display} page`;
        if (keywords.length > 0) prompt += ` with the following keywords: ${keywords.map((e) => e.keyword).join(", ")}`;
        if (locations.length > 0) prompt += ` and the following locations: ${locations.map((e) => e.location).join(", ")}`;
        prompt += "?";
        const data = await this.createCompletion({
            prompt,
            model: "text-davinci-002",
        });

        if (!data.data.choices[0].text) throw new Error("No data returned from OpenAI");

        return data.data.choices[0].text;
    }

    async createBlogPost(keywords: SEOPageKeywords[], locations: SEOPageLocations[]): Promise<string> {

        let prompt = `Can your create a SEO optimised blog post`;
        if (keywords.length > 0) prompt += ` with the following keywords: ${keywords.map((e) => e.keyword).join(", ")}`;
        if (locations.length > 0) prompt += ` for the following locations: ${locations.map((e) => e.location).join(", ")}`;
        prompt += "?";
        const data = await this.createCompletion({
            prompt,
            model: "text-davinci-002",
        });

        if (!data.data.choices[0].text) throw new Error("No data returned from OpenAI");

        return data.data.choices[0].text;
    }

}
export default SEO;