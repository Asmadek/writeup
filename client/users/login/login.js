Template.login.events({
    "submit": function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var email = $("#inputEmail").val().toLowerCase();
        var password = $("#inputPassword").val();

        var error = Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                alert(error.message);
            } else {
                Router.go("index");
            }
        });
    },
    "click #resetPassword": function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var email = template.$('#email-reset').val();
        Accounts.forgotPassword({email: email}, function(data){
            if (data == undefined) {
                $('#forgetModel').modal("hide");
                $('#successReset').modal("show");
            } else {
                $('#failReset').modal("show");
            }
        });
    },

});

Template.login.onCreated(function(){
    if (Meteor.user()) {
        Router.go("index");
    }
});
