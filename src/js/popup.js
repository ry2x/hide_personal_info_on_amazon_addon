const toggleSwitch = document.getElementById('toggleSwitch');
const statusDiv = document.getElementById('status');
const defaultState = { isEnabled: true };

async function updateUI() {
    const { isEnabled } = await browser.storage.local.get(defaultState);

    toggleSwitch.checked = isEnabled;

    if (isEnabled) {
        statusDiv.textContent = browser.i18n.getMessage('statusEnabled');
        statusDiv.className = 'status on';
    } else {
        statusDiv.textContent = browser.i18n.getMessage('statusDisabled');
        statusDiv.className = 'status off';
    }
}

toggleSwitch.addEventListener('change', () => {
    browser.storage.local.set({ isEnabled: toggleSwitch.checked });
});

browser.storage.onChanged.addListener(updateUI);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('popupTitle').textContent = browser.i18n.getMessage('popupTitle');
    updateUI();
});
