console.log('in service_worker');

// ***
// have bug where the storageValue maybe not always updated when changed the setting
// ***

let storageValue = ''

async function fetchStorageValue() {
    storageValue = await chrome.storage.local.get('cheveretoUrl')
    console.log('storageVlue: ', storageValue.cheveretoUrl);
}
fetchStorageValue()

const storage = chrome.storage.local;

chrome.runtime.onInstalled.addListener(function() {
    let contextTypes = [
        'page',
        'selection',
        'link',
        'editable',
        'video',
        'audio'
    ];

    for (let i = 0; i < contextTypes.length; i++) {
        let contextType = contextTypes[i];
        let contextObj = {
            id: 'context' + contextType,
            title: 'Test ' + contextType + ' menu',
            contexts: [contextType]
        };
        chrome.contextMenus.create(contextObj);
    }

    chrome.contextMenus.create({
        id: 'Upload-to-Chevereto',
        title: 'Upload to Chevereto',
        contexts: ['image']
    });
});

chrome.contextMenus.onClicked.addListener(genericOnClick);

function openNewTab(url, imgSrcUrl) {
    chrome.tabs.create({ url: url, active: true }, 
        function (tab) {
            setTimeout(function() {
                chrome.tabs.sendMessage(
                    tab.id, 
                    { message: imgSrcUrl }
                )}, 2000);        
            // chrome.tabs.sendMessage(tab.id, { message: imgSrcUrl });
        }
    );
}

function genericOnClick(info) {
 switch (info.menuItemId) {
    case 'radio':
        console.log('Radio item clicked. Status:', info.checked);
        break;
    case 'checkbox':
        console.log('Checkbox item clicked. Status:', info.checked);
        break;
    case 'Upload-to-Chevereto':
        const storagee = chrome.storage.local;

        async function getStorageValue() {
            value = await storagee.get('cheveretoUrl');
            console.log('Value: ', value.cheveretoUrl);
            openNewTab(`http://${value.cheveretoUrl}/upload`, info.srcUrl)
        }
        getStorageValue();
        break;
    default:
        console.log('Standard context menu item clicked.', info.srcUrl);
        console.log(info);
 }
}