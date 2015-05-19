Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return [Meteor.subscribe('userData')];
  },
  fastRender: true
});

Router.map(function() {
  this.route('index', {
      path:'/',
      waitOn: function () {
          return [Meteor.subscribe('mymessages'), Meteor.subscribe('tasks')];
      }
  });
  this.route('login', {
    path: '/login'
  });
  this.route('registration', {
    path: '/registration'
  });
  this.route('newTask', {
    path: '/new'
  });
  this.route('plan', {
    path: '/plan',
    waitOn: function () {
      return Meteor.subscribe('tasks');
    }
  });
  this.route('current', {
    path: '/current',
    waitOn: function () {
      return Meteor.subscribe('mytasks');
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
  this.route('editTask', {
    path: '/task/:_id/edit',
    waitOn: function () {
      return [Meteor.subscribe('tasks')];
    },
    data: function() {
      return Tasks.findOne({_id: this.params._id});
    }
  });
  this.route('settings', {
    path: '/settings',
    waitOn: function () {
      return [Meteor.subscribe('measures')];
    },
    data: function() {
      return Companies.findOne({});
    }

  });
  this.route('addUser', {
    path: '/adduser/:_id'
  });
  this.route('editUser', {
    path: '/user/:_id/edit',
    data: function() {
      return Meteor.users.findOne({_id: this.params._id});
    }
  });
  this.route('callback', {
    path: '/callback'
  });
});

var requireLogin = function(pause) {
    console.log(this);

    if (! Meteor.user()) {
        if (!Meteor.loggingIn())
            if (this.route._path == "/registration")
                this.render('registration');
            else
                this.render('login');
    } else if (Meteor.user().profile.ban == true){
        this.render('banned');
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin);
