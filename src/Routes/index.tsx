import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AllRoutes } from "./routes";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {AllRoutes.map((el, index) => (
                    <Route key={index} path={el.path} element={el.element} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}