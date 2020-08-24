global = global || {};


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
    global.initFirebase();

    firebase.auth().signInWithEmailAndPassword("lm.perezpacheco@gmail.com", "584764").then(function (result) {
        global.user = result.user.uid;
        console.log(result);

        console.log(global.user)

        var qr = $('#qrCode img').attr('src');

        let task = firebase.database().ref("data/" + global.userUid);
        task.set({
                carta: {
                    comida: [
                        {
                            nombre: "filete",
                            precio: 100
                        }
                    ]
                },
                code: qr,
                web: ""

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

global.initFirebase = function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDc2aK2DuZUW7Iw_WuValYq9o0Y7a_TTTs",
        authDomain: "test-bar-qrcode.firebaseapp.com",
        databaseURL: "https://test-bar-qrcode.firebaseio.com",
        projectId: "test-bar-qrcode",
        storageBucket: "test-bar-qrcode.appspot.com",
        messagingSenderId: "1085750921277",
        appId: "1:1085750921277:web:001764db5c058c11bac254",
        measurementId: "G-TFXHZDFRFY"
    };
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}
