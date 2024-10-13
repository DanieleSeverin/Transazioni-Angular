export interface AccountsBalanceSummary {
    accountId : string
    accountName : string
    balance : number
    currency : string
}

export interface MonthlyAccountBalanceSummary{
    accountId : string
    accountName : string 
    month: Date
    cumulativeBalance : number
}