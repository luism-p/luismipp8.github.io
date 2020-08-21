let createCode = function(idElement, web){
    new QRCode(idElement, {
        text: web,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

$(function(){
    createCode("code", "www.luismipp8.github.io");
});