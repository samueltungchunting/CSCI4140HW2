// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     chrome.tabs.sendMessage(tabId, {greeting: "hello"}, function(response) {
//         console.log(response);
//     });
// })
chrome.runtime.onInstalled.addListener(function() {
    let contextTypes = [
        'page',
        'selection',
        'link',
        'editable',
        // 'image',
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

    let parent = chrome.contextMenus.create({
        id: 'parent',
        title: 'Parent test item'
    });
    chrome.contextMenus.create({
        id: 'child1',
        title: 'Child 1 test item',
        parentId: parent
    });
    chrome.contextMenus.create({
        id: 'child2',
        title: 'Child 2 test item',
        parentId: parent
    });
});

console.log(123);
chrome.contextMenus.onClicked.addListener(genericOnClick);
// A generic onclick callback function.
function genericOnClick(info) {
 switch (info.menuItemId) {
    case 'radio':
        // Radio item function
        console.log('Radio item clicked. Status:', info.checked);
        break;
    case 'checkbox':
        // Checkbox item function
        console.log('Checkbox item clicked. Status:', info.checked);
        break;
    default:
        // Standard context menu item function
        console.log('Standard context menu item clicked.', info.menuItemId);
 }
}