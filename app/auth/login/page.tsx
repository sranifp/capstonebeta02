// File: app/auth/login/page.tsx
'use client'; // PENTING: Untuk menggunakan hooks seperti useRouter
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Import useRouter

export default function LoginPage() {
    // Inisialisasi router untuk navigasi
    const router = useRouter(); 

    // Fungsi yang dipanggil saat formulir disubmit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // --- LOGIKA OTENTIKASI ANDA AKAN DITEMPATKAN DI SINI ---
        
        // Asumsi: Proses login ke API berhasil.
        // Jika login BERHASIL, arahkan pengguna ke halaman rekomendasi.
        
        console.log("Login successful, navigating to recommendations...");
        
        // NAVIGASI DILAKUKAN DI SINI: diarahkan ke /rekomendasi
        router.push('/rekomendasi'); 
    };

    return (
        <main className="min-h-[100dvh] grid grid-cols-1 md:grid-cols-[40%_1fr] text-gray-900 bg-white">
            
            {/* 1. KIRI (Header / Branding - Hijau Tua) - Tetap sama */}
            <div className="flex flex-col items-center justify-center px-12 py-10 bg-emerald-800 text-white shadow-2xl shadow-black/50 md:h-[100dvh]">
                
                {/* Logo */}
                <Image
                    src="/hero.png" 
                    alt="PlantMatch Logo"
                    width={220}
                    height={220}
                    priority
                    className="mb-6 object-contain drop-shadow-lg" 
                />
                
                {/* Branding Text */}
                <h1 className="text-4xl font-extrabold tracking-tight mb-0 mt-6">
                    Hello Again!
                </h1>
                <p className="text-lg text-emerald-100 text-center max-w-sm mt-2">
                    Don't have an account yet? Join us and start exploring!
                </p>

                {/* Tombol ke REGISTER */}
                <Link 
                    href="/auth/register" 
                    className="mt-8 rounded-full bg-white text-emerald-800 px-6 py-2.5 
                               hover:bg-emerald-50 transition shadow-lg text-lg font-semibold"
                >
                    Create Account →
                </Link>
            </div>

            {/* 2. KANAN (Content / Formulir - Putih) */}
            <div className="flex items-center justify-center bg-white p-12 md:h-[100dvh]"> 
                
                <div className="w-full max-w-md">
                    
                    {/* Judul dan Deskripsi DITENGAHKAN */}
                    <h2 className="text-center text-4xl font-extrabold text-emerald-800 mb-2">
                        Log In
                    </h2>
                    <p className="text-center text-lg text-gray-500 mb-8">
                        Sign in to continue your plant matching journey.
                    </p>

                    {/* Formulir Login - MENGGUNAKAN handleSubmit */}
                    <form className="space-y-6" onSubmit={handleSubmit}> 
                    
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
                                autoComplete="current-password"
                                required
                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                                        focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all bg-white text-gray-900"
                                placeholder="Enter your password" 
                            />
                        </div>
                        
                        {/* Tombol Login */}
                        <div className="pt-2">
                            <button
                            type="submit"
                            className="w-full flex justify-center py-3.5 px-4 rounded-lg shadow-lg text-lg font-bold 
                                        text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all" 
                            >
                            Login
                            </button>
                        </div>
                    </form>
                    
                    {/* Tautan ke Halaman Register */}
                    <p className="text-center text-sm pt-6 mt-6 text-gray-600">
                        Don't have an account?{" "}
                        <Link 
                            href="/auth/register" 
                            className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                            Register here
                        </Link>
                    </p>

                </div>
            </div>
        </main>
    );
}
