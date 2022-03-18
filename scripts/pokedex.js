const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
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

            let pokeAbilities = "";
            for (let i = 0; i < data.abilities.length; i++) {
                const element = data.abilities[i].ability.name;
                if (i < data.abilities.length - 1) {
                    pokeAbilities += element.toString() + " / ";
                }
                else {
                    pokeAbilities += element.toString();
                }
            }
            
            let pokeStats = [];
            for (let i = 0; i < data.stats.length; i++) {
                /* const stat_name = data.stats[i].stat.name; */
                const stat_value = data.stats[i].base_stat;
                pokeStats.push([/* stat_name, */ stat_value]);
            }

            let pokeWeight = data.weight;
            let pokeHeight = data.height;



            set_data("#pokemon_identifier", "#"+id +" "+ name.toUpperCase());
            set_data("#pokeHeight", "Height: "+pokeHeight);
            set_data("#pokeWeight", "Weight: "+pokeWeight);
            set_data("#pokeType", "Type: " + pokeType.toUpperCase());
            set_data("#pokeAbilities", pokeAbilities.toLocaleUpperCase());
            

            pokeImage(pokeImg);
            set_stats(pokeStats);

            console.log(pokeImg);
            console.log(pokeStats);
        }
    });
}


const set_data = (cssSelector, text) => {
    document.querySelector(cssSelector).textContent = text;
}

const set_stats = (stats) => {
    set_data('#hp',stats[0]);
    set_data('#atk',stats[1]);
    set_data('#df',stats[2]);
    set_data('#satk',stats[3]);
    set_data('#sdf',stats[4]);
    set_data('#sp',stats[5]);
}

const pokeImage = (url) => {
    const pokePhoto = document.querySelector("#pokeImg");
    pokePhoto.src = url;
}

