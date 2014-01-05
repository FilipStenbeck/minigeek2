var app = app || {};

app.models = app.models || {};

app.models.ForumPost = function() {
	return {
		id : ko.observable(""),
	    leaf : ko.observable(""),
	    title : ko.observable(""),
	    getNextForumPost : function () {
        	if (this.leaf() !== true) {
        		app.forumList.removeAll();
            	geekService.prev_node = geekService.selected_node;
            	geekService.selected_node = this.id();

            	//geekService.prev_forumHeader = $scope.forumHeader;
            	//$scope.forumHeader = '<i class="icon-arrow-up"></i>' + '<p> ' + title +  '</p>';
           		geekService.getforumPosts(geekService.selected_node, function(posts) {
					var postsList = _.map(posts, function(post) {
						var forumItem = new app.models.ForumPost();
						forumItem.title(post.title);
						forumItem.leaf(post.leaf);
						forumItem.id(post.id);
						return forumItem;
					})
					//add them to video list
				 	var i = 0;
				 	_.each(postsList, function(post) {
			 			app.forumList.push(post);
				 	}); 
				});		
        	}
        	
        }
	}
}