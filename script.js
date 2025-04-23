const API_URL = "https://rickandmortyapi.com/api/character";
const container = document.getElementById("cardsContainer");
const select = document.getElementById("characterFilter");
const refreshButton = document.getElementById("refreshButton");
let allCharacters = [];

async function fetchMultiplePages(pages = 3) {
  let characters = [];

  for (let i = 1; i <= pages; i++) {
    const response = await fetch(`${API_URL}?page=${i}`);
    const data = await response.json();
    characters.push(...data.results);
  }

  allCharacters = characters;
  const randomCharacters = getRandomSubset(characters, 20);
  populateCards(randomCharacters);
  populateSelect(characters);
}

function getRandomSubset(array, size) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

function populateCards(characters) {
  container.innerHTML = "";
  characters.forEach(character => {
    container.innerHTML += `
      <div class="card">
        <img src="${character.image}" alt="${character.name}">
        <h3>${character.name}</h3>
        <p>${character.status} - ${character.species}</p>
      </div>
    `;
  });
}

function populateSelect(characters) {
  characters.forEach(character => {
    const option = document.createElement("option");
    option.value = character.id;
    option.textContent = character.name;
    select.appendChild(option);
  });
}

select.addEventListener("change", () => {
    const selected = select.value;
    if (selected === "all") {
      populateCards(allCharacters.slice(0, 20)); 
    } else {
      const filtered = allCharacters.filter(c => c.id == selected);
      populateCards(filtered);
    }
  });
  

refreshButton.addEventListener("click", () => {
  const randomCharacters = getRandomSubset(allCharacters, 20);
  populateCards(randomCharacters);
  select.value = "all";
});

fetchMultiplePages(3);
