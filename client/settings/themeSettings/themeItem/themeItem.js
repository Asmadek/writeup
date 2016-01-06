Template.themeItem.events({
	'click .edit': function (event, template) {

	},
	'click .remove': function (event, template) {
        Themes.remove({_id: this._id});
	}
})
