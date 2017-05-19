//state object
appState = {
	results: [],
	pokeTeam: [],
	details: []
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

function getPDetails(searchTerm){
	const query = searchTerm.toLowerCase();

	$.getJSON(pokeApiUrl+"pokemon/"+query+"/", function(data){
		addResults(appState, data);
		renderAbility(appState, $('.results'));
		});
}

function getADetails(searchTerm){
	const query = searchTerm.toLowerCase();
	 $.getJSON(pokeApiUrl+"ability/"+query+"/", function(data){
	 	addResults(appState, data);
		renderPoke(appState, $('.results'));
	 });
}

//render functions
function renderAbility(state, element){
	const abilityHTML = state.results.abilities.map(function(obj){
		return `
				<div class="row>
					<div class="col-12">
						<button class="ability-deets" type="button" name="ability" value="${obj.ability.name}">${obj.ability.name}</button>
						<div id="expand">
							<section>
								<p>"search worked"</p>
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
					<button class="deets" type="button" name="name" value="${obj.pokemon.name}">${obj.pokemon.name}</button>
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

	$('.results').on("click", ".deets", function(event){
		event.preventDefault();
		console.log("hello world");
		const query = $(event.currentTarget).val();
		console.log(query);
		getPDetails(query);
	});

	$('.results').on("click", ".ability-deets", function(event){
		event.preventDefault();
		console.log("hello world");
		const query = $(event.currentTarget).val();
		console.log(query);
		getADetails(query);
	});

});

//do css
//add no results error
//change input to button
