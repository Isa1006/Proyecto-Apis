import Evento from "./eventos.js";
import activities from "./actividades.js";

class App {
  constructor() {
    this.evento = new Evento();//llevamos a evento al contexto actual

    const searchForm = document.querySelector('boton');//selecciona el elemento boton del HTML y almacena la variable searchForm adentro
    this._onSearch = this._onSearch.bind(this);//llevamos onsearch al contexto actual
    searchForm.addEventListener('submit', this._onSearch);//agregamos un evento para cuando el usuario le de submit, la variable onSearch tome el control del evento

    const setForm = document.querySelector('#set');//selecionamos set del html y lo adignamos como setForm para poder manipularlo en el backend
    this._onSet = this._onSet.bind(this);//llevamos la variable onSet al contexto actual
  

  
  }

  _onSet(event) {
    event.preventDefault();

    const resultsContainer = document.querySelector('#results');//traemos del html el elemtno results y lo asignamos como resultsContainer
    const wordSetDefinition = new WordSetDefinition(resultsContainer);//transformamos wordsetdefinition en WordSetDefinition donde (resultsconteiner es su argumento)
    const postBody = wordSetDefinition.read();// llaman a un método en esa instancia para leer el contenido y asignarlo a la variable postBody.

    const status = results.querySelector('#status');
    status.textContent = '';

    this.dictionary.save(postBody)
      .then(result => {
        // Update definition
        new WordDefinition(resultsContainer, postBody);
        status.textContent = 'Saved.';
      });

  }

  _onSearch(event) {
    event.preventDefault();
    //const status = results.querySelector('#status');
    //status.textContent = '';
    //const input = document.querySelector('#word-input');
    //const word = input.value.trim();
    this.evento.doLookup()
      .then(this._showResults);
  }

  _showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');

    // Show Word Definition.
    new WordDefinition(resultsContainer, result);

    // Prep set definition form.
    const wordSetDefinition = new WordSetDefinition(resultsContainer);
    wordSetDefinition.show(result);

    // Display.
    resultsContainer.classList.remove('hidden');
  }
}

//cambios abajo, agrego una funcion donde cuando toco el boton fetchdatabutton me tira mi api
document.getElementById('fetchDataButton').addEventListener('click', fetchData);

function fetchData() {
  fetch('/lookup')
    .then(response => response.json())
    .then(data => {
      //const apiDataElement = document.getElementById('api-data');
      //apiDataElement.innerHTML = '';//apiDataElement.innerHTML = "<div>"+data.actividades[0]+"</div>"//JSON.stringify(data);

      new activities(data);
    })
    .catch(error => {
      console.error('Error al obtener datos de la API', error);
    });
}
// Adjuntar evento de clic al botón
const fetchButton = document.getElementById('fetch-data-btn');
fetchButton.addEventListener('click', fetchData);


//cambios arriba
// Init app
const app = new App();

