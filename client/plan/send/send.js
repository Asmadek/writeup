Template.send.events({
    'click #sendButton': function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var taskId = Session.get("taskId");
		Session.set("taskId", null);

        var message = {
            date: new Date(),
            taskId : taskId,
            userTo : $("#inputUser").val(),
            userFrom : Meteor.user()._id,
            comment: $("#inputComment").val()
        };

        var newmessage = 'Пользователь ' + Meteor.user().profile.name + ' ' + Meteor.user().profile.sname 
            + ' Отправил вам материал.\n---------\nКомментарий: ' + message.comment + '\n---------\n' 
            + 'http://' + window.location.host + '/task/' + taskId + '';

        var user = Meteor.users.findOne({_id: message.userTo});

        Meteor.call('sendEmail',
                    user.username,
                    'alma2610@ya.ru',
                    'WriteUp',
                    newmessage, 
                    function (error, result) {
                        if (!error)
                            alert("Вы отправили сообщение")
                    });

        Meteor.call('sendTask', message, function(error, id) {
            console.log(error);
            console.log(id);

        });
    }
});

Template.send.helpers({
    'currentDate': function() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = yyyy + "-" + mm + '-'+dd;

        return today;
    },
    'employers': function () {
        return Meteor.users.find().fetch();
    },
    'fullname': function() {
        return this.profile.name + " " + this.profile.sname;
    }
})
