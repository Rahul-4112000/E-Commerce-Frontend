export const EROLE = {
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    USER: 'user'
}

export type UserRole = 'admin' | 'super_admin' | 'user';

export type user = {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    isActive: boolean;
}

export type UserProfile = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    phone: string;
    avatar: string;
    isActive: boolean;
    lastLogin: string | null;
    createdAt: string | null;
}

export type UserProfileResponse = {
    success: boolean;
    message: string;
    data: {
        user: UserProfile;
    };
}

export type UpdateProfilePayload = {
    name?: string;
    phone?: string;
    avatar?: string;
} | FormData;

export type ChangePasswordPayload = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
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