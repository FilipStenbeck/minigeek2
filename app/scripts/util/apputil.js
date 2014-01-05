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

		$('#game-info').addClass('active');
		$('#game-video').removeClass('active');
		$('#game-forum').removeClass('active');
		$('#gameinfo').show();
		$('#gameinfo #main').show();
		$('#video-list').hide();
		$('#forum').hide();
		$('#hotgames').hide();
		$('#search').hide();
	},
	showSearch : function (query) {
		$('#search').show();
		$('#nav-search').addClass('active');
		$('#nav-hotgames').removeClass('active');
		$('#search input').val(query);
		$('#gameinfo').hide();
		$('#hotgames').hide();
	},
	showGameVideo : function () {
		$('#gameinfo').show();
		$('#video-list').show();
		$('#forum').hide();

		$('#gameinfo #main').hide();
		$('#game-info').removeClass('active');
		$('#game-forum').removeClass('active');
		$('#game-video').addClass('active');
	},
	showGameForum : function () {
		$('#gameinfo').show();
		$('#forum').show();
		$('#video-list').hide();
		$('#gameinfo #main').hide();
		$('#game-info').removeClass('active');
		$('#game-video').removeClass('active');
		$('#game-forum').addClass('active');	

	},
	setupEventListners : function() {
		//Search form submit
		$('#search form').submit(function() {
			hasher.setHash('search/' + $('#search input').val());
		});
		$('#game-video').click(function() {
			hasher.setHash('gameinfo/' + app.currentGame.id() + '/video');
		});
		$('#game-info').click(function() {
			hasher.setHash('gameinfo/' + app.currentGame.id());
		});
		$('#game-forum').click(function() {
			hasher.setHash('gameinfo/' + app.currentGame.id() +'/forum');
		});
	}
};