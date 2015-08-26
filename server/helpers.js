Meteor.methods({
    regUser: function(name, sname, email, password, company) {

        var error = Accounts.createUser({
                            username: email,
                            email : email,
                            password : password,
                            profile  : {
                                name: name,
                                sname: sname,
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
            
            var history = {
                createDate: new Date(),
                userTo: task.employer,
                userFrom: task.creator,
                taskId: id,
                stageTo: task.stage,
                stageFrom: null
            };
            
            History.insert(history);

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
                    userFrom: Meteor.user()._id,
                    taskId: id,
                    comment: SYSTEM_MESSAGES.addTask
                };
                
                Messages.insert(message);
            }
            
            var history = {
                createDate: new Date(),
                userTo: task.employer,
                userFrom: Meteor.user()._id,
                taskId: id,
                stageTo: task.stage,
                stageFrom: oldTask.stage
            };
            
            History.insert(history);
         
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
                    "profile.group": user.group,
                    "profile.ban": user.ban
                }
            });
        return res;
    },
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        this.unblock();

        Email.send({
          to: to,
          from: 'admin@writeup.pro',
          subject: subject,
          text: text
        });
      }


});
