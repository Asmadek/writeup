Template.stat.helpers({
	'users': function () {
		return Meteor.users.find().fetch();
	},
	'symbols': function() {
		var tasks = Tasks.find({employer: this._id, status: STATUS_ENG.completed}).fetch();
		var completed = 0,
			writeup = 0;

		for (var i = tasks.length - 1; i >= 0; i--) {
			completed += tasks[i].value;
		};
		var tasks = Tasks.find({employer: this._id, status: STATUS_ENG.writeup}).fetch();
		for (var i = tasks.length - 1; i >= 0; i--) {
			writeup += tasks[i].value;
		};
		var tasks = Tasks.find({employer: this._id, status: STATUS_ENG.deadlined}).fetch();
		for (var i = tasks.length - 1; i >= 0; i--) {
			writeup += tasks[i].value;
		};
		return writeup + "/" + completed;
	}, 
	'materials': function () {
		var tasks = Tasks.find({employer: this._id, status: STATUS_ENG.completed}).fetch();
		var completed = tasks.length;

		var tasks = Tasks.find({employer: this._id, status: STATUS_ENG.writeup}).fetch();
		var writeup = tasks.length;
		
		var tasks = Tasks.find({employer: this._id, status: STATUS_ENG.deadlined}).fetch();
		writeup += tasks.length;
		
		return writeup + "/" + completed;
	}

})