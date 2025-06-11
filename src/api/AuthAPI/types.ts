export interface SignupRequest {
    first_name?: string;
    second_name?: string;
    login?: string;
    email?: string;
    password?: string;
    phone?: string;
}

export interface LoginRequest {
    login: string;
    password: string;
}

export interface SignupResponse {
    id: number;
}

export interface UserResponse {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar?: string;
    email: string;
}

export interface APIErrorResponse {
    reason: string;
    status?: number;
    [key: string]: unknown;
}
