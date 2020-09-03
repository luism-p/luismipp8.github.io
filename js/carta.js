function see(){
    let json = JSON.parse(global.jsonData.carta);

    console.log(json);

    for(j in json){
        console.log(j);

    }
/*    <div class="card">
        <div class="card-header" id="headingOne">
            <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Collapsible Group Item #1
                </button>
            </h2>
        </div>*/


}

$(function (){
    global.initFirebase();
    global.loadData(global.printCarta);
});

