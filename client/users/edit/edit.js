Template.editUser.events({
    "submit": function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var user = {
            id: this._id,
            name : $("#inputName").val(),
            sname : $("#inputSName").val(),
            group: $("#inputGroup").val() || this.profile.group,
            ban: $("#inputStatus").val() || this.profile.ban
        };
        Meteor.call('editUser', user, function(error) {
            console.log(error);

            if (!error)
                Router.go('settings');
        });
    }
})

Template.editUser.helpers({
    groups: function() {
        Session.set('currentGroup', this.profile.group);

        return Groups.find({});
    },
    active: function() {
        return !this.profile.ban;
    },
    banned: function() {
        return this.profile.ban;
    },
    isCurrentGroup: function () {
        if (Session.get('currentGroup') == this._id)
            return true;
        else
            return false;
    },
    settingsAlowed: function () {
        var rules = Groups.findOne(Meteor.user().profile.group).rules;
        //Смотри libs/pages.js RULES
        return rules[4];
    }
});
Template.editUser.onCreated = function(){

};
Template.editUser.onRendered = function(){
};
