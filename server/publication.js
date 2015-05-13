Meteor.publish('news', function() {
  return News.find();
});

Meteor.publish('tasks', function() {
  return Tasks.find();
});

Meteor.publish('notifications', function() {
  return Notifications.find({user: this.userId});
});

Meteor.publish('companies', function() {
  return Companies.find({auther: this.userId});
});

Meteor.publish('measures', function() {
  return Measures.find();
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
