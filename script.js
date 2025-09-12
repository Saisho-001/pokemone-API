const getPoke = document.getElementById('poke');
const btn = document.querySelector('.see-pokemone');
const setPoke = document.querySelector('.pokemone');

btn.addEventListener('click', () =>{
    setPoke.innerHTML = '';
    getPokeWithApi(getPoke.value);
    getPoke.value = '';
})

window.addEventListener('keydown', (e) =>{
    if (e.key === 'Enter' && getPoke.value != ''){
        setPoke.innerHTML = '';
        getPokeWithApi(getPoke.value);
        getPoke.value = '';
    }
})

function getPokeWithApi(text){
    const poke = text.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    .then(response => {
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            return response.json();
        })
    .then(data => {
        const sprite = data.sprites.front_default;
        const img = document.createElement('img');
        img.setAttribute('src', sprite);
        setPoke.appendChild(img);
    })
    .catch(error => {
        console.error(error);
        setPoke.textContent = 'Pokémon not found. Please try again.';
    });
}