import { Routes, Route, } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

function App() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                <PublicRoute>
                <Login />
                </PublicRoute>}
            />

            <Route
                path="/register"
                element={
                <PublicRoute>
                <Register />
                </PublicRoute>}
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;