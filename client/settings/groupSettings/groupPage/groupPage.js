Template.groupPage.helpers({
	'rules': function () {
		var rulesTemperary = [];

		for (var name in RULES) {
			rulesTemperary.push({
				ruleName: RULES[name],
				checked: this.rules[name]
			});
		};

		return rulesTemperary;
	},
	'users': function () {
		return Meteor.users.find({'profile.group': this._id});
	}
});

Template.groupPage.events({
	"click #saveRules": function(event, template){
		var inputRules = $('#rules input');

		for (var i = 0; i < inputRules.length; i++) {
			this.rules[i] = inputRules[i].checked;
		}

		Groups.update({_id: this._id}, this);
		history.back();
	},
});
