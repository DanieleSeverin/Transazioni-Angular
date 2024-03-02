export interface Result<T> {
    error: Error
    isFailure : boolean
    isSuccess : boolean
    value : T
}

export interface Error {
    code : string
    name : string
}