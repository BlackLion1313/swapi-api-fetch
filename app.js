const apiUrl = 'https://swapi.dev/api/';

function fetchEntities(entity) {
    return fetch(apiUrl + entity)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => console.log(error));
}

function renderList(list, entity) {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = '';
    list.forEach(item => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.textContent = item.name;
        listItem.addEventListener('click', () => renderDetails(item, entity));
        listContainer.appendChild(listItem);
    });
}

function renderDetails(item, entity) {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = '';
    const title = document.createElement('h2');
    title.textContent = item.name;
    detailsContainer.appendChild(title);
    const properties = Object.keys(item);
    properties.forEach(property => {
        const detailItem = document.createElement('div');
        detailItem.classList.add('detail-item');
        detailItem.innerHTML = `<strong>${property}:</strong> ${item[property]}`;
        detailsContainer.appendChild(detailItem);
    });
}

const charactersBtn = document.getElementById('characters-btn');
const planetsBtn = document.getElementById('planets-btn');
const vehiclesBtn = document.getElementById('vehicles-btn');

charactersBtn.addEventListener('click', () => {
    fetchEntities('people')
        .then(people => renderList(people, 'people'));
});

planetsBtn.addEventListener('click', () => {
    fetchEntities('planets')
        .then(planets => renderList(planets, 'planets'));
});

vehiclesBtn.addEventListener('click', () => {
    fetchEntities('vehicles')
        .then(vehicles => renderList(vehicles, 'vehicles'));
});

function init() {
    fetchEntities('people')
        .then(people => renderList(people, 'people'));
}

init();
