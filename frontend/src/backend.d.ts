import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface User {
    username: string;
    balance: bigint;
    owner: Principal;
    phone: string;
    hashedPassword: string;
}
export interface UserProfile {
    name: string;
}
export interface Transaction {
    status: string;
    userId: string;
    type: string;
    timestamp: Time;
    amount: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addTransaction(userId: string, type: string, amount: bigint, status: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createUser(username: string, phone: string, hashedPassword: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getTransactions(userId: string): Promise<Array<Transaction>>;
    getUser(username: string): Promise<User | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBalance(username: string, amount: bigint): Promise<void>;
}
