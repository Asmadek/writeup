Template.nav.events({
    "click #logout": function() {
        event.preventDefault();
        event.stopPropagation();

        Meteor.logout();
    },
    'submit': function(event) {
      event.preventDefault();
      event.stopPropagation();

      var query = $('#queryInput').val();
      Router.go('search', {'_query': query});
      // body...
    }
});

Template.nav.helpers({
    'fullname': function() {
        return Meteor.user().profile.sname + " " + Meteor.user().profile.name;
    },
    contentPlanAlowed: function () {
        var rules = Groups.findOne(Meteor.user().profile.group).rules;
        //Смотри libs/pages.js RULES
        return rules[0];
    },
    statAlowed: function () {
        var rules = Groups.findOne(Meteor.user().profile.group).rules;
        //Смотри libs/pages.js RULES
        return rules[3];
    },
    settingsAlowed: function () {
        var rules = Groups.findOne(Meteor.user().profile.group).rules;
        //Смотри libs/pages.js RULES
        return rules[4];
    },
    createAlowed: function () {
        var rules = Groups.findOne(Meteor.user().profile.group).rules;
        //Смотри libs/pages.js RULES
        return rules[1];
    }
})
