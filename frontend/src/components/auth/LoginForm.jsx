import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";

function LoginForm() {
    const navigate = useNavigate();

    const { login, loading, error } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(formData);
            navigate("/");
        } catch {
            // error handled in context
        }
    };

    return (
        <Card className="w-full max-w-md p-8">
            <h1 className="text-3xl font-bold text-center mb-6">
                Login
            </h1>

            {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white rounded-lg py-3 hover:bg-emerald-700 disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </form>

            <p className="mt-5 text-center">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-emerald-600"
                >
                    Register
                </Link>
            </p>
        </Card>
    );
}

export default LoginForm;