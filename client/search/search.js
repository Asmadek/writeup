Template.search.helpers({
  'tasks' : function () {
    return this;
  },
  'count' : function () {
    return this.count();
  },
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
  },
	'currentDate': function () {
			var options = {
					month: 'long',
					day: 'numeric'
			};

			return new Date(this.deadlineDate).toLocaleDateString("ru", options);
	},
  'query': function () {
    return Router.current().params._query;
  }
})

Template.search.events({
  'submit #queryForm': function (event) {
    event.preventDefault();
    event.stopPropagation();

    var query = $('#inputQuery').val();
    Router.go('search', {'_query': query});
    // body...
  }
})
