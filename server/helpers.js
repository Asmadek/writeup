Meteor.methods({
    regUser: function(name, sname, email, password, company) {

        var error = Accounts.createUser({
                            username: email,
                            email : email,
                            password : password,
                            profile  : {
                                name: name,
                                sname: sname,
                                admin: false,
                                ban: false
                            }});

        var user = Meteor.users.findOne({username: email});

        return error;

    },
    addTask: function(task) {
        if (task) {
            task.creator = Meteor.user()._id;
            task.value = task.content.length;
            task.status = STATUS_ENG.writeup;

            var id = Tasks.insert(task);

            var message = {
                date: task.createDate,
                userTo: task.employer,
                userFrom: null,
                taskId: id,
                comment: SYSTEM_MESSAGES.addTask
            };

            Messages.insert(message);

            return id;
        };
    },
    updateTask: function(id, task) {
        if (task) {
            var oldTask = Tasks.findOne({_id: id});

            if (oldTask.employer != task.employer) {
                var message = {
                    date: task.createDate,
                    userTo: task.employer,
                    userFrom: null,
                    taskId: id,
                    comment: SYSTEM_MESSAGES.addTask
                };
                Messages.insert(message);
            }

            var res = Tasks.update({_id: id}, task);
        }
    },
    completeTask: function(id) {
        if (id) {

            var res = Tasks.update({_id: id}, {$set: {status: STATUS_ENG.completed}});
            return res;
        };
    },
    sendTask: function(message) {
        if (message) {
            var res = Messages.insert(message);
            return res;
        };
    },
    banUser: function(id){
        var res = Meteor.users.update({_id: id}, {$set:{"profile.ban": true}});
        return res;
    },
    unbanUser: function(id){
        var res = Meteor.users.update({_id: id}, {$set:{"profile.ban": false}});
        return res;
    },
    editUser: function(user){
        var res = Meteor.users.update({_id: user.id},
            {
                $set: {
                    "profile.name": user.name,
                    "profile.sname": user.sname,
                    "profile.admin": user.admin
                }
            });
        return res;
    },
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        this.unblock();

        Email.send({
          to: to,
          from: from,
          subject: subject,
          text: text
        });
      }


});

Meteor.startup(function () {
    process.env.MAIL_URL = 'smtp://postmaster@sandbox81cc17236b2b49cdb4244245e90dfd26.mailgun.org:c2ca411d24115d01cedcf6ab093b19c7@smtp.mailgun.org:25';
});
