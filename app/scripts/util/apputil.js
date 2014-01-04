var app = app || {} ;

app.util = {
	showHotGames : function() {
		$('#gameinfo').hide();
		$('#hotgames').show();
	},
	showGameInfo : function() {
		$('#gameinfo').show();
		$('#hotgames').hide();
	}
}