import { Navigate } from "react-router-dom";
import { APP_Routes } from "../utils/constants";
import { useAuth } from "../services/useUser";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();

    console.log("🔄 Checking Protected Route: Authenticated =", isAuthenticated);

    if (loading) return <p className="text-center text-gray-600">Checking session...</p>;

    return isAuthenticated ? children : <Navigate to={APP_Routes.Login} replace />;
};