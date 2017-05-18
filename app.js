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
const pokeApiUrl = 'http://pokeapi.co/api/v2/pokemon/';

function getData(searchTerm) {
const query = searchTerm;
$.getJSON(pokeApiUrl+query+"/", function(data){
	addResults(appState, data);
	renderAbility(appState, $('.results'));
});
}

//render functions
function renderAbility(state, element){
	const abilityHTML = state.results.abilities.ability.map(function(obj){
		return `
				<ul>
					<li>${obj}</li>
				</ul>
				`
	});
	element.html(abilityHTML);
}
//event 
