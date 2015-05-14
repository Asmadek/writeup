News = new Meteor.Collection('news');
Tasks = new Meteor.Collection('tasks');
Notifications = new Meteor.Collection('notifications');

Companies = new Meteor.Collection('companies');
Measures = new Meteor.Collection('measures');
Messages = new Meteor.Collection('messages');

Images = new FS.Collection("images", {
    stores: [
		new FS.Store.FileSystem("images")
	],
    filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});