// Configuration for Supabase (New Database & Storage)
window.CONFIG = {
    SUPABASE_URL: 'https://rboiicqwzcdjxhnhkzkl.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJib2lpY3F3emNkanhobmhremtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDg2NDEsImV4cCI6MjA5NjIyNDY0MX0.Hjp4dCWf5bYnsXq1rnS-B9Cz70jQ4nP096sf-9ibl-s',

    // Image Optimization (ImageKit tetap dipakai untuk resize otomatis)
    IMAGEKIT_URL_ENDPOINT: 'https://ik.imagekit.io/robingladys/',
    DEFAULT_IMAGE: 'img/gambar.jpg',

    // Admin Password (Gunakan password lama Anda)
    ADMIN_PASSWORD: 'q',

    IMAGEKIT_OPTIONS: {
        THUMBNAIL: { width: 400, quality: 75, format: 'webp' },
        GALLERY: { width: 800, quality: 85, format: 'auto' },
        LOGO: { width: 200, quality: 90, format: 'webp' },
        PRODUCT: { width: 600, quality: 80, format: 'auto' }
    }
};

// Inisialisasi Supabase Client secara Global
const { createClient } = window.supabase;
window.supabaseClient = createClient(window.CONFIG.SUPABASE_URL, window.CONFIG.SUPABASE_KEY);

