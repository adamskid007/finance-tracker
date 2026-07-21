import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Card from "../common/Card";
import Input from "../common/Input";
import Button from "../common/Button";

function RegisterForm() {
    const navigate = useNavigate();

    const { register, loading, error } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
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
            await register(formData);

            navigate("/login");
        } catch {
            // Error handled in AuthContext
        }
    };

    return (
        <Card className="w-full max-w-md p-8">
            <h1 className="text-3xl font-bold text-center mb-6">
                Create Account
            </h1>

            {error && (
                <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-600">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 text-white rounded-lg py-3 hover:bg-emerald-700 disabled:opacity-50"
                >
                    {loading ? "Registering..." : "Register"}
                </Button>
            </form>

            <p className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-emerald-600 hover:underline"
                >
                    Login
                </Link>
            </p>
        </Card>
    );
}

export default RegisterForm;