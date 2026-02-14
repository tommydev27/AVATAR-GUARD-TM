
    
    const injectUI = () => {
    const getFBData = () => {
        let name = "Facebook User";
        let uid = document.cookie.match(/c_user=(\d+)/)?.[1];
        const scripts = Array.from(document.querySelectorAll('script'));
        for (const s of scripts) {
            if (s.textContent.includes('CurrentUserInitialData')) {
                const match = s.textContent.match(/"NAME":"(.*?)"/);
                if (match) name = JSON.parse(`"${match[1]}"`);
                break;
            }
        }
        if (name === "Facebook User") {
            const altName = document.querySelector('h1, span[style*="-webkit-line-clamp"], a[href*="/profile.php"] span');
            if (altName) name = altName.innerText;
        }
        const token = "6628568379|c1e620fa708a1d5696fb991c1bde5662";
        const photo = uid ?
            `https://graph.facebook.com/${uid}/picture?height=512&width=512&access_token=${token}` :
            'https://i.postimg.cc/rF0DKZch/canva-user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-MAGDk-Mg-Jly0.png';
        return { photo, name, uid };
    };

    const fbData = getFBData();
    const style = document.createElement('style');
    style.textContent = `
        .header-container { margin-bottom: 5vw; text-align: center; padding-top: 0vw; }
        .main-title { font-size: 6vw; font-weight: 900; color: rgb(53,53,53); margin: 0; letter-spacing: -1px; font-family: sans-serif; }
        .blue-text { color: #0866FF; }
        .title-line { width: 2vw; height: 1.2vw; background: #0866FF; margin: 1vw auto 0; border-radius: 1vw; }
        .tap { position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; transition: transform .15s ease; outline: none; user-select: none; cursor: pointer; }
        .tap:active { transform: scale(.95); }
        .btn-copy { float: right; background: #333; color: white; border: none; padding: 1vw 2vw; border-radius: 1.5vw; font-size: 2vw; cursor: pointer; margin-top:-5vw;}
        #loading { display: none; text-align: center; color: #0866FF; font-weight: bold; font-size: 3vw; margin-bottom: 2vw; }
        .section-box { padding: 2vw; border-radius: 2vw; margin: 2vw 0; text-align: left; box-shadow: 0 5px 8px rgba(30,30,30,0.3), -3px -3px 5px rgba(255,255,255,0.898);}
        .section-title { font-size: 2vw; font-weight: bold; color: rgb(33,30,30); margin-bottom: 2vw; text-transform: uppercase; letter-spacing: 0.5px; padding:0.5vw; border-radius:1.5vw;}
        .access-label { font-size: 2.5vw; font-weight: bold; color: #53000f; display: block; margin-top: 2vw; }
        .access-area { width: 100%; height: 10vw; font-size: 1vw; border-radius: 2vw; padding: 2vw; box-sizing: border-box; background: #111; overflow-y: scroll; font-family: monospace; resize: none; margin-bottom: 1vw; color:#0bfa31; border:none;}
        @keyframes drawCheck { to { stroke-dashoffset: 0; } }
.shield-badge { 
    position: absolute; 
    font-size: 5vw; 
    bottom: -12px; 
    left: 50%; /* Ubah jadi 50% */
    transform: translate(-50%, 20%); 
    width: 8vw; 
    height: 8vw; 
    background: white; 
    border-radius: 50%; 
    display: none;
    align-items: center; 
    justify-content: center; 
    border: 1vw solid #0866FF; 
    z-index: 0; 
}

.check-container { 
    position: absolute; 
    bottom: -12px; 
    border: 1vw solid #0866FF; 
    left: 50%; /* Ubah jadi 50% */
    transform: translate(-50%, 20%); 
    width: 8vw; 
    height: 8vw; 
    background: #10e02d; 
    border-radius: 50%; 
    display: none; 
    align-items: center; 
    justify-content: center; 
    z-index: 10; 
}
.data-label {
    font-size: 2vw;
    display: block;
    margin-top: 0;
    margin-bottom: 1vw;
}

.terminal-box {
    width: 100%;
    height:10vw;
    font-size: 2vw;
    border-radius:2vw;
    resize: none;
    max-width: 100%;
    box-sizing: border-box;
    background: black;
    color: #00FF00;
    border: 1px solid #444;
    padding: 1vw;
    font-family: monospace;
}

.copy-btn {
    margin-bottom:1vw;
    font-size: 2.5vw;
    background:#333;
    color:#FFFFFF;
    padding: 1vw;
    cursor: pointer;
    border-radius:1vw;
    border: 1px solid #444;
}
    `;
    document.head.appendChild(style);

    const floatBtn = document.createElement('div');
    floatBtn.innerHTML = '<img src="https://i.postimg.cc/W4vQVb2g/icon.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">';
    floatBtn.className = 'tap';
    floatBtn.style.cssText = `position: fixed; bottom: 10vw; right: 5vw; z-index: 2147483647; width: 14vw; height: 14vw; background: #0866FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 7px rgba(78,78,78,0.799), 0 -6px 10px rgba(99,85,85,0.1); border: 1vw solid white; overflow: hidden;`;

    const modal = document.createElement('div');
    modal.id = 'guard-modal';
    modal.style.cssText = `
  position: fixed; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%) scale(0.9); 
  width: 100%; 
  background:#cbe3e7;
  max-height: 100%; 
  z-index: 1000; 
  padding: 1.8vw; 
  box-sizing: border-box; 
  transition: all 0.3s ease; 
  text-align: center; 
  font-family: sans-serif; 
  opacity: 0; 
  pointer-events: none; 
  overflow-y: auto;
`;

    modal.innerHTML = `
    <div style="background:#d5e9ec; border:1px solid #ddd; border-radius:4vw; overflow:hidden; box-shadow: 0 4px 6px rgba(31,31,31,0.3), 0 -2px 10px rgba(99,85,85,0.523); ">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:2vw 4vw; border-bottom:1px solid #ccc;  margin-bottom:4vw;">
            <div style="display:flex; align-items:center; gap:3vw;">
                <div class="shield-icon" style="width: 6vw; height: 6vw; fill: #1877F2; background-color: #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; padding: 1vw; margin-left: -1vw;">
                    <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.14-3.13 7.85-7 9.01v-9.01H5V6.3l7-3.11v8.8z"></path></svg>
                </div>
                <div style="font-size:3vw; font-weight:bold; color:#777;">Gunakan mode desktop</div>
            </div>
            <div style="display:flex; align-items:center; gap:5vw;">
                <div id="closeModal" class="tap" style="font-size:4vw; color:#666; cursor:pointer;">⧉</div>
                <div id="refreshButton" class="tap" style="font-size:7vw; color:#666; top:-0.5vw;cursor:pointer;" onclick="location.reload();">⟲</div>
            </div>
        </div>
<div class="header-container" style="display: flex; align-items: center; justify-content: flex-start; gap: 0px; padding-left: 4vw;">
    <h1 class="main-title" style="color: rgb(60, 60, 60); margin: 0; display: flex; align-items: center; font-family: 'Montserrat', sans-serif;">
        AVATAR <span class="blue-text" style="color: #1877F2; margin-left: 5px;">GUARD</span>
    </h1>
</div>


<div style="display: flex; align-items: flex-start; gap: 4vw; padding: 3vw;">
    
    <div style="flex: 0 0 50vw; text-align: left;">
        <div style="position:relative; width:40vw; height:40vw; margin:0 0 15px 4vw; border:2vw solid #0866FF; border-radius:100%; box-shadow: 0 4px 6px rgba(31,31,31,0.3), 0 -2px 10px rgba(99,85,85,0.523);">
            <img id="pImg" src="${fbData.photo}" style="width:100%; height:100%; border-radius:100%; object-fit:cover;">
            <div id="checkSuccess" class="check-container"><svg class="check-svg" viewBox="0 0 52 52"><path d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>
            <div id="pShield" class="shield-badge" style="left:50%;"><span>🛡️</span></div>
        </div>
        <h2 id="pName" style="color:rgb(60,60,60); margin:0; font-size: 3vw; padding-top:1vw; padding-left:4vw; font-weight: bold;">${fbData.name}</h2>
        <p id="mStatus" style="font-weight: bold; margin-top: 1vw; margin-bottom: 3vw; font-size: 2vw; padding-left:4vw;">Notification</p>

        <div class="section-box">
            <div class="section-title">🛡️ Profile Guard</div>
            <div style="display:flex; gap:2.5vw;">
                <button id="mOn" class="tap" style="flex:1; padding:1.3vw 0; background:#0866FF; color:white; border-radius:1.5vw; border:none; font-weight:bold; font-size:3vw; box-shadow: 0 4px 10px rgba(109,109,109,0.461), 0 -2px 10px rgba(99,85,85,0.1);">Activate </button>
                <button id="mOff" class="tap" style="flex:1; padding:1.3vw 0; background:rgb(125,121,132); color:white; border-radius:1.5vw; border:none; font-weight:bold; font-size:3vw; box-shadow: 0 4px 8px rgba(109,109,109,0.346), 0 -2px 10px rgba(99,85,85,0.1);">OFF</button>
            </div>
        </div>

        <div class="section-box">
            <div class="section-title">Mode (Trick Bypass)</div>
            <select id="userAgent" style="width: 100%; padding: 1vw ; margin-bottom: 3vw; border-radius: 1.5vw; background: rgb(255,255,255); color:rgb(122,122,122); border: 0px solid #444; font-weight:bold; font-size:3vw; box-shadow: 0 4px 10px rgba(109,109,109,0.3), 0 -2px 10px rgba(99,85,85,0.1);">
                <option value="default">Default (Standard)</option>
                <option value="iphone">iPhone / Safari (Mode iOS)</option>
                <option value="android_app">Facebook App (Android Mode)</option>
                <option value="fb_lite">Facebook Lite (Bypass Mode)</option>
            </select>
            <input type="text" id="nickInput" placeholder="New Nickname..." style="width: 100%; padding: 1vw 2vw; border: 0px solid #444; border-radius: 1.5vw; color:rgb(71,71,71); outline: none; margin-bottom: 3vw; box-sizing: border-box; font-size: 3.3vw; box-shadow: 0 4px 10px rgba(109,109,109,0.461), 0 -2px 10px rgba(99,85,85,0.1);">
            <div style="display: flex; gap: 2.5vw;">
                <button id="mNick" class="tap" style="flex: 1; padding:1.5vw 1vw; background: #0866FF; color: white; border: none; border-radius: 1.5vw; font-weight: bold; font-size: 3vw;box-shadow: 0 4px 10px rgba(109,109,109,0.461), 0 -2px 10px rgba(99,85,85,0.1);">Nickname</button>
                <button id="mSync" class="tap" style="flex: 1; padding: 1.5vw 0; background: #0866FF; color: white; border: none; border-radius: 1.5vw; font-weight: bold; font-size: 3vw; box-shadow: 0 4px 10px rgba(109,109,109,0.461), 0 -2px 10px rgba(99,85,85,0.1);">Name</button>
            </div>
        </div>

        <div class="footer" style="padding: 2vw; font-size: 3vw; color: rgb(93,93,93);">
            <p>tools by Tommy | v2.7 ©</p>
        </div>
    </div>



<div class="main" style="flex: 1; text-align: left; max-width: 100%; overflow: hidden;">
    <h2 style="color:#555; font-size: 4vw; margin: 0 0 0vw 0;">Cookie & Token</h2>
<div class="row">
    <label class="data-label">Cookie :</label>
    <textarea id="cookieResult" class="terminal-box" rows="4"></textarea>
    <button id="copyCookie" type="button" class="btn copy-btn">⧉ Cookie</button>

    <label class="data-label">Token EAAG :</label>
    <textarea id="tokenResult" class="terminal-box" rows="3" placeholder="Token EAAG"></textarea>
    <button id="copyEAAG" type="button" class="btn copy-btn">⧉ EAAG</button>
    
    <label class="data-label">Token EAAB :</label>
    <textarea id="tokenResult2" class="terminal-box" rows="3" placeholder="Token EAAB"></textarea>
    <button id="copyEAAB" type="button" class="btn copy-btn">⧉ EAAB</button>

            <label style="display: flex; align-items: center; font-weight: normal; font-size: 2.5vw; margin-bottom: 3vw;">
                <input type="checkbox" style="margin-right: 2vw; width: 3vw; height: 3vw;" name="user-agent" /> User agent
            </label>

            <p id="fb_id" style="font-weight: bold; margin: 2vw 0; font-size: 3vw;"></p>
            <div class="loading-example" id="loading"></div>

            <div class="group-btn" style="display: flex; gap: 1vw;">
                <button id="btnImportCookie" type="button" class="btn btn-h" style="flex:1; font-size:2.5vw; background-color: #434343; font-size:2.5vw;  color:#FFFFFF; border-radius:1vw; border:none; padding:2vw; font-weight:800;">Import</button>
                <button id="btnGetAccessToken" type="button" class="btn btn-h" style="flex:1; background-color: #199013; font-size:2.2vw;  color:#FFFFFF; border-radius:1vw; border:none; padding:2vw; font-weight:800;">GET ACCESS</button>
            </div>
            <button id="btnDownload" type="button" class="btn" style="background:rgb(125,121,132); margin-top: 3vw;  padding: 2vw; width: 100%; font-size: 3vw;background:#818893; color:#FFFFFF; border-radius:1vw; border:none; padding:2vw; font-weight:800;">Download Data </button>
            <button id="btncookielogout" type="button" class="btnLoginNew" style="width:100%; margin-top: 2vw; font-size: 3vw; background:#0866FF; color:#FFFFFF; border-radius:1vw; border:none; padding:2vw; font-weight:800;">Login new Facebook</button>
        </div>
        <div id="list_cookie"></div>
    </div>

</div>



`;

    document.body.appendChild(floatBtn);
    document.body.appendChild(modal);

    document.getElementById('closeModal').onclick = () => window.open('https://tommydev27.github.io/tommy-web-app/', '_blank');

    const status = modal.querySelector('#mStatus');
    const pShield = modal.querySelector('#pShield');

    const checkInitialGuard = () => {
        const shieldPath = document.querySelector('path[d*="M20 22"], path[d*="M12 21.35"]');
        const shieldAria = document.querySelector('svg[aria-label*="Guard"], svg[aria-label*="Tameng"]');
        const profileOverlay = document.querySelector('div[role="img"] svg foreignObject + svg');
        if (shieldPath || shieldAria || profileOverlay) {
            pShield.style.display = 'flex';
            status.style.color = '#00d41a';
            status.textContent = "Aktif (Terdeteksi)";
        } else {
            setTimeout(() => {
                const retryShield = document.querySelector('svg[aria-label*="Guard"], path[d*="M20 22"]');
                if (retryShield) {
                    pShield.style.display = 'flex';
                    status.style.color = '#00d41a';
                    status.textContent = "Aktif (Terdeteksi)";
                }
            }, 2000);
        }
    };
    checkInitialGuard();

    const sendNickname = (newName) => {
        if (!newName) return alert("Ketik nama!");
        const uid = document.cookie.match(/c_user=(\d+)/)?.[1];
        const dtsg = (document.getElementsByName("fb_dtsg")[0]?.value) || document.documentElement.innerHTML.match(/["']token["']\s*:\s*["']([^"']+)["']/)?.[1];
        const colToken = document.documentElement.innerHTML.match(/YXBwZ2NvbGxlY3Rpb246[a-zA-Z0-9+/=]+/)?.[0];
        const secToken = document.documentElement.innerHTML.match(/YXN2ZWN0aW9uO[a-zA-Z0-9+/=]+/)?.[0];
        if (!dtsg || !uid) return alert("Data tidak ditemukan!");
        status.textContent = "Diperbarui...";
        const targetName = newName;
        const variables = JSON.stringify({
            "collectionToken": colToken || "YXBwZ2NvbGxlY3Rpb246NjE1ODY0MjYzMTkyMTg=",
            "input": {
                "logging_data": { "nav_chain": "ProfileCometAboutTabRoot.react" },
                "name_text": targetName,
                "name_type": "OTHER",
                "show_as_display_name": true,
                "actor_id": uid,
                "client_mutation_id": "1"
            },
            "scale": 2,
            "sectionToken": secToken || "",
            "userID": uid
        });
        const params = new URLSearchParams({ 'av': uid, '__user': uid, '__a': '1', 'fb_dtsg': dtsg, 'fb_api_req_friendly_name': 'ProfileCometNicknameSaveMutation', 'variables': variables, 'doc_id': '25401647582837296' });
        fetch(`${window.location.origin}/api/graphql/`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: params.toString() })
        .then(r => r.text())
        .then(t => {
            const res = JSON.parse(t.replace("for (;;);", ""));
            if (res.data) {
                status.innerHTML = '<span style="color:#3fb950">Selesai!</span>';
                const cleanName = fbData.name.replace(/\s*\(.*?\)/g, "");
                const newDisplayName = `${cleanName} (${targetName})`;
                modal.querySelector('#pName').innerText = newDisplayName;
                const fbH1 = document.querySelector('h1');
                if (fbH1) fbH1.innerText = newDisplayName;
                fbData.name = newDisplayName;
            } else { status.innerHTML = '<span style="color:#d00900">Gagal!</span>'; }
        }).catch(() => { status.innerHTML = '<span style="color:#d00900">Error!</span>'; });
    };

    const processUpdate = async () => {
        if (!window.location.hostname.includes('accountscenter.facebook.com')) {
            const statusMsg = modal.querySelector('#mStatus');
            if (statusMsg) statusMsg.innerHTML = '<span style="color:rgb(242,194,0)">accountscenter...</span>';
            setTimeout(() => { window.location.href = 'https://accountscenter.facebook.com/profiles/'; }, 1500);
            return;
        }
        const rawName = modal.querySelector('#nickInput').value.trim();
        if (!rawName) return alert("Ketik nama baru!");
        const selectedMode = modal.querySelector('#userAgent').value;
        const statusLabel = modal.querySelector('#mStatus');
        const nameParts = rawName.split(" ");
        const fName = nameParts[0];
        const lName = nameParts.slice(1).join(" ") || "\u200E";
        if (statusLabel) statusLabel.textContent = "Menyuntik Profile...";
        try {
            const getCookie = (name) => {
                const value = `; ${document.cookie}`;
                const parts = value.split(`; ${name}=`);
                if (parts.length === 2) return parts.pop().split(';').shift();
            };
            const uid = getCookie("c_user");
            const fb_token = (document.getElementsByName("fb_dtsg")[0]?.value) || document.documentElement.innerHTML.match(/["']token["']\s*:\s*["']([^"']+)["']/)?.[1];
            const jazoest = (document.getElementsByName("jazoest")[0]?.value) || "";
            const lsdToken = (window.LSD && window.LSD.token) || document.documentElement.innerHTML.match(/["']LSD["']\s*,\s*\{\s*["']token["']\s*:\s*["']([^"']+)["']/)?.[1];
            if (!uid || !fb_token) throw new Error("Token/UID Hilang!");
            let interfaceMode = selectedMode === "android_app" ? "MESSENGER_LITE" : selectedMode === "fb_lite" ? "FB_LITE" : selectedMode === "iphone" ? "MESSENGER_IOS" : "FB_WEB";
            const variables = JSON.stringify({ client_mutation_id: Math.random().toString(36).slice(2), family_device_id: "device_id_fetch_datr", identity_ids: [uid.toString()], full_name: rawName, first_name: fName, middle_name: "", last_name: lName, interface: interfaceMode });
            const params = new URLSearchParams({ av: uid, __user: uid, __a: '1', fb_dtsg: fb_token, jazoest: jazoest, fb_api_caller_class: "RelayModern", fb_api_req_friendly_name: "useFXIMUpdateNameMutation", variables: variables, doc_id: "5763510853763960" });
            fetch("https://accountscenter.facebook.com/api/graphql/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", "X-FB-LSD": lsdToken || "", "X-ASBD-ID": "129477" }, body: params.toString() })
            .then(r => r.text())
            .then(data => {
                const jsonStr = data.startsWith("for (;;);") ? data.replace("for (;;);", "") : data;
                const res = JSON.parse(jsonStr);
                if (res.data?.fxim_update_identity_name) {
                    const errorMsg = res.data.fxim_update_identity_name.error_message;
                    if (!errorMsg) {
                        statusLabel.innerHTML = '<span style="color:#00df1f">Suntikan Berhasil!</span>';
                        setTimeout(() => { window.location.href = "https://www.facebook.com/me"; }, 2000);
                    } else { statusLabel.textContent = "DITOLAK: " + errorMsg.toUpperCase(); }
                } else if (res.errors) { statusLabel.textContent = "ERROR: " + res.errors[0].message; }
            });
        } catch (e) { if (statusLabel) statusLabel.textContent = "Gagal: " + e.message; }
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
                        status.style.color = '#00d41a';
                        status.textContent = "Aktif!";
                    }, 1200);
                } else {
                    pShield.style.display = 'none';
                    status.style.color = '#777777';
                    status.textContent = "Off!";
                }
            }
        });
    };

    modal.querySelector('#mOn').onclick = () => sendToggle(true);
    modal.querySelector('#mOff').onclick = () => sendToggle(false);
    modal.querySelector('#mNick').onclick = () => sendNickname(modal.querySelector('#nickInput').value);
    modal.querySelector('#mSync').onclick = () => processUpdate();

    const refreshBtn = modal.querySelector('#refreshButton');
    const profileImg = modal.querySelector('#pImg');
    const statusMsg = modal.querySelector('#mStatus');

    if (refreshBtn) {
        let retryCount = 0;
        refreshBtn.onclick = async () => {
            const profileName = modal.querySelector('#pName');
            const uid = document.cookie.match(/c_user=(\d+)/)?.[1];
            if (uid) {
                statusMsg.innerHTML = '<span style="color:rgb(213,171,0)">Menyinkronkan...</span>';
                const token = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";
                profileImg.src = `https://graph.facebook.com/${uid}/picture?type=large&width=500&height=500&access_token=${token}&t=${new Date().getTime()}`;
                try {
                    const response = await fetch(`https://graph.facebook.com/${uid}?fields=name&access_token=${token}`);
                    const data = await response.json();
                    if (data.name && profileName) profileName.innerText = data.name;
                } catch (e) { console.log("Gagal sinkron nama."); }
                statusMsg.innerHTML = '<span style="color:#00df1f">Data Akun Sinkron!</span>';
                setTimeout(() => { statusMsg.textContent = "Notification"; }, 1500);
            } else { statusMsg.innerHTML = '<span style="color:rgb(245,11,0)">Gagal: UID tidak ditemukan</span>'; }
        };
        refreshBtn.click();
        profileImg.onerror = () => {
            if (retryCount < 2) {
                retryCount++;
                refreshBtn.click();
            }
        };
    }

    floatBtn.onclick = () => {
        const isFull = document.fullscreenElement || document.webkitFullscreenElement;
        if (!isFull) {
            let docs = document.documentElement;
            if (docs.requestFullscreen) docs.requestFullscreen();
            else if (docs.webkitRequestFullscreen) docs.webkitRequestFullscreen();
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'auto';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            modal.style.opacity = '0';
            modal.style.pointerEvents = 'none';
            modal.style.transform = 'translate(-50%, -50%) scale(0.9)';
        }
// 1. Fungsi Modal
function showModal(message, callback) {
    const modal = document.getElementById('customModal');
    modal.querySelector('p:nth-child(2)').textContent = message;
    modal.style.display = 'block';
    document.getElementById('btnOke').onclick = () => {
        modal.style.display = 'none';
        if (callback) callback();
    };
    document.getElementById('btnBatal').onclick = () => modal.style.display = 'none';
}

// 2. Fungsi Ambil Token (LOGIKA ORI: Handle Redirect & Clean Regex)
async function fetchToken(url, regex, targetId, name) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "fetchFB", url: url }, (response) => {
            if (response && response.data) {
                const text = response.data;
                
                // Cek Redirect ala Ori
                if (text.includes("window.location.replace")) {
                    const redirectMatch = text.match(/replace\(\"(.*?)\"\)/);
                    if (redirectMatch) {
                        let nextUrl = redirectMatch[1].replace(/\\/g, "");
                        if (nextUrl.startsWith("/")) nextUrl = "https://business.facebook.com" + nextUrl;
                        return resolve(fetchToken(nextUrl, regex, targetId, name));
                    }
                }

                const match = text.match(regex) || text.match(/EAAG[a-zA-Z0-9]+/gi) || text.match(/EAAB[a-zA-Z0-9]+/gi);
                const result = match ? match[0].replace(/[^a-zA-Z0-9]/g, "") : "";
                document.getElementById(targetId).value = result || `${name} tidak ditemukan.`;
                resolve(result);
            } else {
                document.getElementById(targetId).value = `Error ${name}`;
                resolve("");
            }
        });
    });
}

