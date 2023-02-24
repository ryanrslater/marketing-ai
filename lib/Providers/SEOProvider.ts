import { ProviderInterface } from "./ProviderInterface";

export class SEOProvider implements ProviderInterface {
    createReport<T>(user: string, account: string, options: T): Promise<string> {
        throw new Error("Method not implemented.");
    }
    createAudit<T>(user: string, account: string, options: T): Promise<string> {
        throw new Error("Method not implemented.");
    }
    createAsset<T>(user: string, account: string, options: T): Promise<string> {
        throw new Error("Method not implemented.");
    }
}