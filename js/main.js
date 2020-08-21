// Your web app's Firebase configuration

firebase.auth().signInWithEmailAndPassword("lm.perezpacheco@gmail.com", "5864").then(function (result){
    var user = result.user;
    console.log(user);
}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

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