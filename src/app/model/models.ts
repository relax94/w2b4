export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
}
export interface Auth {
    token: string;
    error: string;
    current: User;
}

export interface Network{
    id: string,
    creatorId: number,
    name: string,
    description: string
}