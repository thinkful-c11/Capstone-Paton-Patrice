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
const pokeApiUrl = 'http://pokeapi.co/api/v2/';

function getData(searchTerm) {
const query = searchTerm.toLowerCase();

if ($('#selectorId').val() === "name"){

	$.getJSON(pokeApiUrl+"pokemon/"+query+"/", function(data){
		addResults(appState, data);
		renderAbility(appState, $('.results'));
		});
	} else {
	 $.getJSON(pokeApiUrl+"ability/"+query+"/", function(data){
	 	addResults(appState, data);
		renderPoke(appState, $('.results'));
	 });
	}
}

//render functions
function renderAbility(state, element){
	const abilityHTML = state.results.abilities.map(function(obj){
		return `
				<div class="row>
					<div class="col-12">
						<input id="toggle" type="checkbox">
						<label for="toggle">${obj.ability.name}</label>
						<div id="expand">
							<section>
								<p>${obj.pokemon.url}</p>
							</section>
						</div>
					</div>
				</div>
				`
	});
	element.html(abilityHTML);
}

function renderPoke(state, element){

	const nameHTML = state.results.pokemon.map(function(obj){
		// if (state.selectedPokemon.name === obj.name) {
		//
		// }
		 return `
			<div class="row">
				<div class="col-12">
					<input id="toggle" type="checkbox">
					<label for="toggle">${obj.pokemon.name}</label>
					<div id="expand">
						<section>
							<p>${obj.pokemon.url}</p>
						</section>
					</div>
				</div>
			</div>
			`
	});
	element.html(nameHTML);

}
//event
	$(function watchSubmit(){
	$('.js-search-form').submit(function(event){
		event.preventDefault();
		const query = $('.js-query').val();
		getData(query);
	});

	//listeners on check/button
});

//do css
//add no results error
//change input to button
