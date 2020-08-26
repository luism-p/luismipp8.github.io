let global = {};
global.web = $("#web");
global.pass = $("#pass");
global.alerta = $("#alerta");
global.btnSave = $('#btnSave');
global.textAreaJson = $('#textAreaJson');
global.generateCode = $('#generateCode');

let success = `<div class="alert alert-success" role="alert" id="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong></strong>
        </div>`

$(function (){

    global.pass.on('keyup', function (){
        let value = $(this).val();
        global.btnSave.attr('disabled', !value);
    });

    global.btnSave.on('click', function (){
        let pass = global.pass.val();
        global.connect(pass);
    });
    global.web.on('keyup', function (){
        let value = $(this).val();
        global.generateCode.attr('disabled', !value);
    });
    global.generateCode.on('click', function (){
        let web = global.web.val();
        global.createCode("qrCode", web);
    })
    global.initFirebase();
    global.loadData();
});

global.showAlert = function (type, message){
    let alert = `<div class="alert alert-${type}" role="alert" id="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong>${message}</strong>
        </div>`
    global.alerta.empty();
    global.alerta.html(alert);
}
global.connect = function (pass){
    firebase.auth().signInWithEmailAndPassword("lm.perezpacheco@gmail.com", pass).then(function (result) {
        global.user = result.user;
        global.userUid = result.user.uid;
        global.userEmail = result.user.email;
        console.log(result);
        console.log(global.userUid);

        let message = "Configuración de " +global.userEmail+ " guardada correctamente.";
        global.showAlert("success", message);

        let json = global.textAreaJson.val();
        let qr = $('#qrCode img').attr('src');
        let web = global.web.val();

        global.saveData(json, qr, web);

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        let message = " Error: ("+errorCode+") "+errorMessage;
        global.showAlert("danger", message);
    });
}

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
global.loadData = function (){
    firebase.database().ref('data/yOVx8ZDrx0eqKlwbsDmWx90sbOt1').once('value').then(function(snapshot) {
        console.log(snapshot.val());

        let jsonData = snapshot.val();

        jsonData.hasOwnProperty("carta")?global.textAreaJson.val(jsonData.carta).trigger('change'):global.textAreaJson.val("");
        jsonData.hasOwnProperty("web")?global.web.val(jsonData.web).trigger('change'):global.web.val("");

        global.web.val()?global.generateCode.attr('disabled', false).click():false;
    });
}
global.saveData = function (json,qr,web){
    if(json && qr && web) {
        let task = firebase.database().ref("data/" + global.userUid);
        task.set({
                carta: json,
                code: qr,
                web: web
            }
        );
    }else{
        global.showAlert("danger", "Hay un dato incorrecto");
    }
}

global.createCode = function (idElement, web) {
    $('#'+idElement).empty();
    return new QRCode(idElement, {
        text: web,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}