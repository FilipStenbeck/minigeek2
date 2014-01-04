var app = app || {} ;

app.util = {
	showHotGames : function() {
		$('#nav-search').removeClass('active');
		$('#nav-hotgames').addClass('active');
		$('#gameinfo').hide();
		$('#search').hide();
		$('#hotgames').show();
	},
	showGameInfo : function() {
		$('#gameinfo').show();
		$('#hotgames').hide();
		$('#search').hide();
	},
	showSearch : function(query) {
		$('#search').show();
		$('#nav-search').addClass('active');
		$('#nav-hotgames').removeClass('active');
		$('#search input').val(query);
		$('#gameinfo').hide();
		$('#hotgames').hide();
	},
	setupEventListners : function() {
		//Search form submit
		$('#search form').submit(function() {
			hasher.setHash('search/' + $('#search input').val());
		});
	}
};