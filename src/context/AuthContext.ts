import { createContext, useContext } from "react";

type User = {
    name: string;
    email: string;
    password: string;
}

type AuthResult = {
    success: boolean;
    error?: string;
}

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<AuthResult>;
    register: (name: string, email: string, password: string) => Promise<AuthResult>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function useAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}