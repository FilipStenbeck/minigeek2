var app = app || {};

app.service = {};


app.service.GeekService = function() {
	return {
		 //Set URL to the backend service
       ROOT_URL : 'http://mini-geek-service.appspot.com/',
        
        //locally cached data
        hotList : [],
        videoList : [],
        searchList : [],
        gameId : '',
        game : {},
        forumList : [],
        prev_forumList : [], 
        selected_node : 'root',
        prev_forumHeader : '',
        prev_node : 'root',
        
        resetFormList : function () {
        	this.forumList = [];
            this.selected_node = 'root';
        },  
        
       	getHotGames : function (callback) {
       		var that = this;
           	// Serving cached version if it exist
           	if (that.hotList.length > 0) {
           		return that.hotList;
           	}
            $.get(this.ROOT_URL + 'hotgames').success(function (data) {
            	//keep a cache of latest response
             	that.hotList = data.result;
                callback(that.hotList);
            });
        },
        search : function (query, callback) {
            var that = this;
            $.get(that.ROOT_URL + 'search', {query :  query}).success(function (data) {
                that.searchList = data.result;
                callback(that.searchList);
            });
        },

         getGameInfo : function (id, callback) {
            var that = this;

            //a new game id, so we need to get new data from server
            if (app.currentGame.id() !== id) {
                $.get(that.ROOT_URL + 'gameinfo', {id : id}).success(function (data) {
                //Clean the response
                data.result[0].link = 'http://boardgamegeek.com/boardgame/' + id;
                data.result[0].description =   data.result[0].description.replace(/&#10;/g, " ");
                data.result[0].description =   data.result[0].description.replace(/&quot;/g, " ");
                data.result[0].description =   data.result[0].description.replace(/&ndash;/g, " ");
                
                //Keep a cashed list of game
                that.game = data.result[0]; 
                callback(that.game);
                });    
            } else {
                callback(that.game);    
            }
        },
        getGameVideo : function(id, callback) {
            console.log(id);
            $.get(this.ROOT_URL + 'videolist', {id : id}).success(function (data) {
                callback(data.result);
            });
        }
	}
}
