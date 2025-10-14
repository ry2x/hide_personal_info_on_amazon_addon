const SCRIPT_ID = 'amazon-hide-style';

// CSSを登録
async function registerScript() {
    try {
        await browser.scripting.registerContentScripts([
            {
                id: SCRIPT_ID,
                matches: browser.runtime.getManifest().host_permissions,
                css: ['css/main.css'],
                runAt: 'document_start',
            },
        ]);
    } catch (e) {
        console.error('Error while processing registerScript:', e);
    }
}

// CSSの登録を解除
async function unregisterScript() {
    try {
        await browser.scripting.unregisterContentScripts({ ids: [SCRIPT_ID] });
    } catch (e) {
        if (!e.message.includes('No such script')) {
            console.error('Error while processing unregisterScript:', e);
        }
    }
}

// localStorage の状態により更新を行う
async function updateScripting() {
    const { isEnabled } = await browser.storage.local.get({ isEnabled: true });
    if (isEnabled) {
        await registerScript();
    } else {
        await unregisterScript();
    }
}

// --- Event Listeners ---

// インストール時にデフォルト状態を設定
browser.runtime.onInstalled.addListener(() => {
    browser.storage.local.set({ isEnabled: true }, () => {
        updateScripting();
    });
});

// ブラウザ起動時にスクリプトの状態を更新
browser.runtime.onStartup.addListener(updateScripting);

// ユーザーがポップアップで状態を変更したとき状態を更新
browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && 'isEnabled' in changes) {
        updateScripting();
    }
});

// 初回実行
updateScripting();
