export interface ProviderInterface {
    createReport<T>(user: string, account: string, options: T): Promise<string>;
    createAudit<T>(user: string, account: string, options: T): Promise<string>;
    createAsset<T>(user: string, account: string, options: T): Promise<string>;
}