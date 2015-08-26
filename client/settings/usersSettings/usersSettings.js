Template.usersSettings.helpers({
	'users': function () {
		return Meteor.users.find().fetch();
	}
})