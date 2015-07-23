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
	},
	'newsImages': function() {
		return Images.find({
			'metadata.taskId': this._id
		})
	},

});

Template.task.events({
	'change #newsImageInput': function(event, template) {
		var taskId = this._id;
	    FS.Utility.eachFile(event, function(file) {
			var newFile = new FS.File(file);
			newFile.metadata = {'taskId': taskId};
			Images.insert(newFile, function (err, fileObj) {
				$('#newsImageInput').val("");
			});
        });
	}
});