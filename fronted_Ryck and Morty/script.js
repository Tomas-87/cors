const container = document.getElementById('container'),
      buscador = document.getElementById('buscador'),
      prev = document.getElementById('prev'),
      next = document.getElementById('next'),
      apiKey = 'http://localhost:3000/characters';
let currentPage = 1;


    const fetchData = async (url) => {
        try{
            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status}`);
            return res.json()
        } catch(error) {
            console.error(`ERROR: ${error.message}`)
        };
    };

const render = (characters) => {
    container.innerHTML = '';
    
    characters.forEach(({image, gender, name, origin, species, status}) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <img src="${image}" alt="${name}"/>
        <h3>${name}</h3>
        <p>${gender}</p>
        <p>${species}</p>
        <p>${status}</p>
        <p>${origin}</p>
        `
        container.appendChild(card);
    });
};

//buscar por nombre
const getCharacterName = async (name) => {
    const res = await fetch(`${apiKey}/?name=${name}`)
    if (!res.ok) throw new Error(`ERROR: ${res.status}`);
    return res.json();
};

const buscadorName = async () => {
    const name = buscador.value.trim().toLowerCase()
    if (!name) {
        load();
        return;
    }

    try {
        const characters = await getCharacterName(name);
        render(characters);
    }catch(error) {
        container.innerHTML = '<h1>Personaje no Encontrado</H1>';
    };
};


const load = async () => {
        const data = await fetchData(`${apiKey}`);
        console.log(data)
        render(data);
};



load();