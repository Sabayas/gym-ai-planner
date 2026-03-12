import type { User } from "@neondatabase/neon-js/auth/types";
import { createContext, useEffect, type ReactNode } from "react";
import { authClient } from "../lib/auth";
import { useState } from "react";


interface AuthContextType {
    User: User | null;
}

const AuthContext =   createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [neonUser, setNeonUser] = useState<any>(null);

    useEffect(() => {
        async function loadUser() {
            try{
                const result = await authClient.getSession();
                if(result && result.data?.user){ 
                    setNeonUser(result.data.user);
                }else {
                    setNeonUser(null);
                }
            }
                catch(error){
                    setNeonUser(null);
                }
            }

            loadUser();
        }, []);
    return <AuthContext.Provider value={{ User: neonUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context =  createContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};