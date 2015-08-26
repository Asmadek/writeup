Template.taskItem.helpers({
	'fullname': function () {
		var user = Meteor.users.findOne({_id: this.employer});
		return user.profile.name + " " + user.profile.sname;
	},
	'stageName': function() {
		var stage = Stages.findOne(this.stage);
		return stage.name;
	},
	'progress': function (params) {
		return Math.floor((this.value * 100) / this.count);
	},
	'completed': function (params) {
		return (this.status == STATUS_ENG.completed) ? true : false;
	}
});

Template.taskItem.events({
	'click .complete': function (event, template) {
        Tasks.update({_id: this._id}, {
        		$set: {status: STATUS_ENG.completed
        	}
        });
		
		var history = {
			taskId: this._id,
			'type': "status",
			userFrom: Meteor.user()._id,
			createDate: new Date(),
			status: 'completed'
		};
		
		History.insert(history);
	},
	'click .uncomplete': function (event, template) {
		Tasks.update({_id: this._id}, {
        		$set: {status: STATUS_ENG.writeup
        	}
        });
		
		var history = {
			taskId: this._id,
			'type': "status",
			userFrom: Meteor.user()._id,
			createDate: new Date(),
			status: 'writeup'
		};
		
		History.insert(history);
	},
	'click .send': function (event, template) {
		Session.set("taskId", this._id);
		if (template.find('#repeatToEmail').val()) {

		}
	}
})
