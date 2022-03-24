const fetchPokemon = () => {
    const pokeNameInput = document.querySelector("#pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            /* console.log(res); */
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

            /* console.log(pokeAbilities) */

            let pokeStats = [];
            for (let i = 0; i < data.stats.length; i++) {
                const stat_value = data.stats[i].base_stat;
                pokeStats.push(stat_value);
            }

            let pokeWeight = data.weight;
            let pokeHeight = data.height;



            set_data("#pokemon_identifier", "#"+id +" "+ name.toUpperCase());
            set_data("#pokeHeight", "Height: "+pokeHeight);
            set_data("#pokeWeight", "Weight: "+pokeWeight);
            set_data("#pokeType", "Type: " + pokeType.toUpperCase());

        
            pokeImage(pokeImg, "#pokeImg");
            create_chart(pokeStats, name);
            /* set_stats(pokeStats); */
            set_abilities(pokeAbilities);
        }
    });
}

async function fetchImgName(url) {

    const response = await fetch(url);
    const dataJSON = await response.json();
    let pokeImg = dataJSON.sprites.front_default;
    let pokeName = dataJSON.name;

    return [pokeImg, pokeName]

}
    
   
async function fetchPokemonGrid(){
    const gridContainer = document.querySelector(".grid-container");
    const page = Number(document.querySelector("#pageSelector").value);
    const nImages = Number(document.querySelector("#nImages").value);
    const offset = Number(page * nImages - nImages);
    /* console.log('offset: ' + offset); */
    
    /* Cleanning the html content before creating new elements*/
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    for (let i = offset; i < nImages + offset; i++) {
        await fetchImgName(`https://pokeapi.co/api/v2/pokemon/${i+1}`).then((imgName) => {
            const button = document.createElement("button");
            const img = document.createElement("img");
            img.src = imgName[0];
            gridContainer.appendChild(button);
            button.appendChild(img);
            button.value = imgName[1];
            button.addEventListener('click', function () {
                const pokemonID = document.querySelector("#pokeName");
                pokemonID.value = this.value;
                fetchPokemon();
            });
        });
    }

}
/* 
const next_page = () => {
    let nPage = document.querySelector("#pageSelector").value;
    nPage += 1;
    fetchPokemonGrid();
}

const previous_page = () => {
    let nPage = document.querySelector("#pageSelector").value;
    if (nPage > 1) {
        nPage -= 1;
        fetchPokemonGrid();
    }
} */

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


const create_chart = (stats, pokeName) => {

    const container = document.querySelector("#statsChart");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const pokeChart = document.createElement("canvas")
    container.appendChild(pokeChart);

    const statsData = {
        labels: ["HP", "ATTACK", "DEFENSE", "SPECIAL_ATTACK", "SPECIAL_DEFENSE", "SPEED"],
        datasets: [{
            label: 'Stats value',
            backgroundColor: "rgba(0,250,0,0.75)",
            data: stats
        }]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            r: {
                angleLines: {
                    color: 'white'
                },
                grid: {
                    color: 'white',
                    lineWidth: 2
                },
                pointLabels: {
                    color: 'white'
                },
                ticks: {
                    color: 'blue'
                }
            }
        }
    }
    
    var radarchart = new Chart(pokeChart, {
        type: "radar",
        data: statsData,
        options: chartOptions
    });

}