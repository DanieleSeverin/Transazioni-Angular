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

export interface GetMovementsFilter {
    originAccountId?: string | null;
    destinationAccountId?: string;
    startDate?: Date;
    endDate?: Date;
    category?: string;
    amountGreaterThan?: number;
    amountLowerThan?: number;
    currency?: string;
    imported?: boolean;
}

export interface GetMovementsResponse {
    id: string;
    date: Date;
    description: string;
    amount: number;
    currency: string;
    originAccount: MovementAccount;
    destinationAccount: MovementAccount;
    category?: string | null;
    isImported: boolean;
    peridiocity: string;
  }
  
  interface MovementAccount {
    id: string;
    accountName: string;
    isPatrimonial: boolean;
  }
  