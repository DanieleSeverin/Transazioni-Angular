export interface LogInUserRequest {
    email : string;
    password : string;
}

export interface AuthResponse {
    accessTokenExpireAt : Date;
    refreshTokenExpireAt : Date;
}

export interface RegisterUserRequest {
    email : string;
    firstName : string;
    lastName : string;
    password : string;
}