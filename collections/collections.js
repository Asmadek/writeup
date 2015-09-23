News = new Meteor.Collection('news');
Tasks = new Meteor.Collection('tasks');
Notifications = new Meteor.Collection('notifications');

Groups = new Meteor.Collection('groups');
Stages = new Meteor.Collection('stages');
Messages = new Meteor.Collection('messages');
History = new Meteor.Collection('history');
TextHistory = new Meteor.Collection('textHistory');
WriteUpNews = new Meteor.Collection('writeUpNews');

Images = new FS.Collection("images", {
    stores: [
		new FS.Store.GridFS("images", {
            chunkSize: 1024*1024*4
        })
	],
    filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});
