/* global $ */
'use strict';

//state object
const appState = {
  results: [],
  pokeTeam: [],
  details: []
};

//mod function
function addResults(state, results) {
  state.results = results;
}

//callback and AJAX
const pokeApiUrl = 'http://pokeapi.co/api/v2/';

function getData(searchTerm) {
  const query = searchTerm.toLowerCase();

  if ($('#selectorId').val() === 'name') {
    $.getJSON(pokeApiUrl + 'pokemon/' + query + '/', function (data) {
      addResults(appState, data);
      renderAbility(appState, $('.results'));
    });
  }
  else {
    $.getJSON(pokeApiUrl + 'ability/' + query + '/', function (data) {
      addResults(appState, data);
      renderPoke(appState, $('.results'));
    });
  }
}

function getPokemonDetails(searchTerm) {
  const query = searchTerm.toLowerCase();

  $.getJSON(pokeApiUrl + 'pokemon/' + query + '/', function (data) {
    addResults(appState, data);
    renderPokemonDetails(appState, $('.results'));
  });
}

function getAbilityDetails(searchTerm) {
  const query = searchTerm.toLowerCase();
  $.getJSON(pokeApiUrl + 'ability/' + query + '/', function (data) {
    addResults(appState, data);
    renderPoke(appState, $('.results'));
  });
}

//render functions
function renderAbility(state, element) {
  const abilityHTML = state.results.abilities.map(function (obj) {
    return `<button class='ability-deets' type='button' name='ability' value='${obj.ability.name}'>${obj.ability.name}</button>`;
  });
  element.html(`
			<div class='row>
				<div class='col-12'>
					<h3>Abilities</h3>
					${abilityHTML}
				</div>
			</div>
			`);
}

function renderPoke(state, element) {
  const nameHTML = state.results.pokemon.map(function (obj) {
    return `
				<div class='col-12'>
					<button class='deets' type='button' name='name' value='${obj.pokemon.name}'>${obj.pokemon.name}</button>
				</div>
			`;
  });

  const abilityDetails = state.results.effect_entries.map(function (obj) {
    return `Effect: ${obj.effect}`;
  });

  element.html(`
			<h2><u>${state.results.name}</u></h2>
			<p>${abilityDetails}</p>
			<p><u>Pokemon with ${state.results.name}</u></p>
			<div class='row'>${nameHTML.join('')}</div>
			`);
}

function renderPokemonDetails(state, element) {
  const pokeAbility = state.results.abilities.map(function (obj) {
    return `<button class='ability-deets' type='button' name='ability' value='${obj.ability.name}'>${obj.ability.name}</button>`;
  });

  const pokeStats = state.results.stats.map(function (obj) {
    return `<p>${obj.stat.name}: ${obj.base_stat}</p>`;
  });

  element.html(`
		<div class='row'>
				<div class='col-12'>
					<p>Name: ${state.results.name}</p>
					<img src='${state.results.sprites.front_default}'>
					<p>PokeDex Id Number: ${state.results.id}
					<p><u>Abilities</u></p>
					<div>${pokeAbility.join('')}</div>
					<p><u>Stats</u></p>
					<p>${pokeStats.join('')}</p>
				</div>
			</div>
	`);
}

//event
$(function watchSubmit() {
  $('.js-search-form').submit(function (event) {
    event.preventDefault();
    const query = $('.js-query').val();
    getData(query);
  });

  //listeners on check/button

  $('.results').on('click', '.deets', function (event) {
    event.preventDefault();
    const query = $(event.currentTarget).val();
    getPokemonDetails(query);
  });

  $('.results').on('click', '.ability-deets', function (event) {
    event.preventDefault();
    const query = $(event.currentTarget).val();
    getAbilityDetails(query);
  });
});
