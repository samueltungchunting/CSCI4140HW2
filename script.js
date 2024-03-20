async function uploadImgUrl(url){
    async function changeUrlActions(url) {
        var uploadURL = document.querySelector("#anywhere-upload > div.content-width > div > div.upload-box-heading.c16.center-box > div > div:nth-child(1) > div.device-mobile--hide.upload-box-status-text > a:nth-child(2)")
        if (uploadURL) {
            uploadURL.click()
        }
        setTimeout(function() {
            const textarea = document.querySelector('#fullscreen-modal-body > div > textarea');
            if (textarea) {
                textarea.value = url
                document.querySelector("#fullscreen-modal-box > form > div.btn-container > button").click()
            }
        }, 1000);
    }
    await changeUrlActions(url)
}