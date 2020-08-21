var qrcode = new QRCode("code", {
    text: "google.es",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});



qrcode.makeCode();
console.log(qrcode);