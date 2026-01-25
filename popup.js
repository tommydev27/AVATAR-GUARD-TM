const target = document.getElementById('status-container');

if (target) {
    target.innerHTML = `
    <style>
        /* Reset CSS khusus untuk container ini */
        #status-container {
            all: initial; /* Menghapus pengaruh CSS luar */
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: auto; /* Diubah dari 100vh ke auto agar tidak memaksa tinggi */
            background-color: #f0f2f5;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 20px 0;
            width: 100%;
        }
        .ag-wrapper { 
            width: 100%; 
            display: flex; 
            justify-content: center; 
            padding: 10px; 
            box-sizing: border-box; 
        }
        .card { 
            background: white; 
            padding: 20px 20px 0 20px; 
            border-radius: 12px; 
            box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
            text-align: center; 
            max-width: 380px; 
            width: 100%; 
            overflow: hidden;
            box-sizing: border-box;
        }
        .shield-icon { width: 60px; height: 60px; fill: #1877F2; margin: 0 auto 15px auto; }
        .card h1 { color: #1c1e21; font-size: 18px; margin: 0 0 10px 0; font-weight: 800; }
        .card p { color: #606770; font-size: 14px; line-height: 1.4; margin-bottom: 20px; }
        .btn { 
            background-color: #0866ff; 
            color: white !important; 
            padding: 12px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold; 
            display: block; 
            margin-bottom: 20px; 
            font-size: 15px;
        }
        .ag-image { width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px; border: 1px solid #eee; display: block; }
        .instruction { 
            font-size: 12px; 
            color: #65676b; 
            text-align: left; 
            border-top: 1px solid #ebedf0; 
            padding: 15px 0; 
            line-height: 1.6;
        }
        .tw-footer { 
            background: #f8f9fa; 
            margin: 0 -20px; 
            padding: 12px; 
            font-size: 11px; 
            color: #8a8d91; 
            border-top: 1px solid #ebedf0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 4px;
        }
        .tw-footer b { color: #0866ff; }
    </style>

    <div class="ag-wrapper">
        <div class="card">
            <div class="shield-icon">
                <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.14-3.13 7.85-7 9.01v-9.01H5V6.3l7-3.11v8.8z"></path></svg>
            </div>
            <h1>AVATAR GUARD</h1>
            <p>Aktifkan perisai foto profil untuk mencegah orang lain mengambil tangkapan layar atau mengunduh foto profil Anda.</p>
            <a href="https://github.com/tommydev27/AVATAR-GUARD-TM/archive/refs/heads/main.zip" class="btn">Download ZIP Sekarang</a>
            <img src="https://i.postimg.cc/T1ChXpBy/Beauty-Plus-IMAGE-ENHANCER-1769342192329.jpg" class="ag-image">
            <div class="instruction">
                <b>Cara Pasang:</b><br>
                1. Download & Ekstrak file ZIP.<br>
                2. Buka Kiwi/Lemur Browser & menu Extensions.<br>
                3. Aktifkan Mode Pengembang.<br>
                4. Klik Load & pilih folder hasil ekstrak.
            </div>
            <div class="tw-footer">
                Developed by <b>TommyWeb</b> &copy; 2026
            </div>
        </div>
    </div>
    `;
}
