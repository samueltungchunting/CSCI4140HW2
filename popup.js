const storage = chrome.storage.local;

const cheveretoUrlInput = document.getElementById('cheveretoUrlInput');

async function getStorageValue() {
    value = await storage.get('cheveretoUrl');
    console.log('Value: ', value.cheveretoUrl);
    if(value.cheveretoUrl) {
        cheveretoUrlInput.value = value.cheveretoUrl;
    }
}

getStorageValue();

document.addEventListener('DOMContentLoaded', function() {
    const settingButton = document.getElementById('settingButton');
    const configForm = document.getElementById('configForm');
    const cheveretoUrlInput = document.getElementById('cheveretoUrlInput');
    const saveButton = document.getElementById('saveButton');

    settingButton.addEventListener('click', function() {
        configForm.classList.remove('hidden');
    });

    saveButton.addEventListener('click', function() {
        const cheveretoUrl = cheveretoUrlInput.value.trim();
        if (cheveretoUrl) {
            chrome.storage.local.set({ 'cheveretoUrl': cheveretoUrl }, function() {
                console.log('Chevereto URL saved:', cheveretoUrl);
                configForm.classList.add('hidden');
            });
        }
    });

    const trigger = document.getElementById('trigger');
    trigger.addEventListener('click', function() {
        getStorageValue();
    });
});