Accounts.onLogin(function (event) {

});

Meteor.methods({
    addNews: function(item) {
        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, "Вы должны войти чтобы добавить новый материал");

        var news = {
            name: item.name,
            content: item.content,
            deadlineDate: new Date(item.deadlineDate),
            deadlineTime: new Date(item.deadlineTime),
            created: new Date().getTime(),
            performer: item.performer,
            volume: item.volume
        };

        if (Groups.findOne({_id: item.group}) == null) {
            Groups.insert({_id: item.group, name: Meteor.user().userName(), creator: Meteor.user()._id});
        }

        var newsId = News.insert(news);

        return newsId;
    },
    regUser: function(name, sname, email, password, company) {

        var error = Accounts.createUser({
                            username: email,
                            email : email,
                            password : password,
                            profile  : {
                                name: name,
                                sname: sname
                            }});

        var user = Meteor.users.findOne({username: email});

        if (!error)
            Companies.insert({company: company, auther: user._id});

        return error;

    },
    addTask: function(task) {
        if (task) {
            task.creator = Meteor.user()._id;
            task.value = task.content.length;
            task.status = STATUS_ENG.writeup;
            
            var id = Tasks.insert(task);
            return id;
        };
    },
    updateTask: function(id, task) {
        if (task) {            
            var id = Tasks.update({_id: id}, task);
        };
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
    }
});
