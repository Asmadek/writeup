Template.messagesTemplate.helpers({
    'currentDate': function () {
        var options = {
            month: 'long',
            day: 'numeric'
        };

        return new Date(this.date).toLocaleDateString("ru", options);
    },
    'currentTime': function () {
        var options = {
            hour: 'numeric',
            minute: 'numeric'
        };

        return new Date(this.date).toLocaleTimeString("ru", options);
    },

    'userFromName': function () {
        var user = Meteor.users.findOne(this.userFrom);
        return (user) ? user.profile.name + " " + user.profile.sname : "Система" ;
    },
    'taskName': function () {
        var task = Tasks.findOne(this.taskId);
        return task.title;
    }

})
