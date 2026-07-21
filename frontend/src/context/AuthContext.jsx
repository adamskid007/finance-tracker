import { createContext, useReducer } from "react";
import { authReducer, initialState } from "./authReducer";
import { registerUser,loginUser } from "../api/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(
        authReducer,
        initialState
    );
    const register = async (userData) => {
        dispatch({
            type: "AUTH_START",
        });

        try {
            const response = await registerUser(userData);

            dispatch({
                type: "REGISTER_SUCCESS",
            });

            return response;
        } catch (error) {
            dispatch({
                type: "AUTH_ERROR",
                payload:
                    error.response?.data?.message ||
                    error.message,
            });

            throw error;
        }
    };

    const login = async (credentials) => {
        dispatch({
            type: "AUTH_START",
        });

        try {
            const response = await loginUser(credentials);

            const { token, user } = response.data;

            localStorage.setItem("token", token);

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {
                    token,
                    user,
                },
            });

            return response;
        } catch (error) {
            dispatch({
                type: "AUTH_ERROR",
                payload:
                    error.response?.data?.message ||
                    error.message,
            });

            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        dispatch({
            type: "LOGOUT",
        });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}