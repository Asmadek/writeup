News = new Meteor.Collection('news');
Tasks = new Meteor.Collection('tasks');
Notifications = new Meteor.Collection('notifications');

Groups = new Meteor.Collection('groups');
Stages = new Meteor.Collection('stages');
Messages = new Meteor.Collection('messages');
History = new Meteor.Collection('history');

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
