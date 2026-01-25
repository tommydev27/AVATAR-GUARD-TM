
const target = document.getElementById('status-container');

if (target) {
    target.innerHTML = `
    <style>
        #status-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f2f5;
            font-family: -apple-system, sans-serif;
            margin: 0;
        }
        .ag-wrapper { width: 100%; display: flex; justify-content: center; padding: 20px ; box-sizing: border-box; }
        .card { background: white; padding: 25px; border-radius: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); text-align: center; max-width: 380px; width: 100%; overflow: hidden; }
        .card h1 { color: #1c1e21; font-size: 22px; margin: 15px 0; font-weight: 800; }
        .card p { color: #606770; font-size: 14px; line-height: 1.5; margin-bottom: 20px; }
        .btn { background-color: #0866ff; color: white !important; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: block; margin: 0 auto 20px auto; transition: 0.3s; }
        .btn:hover { background-color: #075ce4; }
        .ag-image { max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 15px; border: 1px solid #ddd; }
        .instruction { font-size: 12px; color: #65676b; text-align: left; border-top: 1px solid #eee; padding-top: 15px; margin-bottom: 15px; }
        .shield-icon { width: 70px; height: 70px; fill: #1877F2; margin: 0 auto; }
        
        /* Footer Design TommyWeb */
        .tw-footer { 
            background: #f8f9fa; 
            margin: 15px -25px -25px -25px; 
            padding: 12px; 
            font-size: 11px; 
            color: #90949c; 
            border-top: 1px solid #ebedf0;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
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
            
            <img src="https://i.postimg.cc/T1ChXpBy/Beauty-Plus-IMAGE-ENHANCER-1769342192329.jpg" alt="Tutorial" class="ag-image">

            <div class="instruction">
                <b>Cara Pasang:</b><br>
                1. Download & Ekstrak ZIP.<br>
                2. Buka Kiwi/Lemur Browser -> Extensions.<br>
                3. Aktifkan Mode Pengembang.<br>
                4. Load folder hasil ekstrak.
            </div>

            <div class="tw-footer">
                Powered by <b>tommyweb</b> &copy; 2025
            </div>
        </div>
    </div>
    `;
    document.body.style.margin = "0";
}
