import { PrismaClient, TierTypes } from "@prisma/client";


export class SEORepository extends PrismaClient {

    async createNewSEOAccount() {
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

    async createAudit(sub: string, SeoId: string) {
        const user = await this.users.findUnique({
            where: {
                sub,
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
                                    },
                                    where: {
                                        id: SeoId
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
        if (!user.accounts[0].seo) throw new Error("No SEO found");

        if (admin.tier.name === TierTypes.FREE && user.accounts[0].seo?.seoPages.length > 1) throw new Error("You have reached your limit of 1 SEO page");

    }
}