Template.callback.events({
    "submit": function(event, template) {
        event.stopPropagation();
        event.preventDefault();

        var message = "Пользователь " + Meteor.user().profile.name + " " +
            Meteor.user().profile.sname + " " +
            Meteor.user().username +  " отправил сообщение \""+
            $("#inputMessage").val() + "\"";

            Meteor.call('sendEmail',
                        'alma2610@ya.ru',
                        'alma2610@ya.ru',
                        'WriteUp',
                        message, 
                        function (error, result) {
                            if (!error)
                                alert("Вы отправили сообщение")
                        });

    }
})
