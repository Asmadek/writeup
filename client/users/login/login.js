Template.login.events({
    "submit": function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var email = $("#inputEmail").val();
        var password = $("#inputPassword").val();

        var error = Meteor.loginWithPassword(email, password);


        var notification = {
            type: 'danger',
            head: 'Вход',
            content: 'Логин или пароль не верен',
            viewed: 0
        };

        var notifications = localStorage.getItem('notifications');
        notifications = JSON.parse(notifications) || [];
        notifications.push(notification);
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }
})
