export interface Account{
    id: string
    accountName: string
    accountType: string
}

export interface CreateAccountRequest{
    accountName: string
    accountType: string
}