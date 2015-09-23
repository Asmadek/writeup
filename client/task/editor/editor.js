Template.editor.events({
	'focusout .text-editor': function (event, template) {
		var text = template.$('.text-editor').text();
		var html = template.$('.text-editor').html();
		
		if (html != this.content) {
			template.$('.text-editor').text("");
			Tasks.update({_id: template.data._id}, {$set: {
				value: text.length,
				content: html
			}});
			template.$('#text-status').text('Сохранено');
			TextHistory.insert({
				taskId: template.data._id, 
				content: html,
				date: new Date()
			});
		};
	},
	'click .save': function (event, template) {
		var text = template.$('.text-editor').text();
		var html = template.$('.text-editor').html();
		if (html != this.content) {
			template.$('.text-editor').text("");
			Tasks.update({_id: template.data._id}, {$set: {
				value: text.length,
				content: html
			}});
			template.$('#text-status').text('Сохранено');
			TextHistory.insert({
				taskId: template.data._id, 
				content: html,
				date: new Date()
			});
		};
	},
	'click .insert': function (event, template) {
		event.preventDefault();
		event.stopPropagation();
		
		pasteHtmlAtCaret('&ndash;');
		
	},
	'input .text-editor': function (event, template) {		
		var text = template.$('.text-editor').text();
		var html = template.$('.text-editor').html();

		template.$('#text-status').text('Имеются несохранённые изменения');

		Tasks.update({_id: template.data._id}, {$set: {
			value: text.length,
			//content: html
		}});
	}
})

Template.editor.helpers({

})


Template.editor.onRendered(function () {	
	var editor = new MediumEditor('.text-editor', {
	    delay: 1,
	    targetBlank: true,
	    toolbar: false,
		paste: {
	        forcePlainText: true,
	        cleanPastedHTML: false,
	        cleanReplacements: [],
	        cleanAttrs: ['class', 'style', 'dir'],
	        cleanTags: ['meta']
	    },
		placeholder: false
	});
});