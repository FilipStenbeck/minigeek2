var app = app || {};

app.models = app.models || {};

app.models.GameInfo = function() {
	return {
		id : ko.observable(""),
		name : ko.observable(""),
	    description: ko.observable(""),
		link: ko.observable(""),
		name: ko.observable(""),
		players: ko.observable(""),
		rating: ko.observable(""),
		thumbnail: ko.observable(""),
		yearpublished: ko.observable(""),
	}
}
