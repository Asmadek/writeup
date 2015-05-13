Template.nav.events({
    "click #logout": function() {
        event.preventDefault();
        event.stopPropagation();

        Meteor.logout();
    }
});

Template.nav.helpers({
    'fullname': function() {
        return Meteor.user().profile.sname + " " + Meteor.user().profile.name;
    }
})
