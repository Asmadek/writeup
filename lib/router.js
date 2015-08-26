Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return [Meteor.subscribe('userData'),
            Meteor.subscribe('stages'),
              Meteor.subscribe('groups')];
  },
  fastRender: true,
  progressSpinner : false
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
  this.route('completed', {
    path: '/completed',
    waitOn: function () {
      return Meteor.subscribe('completed');
    }
  });
  this.route('completedmy', {
    path: '/completedmy',
    waitOn: function () {
      return Meteor.subscribe('completedmy');
    }
  });
  this.route('stat', {
    path: '/stat',
    waitOn: function () {
      return Meteor.subscribe('tasks');
    }
  });
  this.route('search', {
    path: '/search/:_query',
    waitOn: function () {
      return Meteor.subscribe('tasks');
    },
    data: function() {
      return Tasks.find({title: {'$regex': this.params._query}});
    }
  });
  this.route('searchIndex', {
    path: '/search/',
    waitOn: function () {
      return Meteor.subscribe('tasks');
    }
  });
  this.route('task', {
    path: '/task/:_id',
    waitOn: function () {
      return [Meteor.subscribe('tasks'),
              Meteor.subscribe('images'),
              Meteor.subscribe('history')];
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
      return [Meteor.subscribe('tasks')];
    }
  });
  this.route('usersSettings', {
    path: '/settings/users',
    waitOn: function () {
      return [Meteor.subscribe('tasks')];
    }
  });
  this.route('stageSettings', {
    path: '/settings/stages',
    waitOn: function () {
      return [Meteor.subscribe('tasks')];
    }
  });
    this.route('groupSettings', {
        path: '/settings/groups',
        waitOn: function () {
            return [Meteor.subscribe('tasks')];
        }
    });
  this.route('groupPage', {
    path: '/group/:_id/edit',
    waitOn: function () {
      return [
        Meteor.subscribe('groups')];
    },
    data: function () {
        return Groups.findOne({_id: this.params._id});
    }
  });
  this.route('groupRemove', {
      path: '/group/:_id/remove',
      waitOn: function () {
        return [
          Meteor.subscribe('groups')];
      },
      data: function () {
          return Groups.findOne({_id: this.params._id});
      }
    });
  this.route('addUser', {
    path: '/adduser/:_id'
  });
  this.route('editUser', {
    path: '/user/:_id/edit',
    waitOn: function () {
      return [
        Meteor.subscribe('groups')];
    },
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
