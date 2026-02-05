<!doctype html>
<html lang="id">
<head>
</head>
<body>
<script>
  const injectUI = () => {
    const getFBData = () => {
        const uid = document.cookie.match(/c_user=(\d+)/)?.[1];
        let nameEl = document.querySelector('h1');
        let name = nameEl ? nameEl.innerText : "Facebook User";

        const lowName = name.toLowerCase();
        if (lowName === "beranda" || lowName === "home" || lowName === "facebook") {
            const altName = document.querySelector('div[role="navigation"] span, a[href*="/profile.php"] span, span[style*="-webkit-line-clamp"]');
            if (altName) name = altName.innerText;
        }

        let photo = uid 
            ? `https://graph.facebook.com/${uid}/picture?type=large&width=500&height=500`
            : '';

        if (!photo) {
            const fallbackImg = document.querySelector('svg[aria-label="Profil"] image, img[src*="scontent"]');
            photo = fallbackImg ? (fallbackImg.src || fallbackImg.getAttribute('xlink:href')) : 'https://i.postimg.cc/rF0DKZch/canva-user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-MAGDk-Mg-Jly0.png';
        }

        if (photo.includes('fbcdn.net')) {
            photo = photo.replace(/p\d+x\d+/, 'p500x500').replace(/s\d+x\d+/, 's500x500');
        }

        return { photo, name };
    };

    const fbData = getFBData();
    const style = document.createElement('style');
    style.textContent = `
        .header-container { margin-bottom: 5vw; text-align: center; padding-top: 2vw; }
        .main-title { font-size: 6vw; font-weight: 900; color: rgb(53,53,53); margin: 0; letter-spacing: -1px; font-family: sans-serif; }
        .blue-text { color: #0866FF; }
        .tap { position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; transition: transform .15s ease; outline: none; user-select: none; cursor: pointer; }
        .tap:active { transform: scale(.95); }
        .section-box { background: rgb(232,232,232); padding: 4vw; border-radius: 2vw; margin-bottom: 2vw; text-align: left; }
        .section-title { font-size: 2vw; font-weight: bold; color: rgb(33,30,30); margin-bottom: 3.5vw; text-transform: uppercase; letter-spacing: 0.5px; }
        @keyframes drawCheck { to { stroke-dashoffset: 0; } }
        .shield-badge { position: absolute; bottom: -12px; left: 25vw; transform: translate(-50%, 20%); width: 10vw; height: 10vw; background: white; border-radius: 50%; display: none; align-items: center; justify-content: center; border:2vw solid #0866FF; z-index: 0; }
        .check-container { position: absolute; bottom: -10px; border:2vw solid #0866FF; left: 25vw; transform: translate(-50%, 20%); width: 10vw; height: 10vw; background: #10e02d; border-radius: 50%; display: none; align-items: center; justify-content: center; z-index: 10; }
        .check-svg { width: 60%; height: 60%; stroke: white; stroke-width: 6; fill: none; stroke-dasharray: 50; stroke-dashoffset: 50; }
        .animate-check { animation: drawCheck 0.5s ease-in-out forwards; }
    `;
    document.head.appendChild(style);

    const floatBtn = document.createElement('div');
    floatBtn.innerHTML = '🛡️';
    floatBtn.className = 'tap';
    floatBtn.style.cssText = `position: fixed; bottom: 10vw; right: 7vw; z-index: 2147483647; width: 12vw; height: 12vw; background: #0866FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 7vw; box-shadow: 0 3px 8px rgba(0,0,0,0.4); border: 0.4vw solid white;`;

    const modal = document.createElement('div');
    modal.id = 'guard-modal';
    modal.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9); width: 100%; max-height: 100%; background: rgb(253,250,250); z-index: 1000; padding: 2vw; box-sizing: border-box; transition: all 0.3s ease; border: 1px solid #ddd; text-align: center; font-family: sans-serif; opacity: 0; pointer-events: none; overflow-y: auto;`;

    modal.innerHTML = `
        <div id="closeModal" class="tap" style="position:absolute; top:2%; right:4%; color:rgb(60,60,60); font-size:5vw; cursor:pointer; z-index:10;">⧉</div>
        <div id="refreshButton" class="tap" style="position:absolute; top:6%; right:3%; color:rgb(60,60,60); font-size:7.5vw; cursor:pointer; z-index:10;" onclick="location.reload();">⟲</div>
        <div class="header-container"><h1 class="main-title" style="color:rgb(60,60,60);">AVATAR <span class="blue-text">GUARD</span></h1></div>
        <div style="position:relative; width:50vw; height:50vw; margin:0 auto 15px; border:2vw solid #0866FF; border-radius:100%;">
            <img id="pImg" src="${fbData.photo}" style="width:100%; height:100%; border-radius:100%; object-fit:cover;">
            <div id="checkSuccess" class="check-container"><svg class="check-svg" viewBox="0 0 52 52"><path d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>
            <div id="pShield" class="shield-badge"><span style="font-size: 6vw;">🛡️</span></div>
        </div>
        <h2 id="pName" style="color:rgb(60,60,60); margin:0; font-size: 6vw; padding-top:5vw; font-weight: bold;">${fbData.name}</h2>
        <p id="mStatus" style="rgb(253,250,250); font-weight: bold; margin-top: 1vw; margin-bottom: 3vw; font-size: 4vw;">Notification</p>
        
        <div class="section-box">
            <div class="section-title">🛡️ Profile Guard</div>
            <div style="display:flex; gap:2.5vw;">
                <button id="mOn" class="tap" style="flex:1; padding:2.5vw; background:#0866FF; color:white; border-radius:2.5vw; border:none; font-weight:bold; font-size:4vw;">Activate Guard</button>
                <button id="mOff" class="tap" style="flex:1; padding:2.5vw; background:rgb(125,121,132); color:white; border-radius:2.5vw; border:none; font-weight:bold; font-size:4vw;">Turn off</button>
            </div>
            <div style="margin-top:5vw; color:rgb(93,93,93); font-size:3vw; font-family:sans-serif;">Design: <b>tommyweb v1.0</b> ©2025</div>
        </div>
        
        <div class="section-box">
            <div class="section-title">Mode Penyamaran (Trick Bypass)</div>
            <select id="userAgent" style="width: 100%; padding: 2vw; margin-bottom: 3vw; border-radius: 2vw; background: rgb(255,255,255); color:rgb(122,122,122); border: 0px solid #444; font-weight:bold; font-size:4vw;">
                <option value="default">Default (Standard)</option>
                <option value="iphone">iPhone / Safari (Mode iOS)</option>
                <option value="android_app">Facebook App (Android Mode)</option>
                <option value="fb_lite">Facebook Lite (Bypass Mode)</option>
            </select>
            <input type="text" id="nickInput" placeholder="New Nickname..." style="width: 100%; padding: 3vw; border: 0px solid #444; border-radius: 2vw; color:rgb(71,71,71); outline: none; margin-bottom: 3vw; box-sizing: border-box; font-size: 4vw;">
            <div style="display: flex; gap: 2.5vw;">
                <button id="mNick" class="tap" style="flex: 1; padding: 2.5vw 1vw; background: #0866FF; color: white; border: none; border-radius: 2.5vw; font-weight: bold; font-size: 4vw;">Update Nickname</button>
                <button id="mSync" class="tap" style="flex: 1; padding: 2.5vw 1vw; background: #0866FF; color: white; border: none; border-radius: 2.5vw; font-weight: bold; font-size: 4vw;">Profile Name</button>
            </div>
        </div>

        <div style="width: 100%; text-align: center; margin-top: 10vw; padding-bottom: 5vw;">
            <p style="color: #888; font-size: 3.2vw; margin-bottom: 2vw; padding: 0 8vw; line-height: 1.4;">
                Kami menghargai privasi Anda. Aplikasi ini hanya mengakses data profil Facebook yang diperlukan untuk menjalankan fitur Profile Guard dan Update Nickname. Kami tidak menyimpan data pribadi Anda di server eksternal.
            </p>
            <div style="color: #666; font-size: 3vw;"><b>tommywebdeveloper v1.0</b> ©2025</div>
        </div>
    `;

    document.body.appendChild(floatBtn);
    document.body.appendChild(modal);

    document.getElementById('closeModal').addEventListener('click', () => {
        window.open('https://tommydev27.github.io/tommy-web-app/', '_blank');
    });

    const status = modal.querySelector('#mStatus');
    const pShield = modal.querySelector('#pShield');

    const sendNickname = (newName) => {
        if (!newName) return alert("Ketik nama!");
        const uid = document.cookie.match(/c_user=(\d+)/)?.[1];
        const dtsg = (document.getElementsByName("fb_dtsg")[0]?.value) || document.documentElement.innerHTML.match(/["']token["']\s*:\s*["']([^"']+)["']/)?.[1];
        if (!dtsg || !uid) return alert("Data tidak ditemukan!");
        
        status.textContent = "Diperbarui...";
        const variables = JSON.stringify({
            "input": { "name_text": newName, "name_type": "OTHER", "show_as_display_name": true, "actor_id": uid, "client_mutation_id": "1" },
            "userID": uid
        });

        const params = new URLSearchParams({ 'av': uid, '__user': uid, '__a': '1', 'fb_dtsg': dtsg, 'variables': variables, 'doc_id': '25401647582837296' });

        fetch(`${window.location.origin}/api/graphql/`, { method: "POST", body: params })
        .then(r => r.json()).then(res => {
            if (res.data) {
                status.innerHTML = '<span style="color:#3fb950">Selesai!</span>';
                modal.querySelector('#pName').innerText = `${fbData.name} (${newName})`;
            } else { status.innerHTML = '<span style="color:#d00900">Gagal!</span>'; }
        }).catch(() => { status.innerHTML = '<span style="color:#d00900">Error!</span>'; });
    };

    const sendToggle = (type) => {
        const dtsg = document.documentElement.innerHTML.match(/"DTSGInitialData",\[],{"token":"(.+?)"/);
        const uid = document.cookie.match(/c_user=(\d+)/);
        status.textContent = "Loading...";
        chrome.runtime.sendMessage({ type: 'TOGGLE_GUARD', userId: uid ? uid[1] : null, fbDtsg: dtsg ? dtsg[1] : null, toggle: type }, (res) => {
            if (res && !res.error) {
                if (type) {
                    modal.querySelector('#checkSuccess').style.display = 'flex';
                    modal.querySelector('.check-svg path').classList.add('animate-check');
                    setTimeout(() => { 
                        modal.querySelector('#checkSuccess').style.display = 'none'; 
                        pShield.style.display = 'flex'; 
                        status.style.color = '#00d41a'; status.textContent = "Aktif!"; 
                    }, 1200);
                } else {
                    pShield.style.display = 'none';
                    status.style.color = '#777777'; status.textContent = "Off!";
                }
            }
        });
    };

    modal.querySelector('#mOn').onclick = () => sendToggle(true);
    modal.querySelector('#mOff').onclick = () => sendToggle(false);
    modal.querySelector('#mNick').onclick = () => sendNickname(modal.querySelector('#nickInput').value);
    
    floatBtn.onclick = () => {
        const isFull = document.fullscreenElement || document.webkitFullscreenElement;
        if (!isFull) {
            modal.style.opacity = '1'; modal.style.pointerEvents = 'auto';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        } else {
            modal.style.opacity = '0'; modal.style.pointerEvents = 'none';
            modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
        }
    };
  };
  injectUI();
</script>
</body>
</html><!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
</head>
<body>

<script>
const injectUI = () => {

const getFBData = () => {
    const uid = document.cookie.match(/c_user=(\d+)/)?.[1];
    let nameEl = document.querySelector('h1');
    let name = nameEl ? nameEl.innerText : "Facebook User";

    const lowName = name.toLowerCase();
    if (lowName === "beranda" || lowName === "home" || lowName === "facebook") {
        const altName = document.querySelector(
            'div[role="navigation"] span, a[href*="/profile.php"] span, span[style*="-webkit-line-clamp"]'
        );
        if (altName) name = altName.innerText;
    }

    let photo = uid
        ? `https://graph.facebook.com/${uid}/picture?type=large&width=500&height=500`
        : '';

    if (!photo) {
        const fallbackImg = document.querySelector(
            'svg[aria-label="Profil"] image, img[src*="scontent"]'
        );
        photo = fallbackImg
            ? (fallbackImg.src || fallbackImg.getAttribute('xlink:href'))
            : 'https://i.postimg.cc/rF0DKZch/canva-user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-MAGDk-Mg-Jly0.png';
    }

    if (photo.includes('fbcdn.net')) {
        photo = photo.replace(/p\d+x\d+/, 'p500x500').replace(/s\d+x\d+/, 's500x500');
    }

    return { photo, name };
};

const fbData = getFBData();

/* ================= STYLE ================= */
const style = document.createElement('style');
style.textContent = `
.header-container{margin-bottom:5vw;text-align:center;padding-top:2vw}
.main-title{font-size:6vw;font-weight:900;color:#353535;margin:0;letter-spacing:-1px}
.blue-text{color:#0866FF}
.tap{-webkit-tap-highlight-color:transparent;cursor:pointer}
.tap:active{transform:scale(.95)}
.section-box{background:#e8e8e8;padding:4vw;border-radius:2vw;margin-bottom:2vw}
.section-title{font-size:2vw;font-weight:bold;margin-bottom:3.5vw;text-transform:uppercase}
`;
document.head.appendChild(style);

/* ================= FLOAT BUTTON ================= */
const floatBtn = document.createElement('div');
floatBtn.textContent = '🛡️';
floatBtn.className = 'tap';
floatBtn.style.cssText =
'position:fixed;bottom:10vw;right:7vw;width:12vw;height:12vw;background:#0866FF;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:7vw;z-index:999999';

/* ================= MODAL ================= */
const modal = document.createElement('div');
modal.style.cssText =
'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(.9);width:100%;height:100%;background:#fdfafa;opacity:0;pointer-events:none;transition:.3s;overflow:auto';

modal.innerHTML = `
<div id="closeModal" class="tap" style="position:absolute;top:2%;right:4%;font-size:5vw">⧉</div>

<div class="header-container">
  <h1 class="main-title">AVATAR <span class="blue-text">GUARD</span></h1>
</div>

<div style="width:50vw;height:50vw;margin:0 auto;border:2vw solid #0866FF;border-radius:50%">
  <img id="pImg" src="${fbData.photo}" style="width:100%;height:100%;border-radius:50%;object-fit:cover">
</div>

<h2 id="pName" style="text-align:center;font-size:6vw">${fbData.name}</h2>
<p id="mStatus" style="text-align:center">Notification</p>

<div class="section-box">
  <div class="section-title">Profile Guard</div>
  <div style="display:flex;gap:2vw">
    <button id="mOn" class="tap" style="flex:1">Activate Guard</button>
    <button id="mOff" class="tap" style="flex:1">Turn Off</button>
  </div>
</div>

<div class="section-box">
  <div class="section-title">Mode Penyamaran</div>
  <select id="userAgent" style="width:100%">
    <option value="default">Default</option>
    <option value="iphone">iPhone</option>
    <option value="android_app">Android</option>
    <option value="fb_lite">FB Lite</option>
  </select>

  <input id="nickInput" placeholder="New Nickname..." style="width:100%;margin-top:3vw">

  <div style="display:flex;gap:2vw;margin-top:3vw">
    <button id="mNick" class="tap" style="flex:1">Update Nickname</button>
    <button id="mSync" class="tap" style="flex:1">Profile Name</button>
  </div>
</div>

<p style="text-align:center;font-size:3vw;color:#777;padding:6vw">
Kami menghargai privasi Anda. Aplikasi ini tidak menyimpan data pribadi.
</p>
`;

/* ================= DOM ================= */
document.body.appendChild(floatBtn);
document.body.appendChild(modal);

/* ================= EVENTS ================= */
floatBtn.onclick = () => {
  modal.style.opacity = '1';
  modal.style.pointerEvents = 'auto';
  modal.style.transform = 'translate(-50%,-50%) scale(1)';
};

document.getElementById('closeModal').onclick = () => {
  modal.style.opacity = '0';
  modal.style.pointerEvents = 'none';
  modal.style.transform = 'translate(-50%,-50%) scale(.9)';
};

};

injectUI();
</script>

</body>
</html>
