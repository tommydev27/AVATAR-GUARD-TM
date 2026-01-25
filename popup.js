
const target = document.getElementById('status-container');

if (target) {
    target.innerHTML = `
    <style>
        #status-container {
            display: flex;
            justify-content: center;
            align-items: flex-start; /* Mulai dari atas agar tidak terpotong header */
            min-height: 100vh;
            background-color: #f0f2f5;
            font-family: -apple-system, sans-serif;
            margin: 0;
            padding: 0;
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
            padding: 20px 10px; 
            border-radius: 12px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
            text-align: center; 
            max-width: 400px; 
            width: 100%; 
            overflow: hidden;
            margin-top: 10px;
        }
        .shield-icon { width: 65px; height: 65px; fill: #1877F2; margin: 0 auto 10px auto; }
        .card h1 { color: #1c1e21; font-size: 20px; margin: 0 0 10px 0; font-weight: 800; text-transform: uppercase; }
        .card p { color: #606770; font-size: 14px; line-height: 1.4; margin-bottom: 20px; padding: 0 10px; }
        .btn { 
            background-color: #0866ff; 
            color: white !important; 
            padding: 12px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold; 
            display: block; 
            margin: 0 auto 20px auto; 
            font-size: 15px;
        }
        .ag-image { width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px; border: 1px solid #eee; }
        .instruction { 
            font-size: 12px; 
            color: #65676b; 
            text-align: left; 
            border-top: 1px solid #ebedf0; 
            padding: 15px 0; 
            line-height: 1.6;
        }
        
        /* Footer TommyWeb */
        .tw-footer { 
            padding: 12px; 
            font-size: 11px; 
            color: #8a8d91; 
            border-top: 1px solid #ebedf0;
        }
        .tw-footer b { color: #0866ff; }
    </style>

    <div class="ag-wrapper">
        <div class="card">
            <h1>AVATAR GUARD 🛡️</h1>
            <div class="tw-footer">
                Developed by <b>TommyWeb</b> &copy; 2026
            </div>
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
        </div>
    </div>
    `;
}
