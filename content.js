<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>tommy-web-app</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Questrial&display=swap">
  <link rel="icon" href="https://i.postimg.cc/W4vQVb2g/icon.jpg type="image/png">
<link rel="apple-touch-icon" href="https://i.postimg.cc/W4vQVb2g/icon.jpg" type="image/png">

<link rel="preload" href="https://i.postimg.cc/W4vQVb2g/icon.jpg" as="image">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<script src="https://cdn.lordicon.com/lordicon.js"></script>
  <!-- Open Graph -->
<meta property="og:title" content="Tommy Web Apps">
<meta property="og:description" content="Application was independently developed by Tommy (version 0.27).">
<meta property="og:image" content="https://i.postimg.cc/W4vQVb2g/icon.jpg">
<meta property="og:url" content="https://tommydev27.github.io/Tommy-Web-Apps/">
<meta property="og:type" content="website">
<meta property="fb:app_id" content="1245016886587008">
  <style>
    :root{
      font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    }
body {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center; 
      background:#daf9fe;
      padding: 10px;
    }
    .card{
      width:100%;
      max-width:400px;
      border-radius:16px;
      padding:38px 20px;
      display:flex;
      flex-direction:column;
      gap:16px;
      align-items:flex-start;
box-shadow: 0 4px 6px rgba(150,150,150,0.788), 0 -2px 5px rgba(210,210,210,0.523);
    }
.avatar {
  width: 150px; /* Pastikan ada ukuran tetap */
  height: 150px;
  border-radius: 50%;
  margin: 0 auto;
  background: #fff;
  display: flex; 
  align-items: center;
  justify-content: center;
  /* Bayangan dipindah ke sini */
  box-shadow: 0 4px 6px rgba(150,150,150,0.788), 0 -2px 5px rgba(210,210,210,0.523);
  border: 1px solid #fff; 
  overflow: visible; /* Biarkan bayangan terlihat */
}

.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover; /* Menjaga proporsi gambar */
  box-shadow: 0 8px 20px rgba(31,31,31,0.3), 0 -2px 30px rgba(99,85,85,0.523);
}
    .name{
      font-size:28px;
      font-weight:700;
      margin-bottom:30px;
      color:#333;
      text-align:center;
      width:100%;
    }
    .role{
      font-size:14px;
      color:var(--muted);
      margin-bottom:12px;
      font-family: normal;
      text-align:left;
      font-weight: 500;
      width:100%;
    }
    .bio{
      font-size:13px;
      color:var(--muted);
      font-family: normal;
      line-height:1.4;
      text-align:left;
      color: #555;
      width:100%;
    }
    .description{
      font-weight: bold;
      font-family: normal;
      font-size:10px;
      color:#6c757d;
      line-height:1.4;
      text-align:left;
      width:100%;
    }
    .btn{
      width:100%;
      margin-top:16px;
      padding:10px 10px;
      background:#fff;
      border:solid 1px #eeeeee;
      border-radius:20px;
      color:#487fe1;
      font-size:16px;
      font-weight:600;
      cursor:pointer;
      align-self:flex-start;
  box-shadow: 0 4px 10px rgba(109,109,109,0.3), 0 -2px 10px rgba(99,85,85,0.1);
    -webkit-tap-highlight-color: transparent;
    }
    
    .btn.active { color: #375962; }
.btn:active { color: #fff; opacity: ; transform: scale(0.98); background:#35a1f4; box-shadow:none;}

    
    footer{
      margin-top:24px;
      color:var(--muted);
      font-size:13px;
      text-align:left;
      width:100%;
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
    .share-btn{
      background:none;
      border:none;
      cursor:pointer;
      color:#4b4b4b;
      font-size:16px;
      display:flex;
      align-items:center;
      gap:6px;
    }
  </style>
</head>
<body>
  <div class="card">
<div class="avatar">
<img src="https://i.postimg.cc/W4vQVb2g/icon.jpg" width="150" height="150" style="background: transparent; object-fit: cover;" alt="icon">
</div>
    <div class="name">
      Unicreate
<svg xmlns="http://www.w3.org/2000/svg" fill="#4790fb" width="28" height="28" viewBox="0 0 30 30" style="transform: translateY(5px);"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.201 1.122a1 1 0 0 1 1.332.357l1.307 2.138 2.506.063a1 1 0 0 1 .974.975l.063 2.505 2.139 1.307a1 1 0 0 1 .356 1.332L21.68 12l1.198 2.201a1 1 0 0 1-.357 1.332l-2.138 1.307-.063 2.506a1 1 0 0 1-.974.974l-2.506.063-1.307 2.139a1 1 0 0 1-1.332.356L12 21.68l-2.201 1.198a1 1 0 0 1-1.332-.357L7.16 20.383l-2.506-.063a1 1 0 0 1-.974-.974l-.063-2.506-2.138-1.307a1 1 0 0 1-.357-1.332L2.32 12 1.122 9.799a1 1 0 0 1 .357-1.332L3.617 7.16l.063-2.505a1 1 0 0 1 .974-.975l2.506-.063L8.467 1.48A1 1 0 0 1 9.8 1.122L12 2.32l2.201-1.198zm2.44 9.146a1 1 0 1 0-1.281-1.536l-.067.055a43.003 43.003 0 0 0-4.852 4.74l-1.734-1.734a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.475-.067l.056-.067a41 41 0 0 1 5.25-5.25l.066-.055z"></path></svg>
    </div>
    <div class="role" style="color:#ee2323;">Tools - Extensions (free app)</div>
    
    <div class="bio">Picture Guard • Get T0ken <br>ID Card • Alat Karater teks & 一</div>
    <p style="font-size: 13px; color: #6b9ef0; font-weight: bold;">
    Keamanan: Tidak menyimpan data
</p>
    <div class="description"style="color:#777;">tools by Tommy Adhelyno | v.27</div>
    <button class="btn" onclick="window.location.href='https://tommydev27.github.io/Tommy-Web-Apps'">Lanjut</button>
    <footer>
      <span><p>&copy; Unicreate — All rights reserved</p></span>
<button class="share-btn" id="shareBtn">
   share<i class="fa fa-share-alt" style="font-size:18px; color:#777;"></i>
</button>
    </footer>
<script>
  const shareBtn = document.getElementById('shareBtn');
  shareBtn.addEventListener('click', async () => {
    const apkLink = 'https://tommydev27.github.io/tommy-web-app/';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Unicreat APK',
          text: 'Download Unicreat App sekarang!',
          url: apkLink
        });
        console.log('Berhasil dibagikan');
      } catch (err) {
        console.error('Gagal berbagi:', err);
      }
    } else {
      window.location.href = apkLink;
    }
  });
</script>


  </div>
</body>
</html>
