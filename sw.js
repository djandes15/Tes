const CACHE_NAME = 'djandes-v3'; // Naikkan versi ke v3 agar browser mendownload ulang script yang benar
const ASSETS = [
    '/',                    // Root domain Vercel
    '/pos.html',            // File fisik HTML Anda
    '/configpos.js',        // File config Anda
    '/printerpos.js',       // File printer Anda
    'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Mengunduh aset ke dalam HP saat pertama kali online (Lebih Aman & Kebal Error)
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Menggunakan Promise.all agar jika salah satu aset gagal/berubah nama, 
            // aset penting lainnya (seperti Tailwind & HTML) tetap sukses dikunci ke memori HP.
            return Promise.all(
                ASSETS.map(url => {
                    return cache.add(url).catch(err => console.warn('Gagal mengunci aset:', url, err));
                })
            );
        }).then(() => self.skipWaiting())
    );
});

// Aktifkan service worker baru secara instan
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Mengambil aset dari internal HP jika sedang offline
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            // Jika ada di memori internal, langsung berikan (Sangat Cepat)
            if (cachedResponse) {
                return cachedResponse;
            }
            // Jika tidak ada di cache, baru ambil dari internet
            return fetch(e.request);
        })
    );
});
