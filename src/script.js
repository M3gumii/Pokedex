//Only run this once the page has been loaded...
document.addEventListener('DOMContentLoaded', function(){
    //get access to all our modifiable things in the html page...
    const pokemonInput = document.getElementById("pokeInput");
    const findButton = document.getElementById("searchButton");
    const notif = document.getElementById("notif");

    const picture = document.getElementById("pic");
    const data = document.getElementById("desc");
    const name = document.getElementById("name");
    findButton.addEventListener('click',function (){
        getData(pokemonInput.value);
    });  //attach event handler to button...
    
    function getData(pokemonName){
        if(pokemonName != ""){
            //gets the needed data from the api!
            const APIBase = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
            console.log("LINK USED: " + APIBase);
        
            fetch(APIBase)  //once resolves, we get the resp. object
            .then(response => response.json())    //now that we have the resp. let's get it in JSON!
            .then(obj => showData(obj))    //log the data
            .catch(error => notif.innerText = "Pokemon could not be found.\nPlease try again!");
        }
    }

    function showData(objData){
        
        name.innerText = objData.name;
        data.innerText = "Type: " + objData.types[0].type.name + " - #" + objData.order + "\n\n";
        data.innerText += "Weight: " + objData.weight + "\n\n";

        //gets each move
        moves = "";
        for(i = 0; i < objData.moves.length && i < 3; i++){
            moves += objData.moves[i].move.name;
            //console.log(objData.moves[i].move.name);
            if(i == 2){
                moves+="..."
            }
            moves+= "\n"
        }
        data.innerText += "Moves:\n\t" + moves +"\n";

        //Abilities too!
        abilities = "";
        for(i = 0; i < objData.abilities.length && i < 3; i++){
            abilities += objData.abilities[i].ability.name;
            //console.log(objData.moves[i].move.name);
            if(i == 2){
                abilities+="..."
            }
            abilities+= "\n"
        }
        data.innerText += "Abilities:\n\t" + abilities;
        
        //now get the basic image...
        imgLink = objData.sprites.front_default;
        console.log(imgLink);
        if(imgLink == "" || imgLink == null){
            notif.innerText += "Image for " + objData.name + " could not be found!";
        }
        picture.src = imgLink;
    }
});

