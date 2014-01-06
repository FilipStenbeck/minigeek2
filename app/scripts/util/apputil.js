var app = app || {} ;


app.ListHandler = {
	updateVideoList : function (videos) {
		var videoList = _.map(videos, function(video) {
			var videoItem = new app.models.GameVideo();
			videoItem.title(video.title);
			videoItem.link(video.link);
			return videoItem;
		})
		//add them to video list
		 var i = 0;
		 _.each(videoList, function(video) {
	 		app.videoList.push(video);
		 });
	},
	updatePostList : function (posts) {
		app.forumList.removeAll();
		var postsList = _.map(posts, function(post) {
			var forumItem = new app.models.ForumPost();
			forumItem.title(post.title);
			forumItem.leaf(post.leaf);
			forumItem.id(post.id);
			return forumItem;
		})
		//add them to forum list
		 var i = 0;
		 _.each(postsList, function(post) {
	 		app.forumList.push(post);
		 });
	}
};

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

	updateForumHeader : function (text) {
		$('#forum th').html(text);
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
		$('#forum table thead th').click(function() {
			var forumHeader = new app.models.ForumPost();
			forumHeader.getPrevForumPost();
		});
	}
};