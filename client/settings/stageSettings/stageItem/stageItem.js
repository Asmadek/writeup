Template.stageItem.events({
	'click .edit': function (event, template) {
        Tasks.update({_id: this._id}, {
        		$set: {status: STATUS_ENG.completed
        	}
        });
	},
	'click .remove': function (event, template) {
		var step = this.step;

        Stages.remove({_id: this._id});

        var stages = Stages.find({}, {sort: {step: 1}}).fetch();
        var stage = stages[0]._id;
        for (var i = 0; i < stages.length; i++) {
            Stages.update(stages[i]._id, {$set: {step: i + 1} })
        }

        var tasks = Tasks.find({status: 'writeup'}).fetch();

        for (var i = 0; i < tasks.length; i++) {
            Tasks.update(tasks[i]._id, {$set: {stage: stage} })
        }
	}
})
