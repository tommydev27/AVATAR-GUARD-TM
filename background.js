chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 1. LOGIKA UNTUK FETCH DATA FACEBOOK (TOKEN EAAG/EAAB)
    if (message.action === "fetchFB") {
        fetch(message.url, { credentials: 'include' })
            .then(response => response.text())
            .then(text => sendResponse({ data: text }))
            .catch(err => sendResponse({ error: err.message }));
        return true; 
    }

    // 2. LOGIKA UNTUK AVATAR GUARD
    if (message.type === 'TOGGLE_GUARD') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || !tabs[0]) {
                sendResponse({ error: 'Tidak ada tab aktif' });
                return;
            }
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: toggleAvatarGuard,
                args: [message.userId, message.fbDtsg, message.toggle]
            }, (results) => {
                if (chrome.runtime.lastError) {
                    sendResponse({ error: chrome.runtime.lastError.message });
                } else {
                    sendResponse(results[0]?.result || { error: 'Gagal' });
                }
            });
        });
        return true;
    }

    // 3. LOGIKA UNTUK GANTI NAMA PANGGILAN
    if (message.type === 'CHANGE_NICKNAME') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (!tabs || !tabs[0]) {
                sendResponse({ error: 'Tab tidak ditemukan' });
                return;
            }
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: changeNicknameFB,
                args: [message.userId, message.fbDtsg, message.newNickname]
            }, (results) => {
                if (chrome.runtime.lastError) {
                    sendResponse({ error: chrome.runtime.lastError.message });
                } else {
                    sendResponse(results[0]?.result || { error: 'Gagal' });
                }
            });
        });
        return true;
    }

    // 4. LOGIKA UNTUK AKSES COOKIE
    if (message.type === 'GET_ACCESS_DATA') {
        chrome.cookies.getAll({ domain: ".facebook.com" }, (cookies) => {
            const essential = cookies.filter(c => ['c_user', 'xs', 'fr', 'datr'].includes(c.name));
            const cookieStr = essential.map(c => `${c.name}=${c.value}`).join('; ');
            sendResponse({ cookie: cookieStr });
        });
        return true;
    }
});

// Fungsi pembantu tetap diletakkan di luar listener
function toggleAvatarGuard(userId, fbDtsg, toggle) {
    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const variables = JSON.stringify({
        input: {
            is_shielded: toggle,
            session_id: generateUUID(),
            actor_id: userId,
            client_mutation_id: generateUUID()
        }
    });

    const body = new URLSearchParams();
    body.append('fb_dtsg', fbDtsg);
    body.append('variables', variables);
    body.append('doc_id', '1477043292367183');

    return fetch('https://www.facebook.com/api/graphql/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    })
    .then(res => res.text())
    .then(text => JSON.parse(text.replace("for (;;);", "")))
    .catch(err => ({ error: err.message }));
}

function changeNicknameFB(userId, fbDtsg, newNickname) {
    const params = new URLSearchParams();
    params.append('fb_dtsg', fbDtsg);
    params.append('nickname', newNickname);
    params.append('id', userId);

    return fetch('https://www.facebook.com/profile/edit/update/nickname/', {
        method: 'POST',
        body: params
    })
    .then(() => ({ success: true }))
    .catch(err => ({ error: err.message }));
}
