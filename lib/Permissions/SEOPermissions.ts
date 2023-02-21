import { PrismaClient, TierTypes } from "@prisma/client";


class SEOPermissions extends PrismaClient {
    async createAudit(userId: string, accountId: string) {
        const account = await this.accounts.findUnique({
         where: {
                id: accountId
         },
         include: {
            users: {
                where: {
                    id: userId
                }
            }
         }
    });
    if (!account) throw new Error("User does not have access to this account");
}

    async createSEOPage(sub: string, SEOAccount: string) {
        const user = await this.users.findUnique({
            where: {
                sub,
            },
            include: {
                accounts: {
                    include: {
                        seo: {
                            include: {
                                seoPages: true
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
export default SEOPermissions;