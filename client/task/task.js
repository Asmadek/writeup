Template.task.helpers({
	'fullname': function () {
		var user = Meteor.users.findOne({_id: this.employer});
		return user.profile.name + " " + user.profile.sname;
	},
	'newDate': function () {
		var options = {
			month: 'long',
			day: 'numeric'
		};

		return new Date(this.deadlineDate).toLocaleDateString("ru", options);
	}
})