function DateDiff(date1, date2) {
	var datediff = date1.getTime() - date2.getTime();
	//store the getTime diff - or +
	return Math.round(Math.abs(datediff / (24 * 60 * 60 * 1000)));
	//Convert values to -/+ days and return value
}
/*
 * Function to draw the column chart
 */
function builtColumn() {
	var startTime = Session.get('startTime');
	var endTime = Session.get('endTime');

	var stats = [];
	var stages = Stages.find({}, {$sort: {step: 1}}).fetch();

	for (var item in stages) {
		stats.push({stage: stages[item]._id, days: []})
	};


	var newStartTime = new Date(startTime);
	var newEndTime = new Date(endTime);

	var dateCounts = DateDiff(newStartTime, newEndTime);

	for (var stage in stats) {
		var mS = moment(startTime);
		var mE = moment(endTime);
		var stageId = stats[stage].stage;

		for (var i = 0; i < dateCounts; i++) {
			console.log(i);
			var gte = new Date(mS.format());
			var lt = new Date(mS.add(1, 'days').format());

			var items = History.find({userTo: Session.get('userStat'), stageTo: stageId, createDate: {
					$gte: gte,
					$lt: lt
				}}).fetch();
			stats[stage].days.push(items.length);
		}
	}
	var mS = moment(startTime);
	var mE = moment(endTime);

	var days = [];
	for (var i = 0; i < dateCounts; i++) {
		days.push(mS.format('MMMM DD'));
		mS.add(1, 'days')
	}

	var data = [];
	for (var stage in stats) {
		var item = {};
		item.name = Stages.findOne({_id: stats[stage].stage}).name;
		item.data = stats[stage].days;

		data.push(item);
	}

    $('#container-column').highcharts({

        chart: {
            type: 'column'
        },

        title: {
            text: ''
        },

        credits: {
            enabled: false
        },

        xAxis: {
            categories: days
        },

        yAxis: {
            min: 0,
            title: {
                text: 'Количество материалов'
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },

        series: data
    });
}

Template.userStat.events({
	"click #refresh": function(event, template){

	}
});


Template.userStat.rendered = function() {
	function cb(start, end) {
		var startTime = new Date(start.format());
		var endTime = new Date(end.format());
		Session.set('startTime', startTime);
		Session.set('endTime',  endTime);
		$('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));

		builtColumn();
	};

	Session.set('userStat', this.data._id);

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
}
