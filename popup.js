<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Avatar Guard Display</title>
</head>
<body style="margin:0; padding:0;">

    <div id="status-container"></div>

    <script>
const target = document.getElementById('status-container');

if (target) {
    target.innerHTML = `
    <style>
        .ag-wrapper { font-family: -apple-system, sans-serif; background-color: #f0f2f5; display: flex; justify-content: center; align-items: center; padding: 10px; border-radius: 12px; }
        .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 100%; }
        .card h1 { color: #0166e8; font-size: 24px; margin: 15px 0 10px 0; font-weight: 800; }
        .card p { color: #0166e8; font-size: 15px; margin-bottom: 25px; line-height: 1.4; }
        .btn { background-color: #0866ff; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; transition: background 0.3s; border: none; cursor: pointer; }
        .btn:hover { background-color: #075ce4; }
        .footer-text { font-size: 12px; color: #8a8d91; margin-top: 20px; border-top: 1px solid #ebedf0; padding-top: 15px; text-align: left; }
    </style>

    <div class="ag-wrapper">
        <div class="card">
            <div class="shield-icon">
                <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.14-3.13 7.85-7 9.01v-9.01H5V6.3l7-3.11v8.8z"></path></svg>
            </div>
            <h1>AVATAR GUARD</h1>
            <p>Aktifkan perisai foto profil untuk mencegah orang lain mengambil tangkapan layar atau mengunduh foto profil Anda.</p>
            
            <a href="https://github.com/tommydev27/AVATAR-GUARD-TM/archive/refs/heads/main.zip" class="btn" download>Download ZIP Sekarang</a>

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
    </script>
</body>
</html>
