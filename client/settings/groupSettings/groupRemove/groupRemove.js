Template.groupRemove.helpers({
});

Template.groupRemove.events({
	"click #removeGroup": function(event, template){
		Groups.remove({_id: this._id});
		history.back();
	},
	"click #back": function(event, template){
		history.back();
	}
});
