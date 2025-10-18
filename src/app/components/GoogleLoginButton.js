'use client';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GoogleLoginButton() {
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();


    // const handleGoogleLogin = async () => {
    //     try {
    //         const result = await signInWithPopup(auth, provider);
    //         const user = result.user;
    //         const res = await fetch("/api/google-auth", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({
    //                 name: user.displayName,
    //                 email: user.email,
    //                 uid: user.uid,
    //             }),
    //         });

    //         const data = await res.json();
    //         console.log("Server Response:", data);
    //     } catch (error) {
    //         console.error("Google login error:", error);
    //     }
    // };

    const handleGoogleAuth = async () => {
        try {
            setGoogleLoading(true);
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const response = await fetch("/api/google-auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                }),
            });
            const data = await response.json();
            if (data.success) {
                router.push("/dashboard");
            } else {
                alert("Failed to sign up with Google");
            }
        } catch (error) {
            console.error("Google sign-up error:", error);
            alert("Google sign-up failed. Try again.");
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <button
            onClick={handleGoogleAuth}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
        >
            <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
                className="w-5 h-5"
            />
            {googleLoading ? "Signing in..." : "Sign in with Google"}
        </button>
    );
}
