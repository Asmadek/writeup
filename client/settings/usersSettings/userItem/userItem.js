Template.userItem.events({
	"click .banUser": function() {
		Meteor.call("banUser", this._id, function(error, res) {

		})
	},
	"click .unbanUser": function() {
		Meteor.call("unbanUser", this._id, function(error, res) {

		})
	}
})

Template.userItem.helpers({
	groupName: function(){
		return Groups.findOne({_id: this.profile.group}).name;
	}
});
