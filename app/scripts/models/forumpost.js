var app = app || {};

app.models = app.models || {};

app.models.ForumPost = function() {
	return {
		id : ko.observable(""),
	    leaf : ko.observable(""),
	    title : ko.observable(""),
	    getNextForumPost : function () {
	    	var that = this;
        	if (this.leaf() !== true) {
        		geekService.prev_forumHeader = $('#forum table thead th').html();
            	geekService.prev_node = geekService.selected_node;
            	geekService.selected_node = this.id();
            	app.util.updateForumHeader(this.title());
           		geekService.getforumPosts(geekService.selected_node, function(posts) {
					app.ListHandler.updatePostList(posts);
				});	
        	}
        },
        getPrevForumPost : function () {
        	var that = this;
        	if (app.forumList()[0].leaf() === false) {
        		geekService.selected_node = 'root'
        		geekService.prev_forumHeader = "Forum"	
        	} else {
        		geekService.selected_node = geekService.prev_node;
        	}
        	geekService.getforumPosts(geekService.selected_node, function(posts) {
				app.ListHandler.updatePostList(posts);
				app.util.updateForumHeader(geekService.prev_forumHeader);
			});
        }
	}
}