// ================================
// 📘 lib/types.ts
// Berisi definisi tipe data utama untuk aplikasi Plantify,
// agar setiap komponen punya struktur data yang konsisten & aman.
// ================================


// --------------------------------
// 🌡️ Tipe data suhu (Temperature)
// --------------------------------

// "Temp" merepresentasikan suhu dalam dua satuan:
// - Celsius (°C)
// - Fahrenheit (°F)
export type Temp = { 
  celsius: number; 
  fahrenheit: number; 
};



// --------------------------------
// 🌿 Tipe utama: Plant (Tanaman)
// --------------------------------

// Tipe ini mendefinisikan seluruh atribut yang dimiliki oleh 1 tanaman.
// Semua data ini bisa digunakan untuk menampilkan info tanaman
// atau bahan perhitungan sistem rekomendasi.
export type Plant = {
  id: number;               // ID unik untuk tiap tanaman
  latin: string;            // Nama latin tanaman (wajib ada)
  family?: string;          // Famili biologis (opsional)
  common?: string[];        // Daftar nama umum (misal: "Lidah Mertua", "Sansevieria")
  category?: string;        // Jenis tanaman (Indoor, Outdoor, Succulent, dsb)
  origin?: string;          // Asal daerah tanaman (misal: "Tropis", "Afrika Timur")
  climate?: string;         // Iklim ideal tempat tumbuh
  tempmax?: Temp;           // Suhu maksimum ideal (pakai tipe Temp di atas)
  tempmin?: Temp;           // Suhu minimum ideal
  ideallight?: string;      // Jenis cahaya yang paling ideal (misal: "Bright Indirect")
  toleratedlight?: string;  // Jenis cahaya yang masih bisa ditoleransi
  watering?: string;        // Frekuensi penyiraman (misal: "Moderate")
  insects?: string[];       // Hama umum yang menyerang tanaman ini
  diseases?: string[];      // Penyakit umum tanaman
  use?: string[];           // Kegunaan (misal: dekoratif, penyaring udara, obat)
  image?: string;           // URL atau path gambar tanaman
};



// --------------------------------
// ⚙️ Tipe untuk filter pengguna (UserFilter)
// --------------------------------

// Struktur data ini dipakai ketika user memilih preferensi tanaman,
// misal: ingin tanaman dengan cahaya terang & perawatan ringan.
export type UserFilter = {
  light?: string;                         // Intensitas cahaya (Light Intensity)
  location?: string;                      // Lokasi (opsional / legacy)
  placement?: string;                     // Penempatan (opsional / legacy)
  climate?: string;                       // Iklim lokal pengguna
  aesthetic?: string;                     // Tujuan estetika (misal: meja kerja, taman mini)
  watering?: "Light" | "Moderate" | "Frequent" | string; // Frekuensi penyiraman
  category?: string;                      // Kategori tanaman (misal: indoor, outdoor)
};



// --------------------------------
// 🌸 Fungsi bantu: displayName()
// --------------------------------

// Fungsi ini memilih nama yang paling "enak dibaca" untuk ditampilkan ke pengguna.
// Urutannya:
// 1. Jika tanaman punya nama umum kedua → tampilkan itu.
// 2. Jika tidak ada → pakai nama umum pertama.
// 3. Kalau dua-duanya tidak ada → pakai nama latin.
export const displayName = (p: Plant) =>
  p.common?.[1] ?? p.common?.[0] ?? p.latin;



// --------------------------------
// 🧮 Tipe untuk bobot rekomendasi (RecommendationWeights)
// --------------------------------

// Struktur ini menentukan "seberapa penting" tiap faktor
// dalam sistem rekomendasi tanaman.
export interface RecommendationWeights {
  category: number;       // Bobot kecocokan kategori
  climate: number;        // Bobot kecocokan iklim
  lightIdeal: number;     // Bobot cahaya ideal
  lightTolerated: number; // Bobot cahaya yang masih bisa ditoleransi
  aesthetic: number;      // Bobot kesesuaian estetika
  watering: number;       // Bobot kesesuaian frekuensi penyiraman
  // ✅ Bisa ditambah fitur lain di masa depan, misalnya suhu, hama, atau penggunaan.
}



// --------------------------------
// 📊 Konstanta: DEFAULT_WEIGHTS
// --------------------------------

// Nilai default untuk semua bobot di atas.
// Nilai lebih tinggi artinya faktor tersebut dianggap lebih penting.
export const DEFAULT_WEIGHTS: RecommendationWeights = {
  category: 4, // Naikkan bobot kategori karena paling spesifik dan langsung memfilter tipe tanaman
  climate: 3,  // Iklim cukup penting agar tanaman cocok dengan lingkungan pengguna
  lightIdeal: 2,
  lightTolerated: 1,
  aesthetic: 1,
  watering: 1,
};

// 🔚 Akhir dari lib/types.ts
// Semua tipe ini akan diimpor di modul lain agar konsisten di seluruh sistem.
