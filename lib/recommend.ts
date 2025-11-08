// ================================================
// 📘 lib/recommend.ts
// Modul utama untuk sistem rekomendasi tanaman.
// Menghitung tingkat kecocokan (score) antara
// preferensi pengguna (UserFilter) dan data tanaman (Plant).
// ================================================


// --------------------------------
// 🔗 Import tipe dan konstanta
// --------------------------------

// Mengimpor tipe Plant (data tanaman),
// UserFilter (filter preferensi pengguna),
// dan RecommendationWeights (bobot faktor).
import type { Plant, UserFilter, RecommendationWeights } from "./types";

// Mengimpor bobot default dari file types.ts
import { DEFAULT_WEIGHTS } from "./types";



// --------------------------------
// 🧮 Tipe data: Scored
// --------------------------------

// Struktur data untuk menyimpan hasil akhir rekomendasi.
// Setiap tanaman akan disertai dua nilai skor:
// - score → skor mentah hasil perhitungan bobot
// - normalizedScore → skor yang sudah dinormalisasi (dibagi dengan skor maksimum)
export type Scored = { 
  plant: Plant; 
  score: number; 
  normalizedScore: number; 
};



// --------------------------------
// 🧹 Fungsi pembantu: cleanInput()
// --------------------------------

// Membersihkan input teks dari user agar konsisten sebelum dibandingkan.
// Tujuannya: menghindari mismatch karena huruf besar/kecil atau spasi.
//
// Contoh:
// Input: "  Bright Light "  → Output: "bright light"
const cleanInput = (input: string | null | undefined): string | undefined => {
  const trimmed = input?.trim();         // Hapus spasi di awal & akhir
  if (!trimmed || trimmed === "") {      // Jika kosong, kembalikan undefined
    return undefined;
  }
  return trimmed.toLowerCase();          // Ubah semua huruf jadi kecil
};



// --------------------------------
// 🌿 Fungsi utama: recommend()
// --------------------------------
//
// Fungsi ini menghasilkan daftar tanaman dengan skor kecocokan
// berdasarkan preferensi user & bobot faktor yang diberikan.
//
// Parameter:
// - all → daftar semua tanaman yang tersedia
// - f → filter yang diisi user (UserFilter)
// - weights → bobot faktor (bisa pakai DEFAULT_WEIGHTS)
//
// Output: array berisi { plant, score, normalizedScore } yang diurutkan
// --------------------------------
export function recommend(
  all: Plant[],
  f: UserFilter,
  weights: RecommendationWeights = DEFAULT_WEIGHTS // Gunakan bobot default jika tidak diberikan
): Scored[] {

  // --------------------------------
  // 1️⃣ Hitung skor maksimum yang mungkin
  // --------------------------------
  // Digunakan nanti untuk normalisasi skor agar bernilai 0–1.
  const MAX_SCORE = Object.values(weights).reduce((sum, val) => sum + val, 0);



  // --------------------------------
  // 2️⃣ Bersihkan input user
  // --------------------------------
  // Gunakan cleanInput agar semua teks lowercase & tidak kosong.
  const cleaned = {
    light: cleanInput(f.light),
    climate: cleanInput(f.climate),
    aesthetic: cleanInput(f.aesthetic),
    category: cleanInput(f.category),
    watering: cleanInput(f.watering),
  };



  // --------------------------------
  // 3️⃣ Proses setiap tanaman
  // --------------------------------
  // Untuk setiap tanaman dalam daftar `all`,
  // hitung skor kecocokannya berdasarkan filter user dan bobot faktor.
  const list: Scored[] = all.map((p) => {
    let s = 0; // Inisialisasi skor awal = 0


    // ================================
    // 🌱 LOGIKA PEMBERIAN SKOR
    // ================================

    // --- Kategori ---
    // Jika kategori tanaman mengandung kata yang diminta user,
    // tambahkan bobot kategori ke skor.
    if (cleaned.category) {
      const pCategory = (p.category ?? "").toLowerCase();
      if (pCategory.includes(cleaned.category)) s += weights.category;
    }

    // --- Iklim ---
    // Jika iklim tanaman cocok (pemaaf: pakai includes),
    // tambahkan bobot iklim ke skor.
    if (cleaned.climate) {
      const pClimate = (p.climate ?? "").toLowerCase();
      if (pClimate.includes(cleaned.climate)) s += weights.climate;
    }

    // --- Cahaya ---
    // Diperiksa dalam dua level:
    // 1. Jika cahaya ideal cocok → tambahkan bobot lightIdeal.
    // 2. Jika tidak cocok tapi masih ditoleransi → tambahkan lightTolerated.
    if (cleaned.light) {
      const ideal = (p.ideallight ?? "").toLowerCase();
      const toleran = (p.toleratedlight ?? "").toLowerCase();

      if (ideal.includes(cleaned.light)) s += weights.lightIdeal;
      else if (toleran.includes(cleaned.light)) s += weights.lightTolerated;
    }

    // --- Estetika / Kegunaan ---
    // Cek apakah nilai estetika user cocok dengan salah satu item di array "use".
    if (cleaned.aesthetic) {
      const uses = Array.isArray(p.use) 
        ? p.use.map(u => String(u).toLowerCase()) 
        : [];
      if (uses.some((u) => u.includes(cleaned.aesthetic!))) s += weights.aesthetic;
    }

    // --- Penyiraman ---
    // Jika tingkat penyiraman cocok, tambahkan bobot watering.
    if (cleaned.watering) {
      const w = String(p.watering ?? "").toLowerCase();
      if (w.includes(cleaned.watering)) s += weights.watering;
    }


    // ================================
    // 🔢 NORMALISASI SKOR
    // ================================
    // Normalisasi agar skor berada di rentang 0–1.
    // Rumus: normalizedScore = s / MAX_SCORE
    const normalizedScore = MAX_SCORE > 0 ? s / MAX_SCORE : 0;

    // Kembalikan objek hasil perhitungan untuk 1 tanaman.
    return { plant: p, score: s, normalizedScore };
  });



  // --------------------------------
  // 4️⃣ Urutkan hasil rekomendasi
  // --------------------------------
  // - Pertama berdasarkan skor mentah (descending → dari tertinggi)
  // - Jika sama, urutkan berdasarkan nama latin (ascending)
  return list
    .sort((a, b) => (b.score - a.score) || a.plant.latin.localeCompare(b.plant.latin));
}
