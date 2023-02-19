import { SEOInterface } from "../Providers/SEOInterface";

export class SEORepository {
    private seo: SEOInterface;

    constructor(seo: SEOInterface) {
        this.seo = seo;
    }
}