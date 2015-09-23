Template.newTask.events({
    'submit': function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var stage = Stages.findOne({step: 1});

        var task = {
            title :$("#inputTitle").val(),
            count : parseInt($("#inputCount").val()),
            employer : $("#inputEmployer").val(),
            deadlineDate : $("#inputDeadlineDate").val(),
            deadlineTime : $("#inputDeadlineTime").val(),
            createDate: new Date(),
            content: "Текст",
            comment: $("#inputComment").val(),
            stage: stage._id
        };

        if ((task.title == "") || !(parseInt(task.count) > 0)) {
            alert("Ошибка при сохранении");
        } else {
            Meteor.call('addTask', task, function(error, id) {
                var message = 'Вам назначена задача.\n\nhttp://' + window.location.host + '/task/' + id + '';

                var user = Meteor.users.findOne({_id: task.employer});

                Meteor.call('sendEmail',
                    user.username,
                    'admin@writeup.pro',
                    'WriteUp - новая задача',
                    message,
                    function (error, result) {
                        console.log(error);
                        console.log(result);
                    });

                console.log(error);
                console.log(id);

                Router.go("/task/"+id);
            });
        }
    }
});

Template.newTask.helpers({
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
