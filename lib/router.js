Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return [Meteor.subscribe('notifications')];
  },
  fastRender: true
});

Router.map(function() {
  this.route('index', {
      path:'/'
  });
  this.route('login', {
    path: '/login'
  });
  this.route('registration', {
    path: '/registration'
  });
  this.route('newTask', {
    path: '/new',
    waitOn: function () {
      return Meteor.subscribe('userData');
    }
  });
  this.route('plan', {
    path: '/plan',
    waitOn: function () {
      return Meteor.subscribe('tasks');
    }
  });
  this.route('task', {
    path: '/task/:_id',
    waitOn: function () {
      return Meteor.subscribe('tasks');
    },
    data: function() {
      return Tasks.findOne({_id: this.params._id});
    }
  });
  this.route('settings', {
    path: '/settings',
    waitOn: function () {
      return [Meteor.subscribe('userData'), Meteor.subscribe('measures')];
    },
    data: function() {
      return Companies.findOne({});
    }

  });
  this.route('addUser', {
    path: '/adduser/:_id'
  });
});
