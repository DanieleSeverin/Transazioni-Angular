export interface Account{
    id: string
    accountName: string
    isPatrimonial: boolean
}

export interface CreateAccountRequest{
    accountName: string
    isPatrimonial: boolean
}