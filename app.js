//state object
appState = {
	results: [],
	pokeTeam: [],
};

//mod function
function addResults(state, results) {
	state.results = results;
}

function addTeam(state, element){
	state.pokeTeam.push(element);
}
//callback and AJAX
const pokeApiUrl = 'http http://pokeapi/api/v2/';

function getData(searchTerm) {
const query = {
	q: searchTerm,
}
$.getJSON(pokeApiUrl, query, function(data){
	addResults(appState, data);
});
}

//render functions

//event listeners
