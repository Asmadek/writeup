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
	},

	'history': function () {
		var startTime = Session.get('startTime');
		var endTime = Session.get('endTime');
		console.log(startTime);

		var stats = [];
		var stages = Stages.find({}, {$sort: {step: 1}}).fetch();

		for (var item in stages) {
			stats.push({stage: stages[item]._id, count: 0})
		};

		var items = History.find({userTo: this._id, createDate: {
		        $gte: startTime,
		        $lt: endTime
		    }}).fetch();

		for (var item in items) {
			for (var i = stats.length - 1; i >= 0; i--) {
				if (items[item].stageTo == stats[i].stage) {
					stats[i].count++;
				}
			};
		}

		return stats;
	},

	'stageName': function () {
		return Stages.findOne({_id: this.stage}).name;
	}

});

Template.stat.onRendered(function () {
  	function cb(start, end) {
  		var startTime = new Date(start.format())
  		var endTime = new Date(end.format())
  		Session.set('startTime', startTime);
  		Session.set('endTime',  endTime);
    	$('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
    }

    $('#reportrange').daterangepicker({
        ranges: {
           'Сегодня': [moment(), moment()],
           'Вчера': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'За последнюю неделю': [moment().subtract(6, 'days'), moment()],
           'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
           'Прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(moment().startOf('month'), moment().endOf('month'));

});