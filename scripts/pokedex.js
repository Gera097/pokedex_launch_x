const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./assets/pokemon-sad.gif", "#pokeImg")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            let name = data.name;
            let id = data.id;

        
            let pokeType = "";
            for (let i = 0; i < data.types.length; i++) {
                const element = data.types[i].type.name;
                if (i < data.types.length - 1) {
                    pokeType += element.toString() + " / ";
                }
                else {
                    pokeType += element.toString();
                }
            }

            let pokeAbilities = [];
            for (let i = 0; i < data.abilities.length; i++) {
                const element = data.abilities[i].ability.name;
                pokeAbilities.push(element);
            }

            console.log(pokeAbilities)

            let pokeStats = [];
            for (let i = 0; i < data.stats.length; i++) {
                const stat_value = data.stats[i].base_stat;
                pokeStats.push([stat_value]);
            }

            let pokeWeight = data.weight;
            let pokeHeight = data.height;



            set_data("#pokemon_identifier", "#"+id +" "+ name.toUpperCase());
            set_data("#pokeHeight", "Height: "+pokeHeight);
            set_data("#pokeWeight", "Weight: "+pokeWeight);
            set_data("#pokeType", "Type: " + pokeType.toUpperCase());

        
            pokeImage(pokeImg, "#pokeImg");
            set_stats(pokeStats);
            set_abilities(pokeAbilities);
        }
    });
}

const fetchImgName = (url) => {


    return [pokeName, pokeImage]
}


const fetchPokemonGrid = (nImages) => {
    const gridContainer = document.querySelector(".grid-container")

    for (let i = 0; i < nImages; i++) {

        /* const img = document.createElement("img")
        img.src =  */
    }

}



const set_data = (cssSelector, text) => {
    document.querySelector(cssSelector).innerHTML = text;
}

const set_abilities = (abilities) => {
    const container = document.querySelector("#pokeAbilities");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    if (container.childElementCount == 0) {
        for (let i = 0; i < abilities.length; i++) {
            const line = document.createElement("p");
            line.id = "line_" + i;
            line.textContent = abilities[i];
            container.appendChild(line);
        }
    }
}

const set_stats = (stats) => {
    set_data('#hp',stats[0]);
    set_data('#atk',stats[1]);
    set_data('#df',stats[2]);
    set_data('#satk',stats[3]);
    set_data('#sdf',stats[4]);
    set_data('#sp',stats[5]);
}

const pokeImage = (url, selector) => {
    const pokePhoto = document.querySelector(selector);
    pokePhoto.src = url;
}

