export const EROLE = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    USER: 'user'
}

export type user = {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'super_admin' | 'user';
    isActive: boolean
}

export type userProfileResponse = {
    success: boolean,
    user: user
}

export type logoutResponse = {
    success: boolean,
    message: string
}

export type AdminData = {
    count: number,
    admin: user[]
}