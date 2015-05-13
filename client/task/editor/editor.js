Template.editor.events({
	'input .wysiwyg': function (event, template) {
		var text = template.$('.wysiwyg').text();

		Tasks.update({_id: template.data._id}, {$set: {value: text.length}});
	}
})

