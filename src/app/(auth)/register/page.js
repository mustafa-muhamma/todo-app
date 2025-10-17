'use client'
import { useRouter } from "next/navigation";
import { useTransition } from 'react'
import { userRegister } from "../../actions";
import Link from "next/link";


const Register = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleSubmit = async (formData) => {
        startTransition(async () => {
            const res = await userRegister(formData)
            if (res.success) {
                // show toast, then redirect
                router.push('/login')
            } else {
                alert(res.message)
            }
        })
    }


    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100 p-4">

            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:shadow-3xl">


                <div className="text-center mb-6">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-gray-500 mt-2">Join us and start your journey!</p>
                </div>


                <form action={handleSubmit} className="space-y-6">

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="John Doe"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            required
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="you@example.com"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            required
                        />
                    </div>

                    <button disabled={isPending}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150"
                    >
                        {isPending ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm">
                    <p className="text-gray-600">
                        Already have an account?
                        <Link
                            href="/login"
                            className="font-semibold text-indigo-600 hover:text-indigo-700 ml-1 transition duration-150"
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;