Meteor.publish('news', function() {
  return News.find();
});

Meteor.publish('writeUpNews', function() {
  return WriteUpNews.find();
});

Meteor.publish('messages', function() {
  return Messages.find();
});

Meteor.publish('history', function(_taskId) {
  return History.find({taskId: _taskId});
});

Meteor.publish('allHistory', function() {
  return History.find();
});


Meteor.publish('textHistory', function(_taskId) {
  return TextHistory.find({taskId: _taskId});
});

Meteor.publish('tasks', function() {
  return Tasks.find();
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

Meteor.publish('groups', function() {
  return Groups.find();
});

Meteor.publish('stages', function() {
  return Stages.find();
});

Meteor.publish('images', function() {
  return Images.find();
});

Meteor.publish('docx', function() {
  return Docx.find();
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find();
  } else {
    this.ready();
  }
});
