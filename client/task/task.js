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
	'employers': function () {
		return Meteor.users.find().fetch();
	},
	'fullname': function() {
		return this.profile.name + " " + this.profile.sname;
	},
	'isEmployer': function () {
		if (this._id == Session.get("employer"))
			return "selected";
		else
			return "";
	},
	'nextStage': function() {
		var stage = Stages.findOne({_id: this.stage});

		var nextStage = Stages.findOne({step: stage.step + 1});
		return (nextStage) ? nextStage : null;
	},
	'backStage': function() {
		var stage = Stages.findOne({_id: this.stage});

		var backStage = Stages.findOne({step: stage.step - 1});
		return (backStage) ? backStage : null;
	},
	'currentStage': function() {
		var stage = Stages.findOne({_id: this.stage});

		return (stage) ? stage : null;
	}

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
	},
	'click .changeStage': function (event, template) {
		this.employer = $("#inputEmployer").val();
		this.stage = $(event.currentTarget).data('stage');

		Meteor.call('updateTask', this._id, this, function() {
			// body...
		})
	}
});
