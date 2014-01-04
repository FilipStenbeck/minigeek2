var app = app || {} ;

app.hotGames = ko.observableArray();
ko.applyBindings(app.hotGames, $('#hotgames')[0]);
app.currentGame = new app.models.GameInfo();
ko.applyBindings(app.currentGame, $('#gameinfo')[0]);

var geekService = new app.service.GeekService();

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

//ROUTER DEBUG LOG
crossroads.routed.add(console.log, console); //log all routes
 
//setup hasher
function parseHash(newHash, oldHash){
  crossroads.parse(newHash);
}
hasher.initialized.add(parseHash); //parse initial hash
hasher.changed.add(parseHash); //parse hash changes
hasher.init(); //start listening for history change
 