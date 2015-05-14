Template.registration.events({
    "submit": function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var name = $("#inputName").val();
        var sname = $("#inputSName").val();
        var email = $("#inputEmail").val();
        var password = $("#inputPassword").val();

        Meteor.call('regUser', name, sname, email, password, function(error) {
            console.log(error);

            var newError = Meteor.loginWithPassword(email, password);
            console.log(newError);

            if (!newError)
                Router.go('index');
        });
    }
})
