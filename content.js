<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">

const injectUI = () => {
    // 1. Ekstraksi Data FB
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
        const photo = uid 
            ? `https://graph.facebook.com/${uid}/picture?height=512&width=512&access_token=${token}`
            : 'https://i.postimg.cc/rF0DKZch/canva-user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-MAGDk-Mg-Jly0.png';

        return { photo, name, uid };
    };

    const fbData = getFBData();

    // 2. Tambahan Style CSS (Termasuk Style Baru)
    const style = document.createElement('style');
    style.textContent = `
        .header-container { margin-bottom: 5vw; text-align: center; padding-top: 1vw; }
        .main-title { font-size: 6vw; font-weight: 900; color: rgb(53,53,53); margin: 0; letter-spacing: -1px; font-family: sans-serif; }
        .blue-text { color: #0866FF; }
        .tap { position: relative; overflow: hidden; -webkit-tap-highlight-color: transparent; transition: transform .15s ease; outline: none; user-select: none; cursor: pointer; }
        .tap:active { transform: scale(.95); }
        .section-box { padding: 4vw; border-radius: 4vw; margin: 2vw; text-align: left; box-shadow: 0 5px 8px rgba(30,30,30,0.3), -3px -3px 5px rgba(255,255,255,0.898); background: #d5e9ec; }
        .section-title { font-size: 3vw; font-weight: bold; color: rgb(33,30,30); margin-bottom: 4vw; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0866FF; display: inline-block; }
        .access-label { font-size: 2.5vw; font-weight: bold; color: #53000f; display: block; margin-top: 2vw; }
        .access-area { width: 100%; height: 12vw; font-size: 2vw; border-radius: 2vw; padding: 2vw; box-sizing: border-box; background: #111; overflow-y: auto; font-family: monospace; resize: none; color:#0bfa31; border:none; margin-top: 1vw; }
        .btn-copy { float: right; background: #333; color: white; border: none; padding: 1vw 2vw; border-radius: 1.5vw; font-size: 2vw; cursor: pointer; }
        .shield-badge { position: absolute; bottom: -12px; left: 25vw; transform: translate(-50%, 20%); width: 10vw; height: 10vw; background: white; border-radius: 50%; display: none; align-items: center; justify-content: center; border:2vw solid #0866FF; z-index: 0; }
        .check-container { position: absolute; bottom: -10px; border:2vw solid #0866FF; left: 25vw; transform: translate(-50%, 20%); width: 10vw; height: 10vw; background: #10e02d; border-radius: 50%; display: none; align-items: center; justify-content: center; z-index: 10; }
        .check-svg { width: 60%; height: 60%; stroke: white; stroke-width: 6; fill: none; stroke-dasharray: 50; stroke-dashoffset: 50; }
        .animate-check { animation: drawCheck 0.5s ease-in-out forwards; }
        @keyframes drawCheck { to { stroke-dashoffset: 0; } }
        #loading { display: none; text-align: center; color: #0866FF; font-weight: bold; font-size: 3vw; margin-bottom: 2vw; }
    `;
    document.head.appendChild(style);

    // 3. Floating Button
    const floatBtn = document.createElement('div');
    floatBtn.innerHTML = '<img src="https://i.postimg.cc/W4vQVb2g/icon.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">';
    floatBtn.className = 'tap';
    floatBtn.style.cssText = `position: fixed; bottom: 10vw; right: 5vw; z-index: 2147483647; width: 14vw; height: 14vw; background: #0866FF; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 7px rgba(78,78,78,0.799); border: 1vw solid white; overflow: hidden;`;

    // 4. Modal Dashboard
    const modal = document.createElement('div');
    modal.id = 'guard-modal';
    modal.style.cssText = `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.9); width: 100%; background:#cbe3e7; max-height: 100%; z-index: 1000; padding: 3.5vw; box-sizing: border-box; transition: all 0.3s ease; text-align: center; font-family: sans-serif; opacity: 0; pointer-events: none; overflow-y: auto;`;

    modal.innerHTML = `
        <div style="background:#d5e9ec; border:1px solid #ddd; border-radius:4vw; overflow:hidden; box-shadow: 0 4px 6px rgba(31,31,31,0.3);">
            <div style="display:flex; align-items:center; justify-content:space-between; padding:3vw 4vw; border-bottom:1px solid #ccc; margin-bottom:4vw;">
                <div style="display:flex; align-items:center; gap:3vw;">
                    <div id="backBtn" class="tap" style="font-size:4vw; color:#333;">⨉</div>
                    <div style="font-size:4vw; font-weight:bold; color:#444;">Dashboard Tommy</div>
                </div>
                <div style="display:flex; align-items:center; gap:5vw;">
                    <div id="closeModal" class="tap" style="font-size:4vw; color:#666;">⧉</div>
                    <div id="refreshButton" class="tap" style="font-size:7vw; color:#666;">⟲</div>
                </div>
            </div>

            <div class="header-container">
                <h1 class="main-title">AVATAR <span class="blue-text">GUARD</span></h1>
            </div>
            
            <div style="position:relative; width:45vw; height:45vw; margin:0 auto; border:2vw solid #0866FF; border-radius:100%; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
                <img id="pImg" src="${fbData.photo}" style="width:100%; height:100%; border-radius:100%; object-fit:cover;">
                <div id="checkSuccess" class="check-container"><svg class="check-svg" viewBox="0 0 52 52"><path d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>
                <div id="pShield" class="shield-badge"><span style="font-size: 6vw;">🛡️</span></div>
            </div>

            <h2 id="pName" style="color:#333; margin-top:4vw; font-size: 5.5vw; font-weight: bold;">${fbData.name}</h2>
            <p id="mStatus" style="font-weight: bold; color: #555; font-size: 3.5vw;">Ready to work</p>

            <div class="section-box">
                <div class="section-title">🛡️ Profile Guard</div>
                <div style="display:flex; gap:2.5vw;">
                    <button id="mOn" class="tap" style="flex:1; padding:2.5vw; background:#0866FF; color:white; border-radius:3vw; border:none; font-weight:bold; font-size:3.5vw;">Activate</button>
                    <button id="mOff" class="tap" style="flex:1; padding:2.5vw; background:#7d7984; color:white; border-radius:3vw; border:none; font-weight:bold; font-size:3.5vw;">Turn Off</button>
                </div>
            </div>

            <div class="section-box">
                <div class="section-title">✏️ Trick Bypass Name</div>
                <select id="userAgent" style="width: 100%; padding: 2vw; margin-bottom: 3vw; border-radius: 2vw; border: 1px solid #ccc; font-size:3.5vw;">
                    <option value="default">Default (Standard)</option>
                    <option value="iphone">iPhone (iOS Mode)</option>
                    <option value="android_app">FB App (Android)</option>
                    <option value="fb_lite">FB Lite (Bypass)</option>
                </select>
                <input type="text" id="nickInput" placeholder="New Nickname..." style="width: 100%; padding: 3vw; border-radius: 2.5vw; border: 1px solid #ccc; margin-bottom: 3vw; font-size: 4vw; box-sizing: border-box;">
                <div style="display: flex; gap: 2.5vw;">
                    <button id="mNick" class="tap" style="flex: 1; padding: 2.5vw; background: #0866FF; color: white; border: none; border-radius: 3vw; font-weight: bold; font-size: 3.5vw;">Update Nick</button>
                    <button id="mSync" class="tap" style="flex: 1; padding: 2.5vw; background: #0866FF; color: white; border: none; border-radius: 3vw; font-weight: bold; font-size: 3.5vw;">Sync Name</button>
                </div>
            </div>

            <div class="section-box">
                <div class="section-title">🔑 FB DATA & TOKEN</div>
                <div id="loading">FETCHING DATA...</div>
                
                <button id="btnGetAccessToken" class="tap" style="width:100%; padding:3vw; background:#0866FF; color:white; border-radius:3vw; border:none; font-weight:bold; font-size:4vw; margin-bottom:4vw;">AMBIL DATA SEKARANG</button>

                <div style="text-align:left;">
                    <div id="fb_id" style="font-weight:bold; font-size:3.5vw; margin-bottom:2vw; color:#333;">ID: Unknown</div>
                    
                    <label class="access-label">Cookie:</label>
                    <button id="copyCookie" class="btn-copy tap">Copy</button>
                    <textarea id="cookieResult" class="access-area" readonly></textarea>

                    <label class="access-label">Token EAAG (Business):</label>
                    <button id="copyEAAG" class="btn-copy tap">Copy</button>
                    <textarea id="tokenResult" class="access-area" readonly></textarea>

                    <label class="access-label">Token EAAB (Ads):</label>
                    <button id="copyEAAB" class="btn-copy tap">Copy</button>
                    <textarea id="tokenResult2" class="access-area" readonly></textarea>
                </div>

                <div style="display:flex; gap:2vw; margin-top:5vw;">
                    <button id="btnDownload" class="tap" style="flex:1; padding:3vw; background:#10e02d; color:white; border:none; border-radius:3vw; font-weight:bold; font-size:3.5vw;">Download .TXT</button>
                    <button id="btncookielogout" class="tap" style="flex:1; padding:3vw; background:#d00900; color:white; border:none; border-radius:3vw; font-weight:bold; font-size:3.5vw;">Clear & Logout</button>
                </div>
            </div>

            <div style="padding: 5vw 0; color:#777; font-size:3vw;">tools by Tommy | v2.7 ©</div>
        </div>

        <div id="customModal" style="display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:6vw; border-radius:4vw; box-shadow:0 0 20px rgba(0,0,0,0.4); z-index:2001; width:70vw;">
            <p style="font-weight:bold; font-size:4vw; color:#333;">Konfirmasi</p>
            <p style="font-size:3.5vw; color:#666; margin:4vw 0;">Pesan konfirmasi muncul di sini.</p>
            <div style="display:flex; gap:3vw;">
                <button id="btnOke" class="tap" style="flex:1; padding:2vw; background:#0866FF; color:white; border:none; border-radius:2vw;">Ya</button>
                <button id="btnBatal" class="tap" style="flex:1; padding:2vw; background:#ccc; color:#333; border:none; border-radius:2vw;">Batal</button>
            </div>
        </div>
    `;

    // 5. Injeksi ke Document
    document.body.appendChild(floatBtn);
    document.body.appendChild(modal);


