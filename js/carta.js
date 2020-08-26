function see(){
    let json = global.jsonData;

    console.log(json);
}

$(function (){
    global.initFirebase();
    global.loadData(see());
});

