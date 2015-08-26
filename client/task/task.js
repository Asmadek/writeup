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
	stageName: function() {
		var stage =  Stages.findOne({_id: this.stage});
		return (this.status == STATUS_ENG.completed) ? "Завершено" : stage.name;
	},
	editTaskAllowed: function () {
		var rules = Groups.findOne(Meteor.user().profile.group).rules;
		//Смотри libs/pages.js RULES
		return rules[2];
	},
	editEmployerAllowed: function () {
		var rules = Groups.findOne(Meteor.user().profile.group).rules;
		var materialOwn = (this.employer == Meteor.userId()) ? true : false;
		//Смотри libs/pages.js RULES
		if (rules[2] || materialOwn)
			return true;
		else
			return false;
	},
	editMaterialAllowed: function () {
		var rules = Groups.findOne(Meteor.user().profile.group).rules;
		var materialOwn = (this.employer == Meteor.userId()) ? true : false;
		//Смотри libs/pages.js RULES
		if (rules[5])
			return true;
		else if (materialOwn && rules[6])
			return true;
		else
			return false;
	},
	history: function() {
		return History.find({taskId: this._id}, {sort: {createDate: -1}});	
	},
	userFromTpl: function() {
		var user = Meteor.users.findOne({_id: this.userFrom});
		return user.profile.name + ' ' + user.profile.sname;	
	},
	userToTpl: function() {
		var user = Meteor.users.findOne({_id: this.userTo});
		return user.profile.name + ' ' + user.profile.sname;	
	},
	stageFromTpl: function() {
		var stage = Stages.findOne({_id: this.stageFrom});
		return stage.step + '. ' + stage.name;	
	},
	stageToTpl: function() {
		var stage = Stages.findOne({_id: this.stageTo});
		return stage.step + '. ' + stage.name;	
	},
	statusTpl: function() {
		return STATUS_RUS[this.status];	
	},
	completed: function () {
		return (this.status == STATUS_ENG.completed) ? true : false;
	},
	isStatus: function () {
		return (this.type == 'status') ? true : false;
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
		var self = this;
		
		self.employer = $("#inputEmployer").val();
		self.stage = $("#inputStage").val();
		

		Meteor.call('updateTask', this._id, self, function() {
			var stage = Stages.findOne({ _id: self.stage });
			var newmessage = 'Пользователь ' 
				+ Meteor.user().profile.name + ' ' + Meteor.user().profile.sname 
				+ ' назначил вам материал.\n' 
				+ 'Этап: ' + stage.name 
				+ '\n---------\n' 
				+ 'http://' + window.location.host 
				+ '/task/' + self._id + '';

			var user = Meteor.users.findOne({ _id: self.employer });

			Meteor.call(
				'sendEmail',
				user.username,
				'admin@writeup.pro',
				'WriteUp',
				newmessage, 
				function (error, result) {}
			);
		})
	},
	"click #delete-image": function(event, template) {
		console.log(this);
		event.stopPropagation()
		event.preventDefault();

		Images.remove(this._id);
	},
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
});
