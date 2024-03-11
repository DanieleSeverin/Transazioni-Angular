import { Periodicity } from "./periodicity.enum";

export interface Movement {
    id?: string;
    accountId: string;
    destinationAccountId: string;
    date: Date;
    description: string;
    amount: number;
    currency: string;
    category: string;
    periodicity: Periodicity;
}