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
	//console.log(data);
	addResults(appState, data);
	//console.log(appState);
	renderAbility(appState, $('.results'));
});
}

//render functions
function renderAbility(state, element){
	const abilityHTML = state.results.abilities.map(function(obj){
		return `
				<ul>
					<li>${obj.ability.name}</li>
				</ul>
				`
	});
	element.html(abilityHTML);
}
//event
