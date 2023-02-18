import { PrismaClient } from "@prisma/client";
import { OpenAIApi, Configuration } from "openai";


class SEO extends OpenAIApi {
    constructor() {
        super(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
    }

    async getHTML(url: string) {
        const { data } = await this.axios.get(url);
        return data;
    }

    async createAudit(url: string, pageType: SEOPageTypes): Promise<string> {
        const html = await this.getHTML(url);
        const prompt = `Can your create a SEO report the following keywords: ${keywords.map((e) => e.keyword).join(", ")} based on this html file? ${html}`;
        const data = await this.createCompletion({
            prompt,
            model: "text-davinci-002",
        });

        if (!data.data.choices[0].text) throw new Error("No data returned from OpenAI");

        return data.data.choices[0].text;
    }

    async createBlogPost(url: string, keywords: SEOKeyword[]): Promise<string> {
        const html = await this.getHTML(url);
        const prompt = `Can your create a blog post the following keywords: ${keywords.map((e) => e.keyword).join(", ")}`;
        const data = await this.createCompletion({
            prompt,
            model: "text-davinci-002",
        });

        if (!data.data.choices[0].text) throw new Error("No data returned from OpenAI");

        return data.data.choices[0].text;
    }

}
export default SEO;