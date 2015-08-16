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
	'employerFullname': function() {
		return this.profile.name + " " + this.profile.sname;
	},
	'isEmployer': function () {
		if (this._id == Session.get("employer"))
			return "selected";
		else
			return "";
	},
	'isStage': function () {
		if (this._id == Session.get("stage"))
			return "selected";
		else
			return "";
	},
	'employerSet': function () {
		Session.set('employer', this.employer);
		return this.employer;
	},
	'stageSet': function () {
        Session.set('stage', this.stage);
        return this.employer;
    },
	'stages': function() {
		return Stages.find();
	},
	'stageName': function() {
		var stage =  Stages.findOne({_id: this.stage});
		return stage.name;
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
		this.stage = $("#inputStage").val();;

		Meteor.call('updateTask', this._id, this, function() {
			// body...
		})
	}
});
