import { PrismaClient } from "@prisma/client";


export class SEORepository extends PrismaClient {
    private seoProvider: SEOInterface;

    constructor(seo: SEOInterface) {
        super();
        this.seoProvider = seo;
    }

    async createNewSEO() {
        const seo = await this.sEO.create({
            data: {
                seoPages: {
                    create: {
                        type: {
                            connectOrCreate: {
                                where: {
                                    name: "Home"
                                },
                                create: {
                                    name: "Home",
                                    display: "Home"
                                }
                            }
                        }
                    }
                }
            }
        });
        return seo;
    }

    async createAudit(sub: string, SeoId: string): Promise<string> {
        const user = await this.users.findUnique({
            where: {
                sub,
                seoId: SeoId,
            },
            include: {
                accounts: {
                    include: {
                        seo: {
                            include: {
                                seoPages: {
                                    include: {
                                        keywords: true,
                                        locations: true,
                                        type: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }

        });

        if (!user) throw new Error("User not found");

        const admin = await this.users.findUnique({
            where: {
                sub: user?.accounts[0].owner
            },
            include: {
                tier: true
            }
        });

        if (!admin) throw new Error("Admin not found");

        if (admin.tier.name === "Free" && user.accounts[0].seo.seoPages.length > 1) throw new Error("You have reached your limit of 1 SEO page");



        const audit = await this.seo.createAudit(`${user.accounts[0].domain}${user.accounts[0].seo[0].seoPages[0].path}`, pageType, keywords, locations);
        return audit;
    }
}