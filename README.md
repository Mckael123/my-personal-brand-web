# my-personal-brand-web

Website personal branding futuristik untuk Rafid Nagara dengan gaya warna biru neon, hitam, putih, dan integrasi GitHub publik.

## Fitur

- Landing page personal branding berbahasa Indonesia.
- Desain futuristik dengan glassmorphism, neon glow, dan layout responsif.
- Section Tentang, Keahlian, Proyek, GitHub, dan Kontak.
- Integrasi GitHub API untuk menampilkan profil dan repository terbaru dari `Rafid-Nagara`.
- Fallback ramah jika GitHub API gagal dimuat atau terkena rate limit.

## Struktur

```text
.
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Cara Menjalankan

Buka `index.html` langsung di browser, atau jalankan static server lokal:

```bash
python3 -m http.server 8000
```

Lalu buka:

```text
http://localhost:8000
```

## Catatan GitHub API

Website memakai public GitHub API tanpa token:

- `https://api.github.com/users/Rafid-Nagara`
- `https://api.github.com/users/Rafid-Nagara/repos?sort=updated&per_page=6`

Karena tanpa token, API dapat terkena rate limit. Jika itu terjadi, website tetap menampilkan link langsung ke GitHub.
