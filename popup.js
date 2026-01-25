
const target = document.getElementById('status-container');

if (target) {
    target.innerHTML = `
    <style>
        .ag-wrapper { font-family: -apple-system, sans-serif; background-color: #f0f2f5; display: flex; justify-content: center; align-items: center; padding: 5px; border-radius: 12px; }
        .card { background: white; padding: 0.5rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 100%; box-sizing: border-box; }
        .card h1 { color: #1c1e21; font-size: 24px; margin: 15px 0 10px 0; font-weight: 800; }
        .card p { color: #606770; font-size: 15px; margin-bottom: 25px; line-height: 1.4; }
        .btn { background-color: #0866ff; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; transition: background 0.3s; border: none; cursor: pointer; margin-bottom: 20px; }
        .btn:hover { background-color: #075ce4; }
        .footer-text { font-size: 12px; color: #8a8d91; margin-top: 20px; border-top: 1px solid #ebedf0; padding-top: 15px; text-align: left; }
        
        .ag-icon {
            font-size: 80px;
            color: #1877F2;
            margin-bottom: 15px;
            display: block;
        }

        /* CSS Perbaikan agar gambar tidak keluar area */
        .ag-image {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            display: block;
            margin: 0 auto 15px auto;
        }
    </style>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <div class="ag-wrapper">
        <div class="card">
            <i class="fas fa-shield ag-icon"></i>
            <h1>AVATAR GUARD</h1>
            <p>Aktifkan perisai foto profil untuk mencegah orang lain mengambil tangkapan layar atau mengunduh foto profil Anda.</p>
            
            <a href="https://github.com/tommydev27/AVATAR-GUARD-TM/archive/refs/heads/main.zip" class="btn" download>Download ZIP Sekarang</a>
            
            <img src="https://i.postimg.cc/T1ChXpBy/Beauty-Plus-IMAGE-ENHANCER-1769342192329.jpg" alt="Avatar Guard Illustration" class="ag-image">

            <div class="footer-text">
                <strong>Cara Pasang:</strong><br>
                1. Download & ekstrak file ZIP.<br>
                2. Buka Kiwi Browser, masuk ke menu <b>Extensions</b>.<br>
                3. Aktifkan <b>Developer Mode</b>.<br>
                4. Klik <b>(+) Load</b> dan pilih folder hasil ekstrak.
            </div>
        </div>
    </div>
    `;
}