// ==========================================
// 1. FUNGSI HELPER & MODAL (UTAMA)
// ==========================================

function showModal(message, callback) {
    const customModal = document.getElementById('customModal');
    if (!customModal) return alert(message);
    
    customModal.querySelector('p:nth-child(2)').textContent = message;
    customModal.style.display = 'block';
    
    document.getElementById('btnOke').onclick = () => {
        customModal.style.display = 'none';
        if (callback) callback();
    };
    document.getElementById('btnBatal').onclick = () => customModal.style.display = 'none';
}

async function fetchToken(url, regex, targetId, name) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: "fetchFB", url: url }, (response) => {
            if (response && response.data) {
                const text = response.data;
                
                // Cek Redirect
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
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.value = result || `${name} tidak ditemukan.`;
                resolve(result);
            } else {
                const targetEl = document.getElementById(targetId);
                if (targetEl) targetEl.value = `Error ${name}`;
                resolve("");
            }
        });
    });
}

const setupCopy = (btnId, targetId) => {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.onclick = () => {
            const el = document.getElementById(targetId);
            if (el) {
                el.select();
                document.execCommand('copy');
                btn.innerText = "✓ Copied!";
                setTimeout(() => btn.innerText = "Copy", 1500);
            }
        };
    }
};

// ==========================================
// 2. INJECT UI & LOGIKA DASHBOARD
// ==========================================

    document.body.appendChild(floatBtn);
    document.body.appendChild(modal);

    document.getElementById('closeModal').addEventListener('click', function() {
        window.open('https://tommydev27.github.io/tommy-web-app/', '_blank');
    });

    const status = modal.querySelector('#mStatus');
    const pShield = modal.querySelector('#pShield');

    // Deteksi Tameng Otomatis
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

    // Logika Ganti Nickname Utama
    const sendNickname = (newName) => {
        if (!newName) return alert("Ketik nama!");
        const uid = document.cookie.match(/c_user=(\d+)/)?.[1];
        const dtsg = (document.getElementsByName("fb_dtsg")[0]?.value) ||
            document.documentElement.innerHTML.match(/["']token["']\s*:\s*["']([^"']+)["']/)?.[1];

        const colToken = document.documentElement.innerHTML.match(/YXBwZ2NvbGxlY3Rpb246[a-zA-Z0-9+/=]+/)?.[0];
        const secToken = document.documentElement.innerHTML.match(/YXN2ZWN0aW9uO[a-zA-Z0-9+/=]+/)?.[0];

        if (!dtsg || !uid) return alert("Data tidak ditemukan!");
        status.textContent = "Diperbarui...";

        const mid = Math.floor(newName.length / 2);
        const p1 = newName.substring(0, mid);
        const p2 = newName.substring(mid);
        const targetName = p1 + p2;

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

        const params = new URLSearchParams({
            'av': uid, '__user': uid, '__a': '1', 'fb_dtsg': dtsg,
            'fb_api_req_friendly_name': 'ProfileCometNicknameSaveMutation',
            'variables': variables,
            'doc_id': '25401647582837296'
        });

        fetch(`${window.location.origin}/api/graphql/`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString()
        })
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
            } else {
                status.innerHTML = '<span style="color:#d00900">Gagal!</span>';
            }
        })
        .catch(() => { status.innerHTML = '<span style="color:#d00900">Error!</span>'; });
    };

    // Logika Ganti Nama (Accounts Center)
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
            const fb_token = (document.getElementsByName("fb_dtsg")[0]?.value) ||
                             document.documentElement.innerHTML.match(/["']token["']\s*:\s*["']([^"']+)["']/)?.[1];
            const jazoest = (document.getElementsByName("jazoest")[0]?.value) || "";
            const lsdToken = (window.LSD && window.LSD.token) ||
                             document.documentElement.innerHTML.match(/["']LSD["']\s*,\s*\{\s*["']token["']\s*:\s*["']([^"']+)["']/)?.[1];

            if (!uid || !fb_token) throw new Error("Token/UID Hilang!");

            let interfaceMode = "FB_WEB";
            if (selectedMode === "android_app") interfaceMode = "MESSENGER_LITE";
            else if (selectedMode === "fb_lite") interfaceMode = "FB_LITE";
            else if (selectedMode === "iphone") interfaceMode = "MESSENGER_IOS";

            const variables = JSON.stringify({
                client_mutation_id: Math.random().toString(36).slice(2),
                family_device_id: "device_id_fetch_datr",
                identity_ids: [uid.toString()],
                full_name: rawName,
                first_name: fName,
                middle_name: "",
                last_name: lName,
                interface: interfaceMode
            });

            const params = new URLSearchParams({
                av: uid, __user: uid, __a: '1', fb_dtsg: fb_token, jazoest: jazoest,
                fb_api_caller_class: "RelayModern",
                fb_api_req_friendly_name: "useFXIMUpdateNameMutation",
                variables: variables,
                doc_id: "5763510853763960"
            });

            fetch("https://accountscenter.facebook.com/api/graphql/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-FB-LSD": lsdToken || "",
                    "X-ASBD-ID": "129477"
                },
                body: params.toString()
            })
            .then(r => r.text())
            .then(data => {
                const jsonStr = data.startsWith("for (;;);") ? data.replace("for (;;);", "") : data;
                const res = JSON.parse(jsonStr);

                if (res.data?.fxim_update_identity_name) {
                    const errorMsg = res.data.fxim_update_identity_name.error_message;
                    if (!errorMsg) {
                        statusLabel.innerHTML = '<span style="color:#00df1f">Suntikan Berhasil!</span>';
                        setTimeout(() => { window.location.href = "https://www.facebook.com/me"; }, 2000);
                    } else {
                        statusLabel.textContent = "DITOLAK: " + errorMsg.toUpperCase();
                    }
                } else if (res.errors) {
                    statusLabel.textContent = "ERROR: " + res.errors[0].message;
                }
            });

        } catch (e) {
            if (statusLabel) statusLabel.textContent = "Gagal: " + e.message;
        }
    };

    // Toggle Tameng
    const sendToggle = (type) => {
        const dtsg = document.documentElement.innerHTML.match(/"DTSGInitialData",\[],{"token":"(.+?)"/);
        const uid = document.cookie.match(/c_user=(\d+)/);
        status.textContent = "Loading...";

        chrome.runtime.sendMessage({ 
            type: 'TOGGLE_GUARD', 
            userId: uid ? uid[1] : null, 
            fbDtsg: dtsg ? dtsg[1] : null, 
            toggle: type 
        }, (res) => {
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

    // Event Action Tombol Dashboard
    modal.querySelector('#mOn').onclick = () => sendToggle(true);
    modal.querySelector('#mOff').onclick = () => sendToggle(false);
    modal.querySelector('#mNick').onclick = () => sendNickname(modal.querySelector('#nickInput').value);
    modal.querySelector('#mSync').onclick = () => processUpdate();

    // ==========================================
    // 3. LOGIKA BARU: GET DATA, COPY, LOGOUT
    // ==========================================

    const btnGetAccessToken = document.getElementById('btnGetAccessToken');
    if (btnGetAccessToken) {
        btnGetAccessToken.addEventListener('click', async () => {
            const loading = document.getElementById('loading');
            if (loading) loading.style.display = 'block';

            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (!tab || !tab.url.includes("facebook.com")) {
                    showModal("Buka tab Facebook dulu!", null);
                    if (loading) loading.style.display = 'none';
                    return;
                }

                chrome.cookies.getAll({ domain: "facebook.com" }, (cookies) => {
                    const cookieStr = cookies.map(c => `${c.name}=${c.value}`).join('; ');
                    const cookieRes = document.getElementById('cookieResult');
                    if (cookieRes) cookieRes.value = cookieStr;
                    
                    const cUser = cookies.find(c => c.name === "c_user");
                    if (cUser) {
                        const fbIdEl = document.getElementById('fb_id');
                        if (fbIdEl) fbIdEl.innerText = "ID: " + cUser.value;
                    }
                });

                await Promise.all([
                    fetchToken("https://business.facebook.com/content_management", /EAAGNO[a-zA-Z0-9]+|EAAG[a-zA-Z0-9]+/, 'tokenResult', 'EAAG'),
                    fetchToken("https://adsmanager.facebook.com/adsmanager/manage/campaigns", /EAAB[a-zA-Z0-9]+/, 'tokenResult2', 'EAAB')
                ]);

            } catch (err) {
                console.error(err);
            } finally {
                if (loading) loading.style.display = 'none';
            }
        });
    }

    setupCopy('copyCookie', 'cookieResult');
    setupCopy('copyEAAG', 'tokenResult');
    setupCopy('copyEAAB', 'tokenResult2');

    const btnDownload = document.getElementById('btnDownload');
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            const fbId = document.getElementById('fb_id')?.innerText || "";
            const cookieVal = document.getElementById('cookieResult')?.value || "";
            const eaagVal = document.getElementById('tokenResult')?.value || "";
            const eaabVal = document.getElementById('tokenResult2')?.value || "";
            
            const content = `DATA FACEBOOK\n${fbId}\n\nCOOKIE:\n${cookieVal}\n\nEAAG:\n${eaagVal}\n\nEAAB:\n${eaabVal}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `FB_Data_${Date.now()}.txt`;
            a.click();
        });
    }

    const btnLogout = document.getElementById('btncookielogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            showModal("Logout dan bersihkan cookie?", () => {
                chrome.cookies.getAll({ domain: "facebook.com" }, (cookies) => {
                    cookies.forEach(c => {
                        chrome.cookies.remove({ url: "https://www.facebook.com", name: c.name });
                    });
                    chrome.tabs.create({ url: 'https://www.facebook.com/login' });
                });
            });
        });
    }

    // ==========================================
    // 4. LOGIKA REFRESH & FLOATING BUTTON
    // ==========================================

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
                const securePhotoUrl = `https://graph.facebook.com/${uid}/picture?type=large&width=500&height=500&access_token=${token}`;
                profileImg.src = securePhotoUrl + '&t=' + new Date().getTime();

                try {
                    const response = await fetch(`https://graph.facebook.com/${uid}?fields=name&access_token=${token}`);
                    const data = await response.json();
                    if (data.name && profileName) profileName.innerText = data.name;
                } catch (e) {
                    console.log("Gagal sinkron nama.");
                }

                statusMsg.innerHTML = '<span style="color:#00df1f">Data Akun Sinkron!</span>';
                setTimeout(() => { statusMsg.textContent = "Notification"; }, 1500);
            } else {
                statusMsg.innerHTML = '<span style="color:rgb(245,11,0)">Gagal: UID tidak ditemukan</span>';
            }
        };
        refreshBtn.click();
        profileImg.onerror = () => {
            if (retryCount < 2) { retryCount++; refreshBtn.click(); }
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
        // Logika Ambil Data
document.getElementById('btnGetAccessToken').onclick = async () => {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    try {
        // 1. Ambil Cookie & UID
        const cookie = document.cookie;
        const uid = cookie.match(/c_user=(\d+)/)?.[1];
        document.getElementById('cookieResult').value = cookie;
        
        if (!uid) throw new Error("Gagal ambil UID");
        document.getElementById('fb_id').innerText = `ID: ${uid}`;

        // 2. Ambil Token EAAG (Business) Asli
        const resEAAG = await fetch('https://business.facebook.com/business_locations');
        const textEAAG = await resEAAG.text();
        const tokenEAAG = textEAAG.match(/EAAG[a-zA-Z0-9]+/)?.[0];
        if (tokenEAAG) document.getElementById('tokenResult').value = tokenEAAG;

        // 3. Ambil Token EAAB (Ads) Asli
        const resEAAB = await fetch('https://www.facebook.com/adsmanager/manage/campaigns');
        const textEAAB = await resEAAB.text();
        const tokenEAAB = textEAAB.match(/EAAB[a-zA-Z0-9]+/)?.[0];
        if (tokenEAAB) document.getElementById('tokenResult2').value = tokenEAAB;

    } catch (e) {
        alert("Gagal ambil data. Pastikan kamu sudah login FB!");
    } finally {
        loading.style.display = 'none';
    }
};

// ==========================================
    // 5. LOGIKA BARU: AMBIL TOKEN & COPY
    // ==========================================
    
    // Fungsi Copy
    const setupCopy = (btnId, textId) => {
        document.getElementById(btnId).onclick = () => {
            const txt = document.getElementById(textId);
            txt.select();
            document.execCommand('copy');
            alert('Tersalin!');
        };
    };

    // Tombol Ambil Data (EAAG & EAAB)
    document.getElementById('btnGetAccessToken').onclick = async () => {
        const loading = document.getElementById('loading');
        loading.style.display = 'block';

        try {
            // 1. Ambil Cookie & UID
            const cookie = document.cookie;
            const uid = cookie.match(/c_user=(\d+)/)?.[1];
            document.getElementById('cookieResult').value = cookie;
            if (uid) document.getElementById('fb_id').innerText = `ID: ${uid}`;

            // 2. Ambil Token EAAG (Business)
            const resEAAG = await fetch('https://business.facebook.com/business_locations');
            const textEAAG = await resEAAG.text();
            const tokenEAAG = textEAAG.match(/EAAG[a-zA-Z0-9]+/)?.[0];
            if (tokenEAAG) document.getElementById('tokenResult').value = tokenEAAG;

            // 3. Ambil Token EAAB (Ads Manager)
            const resEAAB = await fetch('https://www.facebook.com/adsmanager/manage/campaigns');
            const textEAAB = await resEAAB.text();
            const tokenEAAB = textEAAB.match(/EAAB[a-zA-Z0-9]+/)?.[0];
            if (tokenEAAB) document.getElementById('tokenResult2').value = tokenEAAB;

        } catch (e) {
            alert("Gagal ambil token. Buka tab Facebook!");
        } finally {
            loading.style.display = 'none';
        }
    };

    // Aktifkan Tombol Copy
    setupCopy('copyCookie', 'cookieResult');
    setupCopy('copyEAAG', 'tokenResult');
    setupCopy('copyEAAB', 'tokenResult2');

    // Tombol Download
    document.getElementById('btnDownload').onclick = () => {
        const content = `ID: ${document.getElementById('fb_id').innerText}\nCookie: ${document.getElementById('cookieResult').value}\nEAAG: ${document.getElementById('tokenResult').value}\nEAAB: ${document.getElementById('tokenResult2').value}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `FB_Data_${Date.now()}.txt`;
        a.click();
    };

    // Navigasi Modal
    floatBtn.onclick = () => {
        const isOpen = modal.style.opacity === '1';
        modal.style.opacity = isOpen ? '0' : '1';
        modal.style.pointerEvents = isOpen ? 'none' : 'auto';
        modal.style.transform = isOpen ? 'translate(-50%, -50%) scale(0.9)' : 'translate(-50%, -50%) scale(1)';
    };
    document.getElementById('backBtn').onclick = () => floatBtn.click();

}; // Tutup fungsi injectUI
};

injectUI();


