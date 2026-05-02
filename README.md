# 📱 MyTaskList App

> Task manager modern dengan dark theme, prioritas, dan filter — dibangun dengan React Native & Expo.

---

## 👤 Identitas Mahasiswa

| Field | Detail |
|-------|--------|
| **Nama** | [Muhammad Ariq Rifqy Nasution] |
| **NIM** | [243303621261] |
| **Kelas** | [4PAGIB] |
| **Mata Kuliah** | Pemrograman Mobile(react native) |

---

## 📝 Deskripsi App

**MyTaskList** adalah aplikasi task manager mobile bergaya dark & modern yang dibangun menggunakan React Native dan Expo. App ini memungkinkan pengguna untuk mengelola tugas harian dengan fitur tambah, hapus, tandai selesai, dan filter berdasarkan status. Setiap task bisa dikategorikan berdasarkan prioritas (Tinggi/Sedang/Rendah) dengan warna indikator yang berbeda, sehingga pengguna dapat fokus pada hal yang paling penting.

---

## ✅ Fitur yang Diimplementasikan

### Requirement Wajib
- [x] **①** Project dibuat dengan `npx create-expo-app` & bisa dijalankan via Expo Go di HP fisik
- [x] **②** Komponen dasar: `View`, `Text`, `TouchableOpacity` + `StyleSheet` & Flexbox
- [x] **③** State management dengan `useState` — state `inputText` & state `tasks` (array)
- [x] **③** Conditional rendering — badge "Selesai", counter progress, empty state per filter
- [x] **④** Form input dengan `TextInput` + `KeyboardAvoidingView`
- [x] **④** Validasi input: tidak boleh kosong & minimal 3 karakter + pesan error informatif
- [x] **⑤** `FlatList` dengan `keyExtractor` yang valid (menggunakan `id` unik)
- [x] **⑤** `ListEmptyComponent` — tampilan berbeda per filter (Semua/Aktif/Selesai)
- [x] **⑥** Fitur **Add** — tambah task baru dengan prioritas
- [x] **⑥** Fitur **Delete** — hapus task dengan konfirmasi Alert + animasi fade out

### Fitur Bonus
- [x] **+5** ✅ Mark as Done — centang/uncentang task dengan animasi visual
- [x] **+5** 🎨 Prioritas task (Tinggi/Sedang/Rendah) dengan warna berbeda (merah/kuning/teal)
- [x] **+5** 📊 Counter "X task selesai dari Y total" + progress bar animatif
- [x] **+5** 🔍 Filter view: Semua / Aktif / Selesai dengan empty state masing-masing
- [x] **+10** 💎 UI yang sangat rapi, konsisten, dan profesional (dark theme, priority stripe, badge)

---

## 🎨 Fitur Detail

| Fitur | Keterangan |
|-------|-----------|
| Dark Theme | Background gelap `#0F0F1A` dengan card navy untuk eye-friendly |
| Priority Stripe | Strip warna kiri card: 🔴 Merah / 🟡 Kuning / 🟢 Teal |
| Progress Bar | Bar teal yang mengisi seiring task selesai |
| Fade Animation | Card menghilang smooth saat dihapus |
| Alert Konfirmasi | Dialog konfirmasi sebelum hapus task |
| Empty State | Pesan berbeda untuk tiap kondisi filter |
| Timestamp | Jam ditambahkan otomatis saat task dibuat |

---

## 📸 Screenshot


![Home Screen](https://i.imgur.com/6Po3oi7.jpeg)
![Aktif](https://i.imgur.com/ZshUVyT.jpeg)
![Selesai](https://i.imgur.com/xj4kPHi.jpeg)


---

## 🚀 Cara Menjalankan Project

### Prerequisites
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Expo Go app di HP fisik (download dari App Store / Play Store)

### Steps

```bash
# 1. Clone atau extract project
cd MyTaskListApp

# 2. Install dependencies
npm install

# 3. Jalankan development server
npx expo start

# 4. Scan QR Code yang muncul di terminal dengan:
#    - Android: Kamera HP atau app Expo Go
#    - iOS: Kamera HP (langsung ke Expo Go)
```

### Troubleshooting
```bash
# Kalau ada error cache, coba:
npx expo start --clear

# Pastikan HP dan laptop satu WiFi yang sama!
```

---

## 🗂️ Struktur Project

```
MyTaskListApp/
├── App.js              ← Main component (semua logic & UI)
├── app.json            ← Konfigurasi Expo
├── package.json        ← Dependencies
├── assets/             ← Icon, splash screen
└── README.md           ← File ini
```

---

## 🛠️ Tech Stack

- **React Native** — Framework UI mobile
- **Expo SDK ~52** — Development toolchain
- **React Hooks** — `useState`, `useRef` untuk state management
- **Animated API** — Animasi fade out saat delete

---

## 📋 Konsep yang Diintegrasikan

| Pertemuan | Konsep | Implementasi |
|-----------|--------|-------------|
| P02 | Komponen Dasar | `View`, `Text`, `TouchableOpacity`, `ScrollView` |
| P03 | Layout & Styling | `StyleSheet.create`, Flexbox, responsive spacing |
| P04 | State & Conditional | `useState` untuk input & tasks, rendering kondisional |
| P05 | Form & Input | `TextInput`, `KeyboardAvoidingView`, validasi & error |
| P06 | List Dinamis | `FlatList`, `keyExtractor`, `ListEmptyComponent` |

--
