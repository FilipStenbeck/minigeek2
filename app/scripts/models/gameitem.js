var app = app || {};

app.models = app.models || {};

app.models.GameItem = function() {
	return {
		id : ko.observable(""),
	    name : ko.observable(""),
	    showGame : function () {
	    	hasher.setHash('gameinfo/' + this.id());
	    }
	}
    
}