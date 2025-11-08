// File: app/auth/register/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
    return (
        <main className="min-h-[100dvh] grid grid-cols-1 md:grid-cols-[40%_1fr] text-gray-900 bg-white"> 
            
            {/* 1. KIRI (Header / Branding - Hijau Tua) */}
            <div className="flex flex-col items-center justify-center px-12 py-10 bg-emerald-800 text-white shadow-2xl shadow-black/50 md:h-[100dvh]"> 
                
                {/* Logo */}
                <Image
                    src="/hero.png" // Logo Putih
                    alt="PlantMatch Logo"
                    width={220}
                    height={220}
                    priority
                    className="mb-6 object-contain drop-shadow-lg" 
                />
                
                {/* Branding Text */}
                <h1 className="text-4xl font-extrabold tracking-tight mb-0 mt-6">
                    Welcome!
                </h1>
                <p className="text-lg text-emerald-100 text-center max-w-sm mt-2">
                    You're one step away from finding the perfect plant for you.
                </p>
                {/* Tidak ada tombol navigasi di sini (sesuai permintaan terakhir) */}
            </div>

            {/* 2. KANAN (Content / Formulir - Putih) */}
            <div className="flex items-center justify-center bg-white p-12 md:h-[100dvh]"> 
                
                <div className="w-full max-w-md">
                    
                    {/* Judul dan Deskripsi DITENGAHKAN */}
                    <h2 className="text-center text-4xl font-extrabold text-emerald-800 mb-2">
                        Create Account
                    </h2>
                    <p className="text-center text-lg text-gray-500 mb-8">
                        Start your journey to find the plant that fits you.
                    </p>

                    {/* Formulir Register */}
                    <form className="space-y-6" action="#" method="POST"> 
                    
                        {/* Input Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                                        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white text-gray-900" 
                                placeholder="Enter your username" 
                            />
                        </div>

                        {/* Input Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                                        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white text-gray-900"
                                placeholder="example@email.com" 
                            />
                        </div>

                        {/* Input Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                                        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white text-gray-900"
                                placeholder="Minimum 6 characters" 
                            />
                        </div>
                        
                        {/* Register Button */}
                        <div className="pt-2">
                            <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 rounded-lg shadow-lg text-lg font-bold 
                                        text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all" 
                            >
                            Register
                            </button>
                        </div>
                    </form>
                    
                    {/* Tautan ke Halaman Login */}
                    <p className="text-center text-sm pt-6 mt-6 text-gray-600">
                        Already have an account?{" "}
                        <Link 
                            href="/auth/login" // Link ke halaman LOGIN yang baru
                            className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                            Login here
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    );
}