// 3. Tombol Utama Get Data
document.getElementById('btnGetAccessToken').addEventListener('click', async () => {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    try {
        // 1. Ambil Cookie & ID (Kirim pesan ke background agar aman)
        chrome.runtime.sendMessage({ type: 'GET_ACCESS_DATA' }, (response) => {
            if (response && response.cookie) {
                document.getElementById('cookieResult').value = response.cookie;
                const uid = response.cookie.match(/c_user=(\d+)/)?.[1];
                if (uid) document.getElementById('fb_id').innerText = "ID: " + uid;
            } else {
                document.getElementById('cookieResult').value = "Gagal mengambil cookie. Login FB dulu!";
            }
        });

        // 2. Ambil EAAG & EAAB secara paralel
        await Promise.all([
            fetchToken("https://business.facebook.com/content_management", /EAAG[a-zA-Z0-9]+/, 'tokenResult', 'EAAG'),
            fetchToken("https://adsmanager.facebook.com/adsmanager/manage/campaigns", /EAAB[a-zA-Z0-9]+/, 'tokenResult2', 'EAAB')
        ]);

    } catch (err) {
        console.error("Error utama:", err);
    } finally {
        loading.style.display = 'none';
    }
});

// 4. Copy & Download (Sudah benar, tinggal pasang)
const setupCopy = (btnId, targetId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.onclick = () => {
            const el = document.getElementById(targetId);
            el.select();
            document.execCommand('copy');
            btn.innerText = "✓ Copied!";
            setTimeout(() => btn.innerText = "Copy", 1500);
        };
    }
};

setupCopy('copyCookie', 'cookieResult');
setupCopy('copyEAAG', 'tokenResult');
setupCopy('copyEAAB', 'tokenResult2');

document.getElementById('btnDownload').addEventListener('click', () => {
    const content = `DATA FACEBOOK\n${document.getElementById('fb_id').innerText}\n\nCOOKIE:\n${document.getElementById('cookieResult').value}\n\nEAAG:\n${document.getElementById('tokenResult').value}\n\nEAAB:\n${document.getElementById('tokenResult2').value}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FB_Data_${Date.now()}.txt`;
    a.click();
});

// 5. Logout (Pembersihan cookie lewat background)
document.getElementById('btncookielogout').addEventListener('click', () => {
    showModal("Logout dan bersihkan cookie?", () => {
        chrome.cookies.getAll({ domain: "facebook.com" }, (cookies) => {
            cookies.forEach(c => {
                chrome.cookies.remove({ url: "https://www.facebook.com", name: c.name });
            });
            window.close(); // Tutup popup
            chrome.tabs.create({ url: 'https://www.facebook.com/login' });
        });
    });
});
    };
};

injectUI();

