"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { userLogin } from "../../actions";
import Link from "next/link";
import GoogleLoginButton from "@/app/components/GoogleLoginButton";

const Login = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        startTransition(async () => {
            const res = await userLogin(formData);
            if (res?.success) {
                router.push("/dashboard");
            } else {
                alert(res?.message || "Invalid credentials");
            }
        });
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Login to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <GoogleLoginButton />
                <div className="mt-8 text-center text-sm">
                    <p className="text-gray-600">
                        Don’t have an account?
                        <Link
                            href="/register"
                            className="font-semibold text-indigo-600 hover:text-indigo-700 ml-1 transition duration-150"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
