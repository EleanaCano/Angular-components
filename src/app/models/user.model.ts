export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
}

export interface CreateUser extends Omit<User, 'id'>{}