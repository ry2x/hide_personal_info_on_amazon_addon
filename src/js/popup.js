const toggleSwitch = document.getElementById('toggleSwitch');
const statusDiv = document.getElementById('status');
const defaultState = { isEnabled: true };

async function updateUI() {
    const { isEnabled } = await browser.storage.local.get(defaultState);

    toggleSwitch.checked = isEnabled;

    if (isEnabled) {
        statusDiv.textContent = '保護 有効';
        statusDiv.className = 'status on';
    } else {
        statusDiv.textContent = '保護 無効';
        statusDiv.className = 'status off';
    }
}

toggleSwitch.addEventListener('change', () => {
    browser.storage.local.set({ isEnabled: toggleSwitch.checked });
});

browser.storage.onChanged.addListener(updateUI);

document.addEventListener('DOMContentLoaded', updateUI);
