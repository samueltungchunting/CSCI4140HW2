const canvasDummy = document.getElementById("edit-dummy-canva");
const ctx = canvasDummy.getContext("2d");

let img = new Image();
let fileName = "";

// Upload File
// Get File
const file = CHV.fn.uploader.files[0];

const reader = new FileReader();

// Check for file
fileName = file.parsedMeta.title;
img.src = file.url
// On image load add to canvas
img.crossOrigin = "";
img.onload = function () {
    canvasDummy.width = img.width;
    canvasDummy.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);
    canvasDummy.removeAttribute("data-caman-id");
};




var brightnessVal = document.getElementById("brightness")
brightnessVal.addEventListener('change', function() {
    Caman("#edit-dummy-canva", img, function () {
        this.brightness(brightnessVal.value - 50).render();
    });
})

var contrastVal = document.getElementById("contrast")
contrastVal.addEventListener('change', function() {
    Caman("#edit-dummy-canva", img, function () {
        this.contrast(contrastVal.value - 50).render();
    });
})

var saturationVal = document.getElementById("saturation")
saturationVal.addEventListener('change', function() {
    Caman("#edit-dummy-canva", img, function () {
        this.saturation(saturationVal.value - 50).render();
    });
})

var originBtn = document.getElementById("filter-origin-Btn")
originBtn.addEventListener('click', function() {
    contrastVal.value = 50;
    saturationVal.value = 50;
    brightnessVal.value = 50;
    Caman("#edit-dummy-canva", img, function () {
        this.revert();
    });
})

var cancelBtn = document.getElementById("filter-cancel-Btn")
cancelBtn.addEventListener('click', function() {
    // contrastVal.value = 50;
    // saturationVal.value = 50;
    // brightnessVal.value = 50;
    // Caman("#edit-dummy-canva", img, function () {
    //     this.revert();
    // });
    document.getElementById('apply-filter-section').style.display = 'none';
})

var doneBtn = document.getElementById("filter-done-Btn")
doneBtn.addEventListener('click', function() {
    var originalCanvas = document.querySelector("#anywhere-upload-queue > li > div.preview.block > canvas")
    var originalCtx = originalCanvas.getContext("2d");

    originalCtx.drawImage(canvasDummy, 0, 0, canvasDummy.width, canvasDummy.height, 0, 0, originalCanvas.width, originalCanvas.height);
    document.getElementById('apply-filter-section').style.display = 'none';

    canvasDummy.toBlob(blob => {
        blob.name = CHV.fn.uploader.files[0].name;
        blob.parseMeta = CHV.fn.uploader.files[0].parsedMeta;
        CHV.fn.uploader.files[0] = blob
    })
})

// var uploadBtn = document.getElementById("filter-upload-Btn")
// uploadBtn.addEventListener('click', function() {

// })