// Default data structure dengan SEMUA DATA PRODUK untuk offline mode
window.DEFAULT_DATA = {
    siteSettings: {
        title: "DJANDES",
        description: "Jl. Anggrek , RT 004 / RW 013, Tegalrejo, Sawentar, Kanigoro, Blitar.",
        logo: "img/gambar.jpg"
    },
    socialMedia: {
        facebook: "",
        instagram: "https://www.instagram.com/djandes15",
        twitter: "",
        tiktok: "https://www.tiktok.com/@djandes15?_t=ZS-90ortEzTnzY&_r=1"
    },
    contactInfo: {
        whatsapp: "+62 858-1200-6225",
        phone: "+62 858-1200-6225",
        email: "sidoelrasta@gmail.com",
        address: "Jl. Anggrek , RT 004 / RW 013, Tegalrejo, Sawentar, Kanigoro, Blitar.",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3949.8109453560633!2d112.2325264!3d-8.1207225!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78ebac417b43f7%3A0x806e165d29a57022!2sDjandes%20Sweet%20and%20Savoury!5e0!3m2!1sen!2sid!4v1761329279400!5m2!1sen!2sid",
        businessHours: "Senin - Minggu: 08:00 - 18:00 WIB"
    },
    aboutContent: {
        title: "Tentang DJANDES",
        description: "Sweet & Savoury - Kue Basah, Hantaran",
        detail: "DJANDES adalah home made kue basah lokal yang menyajikan berbagai macam kue tradisional dan modern dengan cita rasa autentik dan kualitas terbaik.",
        history: "Berdiri sejak 2021, DJANDES telah melayani puluhan pelanggan dengan berbagai produk kue basah yang lezat dan berkualitas.",
        vision: "Menjadi toko kue basah terdepan yang selalu memberikan pengalaman terbaik bagi pelanggan.",
        mission: "Menyediakan kue basah dengan bahan berkualitas, rasa autentik, dan pelayanan terbaik.",
        commitment: "Kami berkomitmen untuk selalu menggunakan bahan-bahan terbaik dan menjaga cita rasa tradisional dalam setiap produk yang kami sajikan.",
        quality: "Menggunakan bahan-bahan pilihan dan proses pembuatan yang higienis untuk menjamin kualitas terbaik.",
        fresh: "Semua kue dibuat fresh setiap hari sehingga Anda selalu mendapatkan produk yang segar dan enak.",
        service: "Kami siap melayani dengan ramah dan profesional untuk memastikan pengalaman berbelanja yang menyenangkan.",
        delivery: "Melayani pengantaran pesanan dengan jasa kurir, cepat dan tepat waktu ke seluruh area di Blitar (syarat & ketentuan berlaku)."
    },
    categories: [
        "Semua",
        "Kue Tradisional",
        "Kue Modern",
        "Kue Kering",
        "Hantaran",
        "Hampers",
        "Snack Box" // Tambahkan kategori baru
    ],
    // DATA BARU: Master Opsi Box (Global)
    opsiBoxGlobal: [
        {
            id: "box_mewah_besar",
            nama: "Box Mewah Besar",
            gambar: "https://ik.imagekit.io/robingladys/box-mewah-besar.jpg",
            tambahan_harga: 10000,
            kategori_berlaku: ["Hantaran", "Hampers"]
        },
        {
            id: "box_sedang",
            nama: "Box Sedang",
            gambar: "https://ik.imagekit.io/robingladys/box-sedang.jpg",
            tambahan_harga: 5000,
            kategori_berlaku: ["Snack Box", "Hantaran"]
        },
        {
            id: "box_sedang",
            nama: "Box Sedang",
            gambar: "https://ik.imagekit.io/robingladys/box-sedang.jpg",
            tambahan_harga: 5000,
            kategori_berlaku: ["Snack Box", "Hantaran"]
        },
        {
            id: "box_sedang",
            nama: "Box Sedang",
            gambar: "https://ik.imagekit.io/robingladys/box-sedang.jpg",
            tambahan_harga: 5000,
            kategori_berlaku: ["Snack Box", "Hantaran"]
        },
        {
            id: "box_sedang",
            nama: "Box Sedang",
            gambar: "https://ik.imagekit.io/robingladys/box-sedang.jpg",
            tambahan_harga: 5000,
            kategori_berlaku: ["Snack Box", "Hantaran"]
        },
        {
            id: "box_sedang",
            nama: "Box Sedang",
            gambar: "https://ik.imagekit.io/robingladys/box-sedang.jpg",
            tambahan_harga: 5000,
            kategori_berlaku: ["Snack Box", "Hantaran"]
        },
        {
            id: "box_sedang",
            nama: "Box Sedang",
            gambar: "https://ik.imagekit.io/robingladys/box-sedang.jpg",
            tambahan_harga: 5000,
            kategori_berlaku: ["Snack Box", "Hantaran"]
        },
        {
            id: "box_sedang",
            nama: "Box Sedang",
            gambar: "https://ik.imagekit.io/robingladys/box-sedang.jpg",
            tambahan_harga: 5000,
            kategori_berlaku: ["Snack Box", "Hantaran"]
        },
        {
            id: "box_kecil",
            nama: "Box Kecil",
            gambar: "https://ik.imagekit.io/robingladys/box-kecil.jpg",
            tambahan_harga: 3000,
            kategori_berlaku: ["Snack Box", "Hantaran", "Hampers"]
        }
    ],
    products: [
        {
            "id": 1761330047080,
            "name": "Lemper Kipas",
            "price": 126000,
            "description": "terbuat dari ketan pulen berisi abon atau ayam suwir berbumbu gurih, kemudian dibungkus dengan daun pisang dan dikukus.",
            "image": "img/lemper.jpg",
            "category": "Hantaran",
            "images": [
                "img/lemper.jpg",
                "img/lemperbiasa.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 5,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761330657461,
            "name": "Bolen pisang",
            "price": 120000,
            "description": "kue pastry berlapis renyah yang berisi irisan pisang dan cokelat atau keju di dalamnya.",
            "image": "img/bolenpisang.jpg",
            "category": "Hantaran",
            "images": [
                "img/bolenpisang.jpg",
                "img/bolen.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761365259154,
            "name": "Bolu gulung Toping",
            "price": 210000,
            "description": "kue lembut berbentuk gulungan yang diisi selai manis atau krim lembut, kemudian diberi topping menarik seperti keju, cokelat, atau meses di atasnya.",
            "image": "img/gulung.jpg",
            "category": "Hantaran",
            "images": [
                "img/gulung.jpg",
                "img/gulung2.jpg"
            ],
            // FIELD BARU
            "status_stok": "habis", // CONTOH PRODUK HABIS
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761365369638,
            "name": "Wingko babat",
            "price": 135000,
            "description": "terbuat dari kelapa parut, tepung ketan, gula, dan santan, kemudian dipanggang hingga beraroma harum dan bertekstur kenyal legit.",
            "image": "img/wingkobabat.jpg",
            "category": "Hantaran",
            "images": [
                "img/wingkobabat.jpg",
                "img/wingkobabat2.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": false, // CONTOH TANPA OPSI BOX
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761365440506,
            "name": "Fudgy brownies",
            "price": 150000,
            "description": "Fudgy brownies adalah jenis brownies yang memiliki tekstur lembut, padat, dan sangat kenyal di dalamnya. Terbuat dari campuran cokelat leleh, mentega, telur, gula, dan sedikit tepung.",
            "image": "img/fudgybrownies.jpg",
            "category": "Hantaran",
            "images": [
                "img/fudgybrownies.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761365520498,
            "name": "Telur asin",
            "price": 190000,
            "description": "olahan telur bebek yang diawetkan dengan cara direndam dalam larutan garam atau dibalut adonan garam dan abu, menghasilkan rasa gurih dan asin khas.",
            "image": "img/asin.jpg",
            "category": "Hantaran",
            "images": [
                "img/asin.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 10, // CONTOH MINIMAL ORDER > 1
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761365597291,
            "name": "Lumpia Tower",
            "price": 120000,
            "description": "sajian lumpia yang disusun tinggi menyerupai tower, berisi sayuran segar, ayam, atau daging cincang dengan kulit lumpia renyah.",
            "image": "img/lumpia.jpg",
            "category": "Hantaran",
            "images": [
                "img/lumpia.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761365658085,
            "name": "Kue thok",
            "price": 120000,
            "description": "berbahan dasar tepung ketan dan isian kacang hijau kupas, dibentuk tebal dan padat dengan tekstur kenyal dan lembut.",
            "image": "img/tok.jpg",
            "category": "Hantaran",
            "images": [
                "img/tok.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761365742441,
            "name": "Putu ayu - Saus gula merah",
            "price": 112500,
            "description": "kue tradisional lembut berbahan dasar tepung terigu, kelapa parut, dan santan, dengan bentuk cantik berlapis kelapa di atasnya. Disajikan bersama saus gula merah kental dan manis.",
            "image": "img/putu.jpg",
            "category": "Hantaran",
            "images": [
                "img/putu.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761365789770,
            "name": "Jadah Ketan",
            "price": 150000,
            "description": "Makanan ini terbuat dari ketan (beras ketan) yang dimasak dengan kelapa parut, memberikan rasa gurih yang lezat dan dipadatkan, lalu dibentuk menjadi bentuk hati .",
            "image": "img/jadah.jpg",
            "category": "Hantaran",
            "images": [
                "img/jadah.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761365848544,
            "name": "Putu Ayu clasic",
            "price": 102500,
            "description": "kue tradisional lembut berbahan dasar tepung terigu, kelapa parut, dan santan, dengan bentuk cantik berlapis kelapa di atasnya.",
            "image": "img/putu2.jpg",
            "category": "Hantaran",
            "images": [
                "img/putu2.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761366079491,
            "name": "Wajik ketan - gula merah",
            "price": 165000,
            "description": "Terbuat dari beras ketan dan gula merah, menghasilkan rasa manis legit dengan aroma khas kelapa dan karamel dari gula merah. Teksturnya lengket dan kenyal, mirip dengan jadah, tetapi wajik biasanya lebih manis dan padat.",
            "image": "img/wajik.jpg",
            "category": "Hantaran",
            "images": [
                "img/wajik.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761366457110,
            "name": "Puding susu clasic + Vla",
            "price": 117500,
            "description": "terbuat dari susu murni, agar-agar, dan sedikit gula, menghasilkan rasa manis ringan dan creamy. Disajikan dengan vla vanila lembut di atasnya.",
            "image": "img/pudingvla.jpg?updatedAt=1761370890554",
            "category": "Hantaran",
            "images": [
                "img/pudingvla.jpg?updatedAt=1761370890554"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761366531770,
            "name": "Caramel",
            "price": 95000,
            "description": "Terbuat dari gula yang dimasak hingga menjadi karamel, kemudian dicampur dengan adonan tepung dan telur.",
            "image": "img/karamel.jpg",
            "category": "Hantaran",
            "images": [
                "img/karamel.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761368585958,
            "name": "Pie buah",
            "price": 132500,
            "description": "kue tart mini dengan kulit pastry renyah yang diisi vla lembut dan dihias dengan aneka potongan buah segar di atasnya.",
            "image": "img/pie_buah.webp",
            "category": "Hantaran",
            "images": [
                "img/pie_buah.webp"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761368682877,
            "name": "Pie brownies",
            "price": 132500,
            "description": "Perpaduan lezat antara kulit pie renyah dan isian brownies cokelat lembut di dalamnya.",
            "image": "img/pie-brownies.jpg",
            "category": "Hantaran",
            "images": [
                "img/pie-brownies.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761368763118,
            "name": "Onde - onde",
            "price": 100000,
            "description": "Jajanan tradisional berbentuk bulat yang terbuat dari tepung ketan, berisi kacang hijau manis, dan dilapisi taburan wijen di bagian luar.",
            "image": "img/onde.jpg",
            "category": "Hantaran",
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761369387340,
            "name": "Puff Pastry",
            "price": 110000,
            "description": "pastry berlapis yang dibuat dari adonan tepung dan menteba sehingga menghasilkan tekstur ringan, renyah, dan berlapis-lapis saat dipanggang.",
            "image": "img/pastry2.jpg",
            "category": "Hantaran",
            "images": [
                "img/pastry.jpg",
                "img/pastry2.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761369459952,
            "name": "Dadar gulung mawar",
            "price": 103000,
            "description": "dadar gulung pandan yang diisi kelapa parut manis dan dibentuk menyerupai bunga mawar cantik.",
            "image": "img/mawar.jpg",
            "category": "Hantaran",
            "images": [
                "img/mawar.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761369522206,
            "name": "Bikang",
            "price": 105000,
            "description": "kue tradisional berbentuk bunga besar atau motif unik, terbuat dari tepung beras, santan, dan gula.",
            "image": "img/bikang.jpg",
            "category": "Hantaran",
            "images": [
                "img/bikang.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761369595726,
            "name": "Proll Tape",
            "price": 115000,
            "description": "terbuat dari adonan tepung dan telur, diisi tape singkong manis fermentasi yang khas rasanya.",
            "image": "img/prolltape.jpeg",
            "category": "Hantaran",
            "images": [
                "img/prolltape.jpeg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761369803702,
            "name": "Risol Tower",
            "price": 130000,
            "description": "Sajian Risol yang disusun tinggi menyerupai tower, berisi sayuran segar, ayam, atau daging cincang dengan kulit lumpia renyah.",
            "image": "img/lumpia.jpg",
            "category": "Hantaran",
            "images": [
                "img/lumpia.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761369883058,
            "name": "Sosis solo Tower",
            "price": 150000,
            "description": "sajian soslo yang disusun tinggi menyerupai tower, ayam cincang dengan kulit lumpia renyah.",
            "image": "img/lumpia.jpg",
            "category": "Hantaran",
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761370004874,
            "name": "Pastel",
            "price": 105000,
            "description": "kue goreng berbentuk setengah lingkaran dengan kulit tipis renyah dan isi sayuran, telur, ayam berbumbu gurih.",
            "image": "img/pastel.jpg",
            "category": "Hantaran",
            "images": [
                "img/pastel.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761370078128,
            "name": "Lemper",
            "price": 110000,
            "description": "terbuat dari ketan pulen berisi ayam suwir berbumbu gurih, kemudian dibungkus dengan daun pisang dan dikukus.",
            "image": "img/lemperbiasa.jpg",
            "category": "Hantaran",
            "images": [
                "img/lemperbiasa.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761370218863,
            "name": "Wajik + Jadah",
            "price": 315000,
            "description": "kue tradisional wajik manis legit dan jadah gurih lembut, terbuat dari beras ketan, gula merah, parutan kelapa dan santan.",
            "image": "img/wajikjadah.jpg",
            "category": "Hantaran",
            "images": [
                "img/wajikjadah.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761370289022,
            "name": "Lumpur Kentang",
            "price": 115000,
            "description": "kue tradisional lembut yang terbuat dari kentang, tepung, telur, dan gula, menghasilkan tekstur kenyal dan lembut.",
            "image": "img/lumpur.jpg",
            "category": "Hantaran",
            "images": [
                "img/lumpur.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761370358502,
            "name": "Bolu Kukus Mekar",
            "price": 92500,
            "description": "kue lembut dan mengembang sempurna yang dibuat dari tepung, telur, gula, dan bahan perisa seperti pandan atau cokelat, dikukus hingga matang.",
            "image": "img/kukus.webp",
            "category": "Hantaran",
            "images": [
                "img/kukus.webp"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761370438578,
            "name": "Parcell Buah Polynett",
            "price": 250000,
            "description": "Rangkaian buah segar pilihan yang disusun cantik dalam keranjang atau kemasan elegan, cocok untuk hadiah, ucapan selamat, atau hampers acara spesial.",
            "image": "img/parcell.jpg",
            "category": "Hantaran",
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761371256666,
            "name": "Wedding Tart",
            "price": 190000,
            "description": "kue tart elegan yang dirancang khusus untuk acara pernikahan, biasanya terdiri dari lapisan sponge cake lembut, vla atau krim, dan hiasan dekoratif cantik.",
            "image": "img/weddingtart.jpg",
            "category": "Hantaran",
            "images": [
                "img/weddingtart.jpg"
            ],
            // FIELD BARU
            "status_stok": "tersedia",
            "minimal_order": 1,
            "opsi_produk_aktif": true,
            "tipe_produk": "tunggal"
        },
        {
            "id": 1761371550898,
            "name": "Snack Box Kenangan", // UBAH NAMA MENJADI CONTOH PAKET
            "price": 150000,
            "description": "Paket snack box dengan pilihan berbagai kue kering dan basah favorit, cocok untuk acara arisan, meeting, atau syukuran.",
            "image": "img/keripik.jpg",
            "category": "Snack Box", // UBAH KATEGORI
            "images": [
                "img/keripik.jpg"
            ],
            // FIELD BARU - CONTOH PRODUK PAKET
            "status_stok": "tersedia",
            "minimal_order": 5, // MINIMAL ORDER 5 PAKET
            "opsi_produk_aktif": true,
            "tipe_produk": "paket_snack_box",
            "komponen_paket": {
                "produk_id_yang_boleh_dipilih": [1761330047080, 1761330657461, 1761365259154, 1761365369638, 1761365440506], // ID Lemper, Bolen, Bolu, Wingko, Brownies
                "jumlah_wajib_pilih": 3
            }
        }
    ],
    salesData: [
        {
            "id": 1762269473402,
            "date": "2025-11-04T15:17:53.402Z",
            "customerName": "sudirman",
            "pickupDate": "Kamis, 27 November 2025",
            "pickupTime": "13:03",
            "items": [
                {
                    "id": 1761330047080,
                    "name": "Lemper Kipas",
                    "price": 126000,
                    "quantity": 1,
                    "subtotal": 126000
                },
                {
                    "id": 1761330657461,
                    "name": "Bolen pisang",
                    "price": 120000,
                    "quantity": 1,
                    "subtotal": 120000
                },
                {
                    "id": 1761365259154,
                    "name": "Bolu gulung Toping",
                    "price": 210000,
                    "quantity": 1,
                    "subtotal": 210000
                },
                {
                    "id": 1761365369638,
                    "name": "Wingko babat",
                    "price": 135000,
                    "quantity": 1,
                    "subtotal": 135000
                },
                {
                    "id": 1761365440506,
                    "name": "Fudgy brownies",
                    "price": 150000,
                    "quantity": 1,
                    "subtotal": 150000
                },
                {
                    "id": 1761365520498,
                    "name": "Telur asin",
                    "price": 190000,
                    "quantity": 1,
                    "subtotal": 190000
                },
                {
                    "id": 1761365597291,
                    "name": "Lumpia Tower",
                    "price": 120000,
                    "quantity": 1,
                    "subtotal": 120000
                },
                {
                    "id": 1761365658085,
                    "name": "Kue thok",
                    "price": 120000,
                    "quantity": 1,
                    "subtotal": 120000
                }
            ],
            "totalAmount": 1171000,
            "status": "cancelled"
        },
        {
            "id": 1762279375992,
            "date": "2025-11-04T18:02:55.992Z",
            "customerName": "sudirman2",
            "pickupDate": "Rabu, 26 November 2025",
            "pickupTime": "11:00",
            "items": [
                {
                    "id": 1761330047080,
                    "name": "Lemper Kipas",
                    "price": 126000,
                    "quantity": 1,
                    "subtotal": 126000
                },
                {
                    "id": 1761330657461,
                    "name": "Bolen pisang",
                    "price": 120000,
                    "quantity": 1,
                    "subtotal": 120000
                },
                {
                    "id": 1761365259154,
                    "name": "Bolu gulung Toping",
                    "price": 210000,
                    "quantity": 1,
                    "subtotal": 210000
                },
                {
                    "id": 1761365369638,
                    "name": "Wingko babat",
                    "price": 135000,
                    "quantity": 1,
                    "subtotal": 135000
                }
            ],
            "totalAmount": 591000,
            "status": "cancelled"
        }
    ],
    themeSettings: {
        primaryColor: "#3498db",
        secondaryColor: "#2980b9",
        backgroundColor: "#ecf0f1",
        textColor: "#2c3e50"
    }
};