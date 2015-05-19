Template.editTask.events({
    'submit': function(event, template) {
        event.preventDefault();
        event.stopPropagation();

        var task = {
            title :$("#inputTitle").val(),
            count : parseInt($("#inputCount").val()),
            employer : $("#inputEmployer").val(),
            deadlineDate : $("#inputDeadlineDate").val(),
            deadlineTime : $("#inputDeadlineTime").val(),
            comment: $("#inputComment").val(),
            content: this.content,
            status: this.status,
            value : this.value,
            createDate: new Date()
        };

        if ((task.title == "") || (count == NaN)) {
            alert("Ошибка при сохранении");
        } else {
            var id = this._id;

            Meteor.call('updateTask', id, task, function(error) {
                console.log(error);

                Router.go("/task/"+id);
            });
        }
    }
});

Template.editTask.helpers({
    'employerSet': function () {
        Session.set('employer', this.employer);
        return this.employer;
    },
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
    },
    'isEmployer': function () {
        if (this._id == Session.get("employer"))
            return "selected";
        else
            return "";
    }
})
