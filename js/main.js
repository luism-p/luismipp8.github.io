var user;

let createCode = function (idElement, web) {
    return new QRCode(idElement, {
        text: web,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}
let qrCode = createCode("code", "www.luismipp8.github.io");

$(function () {
    firebase.auth().signInWithEmailAndPassword("lm.perezpacheco@gmail.com", "584764").then(function (result) {
        user = result.user.uid;
        console.log(result);

        console.log(user)

        var qr = $('#code img').attr('src');

        let task = firebase.database().ref("data/" + user);
        task.set({
                carta: {
                    comida: [
                        {
                            nombre: "filete",
                            precio: 100
                        }
                    ]
                },
                code:qr
            }
        );


    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        // ...
    });


});
