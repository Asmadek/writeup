Template.taskItem.helpers({
	'fullname': function () {
		var user = Meteor.users.findOne({_id: this.employer});
		return user.profile.name + " " + user.profile.sname;
	},
	'statusRus': function() {
		return STATUS_RUS[this.status];
	},
	'progress': function (params) {
		return Math.floor((this.value * 100) / this.count);
	}
});

Template.taskItem.events({
	'click .complete': function (event, template) {
        Tasks.update({_id: this._id}, {$set: {status: STATUS_ENG.completed}});
	},
	'click .send': function (event, template) {
		Session.set("taskId", this._id);
	}	
})