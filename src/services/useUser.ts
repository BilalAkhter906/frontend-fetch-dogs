import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { APP_Routes } from "../utils/constants";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthHook extends AuthState {
  handleLogin: (name: string, email: string) => Promise<boolean>;
  handleLogout: () => Promise<boolean>;
}

export const useAuth = (): AuthHook => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      setLoading(true);
      await axiosInstance.get("/dogs/breeds"); // Any protected API
      setIsAuthenticated(true);
      console.log("✅ Session valid: User is authenticated");
    } catch {
      setIsAuthenticated(false);
      console.log("❌ Session invalid: User is NOT authenticated");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  // 🔹 Login Function
  const handleLogin = async (name: string, email: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await axiosInstance.post("/auth/login", { name, email });

      console.log("✅ Login successful: Updating authentication state");
      setIsAuthenticated(true);

      setTimeout(() => {
        console.log("🔄 Navigating to Dogs Page...");
        navigate(APP_Routes.Dogs);
      }, 100);

      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during login.");
      setIsAuthenticated(false);
      console.log("❌ Login failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout Function
  const handleLogout = async (): Promise<boolean> => {
    try {
      setLoading(true);
      await axiosInstance.post("/auth/logout");
      setIsAuthenticated(false);
      console.log("✅ Logout successful: Redirecting to login");
      navigate(APP_Routes.Login);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred during logout.");
      console.log("❌ Logout failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    isAuthenticated,
    loading,
    error,
    handleLogin,
    handleLogout,
  };
};