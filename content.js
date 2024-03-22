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

    injectScript('filter-actions.js')
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                </svg>
            </button>
        </div>
    `

    var injectEditPageScript = `
    <div id='apply-filter-section' style="display: none; flex-direction:column; align-items: center; width: 100vw; height: 100vh; z-index: 999; position: fixed; top: 0; left: 0; background-color: #FFF">
        <h1 style="margin-bottom: 1rem; margin-top: 1rem;">CamanJS Editor</h1>
        <canvas id="edit-dummy-canva" class="canvas" style="display: block; width: 600px; height: 400px"></canvas>
        <div style="margin-bottom: 1rem; margin-top: 1rem">
            <div style="margin-bottom: 12px">
                <label for="brightness">Brightness</label>
                <input type="range" min="1" max="100" value="50" id="brightness">
            </div>
            <div style="margin-bottom: 12px">
                <label for="contrast">Contrast</label>
                <input type="range" min="1" max="100" value="50" id="contrast">
            </div>
            <div style="margin-bottom: 12px">
                <label for="sharpen">Saturation</label>
                <input type="range" min="1" max="100" value="50" id="saturation">
            </div>
        </div>
        <div style="margin-bottom: 1rem;">
            <button id="filter-origin-Btn" style="cursor: pointer; width: 80px; height:30px; border-radius: 8px">Original</button>
            <button id="filter-done-Btn" style="cursor: pointer; width: 80px; height:30px; border-radius: 8px">Done</button>
            <button id="filter-cancel-Btn" style="cursor: pointer; width: 80px; height:30px; border-radius: 8px">Cancel</button>
        </div>
    </div>`;

    var uploadBoxInner = $(".upload-box-inner")[0];
    if (uploadBoxInner) {
        $(uploadBoxInner).append(editBtn);
        $("body").append(injectEditPageScript);
    }

    document.querySelector("#editBtn").addEventListener('click', function() {
        // modifyImage()

        document.getElementById('apply-filter-section').style.display = 'flex';

        // var injectEditPageScript = `
        // <div style="display: flex; flex-direction:column; align-items: center; width: 100vw; height: 100vh; z-index: 999; position: fixed; top: 0; left: 0; background-color: #FFF">
        //     <h1 style="margin-bottom: 1rem; margin-top: 1rem;">CamanJS Editor</h1>
        //     <canvas id="edit-dummy-canva" width="590" height="331" class="canvas" style="display: block; height: 110px; width: 196.073px; margin-top: -55px; margin-left: -98px;"></canvas>
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


        // function injectScript(script) {
        //     var inject = chrome.runtime.getURL(script);
        //     var injectScript = $("<script>", {
        //         "src": inject
        //     });
        //     $("body").append(injectScript);
        // }
        // injectScript('filter-actions.js')
    })
}


// write a script then append to the /upload page to CHV.fn.uploader.files[0]