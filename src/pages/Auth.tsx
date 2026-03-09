import { AuthView } from "@neondatabase/neon-js/auth/react";
import { use } from "react";    
import { useParams } from "react-router-dom";

export default function Auth() {
    const { pathname } = useParams();
    return <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full p-6">
            <AuthView pathname={pathname} />
        </div>
    </div>;
}