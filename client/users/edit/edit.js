Template.editUser.events({
    "submit": function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var user = {
            id: this._id,
            name : $("#inputName").val(),
            sname : $("#inputSName").val(),
        };
        Meteor.call('editUser', user, function(error) {
            console.log(error);

            if (!error)
                Router.go('settings');
        });
    }
})
