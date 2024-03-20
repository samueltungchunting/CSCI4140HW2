function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse)  => {

    function injectScript(script) {
        var inject = chrome.runtime.getURL(script);
        var injectScript = $("<script>", {
            "src": inject
        });
        $("body").append(injectScript);
    }

    await timeout(500)

    injectScript('caman.min.js');
    injectScript('script.js');
    uploadImgUrl(request.message)

    addSubmitBtn()
    await timeout(2000)
    // document.querySelector('canvas').id = "canvas"
});

// var inject =  chrome.runtime.getURL('script.js');
// var injectScript = `<button>Done</button><button>Cancel</button>`;
// $("body").append(injectScript);

function addSubmitBtn() {
    var editBtn = `
        <div style="display: flex; justify-content: center; marin-top: 1rem">
            <button style="
                background-color: #87CEEB;
                color: #000;
                padding: 10px 20px;
                border-radius: 5px;
                border: none;
                cursor: pointer;
                margin-top: 1rem;"
                id="editBtn"
            >
                Edit with CamanJS
            </button>
        </div>
    `

    var uploadBoxInner = $(".upload-box-inner")[0];
    if (uploadBoxInner) {
        $(uploadBoxInner).append(editBtn);
    }

    document.querySelector("#editBtn").addEventListener('click', function() {
        modifyImage()
        // var injectEditPageScript = `
        // <div style="display: flex; flex-direction:column; align-items: center; width: 100vw; height: 100vh; z-index: 999; position: fixed; top: 0; left: 0; background-color: #FFF">
        //     <h1 style="margin-bottom: 1rem; margin-top: 1rem;">CamanJS Editor</h1>
        //     <img src="#a" alt="" style="height: 300px; width: 500px; margin-bottom: 1rem;">
        //     <div style="margin-bottom: 1rem;">
        //         <div style="margin-bottom: 12px">
        //             <label for="brightness">Brightness</label>
        //             <input type="range" min="1" max="100" value="50" id="brightness">
        //         </div>
        //         <div style="margin-bottom: 12px">
        //             <label for="contrast">Contrast</label>
        //             <input type="range" min="1" max="100" value="50" id="contrast">
        //         </div>
        //         <div style="margin-bottom: 12px">
        //             <label for="sharpen">Sharpen</label>
        //             <input type="range" min="1" max="100" value="50" id="sharpen">
        //         </div>
        //     </div>
        //     <div style="margin-bottom: 1rem;">
        //         <button style="cursor: pointer; width: 80px; height:30px; border-radius: 8px">Original</button>
        //         <button style="cursor: pointer; width: 80px; height:30px; border-radius: 8px">Done</button>
        //         <button style="cursor: pointer; width: 80px; height:30px; border-radius: 8px">Cancel</button>
        //     </div>
        //     <button style="cursor: pointer; background-color: greenyellow; width: 160px; height: 40px; border-radius: 8px">
        //         Upload
        //     </button>
        // </div>`;
        // $("body").append(injectEditPageScript);
    })
}

// document.querySelector("#anywhere-upload-queue > li > div.preview.block > canvas")

function modifyImage() {
    console.log('inside modifyImage');

    const canvas = document.querySelector("#anywhere-upload-queue > li > div.preview.block > canvas");

    if (!canvas) {
        console.log('Canvas element not found.');
        return;
    }

    var img = new Image();
    img.src = 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg';
    img.crossOrigin = "Anonymous";
    img.id = "imggg";

    img.onload = function() {
        var imggg = document.getElementById('imggg');
        console.log('imggg: ', imggg);
        Caman(imggg, function () {  
            // this.brightness(30).render();
            this.contrast(-20).render(); 
        });
    };

    document.body.appendChild(img)
}


// write a script then append to the /upload page to CHV.fn.uploader.files[0]