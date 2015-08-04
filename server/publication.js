Meteor.publish('news', function() {
  return News.find();
});

Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.publish('tasks', function() {
  return Tasks.find();
});

Meteor.publish('subtasks', function() {
  return Subtasks.find();
});

Meteor.publish('completed', function() {
  return Tasks.find({status: "completed"});
});
Meteor.publish('completedmy', function() {
  return Tasks.find({status: "completed", employer: this.userId});
});

Meteor.publish('mytasks', function() {
  return Tasks.find({employer: this.userId});
});

Meteor.publish('mymessages', function() {
  return Messages.find({userTo: this.userId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({user: this.userId});
});

Meteor.publish('companies', function() {
  return Companies.find({auther: this.userId});
});

Meteor.publish('stages', function() {
  return Stages.find();
});

Meteor.publish('images', function() {
  return Images.find();
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find();
  } else {
    this.ready();
  }
});
