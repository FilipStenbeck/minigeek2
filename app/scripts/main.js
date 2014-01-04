var app = app || {} ;

app.hotGames = ko.observableArray();
app.searchResult = ko.observableArray();
ko.applyBindings(app.searchResult, $('#search')[0]);
ko.applyBindings(app.hotGames, $('#hotgames')[0]);
app.currentGame = new app.models.GameInfo();
ko.applyBindings(app.currentGame, $('#gameinfo')[0]);

var geekService = new app.service.GeekService();

//Setup eventlistners
app.util.setupEventListners();

//setup crossroads
/***********************
	Game Info
************************/
crossroads.addRoute('gameinfo/{id}', function(id) {
	geekService.getGameInfo(id, function(game) {
		app.currentGame.id(id);
		app.currentGame.name(game.name);
		app.currentGame.description(game.description);
		app.currentGame.link(game.link);
		app.currentGame.rating(game.rating);
		app.currentGame.thumbnail(game.thumbnail);
		app.currentGame.yearpublished(game.yearpublished);
		app.util.showGameInfo();
	});
});

/***********************
	Hot Games 
************************/
crossroads.addRoute('hotgames', function(id) {
	geekService.getHotGames(function(data) {
		//Make GameItems
		var gameList = _.map(data, function(game) {
			var gameItem = new app.models.GameItem();
			gameItem.id(game.id);
			gameItem.name(game.name);
			return gameItem;
		})
		//add them to hotgame list
		 var i = 0;
		 _.each(gameList, function(game) {
		 	if (game.name != '') {
	 			app.hotGames.push(game);
		 	}
		 });
	});
	app.util.showHotGames();
});

/***********************
	Search 
************************/
crossroads.addRoute('search', function() {
	app.util.showSearch();
});

crossroads.addRoute('search/{query}', function(query) {
	app.util.showSearch(query);
	app.searchResult.removeAll();
	geekService.search(query, function(result) {
		//Make GameItems
		var gameList = _.map(result, function(game) {
			var gameItem = new app.models.GameItem();
			gameItem.id(game.id);
			gameItem.name(game.name);
			return gameItem;
		});
		//add them to searchResult list
		 var i = 0;
		 _.each(gameList, function(game) {
		 	if (game.name != '') {
	 			app.searchResult.push(game);
		 	}
		 });		
	});
});


//ROUTER DEBUG LOG
crossroads.routed.add(console.log, console); //log all routes
 
//setup hasher
function parseHash(newHash, oldHash){
  crossroads.parse(newHash);
}
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change
 