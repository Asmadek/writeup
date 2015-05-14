Template.login.events({
    "submit": function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var email = $("#inputEmail").val();
        var password = $("#inputPassword").val();

        var error = Meteor.loginWithPassword(email, password);

        if (error) {
            
        } else {
            Router.go("index");
        }

    }
});

Template.login.onCreated(function(){
    if (Meteor.user()) {
        Router.go("index");
    }
});


