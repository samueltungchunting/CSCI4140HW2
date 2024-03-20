// var inject =  chrome.runtime.getURL('script.js');
var injectScript = "<button>DOne</button><button>Cancel</button>";
$("body").append(injectScript);

let uploadPageDiv;

function addSubmitBtn() {
    uploadPageDiv = document.getElementsByClassName('upload-box-inner')[0]
    console.log(uploadPageDiv);
    uploadPageDiv.style.color = "green";

    var newEditBtn = document.createElement("button");
    newEditBtn.innerHTML = "Edit with CamanJS";
    newEditBtn.style.backgroundColor = "yellow";
    newEditBtn.style.padding = "8px";
    uploadPageDiv.appendChild(newEditBtn)

    // document.querySelector("#anywhere-upload-input").src = https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg
}

addSubmitBtn()

// write a script then append to the /upload page to CHV.fn.uploader.files[0] 