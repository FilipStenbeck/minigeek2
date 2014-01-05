var app = app || {};

app.models = app.models || {};

app.models.GameVideo = function() {
	return {
		title : ko.observable(""),
	    link : ko.observable(""),
	    showVideo : function() {
	    	window.open(this.link(),'_blank');
	    }
	}
}