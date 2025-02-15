import { Navigate } from "react-router-dom";
import { APP_Routes } from "../utils/constants/AppRoutes";
import { Login, Dogs, Locations } from "../view";
import { ProtectedRoute } from "../middleware/ProtectedRoute";

export const AllRoutes = [
    {
        path: "/",
        element: <Navigate to={APP_Routes.Login} replace />,
    },
    {
        path: "*",
        element: <Navigate to={APP_Routes.Login} replace />,
    },
    {
        path: APP_Routes.Login,
        element: <Login />,
    },
    {
        path: APP_Routes.Dogs,
        element: <ProtectedRoute><Dogs /></ProtectedRoute>,
    },
    {
        path: APP_Routes.Location,
        element: <ProtectedRoute><Locations /></ProtectedRoute>,
    },
];