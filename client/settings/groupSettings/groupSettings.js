Template.groupSettings.helpers({
	'groups': function () {
		return Groups.find().fetch();
	}
})

Template.groupSettings.events({
	"click #addGroup": function(event, template){
		 event.preventDefault();
		 event.stopPropagation();

		 template.$(".form-inline").removeClass('hide');
	},
	"click #save": function(event, template){
		 event.preventDefault();
		 event.stopPropagation();

		 var group = {
			 name : template.$("#inputName").val(),
			 rules: {
				 '1': false,
				 '2': false,
				 '3': false,
				 '4': false,
				 '5': false,
				 '6': false,
				 '7': false,
				 '8': false,
				 '9': false
			 },
			 users: []
		 };

		 Groups.insert(group);

		 template.$("#inputName").val('')
		 template.$(".form-inline").addClass('hide');
	}

});
