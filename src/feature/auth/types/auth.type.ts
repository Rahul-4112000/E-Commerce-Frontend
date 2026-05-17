export const EROLE = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    USER: 'user'
}

export type user = {
    name: string;
    email: string;
    role: 'admin' | 'super_admin' | 'user';
    isActive: boolean
}


