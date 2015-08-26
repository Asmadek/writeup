Template.newsImage.events({
	"click #delete-image": function(event, template) {
		console.log(this);
		event.stopPropagation()
		event.preventDefault();

		Images.remove(this._id);
	}
});