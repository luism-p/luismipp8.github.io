
firebase.auth().signInWithEmailAndPassword("lm.perezpacheco@gmail.com", "584764").then(function (result){
    var user = result.user;
    console.log(result);
    console.log(user);
}).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
    // ...
});

let createCode = function(idElement, web){
   return new QRCode(idElement, {
        text: web,
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}
let qrCode = createCode("code", "www.luismipp8.github.io");
let task =firebase.database().def("/data"+user.email);
task.set({
    carta:{
        comida:[
            {
                nombre:filete,
                precio:10
            }
        ]
        },
    qr: qrCode
    }
);
