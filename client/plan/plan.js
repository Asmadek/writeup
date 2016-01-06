Template.plan.helpers({
    'tasksGrouped': function() {
        var tasks = Tasks.find({status: STATUS_ENG.writeup}, {sort: {deadlineTime: 1}}).fetch();

        var temp = {};
        var indexes = [];
        var tasksGroupedArray = [];
        for( var i = 0; i < tasks.length; i++) {
            if (tasks[i].deadlineDate) {
                var date = new Date(tasks[i].deadlineDate).getTime();

                if (temp[date])
                    temp[date].push(tasks[i]);
                else {
                    temp[date] = [tasks[i]];

                    indexes.push(date);
                }
            }
        }

        indexes.sort();

        for (var t in indexes) {
            tasksGroupedArray.push(temp[indexes[t]]);
        }

        return tasksGroupedArray;
    },
    'statusTitle': function () {

    },
    'stages': function () {
        var stages = Statuses.find().fetch();

        return stages;
    },
    'themes': function () {

        return Themes.find();
    }
});
